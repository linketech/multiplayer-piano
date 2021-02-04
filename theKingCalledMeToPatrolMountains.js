// note
const N = {
	'..1': 36,
	'..2': 38,
	'..3': 40,
	'..4': 41,
	'..5': 43,
	'..#5': 44,
	'..6': 45,
	'..7': 47,
	'.1': 48,
	'.#1': 49,
	'.2': 50,
	'.3': 52,
	'.4': 53,
	'.5': 55,
	'.#5': 56,
	'.6': 57,
	'.7': 59,
	1: 60,
	2: 62,
	3: 64,
	4: 65,
	'&5': 66,
	5: 67,
	'#5': 68,
	6: 69,
	7: 71,
	'1*': 72,
	'2*': 74,
	'3*': 76,
	'4*': 77,
	'5*': 79,
	'6*': 81,
	'7*': 83,
	'1**': 84,
}

// duration
const D = {
	Semiquaver: 125,
	Eighth: 250,
	Quarter: 500,
	'Quarter.5': 750,
	'3/4': 1500,
	Half: 1000,
	Whole: 2000,
	'Whole*2': 4000,
}

// track1
const session1611653 = [
	{ n: N['1*'], d: D.Semiquaver },
	{ n: N['6'], d: D.Semiquaver },
	{ n: N['1*'], d: D.Eighth },
	{ n: N['1*'], d: D.Eighth },
	{ n: N['6'], d: D.Eighth },
	{ n: N['5*'], d: D.Quarter },
	{ n: N['3*'], d: D.Quarter },
]
const session16116533 = [
	...session1611653,
	{ n: N['3*'], d: D.Whole },
]
const create88884 = (a, b, c, d, e) => [
	{ n: N[a], d: D.Eighth },
	{ n: N[b], d: D.Eighth },
	{ n: N[c], d: D.Eighth },
	{ n: N[d], d: D.Eighth },
	{ n: N[e], d: D.Quarter },
]
const create888844 = (a, b, c, d, e, f) => [
	...create88884(a, b, c, d, e),
	{ n: N[f], d: D.Quarter },
]
const create888844w = (a, b, c, d, e, f, g) => [
	...create888844(a, b, c, d, e, f),
	{ n: N[g], d: D.Whole },
]
const sessionTrack1Climax = [
	...session16116533,
	...create888844w('6', '3', '6', '6', '1*', '6', '5'),

	{ n: N['6'], d: D.Eighth },
	{ n: N['6'], d: D.Eighth },
	{ n: N['5'], d: D.Eighth },
	{ n: N['6'], d: D.Eighth },
	{ n: N['3'], d: D.Eighth },
	{ n: N['5'], d: D['Quarter.5'] },

	...create888844('6', '6', '5', '6', '5*', '3*'),
	...create88884('2*', '2*', '2*', '1*', '5*'),
	{ n: N['5*'], d: D.Eighth },
	{ n: N['3*'], d: D.Eighth },
	{ n: N['2*'], d: D.Whole },

	...session1611653,
	{ n: N['3*'], d: D['3/4'] },
	{ n: N['2*'], d: D.Quarter },
	...create888844('6', '6', '6', '6', '1*', '6'),
	{ n: N['5'], d: D['3/4'] + D.Eighth },
	{ n: N['5'], d: D.Eighth },

	{ n: N['6'], d: D.Eighth },
	{ n: N['6'], d: D.Quarter },
	{ n: N['5'], d: D.Eighth },
	{ n: N['3'], d: D.Eighth },
	{ n: N['5'], d: D.Eighth },
	{ n: N['3'], d: D.Quarter },

	{ n: N['6'], d: D.Eighth },
	{ n: N['5'], d: D.Quarter },
	{ n: N['6'], d: D.Eighth },
	{ n: N['3*'], d: D.Eighth },
	{ n: N['5*'], d: D.Eighth },
	{ n: N['3*'], d: D.Quarter },
	...create888844w('2*', '2*', '2*', '1*', '3*', '2*', '1*'),
]
const track1 = [
	...session16116533,
	{ d: D.Whole },
	{ d: D.Whole },

	...create888844w('5', '5', '5', '5', '6', '3', '5'),
	...create888844w('6', '5', '3', '2', '3', '.6', '1'),

	{ n: N['6'], d: D['Quarter.5'] },
	{ n: N['1*'], d: D.Eighth },
	{ n: N['6'], d: D.Quarter },
	{ n: N['5'], d: D.Quarter },
	{ n: N['6'], d: D['Quarter.5'] },
	{ n: N['1*'], d: D.Eighth },
	{ n: N['6'], d: D.Quarter },
	{ n: N['5'], d: D.Eighth },
	{ n: N['5'], d: D.Eighth },
	...create888844w('6', '5', '5', '5', '1', '3', '2'),

	...create888844('5', '5', '5', '5', '6', '3'),
	{ n: N['5'], d: D['3/4'] },
	{ n: N['5'], d: D.Eighth },
	{ n: N['3'], d: D.Eighth },
	{ n: N['6'], d: D.Eighth + D.Semiquaver },
	{ n: N['6'], d: D.Semiquaver },
	{ n: N['6'], d: D.Eighth },
	{ n: N['5'], d: D.Eighth },
	{ n: N['6'], d: D.Quarter },
	{ n: N['3'], d: D.Eighth },
	{ n: N['2'], d: D.Eighth },
	{ n: N['3'], d: D.Eighth },
	{ n: N['1'], d: D['Quarter.5'] + D.Half },

	{ n: N['6'], d: D['Quarter.5'] },
	{ n: N['1*'], d: D.Eighth },
	{ n: N['6'], d: D.Quarter },
	{ n: N['5'], d: D.Quarter },
	{ n: N['6'], d: D.Eighth },
	{ n: N['6'], d: D.Quarter },
	{ n: N['1*'], d: D.Eighth },
	{ n: N['6'], d: D.Half },
	...create888844w('5', '5', '5', '5', '.5', '2', '1'),

	...sessionTrack1Climax,
	...sessionTrack1Climax,
]

