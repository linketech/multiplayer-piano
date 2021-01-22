/* eslint-disable max-classes-per-file */
const events = require('events')
const http = require('http')
const fs = require('fs')
const express = require('express')

process.EventEmitter = events.EventEmitter
const socketio = require('socket.io')

const app = express()
app.use('/static', express.static(`${__dirname}/static`))
const server = http.createServer(app)
const { PORT = 80 } = process.env
server.listen(PORT, () => { console.log('listen on ', PORT) })

const PLAYERS_PER_GAME = 32

const MIDIUtil = {
	NOTES: ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'],

	midiToNoteName: (num) => {
		const target = num % MIDIUtil.NOTES.length
		return MIDIUtil.NOTES[target]
	},

	offsetFromRoot: (root, target) => {
		const start = MIDIUtil.NOTES.indexOf(root)
		const end = MIDIUtil.NOTES.indexOf(target)
		if (end >= start) {
			return end - start
		}
		return (MIDIUtil.NOTES.length - start) + end
	},
}

function arraysEqual(a, b) {
	if (!(a instanceof Array && b instanceof Array)) {
		return false
	}
	if (a.length !== b.length) {
		return false
	}
	for (let i = 0; i < a.length; i += 1) {
		if (b.indexOf(a[i]) < 0) {
			return false
		}
	}
	return true
}

class ChordGenerator extends events.EventEmitter {
	constructor() {
		super()
		this.target = null
		this.notes = []
	}

	getRandomChord() {
		this.current = ChordGenerator.ROOTS[Math.floor(Math.random() * ChordGenerator.ROOTS.length)]
		this.currentNotes = []
		for (let i = 0; i < ChordGenerator.NOTES_MAJOR.length; i += 1) {
			const n = ChordGenerator.NOTES_MAJOR[i]
			// eslint-disable-next-line max-len
			this.currentNotes.push(ChordGenerator.ROOTS[(ChordGenerator.ROOTS.indexOf(this.current) + n) % ChordGenerator.ROOTS.length])
		}
		return this.current
	}

	noteOn(note) {
		const noteName = MIDIUtil.midiToNoteName(note)
		console.log('Note on: ', noteName)
		if (this.notes.indexOf(noteName) < 0) {
			this.notes.push(noteName)
		}
		console.log('Notes: ', this.notes)
		console.log('CurrentNotes: ', this.currentNotes)
		console.log('Value: ', arraysEqual(this.notes, this.currentNotes))
		if (this.currentNotes.indexOf(noteName) < 0) {
			this.score -= this.level * 20
		}
		if (arraysEqual(this.notes, this.currentNotes)) {
			console.log('Chord matched!')
			this.notes = []
			this.emit('chordMatched')
		}
	}

	noteOff(note) {
		this.notes = this.notes.filter((x) => x !== MIDIUtil.midiToNoteName(note))
	}

	getNotes() {
		return this.currentNotes
	}
}
ChordGenerator.NOTES_MAJOR = [0, 4, 7]
ChordGenerator.NOTES_MINOR = [0, 3, 7]
ChordGenerator.ROOTS = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B']
ChordGenerator.TYPES = ['Major', 'Minor']

exports.ChordGenerator = ChordGenerator

class Game extends events.EventEmitter {
	constructor() {
		super()
		console.log('Starting a new game.')
		this.players = []
		this.chordGenerator = new ChordGenerator()
		this.score = 0
		this.level = 0
		this.timer = null
		this.chordGenerator.on('chordMatched', () => {
			this.level += 1
			this.score += 100 * this.level
			for (let i = 0; i < this.players.length; i += 1) {
				this.players[i].emit('gotIt')
			}
			return this.newTurn()
		})
		this.end = this.end.bind(this)
	}

	addPlayer(player) {
		console.log('Adding player (game)')
		this.players.push(player)
		player.on('note_on', (note) => this.chordGenerator.noteOn(note))
		return player.on('note_off', (note) => this.chordGenerator.noteOff(note))
	}

	start() {
		console.log('Starting game.')
		for (let i = 0; i < this.players.length; i += 1) {
			this.players[i].emit('gameStart')
		}
		return this.newTurn()
	}

	newTurn() {
		console.log('New turn.')
		const timeout = 20000 - (1000 * this.level)
		if (this.timer != null) {
			clearTimeout(this.timer)
		}
		this.timer = setTimeout(this.end, timeout)
		const target = this.chordGenerator.getRandomChord()
		console.log('Broadcasting target', target, 'to all players.')
		for (let i = 0; i < this.players.length; i += 1) {
			this.players[i].emit('target', target, timeout)
		}
		if (this.level < 5) {
			const results = []
			for (let i = 0; i < this.players.length; i += 1) {
				results.push(this.players[i].emit('hint', this.chordGenerator.getNotes()))
			}
			return results
		}
		return []
	}

	end() {
		console.log('Game over; players scored', this.score)
		const results = []
		for (let i = 0; i < this.players.length; i += 1) {
			results.push(this.players[i].emit('gameOver', this.level, this.score))
		}
		return results
	}
}

class GameServer extends events.EventEmitter {
	constructor() {
		super()
		this.waitingroom = []
	}

	addPlayer(player) {
		console.log('Adding player (gameserver).')
		this.waitingroom.push(player)
		if (this.waitingroom.length >= PLAYERS_PER_GAME) {
			const game = new Game()
			for (let i = 0; i < PLAYERS_PER_GAME; i += 1) {
				game.addPlayer(this.waitingroom.pop())
			}
			game.start()
			return
		}
		player.emit('waiting', this.waitingroom.length, PLAYERS_PER_GAME)
	}
}

const gameServer = new GameServer()

app.get('/', (req, res) => fs.createReadStream('./views/index.html').pipe(res))

socketio.listen(server).sockets.on('connection', (socket) => {
	gameServer.addPlayer(socket)
	socket.on('note_on', (note, name) => socket.broadcast.emit('note_on', note, name))
	socket.on('hint', (obj) => socket.broadcast.emit('hint', obj))
	return socket.on('note_off', (note) => socket.broadcast.emit('note_off', note))
})
