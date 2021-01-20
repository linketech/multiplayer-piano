/* eslint-disable no-undef */
/* eslint-disable consistent-return */

const socket = io.connect() // socket.io
const MIDI_CHANNEL = 0
const MIDI_VOLUME = 127
const LATCH_MODE = false // 控制琴键按压后是否保持
const GAME_OVER = false
let started = null
let timer = null

// 读完谱子后才开始加提示（红色背景）
const attachHintListener = () => socket.on('hint', (notes) => {
	let note
	let i
	let len
	const results = []
	for (i = 0, len = notes.length; i < len; i += 1) {
		note = notes[i]
		// eslint-disable-next-line no-loop-func
		results.push($(`.notes span[data-note-name='${note}']`).each((j, el) => {
			$(el).addClass('hint')
			return MIDI.noteOn(MIDI_CHANNEL, $(el).data('note'), MIDI_VOLUME, 0)
		}))
	}
	return results
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
	$('.notes span').each((i, el) => {
		// 钢琴键元素
		const $el = $(el)
		$el.mousedown(() => {
			let note
			if (!GAME_OVER) {
				note = $el.data('note')
				if (LATCH_MODE) {
					if ($el.hasClass('myNote')) {
						MIDI.noteOff(MIDI_CHANNEL, note, MIDI_VOLUME, 0)
						socket.emit('note_off', note)
						return $el.removeClass('myNote')
					}
					// 为什么要重复 emit?
					MIDI.noteOn(MIDI_CHANNEL, note, MIDI_VOLUME, 0)
					socket.emit('note_on', note)
					return $el.addClass('myNote')
				}
				MIDI.noteOn(MIDI_CHANNEL, note, MIDI_VOLUME, 0)
				socket.emit('note_on', note)
				return $el.addClass('myNote')
			}
		})
		$el.mouseup(() => {
			let note
			if (!LATCH_MODE) {
				note = $el.data('note')
				socket.emit('note_off', note)
				return $el.removeClass('myNote')
			}
		})
		return $el.mouseout(() => {
			let note
			if (!LATCH_MODE) {
				note = $el.data('note')
				socket.emit('note_off', note)
				return $el.removeClass('myNote')
			}
		})
	})
	// 按下琴键的事件
	socket.on('note_on', (note) => {
		MIDI.noteOn(MIDI_CHANNEL, note, MIDI_VOLUME, 0)
		return $(`span[data-note='${note}']`).each((i, el) => $(el).addClass('theirNote'))
	})
	// 松开琴键的事件
	socket.on('note_off', (note) => {
		MIDI.noteOff(MIDI_CHANNEL, note)
		return $(`span[data-note='${note}']`).each((i, el) => $(el).removeClass('theirNote'))
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
		$('.notes .myNote').removeClass('myNote')
		$('.notes .hint').removeClass('hint')
		return $('.notes .theirNote').removeClass('theirNote')
	})
	return socket.on('waiting', (you, total) => updateStatus(`Waiting for other players (you are player ${you} of ${total} needed)...`))
}

$(document).ready(() => {
	init()
	return attachListeners()
})
