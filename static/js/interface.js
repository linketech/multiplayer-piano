/* eslint-disable no-undef */
/* eslint-disable consistent-return */

const socket = io.connect() // socket.io
const MIDI_CHANNEL = 0
const MIDI_VOLUME = 127
const LATCH_MODE = false // 控制琴键按压后是否保持
const GAME_OVER = false
let started = null
let timer = null
window.socket = socket

// 读完谱子后才开始加提示（红色背景）
const attachHintListener = () => socket.on('hint', ({ n, d }) => {
	if (n) {
		const note = notationToNote[MidiToNotation[n]]
		const $el = $(`.piano-key div[data-note=${note}]`)

		const tap = $('<div class="tap"></div>')
		tap.css('height', d * 0.05) // 根据节奏调整持续时间
		tap.css('opacity', 0.5)
		if (d >= 500) {
			// 默认短音符是番茄色，长按改为金黄色
			tap.css('background', 'gold')
		}
		tap.appendTo($el)
		tap.stop().animate({
			top: '100%',
		}, 4000, 'linear', () => {
			tap.remove()
		})
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

// 检测按下琴键时的准确度，并显示不同的颜色用以反馈
const animateProgressBar = (timeout) => {
	const innerTimeout = timeout - 100
	started = new Date().getTime()
	if (timer != null) {
		clearInterval(timer)
	}
	timer = setInterval(() => {
		let color
		const percentage = 1 - ((new Date().getTime() - started) / innerTimeout)
		if (percentage < 0) {
			return clearInterval(timer)
		}
		color = '#5f5'
		if (percentage < 0.66) {
			color = '#f95'
		}
		if (percentage < 0.33) {
			color = '#f55'
		}
		return $('.timeleft span').css('width', `${percentage * 100}%`).css('background-color', color)
	}, 100)
}

// 此处的文本原文是 `Waiting for server response...`
const updateStatus = (string) => $('.gamestatus').each((i, el) => $(el).text(string))

// 用于弹出游戏状态的提示，利用了 jq 的动画改变透明度
const gotit = (text) => {
	const $el = $('#gotit')
	$el.text(text)
	$el.show().css('bottom', '20px').css('opacity', 1)
	return $el.animate({
		opacity: 0,
		bottom: '+=100',
	}, 1200, 'swing', () => $el.hide())
}

// 事件监听器的合集在此定义
const attachListeners = () => {
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
			socket.emit('note_on', midiNum)
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
	// 按下琴键的事件
	socket.on('note_on', (midiNum) => {
		MIDI.noteOn(MIDI_CHANNEL, midiNum, MIDI_VOLUME, 0)
		const note = notationToNote[MidiToNotation[midiNum]]
		$(`div[data-note='${note}']`).each((i, el) => $(el).addClass('their-note'))
	})
	// 松开琴键的事件
	socket.on('note_off', (midiNum) => {
		// MIDI.noteOff(MIDI_CHANNEL, midiNum)
		const note = notationToNote[MidiToNotation[midiNum]]
		$(`div[data-note='${note}']`).each((i, el) => $(el).removeClass('their-note'))
	})
	// target 事件是后端 emit 给所有玩家的
	socket.on('target', (target, timeout) => {
		animateProgressBar(timeout)
		if (target === 'A' || target === 'E') {
			return updateStatus(`Play an ${target} major chord!`)
		}
		return updateStatus(`Play a ${target} major chord!`)
	})
	// gameStart 事件同样是后端 emit 给所有玩家的
	socket.on('gameStart', () => {
		gotit('Begin!')
		// 分享成绩
		$('.tweetthis').slideUp()
		return $('.notes .hint').removeClass('hint')
	})
	// 游戏结束后根据分数可以发不同的推特，删去以减少复杂度
	socket.on('gameOver', (level, score) => {
	})
	socket.on('gotIt', () => {
		gotit('Got it!')
		$('.notes .tapped-note').removeClass('tapped-note')
		$('.notes .hint').removeClass('hint')
		return $('.notes .their-note').removeClass('their-note')
	})
	return socket.on('waiting', (you, total) => updateStatus(`Waiting for other players (you are player ${you} of ${total} needed)...`))
}

$(document).ready(() => {
	init()
	return attachListeners()
})

window.ontouchstart = (e) => {
	e.preventDefault()
}