// track2
const create48844 = (a, b, c, d, e) => [
	{ n: N[a], d: D.Quarter },
	{ n: N[b], d: D.Eighth },
	{ n: N[c], d: D.Eighth },
	{ n: N[d], d: D.Quarter },
	{ n: N[e], d: D.Quarter },
]
const sessionTrack2Climax = [
	...create48844('.1', '1', '1', '..5', '1'),
	...create48844('.1', '1', '1', '..5', '1'),
	...create48844('..6', '.6', '.6', '..3', '.6'),
	...create48844('..5', '.5', '.5', '..2', '.5'),

	...create48844('..6', '.6', '.6', '..3', '.6'),
	...create48844('.1', '1', '1', '..5', '1'),
	...create48844('.2', '2', '2', '..6', '2'),
	...create48844('..5', '.5', '.5', '..2', '.5'),

	...create48844('..1', '1', '1', '..5', '1'),
	...create48844('..1', '1', '1', '..5', '1'),
	...create48844('..6', '.6', '.6', '..3', '.6'),
	...create48844('..5', '.5', '.5', '..2', '.5'),

	...create48844('..6', '.6', '.6', '..3', '.6'),
	...create48844('.1', '1', '1', '..5', '1'),
	...create48844('.2', '.6', '.6', '..5', '5'),
	...create48844('..1', '1', '1', '..5', '1'),
]
const track2 = [
	{ d: D.Whole },
	{ d: D.Whole },
	...create48844('.1', '1', '1', '..5', '1'),
	...create48844('.1', '1', '1', '..5', '1'),

	...create48844('.1', '1', '1', '..5', '1'),
	...create48844('.1', '1', '1', '..5', '1'),
	...create48844('..6', '.6', '.6', '..3', '.6'),
	...create48844('..6', '.6', '.6', '..3', '.6'),

	...create48844('..4', '.4', '.4', '..1', '.4'),
	...create48844('..4', '.4', '.4', '..1', '.4'),
	...create48844('..2', '.4', '.4', '..6', '.4'),
	...create48844('..5', '.5', '.5', '..2', '.5'),

	...create48844('.1', '1', '1', '..5', '1'),
	...create48844('.1', '1', '1', '..5', '1'),
	...create48844('..6', '.6', '.6', '..3', '.6'),
	...create48844('..6', '.6', '.6', '..3', '.6'),

	...create48844('..4', '.4', '.4', '..1', '.4'),
	...create48844('..4', '.4', '.4', '..1', '.4'),
	...create48844('..2', '.4', '.4', '..5', '.5'),
	...create48844('..1', '.5', '.5', '.5', '..5'),

	...sessionTrack2Climax,
	...sessionTrack2Climax,
]

