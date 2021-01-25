/* eslint-disable no-undef */
/* eslint-disable consistent-return */

const socket = io.connect() // socket.io
const MIDI_CHANNEL = 0
const MIDI_VOLUME = 127
window.socket = socket

// 进入页面时必须先输入用户名
const handleName = () => {
	let name = ''
	while (!name) {
		name = prompt('输入你的大名：')
	}
	$('.username').append(name)
	if (name === '观众') {
		$('.start').css('display', 'block')
			.tap(() => socket.emit('start'))
	}
	return name
}

const shownKeys = new Set()
const generateKeyNote = (whiteKey, blackKey) => `<div class="piano-key">
		<div class="piano-key__white" data-note="${whiteKey}"><span class="piano-note">${whiteKey}</span></div>
		<div class="piano-key__black" data-note="${blackKey || ''}" style="display: ${blackKey ? 'block' : 'none'};"><span class="piano-note">${blackKey || ''}</span></div>
</div>`

const generatePiano = (keys) => {
	const $piano = $('.piano').first()
	$piano.empty()
	pianoKeys.forEach(({ white, black }) => {
		if (keys.includes(white.name) || keys.includes(black.name)) {
			const keyNote = generateKeyNote(white.name, black.name)
			const $keyNote = $(keyNote)
			// TODO: 绑定触发器
			$keyNote.appendTo($piano)
		}
	})
}

const generateFullPiano = () => {
	const $piano = $('.piano').first()
	pianoKeys.forEach(({ white, black }) => {
		const keyNote = generateKeyNote(white.name, black.name)
		const $keyNote = $(keyNote)
		$keyNote.appendTo($piano)
	})
}

const generateCheckbox = (name) => {
	if (name === '观众') {
		generateFullPiano()
		return
	}
	const $options = $('<div class="options"></div>')
	Object.keys(noteToNotation).forEach((note) => {
		const checkbox = `<input type="checkbox" id="${note}" value="${note}">
			<label for="${note}">${note}</label>`
		const $checkbox = $(checkbox)
		$checkbox.change(function () {
			if (this.checked) {
				shownKeys.add(this.value)
			} else {
				shownKeys.delete(this.value)
			}
			generatePiano([...shownKeys])
		})
		const $paragraph = $('<p></p>')
		$checkbox.appendTo($paragraph)
		$paragraph.appendTo($options)
	})
	$options.appendTo($('footer'))
}

// 触发时开始下落音符
const attachHintListener = () => socket.on('hint', ({ n, d }) => {
	if (n) {
		const note = notationToNote[MidiToNotation[n]]
		const $key = $(`.piano-key div[data-note=${note}]`)

		const $fallingTap = $('<div class="tap"></div>')
		$fallingTap.css('height', d * 0.05) // 根据节奏调整持续时间
		$fallingTap.css('opacity', 0.5)
		if (d >= 500) {
			// 默认短音符是番茄色，长按改为金黄色
			$fallingTap.css('background', 'gold')
		}
		$fallingTap.appendTo($key)
		$fallingTap.stop().animate({
			top: '100%',
		}, 4000, 'linear', () => {
			$fallingTap.remove()
		})

		// TODO: 消消乐: 4s 后自动播放

		// const sleep = (t) => new Promise((rs) => setTimeout(rs, t))
		// (async () => {
		// 	await sleep(4000)
		// 	$key.tapstart()
		// 	await sleep(500)
		// 	$key.tapend()
		// })()
	}
})

const init = () => MIDI.loadPlugin({
	soundfontUrl: '/static/soundfonts/',
	instrument: 'acoustic_grand_piano',
	callback() {
		MIDI.setVolume(MIDI_CHANNEL, MIDI_VOLUME)
		return attachHintListener()
	},
})

// 事件监听器的合集在此定义
const attachListeners = (name) => {
	$('.piano-key div').each((i, el) => {
		// 钢琴键元素
		const $el = $(el)
		const note = $el.data('note')
		const midiNum = notationToMidi[noteToNotation[note]]
		// 避免长按选中文本
		$el.children().bind('contextmenu', (e) => {
			e.preventDefault()
		})

		$el.tapstart(() => {
			socket.emit('note_on', midiNum, name)
			MIDI.noteOn(MIDI_CHANNEL, midiNum, MIDI_VOLUME, 0)
			$el.addClass('tapped-note')
		})
		$el.tapend(() => {
			socket.emit('note_off', midiNum)
			$el.removeClass('tapped-note')
		})
		$el.tapmove(() => {
			socket.emit('note_off', midiNum)
			$el.removeClass('tapped-note')
		})
	})
	// 接收到按下琴键的事件
	socket.on('note_on', (midiNum, theirName) => {
		MIDI.noteOn(MIDI_CHANNEL, midiNum, MIDI_VOLUME, 0)
		const note = notationToNote[MidiToNotation[midiNum]]
		const $note = $(`div[data-note='${note}']`)
		$note.each((i, el) => $(el).addClass('their-note'))

		const $name = $(`<div>${theirName}</div>`).css('color', 'red')
			.css('opacity', '1')
		$name.appendTo($note)
		$name.animate({
			opacity: '0',
		}, 500, 'linear', () => {
			$name.remove()
		})
	})
	// 接收到松开琴键的事件
	socket.on('note_off', (midiNum) => {
		// MIDI.noteOff(MIDI_CHANNEL, midiNum)
		const note = notationToNote[MidiToNotation[midiNum]]
		$(`div[data-note='${note}']`).each((i, el) => $(el).removeClass('their-note'))
	})
}

$(document).ready(() => {
	const name = handleName()
	generateCheckbox(name)
	init()
	attachListeners(name)
	// 阻止长按选中文字
	window.ontouchstart = (e) => {
		e.preventDefault()
	}
})
