/* eslint-disable no-useless-escape */
/* eslint-disable no-undef */

const socket = io.connect() // socket.io
window.socket = socket
const MIDI_CHANNEL = 0
const MIDI_VOLUME = 127

const sleep = (t) => new Promise((rs) => setTimeout(rs, t))

function loadPageVar(sVar) {
	// eslint-disable-next-line prefer-template
	return decodeURI(window.location.search.replace(new RegExp('^(?:.*[&\\?]' + encodeURI(sVar).replace(/[\.\+\*]/g, '\\$&') + '(?:\\=([^&]*))?)?.*$', 'i'), '$1'))
}

// 进入页面时必须先输入用户名
const vvips = ['高音', '低音']
const vips = ['观众', '指挥', ...vvips]
const handleName = () => {
	let name = ''
	const originName = loadPageVar('name')
	name = originName
	while (!name || (!vips.includes(name) && names.indexOf(name) === -1)) {
	// eslint-disable-next-line no-alert
		name = prompt('亮出你的身份：')
	}
	$('.username').append(name)

	socket.emit('set_name', name)
	if (!originName) {
		window.location.search = `?name=${name}`
	}

	let timeId
	socket.on('heartbeat', () => {
		clearTimeout(timeId)
		// 0.3s 内未收到后端发的心跳，则显示断线
		if ($('.traffic-light').css('color') === 'rgb(255, 99, 71)') {
			socket.emit('set_name', `重连的${name}`)
		}
		$('.traffic-light').css('color', 'limegreen')
		timeId = setTimeout(() => {
			$('.traffic-light').css('color', 'tomato')
			clearTimeout(timeId)
		}, 1000)
	})

	return name
}

const handleVip = (name) => {
	if (name === '指挥') {
		const songs = ['完整曲目', '云宫迅音', '敢问路在何方', '大王叫我来巡山']
		const $select = $('<select></select>')
		songs.forEach((song) => {
			const option = `<option value="${song}">${song}</option>`
			$(option).appendTo($select)
		})
		$('.select-music').css('display', 'block')
		$select.appendTo($('.select-music'))
		$('.start').tap(() => socket.emit('start', $('select').val()))
	}
	if (vips.includes(name)) {
		$('.lyric').css('font-size', '64px')
		$('body').css('margin-top', '80px')
	}
}

// 用于生成 dom
const generateKeyNote = (whiteKey, blackKey) => `<div class="piano-key">
		<div class="piano-key__white" data-note="${whiteKey}"><span class="piano-note">${whiteKey}</span></div>
		<div class="piano-key__black" data-note="${blackKey || ''}" style="display: ${blackKey ? 'block' : 'none'};"><span class="piano-note">${blackKey || ''}</span></div>
</div>`

// 根据已选中复选框的值生成所需琴键
const generatePiano = (keys, name) => {
	const $piano = $('.piano').first()
	pianoKeys.forEach(({ white, black }) => {
		if (keys.includes(white.note) || keys.includes(black.note)) {
			const keyNote = generateKeyNote(white.note, black.note)
			const $keyNote = $(keyNote)
			const blackWhiteDom = [...$keyNote.children()]
			// 绑定触发器
			blackWhiteDom.forEach((pianoKey) => {
				const $pianoKey = $(pianoKey)

				$pianoKey.tapstart(() => {
					$pianoKey.addClass('tapped-note')
					if ($pianoKey.children('.tap').length > 0) {
						const $fallingTap = $pianoKey.children('.tap').first()
						const tapTop = $fallingTap.css('top').split('px').length
							? Number($fallingTap.css('top').split('px')[0])
							: -1
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
					$pianoKey.removeClass('tapped-note')
				})
				$pianoKey.tapmove(() => {
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
		const keyNote = generateKeyNote(white.note, black.note)
		const $keyNote = $(keyNote)
		const blackWhiteDom = [...$keyNote.children()]
		// 绑定触发器
		blackWhiteDom.forEach((pianoKey) => {
			const $pianoKey = $(pianoKey)
			const note = $pianoKey.data('note')
			const midiNum = R.invertObj(midiToNote)[note]

			$pianoKey.tapstart(() => {
				socket.emit('note_on', midiNum, '')
				$pianoKey.addClass('tapped-note')
			})
			$pianoKey.tapend(() => {
				$pianoKey.removeClass('tapped-note')
			})
			$pianoKey.tapmove(() => {
				$pianoKey.removeClass('tapped-note')
			})
		})

		$keyNote.appendTo($piano)
	})
}

const generatePianoByTask = (name) => {
	if (vvips.includes(name)) {
		return generatePiano(Object.values(midiToNote), name)
	}
	if (vips.includes(name)) {
		return generateFullPiano()
	}

	const nameIndex = names.indexOf(name)
	const taskIndex = distribution.indexOf(nameIndex)
	const ownTask = task[taskIndex]
		.map((midi) => midiToNote[midi])
	return generatePiano(ownTask, name)
}

// 传入歌词 hint，生成 DOM 元素，在 4s 后推进，在遇到标点后移除
const animateStep = 30
const line = []
const punctuation = ['，', '。', '！', '？', '、', '~']
async function generateLyric({ l, d }) {
	const $root = $('.lyric').first()
	const $p = $(`<p>${l}</p>`)
	$p.appendTo($root)
	await sleep(4000) // 保证发音时与歌词同步
	const count = d / animateStep
	let process = 0
	for (let i = 0; i < count; i += 1) {
		// eslint-disable-next-line no-await-in-loop
		await sleep(animateStep)

		process += animateStep
		$p.css('background-image', `
			-webkit-linear-gradient(
				top,
				rgba(255,255,255,0.5) 0%,
				rgba(255,255,255,0) 100%),
			-webkit-linear-gradient(left, #f00 ${process}%, gold 0%)`)
	}
	line.push($p)
	if (punctuation.includes(l)) {
		line.forEach(($l) => {
			$l.remove()
		})
	}
}

// 监听下落提示，需要在下落提示持续时间内按下琴键
const attachHintListener = (name) => socket.on('hint', ({ n, d, id, l }) => {
	if (l) {
		generateLyric({ l, d })
	} else if (n && name !== '观众') {
		// socket.emit('tap_hint', { id, name }) // 自动弹奏

		const note = midiToNote[n]
		const $key = $(`div[data-note="${note}"]`)

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

const initMidi = (name) => MIDI.loadPlugin({
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
		const note = midiToNote[midiNum]
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
		const note = midiToNote[midiNum]
		$(`div[data-note="${note}"]`).each((i, el) => $(el).removeClass('their-note'))
	})
}

$(document).ready(() => {
	const name = handleName()
	handleVip(name)
	generatePianoByTask(name)
	initMidi(name)
	attachListeners()
})
