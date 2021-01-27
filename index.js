/* eslint-disable max-classes-per-file */
const events = require('events')
const http = require('http')
const fs = require('fs')
const express = require('express')
const socketio = require('socket.io')
const { allNotes } = require('./note')

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
		if (n) {
			// 在 hint 的 4 秒内若按下了这个键，则更改 flag，服务器发送 note_on 的指令
			const hintObj = { n, d, id: Math.random() }
			socket.broadcast.emit('hint', hintObj)

			hintQueue.push(hintObj)
			const timeoutId = setTimeout(() => {
				// FIXME: shift 出来还是不太靠谱
				const { flag, name } = hintQueue.shift()
				console.log(flag, name)
				if (flag) {
					socket.emit('note_on', n, name)
				}
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
		// TODO: 演奏多首曲子，加个复选框
		Promise.all(allNotes.prelude.map((track) => playTrack(socket, track)))
	})
	socket.on('tap_hint', ({ id, name }) => {
		// TODO: 善用 id
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
