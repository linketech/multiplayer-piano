/* eslint-disable max-classes-per-file */
const events = require('events')
const http = require('http')
const fs = require('fs')
const express = require('express')
const socketio = require('socket.io')

const { allNotes, songToNotes } = require('./note')
const { notationToNote, midiToNotation } = require('./static/js/note-map')

const app = express()
app.use('/static', express.static(`${__dirname}/static`))

const server = http.createServer(app)
const io = socketio(server)
const { PORT = 80 } = process.env
server.listen(PORT, () => { console.log('listen on ', PORT) })

class GameServer extends events.EventEmitter {
	constructor() {
		super()
		this.count = 0
	}

	addPlayer() {
		this.count += 1
		console.log(`Adding player${this.count}`)
	}
}

const gameServer = new GameServer()

app.get('/', (req, res) => fs.createReadStream('./views/index.html').pipe(res))

const hintQueue = []
const sleep = (t) => new Promise((rs) => setTimeout(rs, t))
const playTrack = async (socket, track) => {
	const start = Date.now()
	let expectedElapse = 0
	for (let i = 0; i < track.length; i += 1) {
		const { n, d } = track[i]
		// 只要有 d 的都传给前端，具体 hint 由前端处理
		if (d) {
			const randomNum = Math.random()
			const hintObj = { ...track[i], id: randomNum }
			// 观众也接收歌词，注意可能会有很多 miss 显示，改为 broadcast 可以 debug miss
			// socket.broadcast.emit('hint', hintObj)
			io.emit('hint', hintObj)

			hintQueue.push(hintObj)
			// 在 hint 的 4 秒内若按下了这个键，则更改 flag，服务器发送 note_on 的指令
			const timeoutId = setTimeout(() => {
				// 处理歌词
				if (!n) {
					clearTimeout(timeoutId)
					return
				}
				const hintIndex = hintQueue.findIndex(({ id, flag }) => id === randomNum && flag)
				// 后端打印 miss
				if (hintIndex === -1) {
					const note = notationToNote[midiToNotation[n]]
					console.log(`Missed note: ${note}`)
					clearTimeout(timeoutId)
					return
				}
				const { name } = hintQueue[hintIndex]
				socket.emit('note_on', n, name)
				hintQueue.splice(hintIndex, 1)
				clearTimeout(timeoutId)
			}, 4000)
		}
		expectedElapse += d
		const totalElapse = Date.now() - start
		const sleepTime = expectedElapse - totalElapse
		// eslint-disable-next-line no-await-in-loop
		await sleep(sleepTime)
	}
}

io.on('connection', (socket) => {
	gameServer.addPlayer(socket)
	socket.on('start', (music) => {
		// 前端单选曲目，按 start 按钮触发
		if (!music) {
			return
		}
		Promise.all(allNotes[songToNotes[music]].map((track) => playTrack(socket, track)))
	})
	socket.on('tap_hint', ({ id, name }) => {
		for (let i = 0; i < hintQueue.length; i += 1) {
			const hintObj = hintQueue[i]
			if (hintObj.id === id) {
				hintObj.flag = true
				hintObj.name = name
				break
			}
		}
	})
	socket.on('note_on', (note, name) => socket.broadcast.emit('note_on', note, name))
})
