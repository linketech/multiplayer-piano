/* eslint-disable max-classes-per-file */
const events = require('events')
const http = require('http')
const fs = require('fs')
const express = require('express')
const socketio = require('socket.io')

const app = express()
app.use('/static', express.static(`${__dirname}/static`))

const server = http.createServer(app)
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

socketio(server).on('connection', (socket) => {
	// TODO: note_on 放在服务器触发
	// 把前端判断 flag 的逻辑改到后端
	gameServer.addPlayer(socket)
	socket.on('note_on', (note, name) => socket.broadcast.emit('note_on', note, name))
	socket.on('hint', (obj) => socket.broadcast.emit('hint', obj))
})