const createLyrics888844 = (a, b, c, d, e, f) => [
	{ l: a, d: D.Eighth },
	{ l: b, d: D.Eighth },
	{ l: c, d: D.Eighth },
	{ l: d, d: D.Eighth },
	{ l: e, d: D.Quarter },
	{ l: f, d: D.Quarter },
]
const createLyrics888844w = (a, b, c, d, e, f, g, h) => [
	...createLyrics888844(a, b, c, d, e, f),
	{ l: g, d: D.Quarter },
	{ l: h, d: D['3/4'] },
]
const sessionTrack3Climax = [
	...createLyrics888844w(...'大王叫我来巡山~'.split('')),
	...createLyrics888844w(...'我把人间转一转，'.split('')),

	...createLyrics888844(...'打起我的鼓，'.split('')),
	...createLyrics888844(...'敲起我的锣，'.split('')),
	...createLyrics888844w(...'生活充满节凑感。'.split('')),

	...createLyrics888844w(...'大王叫我来巡山~'.split('')),
	...createLyrics888844(...'抓个和尚做晚'.split('')),
	{ l: '餐', d: D.Quarter },
	{ l: '，', d: D.Half },
	{ d: D.Eighth },
	{ l: '这', d: D.Eighth },
	{ l: '山', d: D.Eighth },
	{ l: '涧', d: D.Quarter },
	{ l: '的', d: D.Eighth },
	{ l: '水', d: D.Quarter },
	{ l: '，', d: D.Quarter },
	{ l: '无', d: D.Eighth },
	{ l: '比', d: D.Quarter },
	{ l: '的', d: D.Eighth },
	{ l: '甜', d: D.Eighth },
	{ l: '，', d: D['Quarter.5'] },
	...createLyrics888844w(...'不羡鸳鸯不羡仙。'.split('')),
]
const track3 = [
	{ d: D.Whole },
	{ d: D.Whole },
	{ d: D.Whole },
	{ d: D.Whole },
	...createLyrics888844w(...'太阳对我眨眼睛，'.split('')),
	...createLyrics888844w(...'鸟儿唱歌给我听，'.split('')),
	{ l: '我', d: D['Quarter.5'] },
	{ l: '是', d: D.Eighth },
	{ l: '一', d: D.Quarter },
	{ l: '个', d: D.Quarter },
	{ l: '努', d: D['Quarter.5'] },
	{ l: '力', d: D.Eighth },
	{ l: '干', d: D.Quarter },
	{ l: '活', d: D.Semiquaver },
	{ l: '，', d: D.Semiquaver },
	{ l: '还', d: D.Eighth },
	...createLyrics888844w(...'不粘人的小妖精。'.split('')),

	...createLyrics888844(...'别问我从哪里'.split('')),
	{ l: '来', d: D.Quarter },
	{ l: '，', d: D.Half },
	{ d: D.Eighth },
	{ l: '也', d: D.Eighth },

	{ l: '别', d: D.Eighth },
	{ l: '问', d: D.Quarter },
	{ l: '我', d: D.Eighth },
	{ l: '到', d: D.Quarter },
	{ l: '哪', d: D.Eighth },
	{ l: '里', d: D.Eighth },
	{ l: '去', d: D.Quarter },
	{ l: '，', d: D['3/4'] },

	{ l: '我', d: D['Quarter.5'] },
	{ l: '要', d: D.Eighth },
	{ l: '摘', d: D.Quarter },
	{ l: '下', d: D.Quarter },
	{ l: '最', d: D.Quarter },
	{ l: '美', d: D.Eighth },
	{ l: '的', d: D.Eighth },
	{ l: '花', d: D.Quarter },
	{ l: '，', d: D.Quarter },
	...createLyrics888844w(...'献给我的小公举。'.split('')),

	...sessionTrack3Climax,
	...sessionTrack3Climax,
]

// const playTrack = async (track, id) => {
// 	const sleep = (t) => new Promise((rs) => setTimeout(rs, t))
// 	const start = Date.now()
// 	let expectedElapse = 0
// 	for (let i = 0; i < track.length; i += 1) {
// 		const { n, d } = track[i]
// 		if (n) {
// 			this.socket.emit('hint', track[i], `track${id}`)
// 			setTimeout(() => this.socket.emit('note_on', n, `track${id}`), D['Whole*2'])
// 		}
// 		expectedElapse += d
// 		const totalElapse = Date.now() - start
// 		const sleepTime = expectedElapse - totalElapse
// 		console.log(`track${id}`, totalElapse, expectedElapse, sleepTime, track[i])
// 		// eslint-disable-next-line no-await-in-loop
// 		await sleep(sleepTime)
// 	}
// }

// const allNotes = {
// 	song: [track1, track2],
// }

const theKing = [track1, track2, track3]

module.exports = { theKing }

// Promise.all(allNotes.song.map(playTrack))
