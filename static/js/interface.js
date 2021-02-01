/* eslint-disable no-undef */
/* eslint-disable consistent-return */

const socket = io.connect() // socket.io
window.socket = socket
const MIDI_CHANNEL = 0
const MIDI_VOLUME = 127

// 进入页面时必须先输入用户名
const handleName = () => {
	let name = ''
	while (!name || names.indexOf(name) === -1) {
		// eslint-disable-next-line no-alert
		name = prompt('输入你的大名：')
	}
	$('.username').append(name)

	if (name === '观众') {
		const songs = ['云宫迅音', '敢问路在何方', '完整曲目', '吟唱1', '吟唱2']
		const $select = $('<select style="margin-top: 8px;"></select>')
		songs.forEach((song) => {
			const option = `<option value="${song}">${song}</option>`
			$(option).appendTo($select)
		})
		$('.select-music').css('display', 'block')
		$select.appendTo($('.select-music'))
		$('.start').tap(() => socket.emit('start', $('select').val()))
	}
	return name
}

// 用于生成 dom
const generateKeyNote = (whiteKey, blackKey) => `<div class="piano-key">
		<div class="piano-key__white" data-note="${whiteKey}"><span class="piano-note">${whiteKey}</span></div>
		<div class="piano-key__black" data-note="${blackKey || ''}" style="display: ${blackKey ? 'block' : 'none'};"><span class="piano-note">${blackKey || ''}</span></div>
</div>`

// 根据已选中复选框的值生成所需琴键
const generatePiano = (keys, name) => {
	const $piano = $('.piano').first()
	$piano.empty() // 清空状态以便重新生成
	pianoKeys.forEach(({ white, black }) => {
		if (keys.includes(white.name) || keys.includes(black.name)) {
			const keyNote = generateKeyNote(white.name, black.name)
			const $keyNote = $(keyNote)
			const blackWhiteDom = [...$keyNote.children()]
			// 绑定触发器
			blackWhiteDom.forEach((pianoKey) => {
				const $pianoKey = $(pianoKey)
				const note = $pianoKey.data('note')
				const midiNum = notationToMidi[noteToNotation[note]]

				$pianoKey.tapstart(() => {
					$pianoKey.addClass('tapped-note')
					if ($pianoKey.children('.tap').length > 0) {
						const $fallingTap = $pianoKey.children('.tap').first()
						const tapTop = $fallingTap.css('top').split('px').length
							? Number($fallingTap.css('top').split('px')[0]) : -1
						if (tapTop < 0) {
							// 防止乱弹
							return
						}

						// 隐藏下落音符以反馈演奏者
						$fallingTap.remove()

						// 通过存在 DOM 里的 id 来改变后端 flag
						const noteId = $fallingTap.data('id')
						socket.emit('tap_hint', { id: noteId, name })
					}
				})
				$pianoKey.tapend(() => {
					socket.emit('note_off', midiNum)
					$pianoKey.removeClass('tapped-note')
				})
				$pianoKey.tapmove(() => {
					socket.emit('note_off', midiNum)
					$pianoKey.removeClass('tapped-note')
				})
			})

			$keyNote.appendTo($piano)
		}
	})
}

// 给观众生成的，显示选曲且可以演奏的钢琴
const generateFullPiano = () => {
	const $piano = $('.piano').first()
	pianoKeys.forEach(({ white, black }) => {
		const keyNote = generateKeyNote(white.name, black.name)
		const $keyNote = $(keyNote)
		const blackWhiteDom = [...$keyNote.children()]
		// 绑定触发器
		blackWhiteDom.forEach((pianoKey) => {
			const $pianoKey = $(pianoKey)
			const note = $pianoKey.data('note')
			const midiNum = notationToMidi[noteToNotation[note]]

			$pianoKey.tapstart(() => {
				socket.emit('note_on', midiNum, '')
				$pianoKey.addClass('tapped-note')
			})
			$pianoKey.tapend(() => {
				socket.emit('note_off', midiNum)
				$pianoKey.removeClass('tapped-note')
			})
			$pianoKey.tapmove(() => {
				socket.emit('note_off', midiNum)
				$pianoKey.removeClass('tapped-note')
			})
		})

		$keyNote.appendTo($piano)
	})
}

const generateCheckbox = (name) => {
	if (name === '观众') {
		return generateFullPiano()
	}

	const nameIndex = names.indexOf(name)
	const taskIndex = distribution.indexOf(nameIndex)
	const ownTask = task[taskIndex]
		.map((midi) => notationToNote[midiToNotation[midi]])
	return generatePiano(ownTask, name)
}

// 监听下落提示，需要在下落提示持续时间内按下琴键
const attachHintListener = (name) => socket.on('hint', ({ n, d, id }) => {
	if (n && name !== '观众') {
		const note = notationToNote[midiToNotation[n]]
		const $key = $(`div[data-note=${note}]`)

		// 将 id 存在 DOM 中
		const $fallingTap = $(`<div class="tap" data-id="${id}"></div>`)
		$fallingTap.css('height', d * 0.05) // 根据节奏调整持续时间
		$fallingTap.css('opacity', 0.5)
		if (d >= 500) {
			// 默认短音符是番茄色，长按改为金黄色
			$fallingTap.css('background', 'gold')
		}
		$fallingTap.appendTo($key)
		// 通过调整 top 属性来实现下落过程
		$fallingTap.stop().animate({
			top: '100%',
		}, 4000, 'linear', () => {
			$fallingTap.remove()
		})
	}
})

const init = (name) => MIDI.loadPlugin({
	soundfontUrl: '/static/soundfonts/',
	instrument: 'acoustic_grand_piano',
	callback() {
		MIDI.setVolume(MIDI_CHANNEL, MIDI_VOLUME)
		return attachHintListener(name)
	},
})

// 此处只保留 socket 监听器，琴键触发器在生成时定义
const attachListeners = () => {
	// 接收到其他人按下琴键的广播
	socket.on('note_on', (midiNum, theirName) => {
		MIDI.noteOn(MIDI_CHANNEL, midiNum, MIDI_VOLUME, 0)
		const note = notationToNote[midiToNotation[midiNum]]
		const $note = $(`div[data-note="${note}"]`)
		// 添加其他人按下琴键时的反馈
		$note.each((i, el) => {
			$(el).addClass('their-note')
			// 自动去掉 note_off 的 css
			const timeoutId = setTimeout(() => {
				$(el).removeClass('their-note')
				clearTimeout(timeoutId)
			}, 500)
		})
		// 显示触发者的用户名并消失
		const $name = $(`<div>${theirName}</div>`).css('color', 'darkgoldenrod')
			.css('opacity', '1')
		$name.appendTo($note)
		$name.animate({
			opacity: '0',
		}, 500, 'linear', () => {
			$name.remove()
		})
	})
	// 接收到其他人松开琴键的广播
	socket.on('note_off', (midiNum) => {
		// MIDI.noteOff(MIDI_CHANNEL, midiNum) // 不需要区分长按与点击
		const note = notationToNote[midiToNotation[midiNum]]
		$(`div[data-note="${note}"]`).each((i, el) => $(el).removeClass('their-note'))
	})
}

$(document).ready(() => {
	const name = handleName()
	generateCheckbox(name)
	init(name)
	attachListeners()
})
