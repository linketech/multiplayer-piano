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
	5: 67,
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
const section66361635 = [
	{ n: N['6'], d: D.Eighth },
	{ n: N['6'], d: D.Eighth },
	{ n: N['3'], d: D.Eighth },
	{ n: N['6'], d: D.Eighth },
	{ n: N['1*'], d: D.Eighth },
	{ n: N['6'], d: D.Eighth },
	{ n: N['3'], d: D.Eighth },
	{ n: N['5'], d: D.Eighth },
]
const section66451645 = [
	{ n: N['6'], d: D.Eighth },
	{ n: N['6'], d: D.Eighth },
	{ n: N['4'], d: D.Eighth },
	{ n: N['5'], d: D.Eighth },
	{ n: N['1*'], d: D.Eighth },
	{ n: N['6'], d: D.Eighth },
	{ n: N['4'], d: D.Eighth },
	{ n: N['5'], d: D.Eighth },
]
const section66361636 = [
	{ n: N['6'], d: D.Eighth },
	{ n: N['6'], d: D.Eighth },
	{ n: N['3'], d: D.Eighth },
	{ n: N['6'], d: D.Eighth },
	{ n: N['1*'], d: D.Eighth },
	{ n: N['6'], d: D.Eighth },
	{ n: N['3'], d: D.Eighth },
	{ n: N['6'], d: D.Eighth },
]
const section66462612 = [
	{ n: N['6'], d: D.Eighth },
	{ n: N['6'], d: D.Eighth },
	{ n: N['4'], d: D.Eighth },
	{ n: N['6'], d: D.Eighth },
	{ n: N['2*'], d: D.Eighth },
	{ n: N['6'], d: D.Eighth },
	{ n: N['1*'], d: D.Eighth },
	{ n: N['2*'], d: D.Eighth },
]
const session6716 = [
	{ n: N['6'], d: D['Quarter.5'] },
	{ n: N['7'], d: D.Eighth },
	{ n: N['1*'], d: D.Quarter },
	{ n: N['6'], d: D.Quarter },
]
const session367164233 = [
	{ n: N['3'], d: D.Half },
	...session6716,
	{ n: N['4*'], d: D['Quarter.5'] },
	{ n: N['2*'], d: D.Eighth },
	{ n: N['3*'], d: D['Whole*2'] },
]
const session3671643 = [
	{ n: N['3'], d: D.Half },
	...session6716,
	{ n: N['4*'], d: D['Quarter.5'] },
	{ n: N['3*'], d: D.Eighth },
]
const session367164322 = [
	...session3671643,
	{ n: N['2*'], d: D['Whole*2'] },
]
const session0321302172043254323 = [
	{ d: D.Quarter },
	{ n: N['3*'], d: D.Quarter },
	{ n: N['2*'], d: D['Quarter.5'] },
	{ n: N['1*'], d: D.Eighth },
	{ n: N['3*'], d: D.Whole },
	{ d: D.Quarter },
	{ n: N['2*'], d: D.Quarter },
	{ n: N['1*'], d: D['Quarter.5'] },
	{ n: N['7'], d: D.Eighth },
	{ n: N['2*'], d: D.Whole },
	{ d: D.Quarter },
	{ n: N['4*'], d: D.Quarter },
	{ n: N['3*'], d: D.Quarter },
	{ n: N['2*'], d: D.Quarter },
	{ n: N['5*'], d: D['3/4'] },
	{ n: N['4*'], d: D.Quarter },
	{ n: N['3*'], d: D['3/4'] },
	{ n: N['2*'], d: D.Quarter },
	{ n: N['3*'], d: D.Whole },
]
const session367164325 = [
	{ n: N['3*'], d: D.Half },
	...session6716,
	{ n: N['4*'], d: D.Quarter },
	{ n: N['3*'], d: D.Eighth },
	{ n: N['2*'], d: D.Eighth },
	{ n: N['5*'], d: D['Whole*2'] },
]
const session367164326 = [
	{ n: N['3*'], d: D.Half },
	...session6716,
	{ n: N['4*'], d: D.Quarter },
	{ n: N['3*'], d: D.Eighth },
	{ n: N['2*'], d: D.Eighth },
	{ n: N['6*'], d: D['Whole*2'] },
]
const preludeTrack1 = [
	...section66361635,
	...section66361635,
	...section66361635,
	...section66361635,
	...section66451645,
	...section66451645,
	...section66451645,
	{ n: N['6'], d: D.Eighth },
	{ n: N['6'], d: D.Eighth },
	{ n: N['4'], d: D.Eighth },
	{ n: N['5'], d: D.Eighth },
	{ n: N['1*'], d: D.Eighth },
	{ n: N['6'], d: D.Eighth },
	{ n: N['4'], d: D.Eighth },
	{ n: N['5'], d: D.Eighth },
	...section66361636,
	...section66361636,
	...section66361636,
	...section66462612,
	...section66462612,
	...section66462612,
	{ n: N['3*'], d: D.Whole },

	...session367164233,
	...session367164322,

	...session0321302172043254323,

	...session367164233,
	...session367164322,

	...session367164325,
	...session367164326,

	...session0321302172043254323,
	...session0321302172043254323,

	...session367164233,
	...session3671643,
	{ n: N['2*'], d: D.Quarter },
	{ n: N['2*'], d: D['3/4'] },
]

// track2
const session036163 = [
	{ d: D.Eighth },
	{ n: N['3'], d: D.Eighth },
	{ n: N['6'], d: D.Eighth },
	{ n: N['1*'], d: D.Eighth },
	{ n: N['6'], d: D.Quarter },
	{ n: N['3'], d: D.Quarter },
]

const lyricsDots = [
	{ d: D.Quarter },
	{ l: '·', d: D.Quarter },
	{ l: '·', d: D.Quarter },
	{ l: '·', d: D.Quarter },
]
const lyricsArArArAr = [
	{ d: D.Quarter },
	{ l: '啊', d: D.Quarter },
	{ l: '啊', d: D['Quarter.5'] },
	{ l: '啊', d: D.Eighth },
	{ l: '啊', d: D.Quarter },
	{ l: '，', d: D['3/4'] },
]
const lyricsArArArArArArArAr = [
	{ d: D.Quarter },
	{ l: '啊', d: D.Quarter },
	{ l: '啊', d: D.Quarter },
	{ l: '啊', d: D.Quarter },
	{ l: '啊', d: D['3/4'] },
	{ l: '啊', d: D.Quarter },
	{ l: '啊', d: D['3/4'] },
	{ l: '啊', d: D.Quarter },
	{ l: '啊', d: D.Quarter },
	{ l: '，', d: D['3/4'] },
]
const preludeLyrics = [
	{ d: D.Whole * 7 },
	...lyricsDots,
	...lyricsArArArAr,
	...lyricsArArArAr,
	...lyricsArArArArArArArAr,
	{ d: D.Whole * 15 },
	...lyricsDots,
	...lyricsArArArAr,
	...lyricsArArArAr,
	...lyricsArArArArArArArAr,
	...lyricsArArArAr,
	...lyricsArArArAr,
	...lyricsArArArArArArArAr,
]
const preludeTrack2 = [
	{ d: D.Half * 15 },
	...session036163,
	...session036163,
	...session036163,
	{ d: D.Eighth },
	{ n: N['3'], d: D.Eighth },
	{ n: N['6'], d: D.Eighth },
	{ n: N['1*'], d: D.Eighth },
	{ n: N['2*'], d: D.Quarter },
	{ n: N['6'], d: D.Quarter },
	{ d: D.Eighth },
	{ n: N['4'], d: D.Eighth },
	{ n: N['6'], d: D.Eighth },
	{ n: N['1*'], d: D.Eighth },

	{ n: N['2*'], d: D.Quarter },
	{ n: N['6'], d: D.Quarter },
	{ n: N['1*'], d: D.Quarter },
	{ n: N['2*'], d: D.Quarter },

	{ n: N['4*'], d: D.Quarter },
	{ n: N['1*'], d: D.Quarter },
	{ n: N['2*'], d: D.Quarter },
	{ n: N['4*'], d: D.Quarter },

	{ n: N['3*'], d: D.Whole },

	...preludeLyrics,
]

// track3
const createSession4444 = (a, b, c, d) => ([
	{ n: N[a], d: D.Quarter },
	{ n: N[b], d: D.Quarter },
	{ n: N[c], d: D.Quarter },
	{ n: N[d], d: D.Quarter },
])
const session6363 = createSession4444('..6', '..3', '..6', '..3')
const session4441 = [
	{ n: N['.4'], d: D['Quarter.5'] },
	{ n: N['.4'], d: D.Eighth },
	{ n: N['.4'], d: D.Quarter },
	{ n: N['.1'], d: D.Quarter },
]
const session1116 = [
	{ n: N['.1'], d: D['Quarter.5'] },
	{ n: N['.1'], d: D.Eighth },
	{ n: N['.1'], d: D.Quarter },
	{ n: N['..6'], d: D.Quarter },
]
const session61366141 = [
	{ n: N['..6'], d: D.Quarter },
	{ n: N['.1'], d: D.Quarter },
	{ n: N['.3'], d: D.Quarter },
	{ n: N['..6'], d: D.Quarter },
	{ n: N['..6'], d: D.Quarter },
	{ n: N['..4'], d: D.Quarter },
	{ n: N['..6'], d: D.Quarter },
	{ n: N['.1'], d: D.Quarter },
]
const session3$573 = [
	{ n: N['..3'], d: D.Quarter },
	{ n: N['..#5'], d: D.Quarter },
	{ n: N['..7'], d: D.Quarter },
	{ n: N['..3'], d: D.Quarter },
]
const session3573 = [
	{ n: N['.3'], d: D.Quarter },
	{ n: N['.5'], d: D.Quarter },
	{ n: N['.7'], d: D.Quarter },
	{ n: N['.3'], d: D.Quarter },
]
const session7252 = [
	{ n: N['..7'], d: D.Quarter },
	{ n: N['.2'], d: D.Quarter },
	{ n: N['.5'], d: D.Quarter },
	{ n: N['.2'], d: D.Quarter },
]
const session2462 = [
	{ n: N['.2'], d: D['Quarter.5'] },
	{ n: N['.4'], d: D.Eighth },
	{ n: N['.6'], d: D.Quarter },
	{ n: N['.2'], d: D.Quarter },
]
const session061636061641 = [
	{ d: D.Eighth },
	{ n: N['..6'], d: D.Eighth },
	{ n: N['.1'], d: D.Eighth },
	{ n: N['..6'], d: D.Eighth },
	{ n: N['.3'], d: D.Quarter },
	{ n: N['..6'], d: D.Quarter },
	{ d: D.Eighth },
	{ n: N['..6'], d: D.Eighth },
	{ n: N['.1'], d: D.Eighth },
	{ n: N['..6'], d: D.Eighth },
	{ n: N['.4'], d: D.Quarter },
	{ n: N['..1'], d: D.Quarter },
]
const session035373 = [
	{ d: D.Eighth },
	{ n: N['.3'], d: D.Eighth },
	{ n: N['.#5'], d: D.Eighth },
	{ n: N['.3'], d: D.Eighth },
	{ n: N['.7'], d: D.Quarter },
	{ n: N['.3'], d: D.Quarter },
]
const session072752 = [
	{ d: D.Eighth },
	{ n: N['..7'], d: D.Eighth },
	{ n: N['.2'], d: D.Eighth },
	{ n: N['..7'], d: D.Eighth },
	{ n: N['.5'], d: D.Quarter },
	{ n: N['.2'], d: D.Quarter },
]
const session6616361666163646 = [
	{ n: N['..6'], d: D.Eighth },
	{ n: N['..6'], d: D.Eighth },
	{ n: N['.1'], d: D.Eighth },
	{ n: N['..6'], d: D.Eighth },
	{ n: N['.3'], d: D.Eighth },
	{ n: N['..6'], d: D.Eighth },
	{ n: N['.1'], d: D.Eighth },
	{ n: N['..6'], d: D.Eighth },
	{ n: N['..6'], d: D.Eighth },
	{ n: N['..6'], d: D.Eighth },
	{ n: N['.1'], d: D.Eighth },
	{ n: N['..6'], d: D.Eighth },
	{ n: N['.4'], d: D.Eighth },
	{ n: N['..6'], d: D.Eighth },
	{ n: N['.1'], d: D.Eighth },
	{ n: N['..6'], d: D.Eighth },
]
const session77275727 = [
	{ n: N['..7'], d: D.Eighth },
	{ n: N['..7'], d: D.Eighth },
	{ n: N['.2'], d: D.Eighth },
	{ n: N['..7'], d: D.Eighth },
	{ n: N['.5'], d: D.Eighth },
	{ n: N['..7'], d: D.Eighth },
	{ n: N['.2'], d: D.Eighth },
	{ n: N['..7'], d: D.Eighth },
]
const session11316131 = [
	{ n: N['.#1'], d: D.Eighth },
	{ n: N['.#1'], d: D.Eighth },
	{ n: N['.3'], d: D.Eighth },
	{ n: N['.#1'], d: D.Eighth },
	{ n: N['..6'], d: D.Eighth },
	{ n: N['.#1'], d: D.Eighth },
	{ n: N['.3'], d: D.Eighth },
	{ n: N['.#1'], d: D.Eighth },
]
const sessionArArArAr = [
	{ n: N['.1'], d: D['Quarter.5'] },
	{ n: N['.5'], d: D.Eighth },
	{ n: N['.5'], d: D.Quarter },
	{ n: N['.1'], d: D.Quarter },
	{ n: N['.5'], d: D['Quarter.5'] },
	{ n: N['.3'], d: D.Eighth },
	{ n: N['.3'], d: D.Quarter },
	{ n: N['.7'], d: D.Quarter },

	...session2462,
	...session2462,
	...session7252,
	...session7252,
	...session3573,
	...session3573,
]
const sessionBangBangBangBang = [
	...session061636061641,
	...session035373,
	...session035373,
	...session061636061641,
	...session072752,
	...session072752,
]
const sessionBangBangBangBangShort = [
	...session061636061641,
	...session035373,
	...session035373,
	...session061636061641,
	...session072752,
]
const preludeTrack3 = [
	...session6363,
	...session6363,
	...session6363,
	...session6363,

	...session4441,
	...session4441,
	...session4441,
	...session4441,

	...session1116,
	...session1116,
	...session1116,

	...session4441,
	...session4441,
	...session4441,

	{ n: N['.3'], d: D.Whole },

	...session61366141,
	...session3$573,
	...session3$573,
	...session61366141,
	...session7252,
	...session7252,

	...sessionArArArAr,

	...sessionBangBangBangBang,

	...session6616361666163646,
	...session77275727,
	...session77275727,
	...session6616361666163646,
	...session11316131,
	...session11316131,

	...sessionArArArAr,
	...sessionArArArAr,
	...sessionBangBangBangBangShort,
]

// 敢问路在何方
const session176565563 = [
	{ n: N['1**'], d: D.Half },
	{ n: N['7*'], d: D['Quarter.5'] },
	{ n: N['6*'], d: D.Eighth },
	{ n: N['5*'], d: D.Eighth },
	{ n: N['6*'], d: D.Eighth },
	{ n: N['5*'], d: D.Half },
	{ n: N['5*'], d: D.Eighth },
	{ n: N['6*'], d: D.Eighth },
	// { n: N['5*'], d: D.Quarter },
	// { n: N['3*'], d: D['3/4'] },
	{ n: N['3*'], d: D.Whole },
]

const session6131232 = [
	{ n: N['6'], d: D['Quarter.5'] },
	{ n: N['1*'], d: D.Eighth },
	{ n: N['3*'], d: D['Quarter.5'] },
	{ n: N['1*'], d: D.Eighth },
	{ n: N['2*'], d: D.Eighth },
	{ n: N['3*'], d: D.Eighth },
	{ n: N['2*'], d: D['3/4'] },
]

// song track1
const songTrack1 = [
	{ n: N['3*'], d: D.Eighth },
	{ d: D.Eighth },
	{ n: N['3*'], d: D.Semiquaver },
	{ n: N['3*'], d: D.Semiquaver },
	{ n: N['3*'], d: D.Semiquaver },
	{ d: D.Semiquaver },
	{ d: D.Eighth },
	{ n: N['3*'], d: D.Eighth },
	{ n: N['3*'], d: D.Semiquaver },
	{ n: N['3*'], d: D.Semiquaver },
	{ n: N['3*'], d: D.Semiquaver },
	{ d: D.Semiquaver },

	{ n: N['6'], d: D.Quarter },
	{ n: N['1*'], d: D.Eighth },
	{ n: N['6'], d: D.Eighth },
	{ n: N['3*'], d: D.Eighth },
	{ n: N['1*'], d: D.Eighth },
	{ n: N['6'], d: D.Quarter },

	{ n: N['6'], d: D.Quarter },
	{ n: N['1*'], d: D.Eighth },
	{ n: N['6'], d: D.Eighth },
	{ n: N['3*'], d: D.Eighth },
	{ n: N['1*'], d: D.Eighth },
	{ n: N['6'], d: D.Quarter },

	{ n: N['6'], d: D.Eighth },
	{ n: N['1*'], d: D.Quarter },
	{ n: N['6'], d: D.Eighth },
	{ n: N['3*'], d: D['Quarter.5'] },
	{ n: N['2*'], d: D.Eighth },
	{ n: N['2*'], d: D.Eighth },
	{ n: N['1*'], d: D.Half + D['Quarter.5'] },
	// { n: N['1*'], d: D.Half },

	{ n: N['7'], d: D.Eighth },
	{ n: N['6'], d: D.Quarter },
	{ n: N['7'], d: D.Eighth },
	{ n: N['2*'], d: D['Quarter.5'] },
	{ n: N['3*'], d: D.Eighth },
	{ n: N['1*'], d: D.Eighth },
	{ n: N['6'], d: D.Half + D['Quarter.5'] },
	// { n: N['6'], d: D.Half },

	{ n: N['3*'], d: D.Half },
	{ n: N['6*'], d: D['Quarter.5'] },
	{ n: N['3*'], d: D.Eighth },
	{ n: N['6*'], d: D.Quarter },
	{ n: N['5*'], d: D.Eighth },
	{ n: N['4*'], d: D.Eighth },
	{ n: N['3*'], d: D.Half },

	{ n: N['1*'], d: D['Quarter.5'] },
	{ n: N['2*'], d: D.Eighth },
	{ n: N['3*'], d: D.Quarter },
	{ n: N['4*'], d: D.Eighth },
	{ n: N['3*'], d: D.Eighth },
	{ n: N['2*'], d: D.Whole },

	{ n: N['6'], d: D.Quarter },
	{ n: N['3*'], d: D.Quarter },
	{ n: N['2*'], d: D.Eighth },
	{ n: N['3*'], d: D.Eighth },
	{ n: N['6'], d: D.Quarter },
	{ n: N['1*'], d: D['3/4'] },
	{ n: N['3*'], d: D.Quarter },

	{ n: N['2*'], d: D.Eighth },
	{ n: N['7'], d: D.Quarter },
	{ n: N['3*'], d: D.Eighth },
	{ n: N['2*'], d: D.Eighth },
	{ n: N['6'], d: D.Eighth },
	{ n: N['1*'], d: D.Eighth },
	{ n: N['2*'], d: D.Eighth },
	{ n: N['3*'], d: D.Whole },

	{ n: N['3*'], d: D.Half },
	{ n: N['6*'], d: D['Quarter.5'] },
	{ n: N['3*'], d: D.Eighth },
	{ n: N['6*'], d: D.Quarter },
	{ n: N['5*'], d: D.Eighth },
	{ n: N['4*'], d: D.Eighth },
	{ n: N['3*'], d: D.Half },

	{ n: N['5*'], d: D.Eighth },
	{ n: N['2*'], d: D.Quarter },
	{ n: N['4*'], d: D.Eighth },
	{ n: N['3*'], d: D.Eighth },
	{ n: N['2*'], d: D.Eighth },
	{ n: N['1*'], d: D.Quarter },
	{ n: N['2*'], d: D['3/4'] },
	{ n: N['3*'], d: D.Quarter },

	{ n: N['2*'], d: D.Eighth },
	{ n: N['7'], d: D.Quarter },
	{ n: N['3*'], d: D.Eighth },
	{ n: N['7'], d: D.Eighth },
	{ n: N['6'], d: D.Eighth },
	{ n: N['5'], d: D.Quarter },
	{ n: N['6'], d: D['3/4'] },
	{ n: N['3*'], d: D.Quarter },

	{ n: N['5*'], d: D['3/4'] },
	{ n: N['3*'], d: D.Eighth },
	{ n: N['5*'], d: D.Eighth },
	{ n: N['6*'], d: D['Quarter.5'] },
	{ n: N['1**'], d: D.Eighth },
	{ n: N['7*'], d: D.Eighth },
	{ n: N['6*'], d: D.Eighth },
	{ n: N['5*'], d: D.Quarter },
	{ n: N['6*'], d: D.Whole },

	...session176565563,
	...session176565563,

	...session6131232,

	{ n: N['2*'], d: D.Eighth },
	{ n: N['7'], d: D.Quarter },
	{ n: N['2*'], d: D.Eighth },
	{ n: N['7'], d: D.Eighth },
	{ n: N['6'], d: D.Eighth },
	{ n: N['5'], d: D.Quarter },
	{ n: N['6'], d: D.Whole },

	...session6131232,

	{ n: N['3*'], d: D.Quarter },
	{ n: N['5*'], d: D.Half },
	{ n: N['3*'], d: D.Quarter },
	{ n: N['7*'], d: D['3/4'] },
	{ n: N['1**'], d: D.Quarter },
	{ n: N['7*'], d: D.Quarter },
	{ n: N['6*'], d: D.Quarter },
	{ n: N['5*'], d: D.Half },

	{ n: N['6*'], d: D['Whole*2'] },
]

// song track2
const createSession4d5844 = (a, b, c, d) => [
	{ n: N[a], d: D['Quarter.5'] },
	{ n: N[b], d: D.Eighth },
	{ n: N[c], d: D.Quarter },
	{ n: N[d], d: D.Quarter },
]
const session6313 = createSession4d5844('..6', '.3', '1', '.3')
const session5272 = createSession4d5844('..5', '.2', '.7', '.2')
const session4161 = createSession4d5844('.4', '1', '6', '1')
const session2646 = createSession4d5844('.2', '.6', '4', '.6')
const session3757 = createSession4d5844('.3', '.7', '5', '.7')
const session1535 = createSession4d5844('.1', '.5', '3', '.5')
const songTrack2 = [
	{ d: D.Whole },
	...session6313,
	...session6313,
	...session6313,
	...session6313,

	...session5272,
	...session6313,
	...session6313,
	...session6313,

	...session4161,
	...session5272,
	...session6313,
	...session6313,

	...session5272,
	...session3757,
	...session6313,
	...session6313,

	...session2646,
	...session2646,
	...session3757,
	...session6313,

	...session1535,
	...session6313,
	...session1535,
	...session4161,

	...session3757,
	...session6313,
	...session4161,
	...session3757,

	...session6313,
	...session6313,
	...session2646,
	...session3757,

	...session6313,
	...session6313,
	...session2646,
	...session1535,

	...session3757,
	...session3757,
	...session6313,
	{ n: N['..6'], d: D.Whole },
]
const songLyrics = [
	{ d: D.Whole },
	{ d: D.Whole },
	...lyricsDots,

	{ l: '你', d: D.Half },
	{ l: '加', d: D['Quarter.5'] },
	{ l: '着', d: D.Eighth },
	{ l: '班', d: D.Eighth },
	{ l: '，', d: D['Quarter.5'] + D.Half },

	{ l: '我', d: D.Half },
	{ l: '写', d: D['Quarter.5'] },
	{ l: '着', d: D.Eighth },
	{ l: '代', d: D.Eighth },
	{ l: '码', d: D['Quarter.5'] },
	{ l: '，', d: D.Half },

	{ l: '迎', d: D.Half },
	{ l: '来', d: D['Quarter.5'] + D.Eighth },
	{ l: '日', d: D.Half },
	{ l: '出', d: D.Quarter },
	{ l: '，', d: D.Quarter },

	{ l: '送', d: D['Quarter.5'] },
	{ l: '走', d: D.Eighth },
	{ l: '晚', d: D.Half },
	{ l: '霞', d: D.Quarter },
	{ l: '，', d: D['3/4'] },

	{ l: '他', d: D.Quarter },
	{ l: '的', d: D.Quarter },
	{ l: '秃', d: D.Half },
	{ l: '发', d: D.Whole },

	{ l: '成', d: D.Eighth },
	{ l: '就', d: D.Quarter },
	{ l: '了', d: D.Eighth },
	{ l: '强', d: D.Half },
	{ l: '大', d: D.Quarter },
	{ l: '，', d: D['3/4'] },

	{ l: '不', d: D.Half },
	{ l: '怕', d: D['Quarter.5'] + D.Eighth },
	{ l: '艰', d: D.Half },
	{ l: '险', d: D.Half },
	{ l: '又', d: D.Half },
	{ l: '出', d: D.Half },
	{ l: '发', d: D.Quarter },
	{ l: '，', d: D['3/4'] },

	{ l: '又', d: D.Half },
	{ l: '出', d: D.Half },
	{ l: '发', d: D.Quarter },
	{ l: '，', d: D.Half },
	{ l: '啦', d: D.Quarter },

	{ l: '啦', d: D['3/4'] },
	{ l: '啦', d: D.Eighth },
	{ l: '啦', d: D.Eighth },
	{ l: '啦', d: D['Quarter.5'] },
	{ l: '啦', d: D.Eighth },
	{ l: '啦', d: D.Eighth },
	{ l: '啦', d: D.Eighth },
	{ l: '啦', d: D.Quarter },
	{ l: '啦', d: D.Quarter },
	{ l: '！', d: D['3/4'] },

	{ l: '一', d: D.Half },
	{ l: '番', d: D['Quarter.5'] },
	{ l: '番', d: D.Eighth },
	{ l: '春', d: D.Quarter },
	{ l: '秋', d: D.Half },
	{ l: '冬', d: D.Quarter },
	{ l: '夏', d: D.Quarter },
	{ l: '，', d: D['3/4'] },

	{ l: '一', d: D.Half },
	{ l: '场', d: D['Quarter.5'] },
	{ l: '场', d: D.Eighth },
	{ l: '酸', d: D.Quarter },
	{ l: '甜', d: D.Half },
	{ l: '苦', d: D.Quarter },
	{ l: '辣', d: D.Quarter },
	{ l: '，', d: D['3/4'] },

	{ l: '敢', d: D['Quarter.5'] },
	{ l: '问', d: D.Eighth },
	{ l: '路', d: D['Quarter.5'] },
	{ l: '在', d: D.Eighth },
	{ l: '何', d: D.Quarter },
	{ l: '方', d: D.Quarter },
	{ l: '？', d: D.Half },

	{ l: '路', d: D['Quarter.5'] },
	{ l: '在', d: D.Eighth },
	{ l: '脚', d: D.Half },
	{ l: '下', d: D.Quarter },
	{ l: '。', d: D['3/4'] },

	{ l: '敢', d: D['Quarter.5'] },
	{ l: '问', d: D.Eighth },
	{ l: '路', d: D['Quarter.5'] },
	{ l: '在', d: D.Eighth },
	{ l: '何', d: D.Quarter },
	{ l: '方', d: D.Quarter },
	{ l: '？', d: D.Half },

	{ l: '路', d: D['3/4'] },
	{ l: '在', d: D.Quarter },
	{ l: '我', d: D['3/4'] },
	{ l: '们', d: D.Quarter },
	{ l: '的', d: D.Half },
	{ l: '脚', d: D.Half },
	{ l: '下', d: D.Quarter },
	{ l: '。', d: D['Whole*2'] - D.Quarter },
]

const toGreeting = (words) => words.split('').map((l) => ({ l, d: D.Quarter }))
const greeting = [
	...lyricsDots,
	...toGreeting('2021年，立足新起点，踏上新征程，开创新辉煌'),
	{ l: '，', d: D.Half },
	...toGreeting('祝大家在牛年里，牛转乾坤、牛转新机、牛转新运'),
	{ l: '~', d: D.Half },
	...toGreeting('谢谢大家'),
]

const allNotes = {
	prelude: [preludeTrack1, preludeTrack2, preludeTrack3],
	song: [songTrack1, songTrack2, songLyrics],
	allInOne: [
		[...preludeTrack1, ...songTrack1],
		[...preludeTrack2, { d: D.Whole * 7 }, ...songLyrics, ...greeting],
		[...preludeTrack3, ...songTrack2],
	],
	arararar: [session0321302172043254323, sessionArArArAr],
	arararar2: [
		[...session0321302172043254323, ...session0321302172043254323],
		[...sessionArArArAr, ...sessionArArArAr],
	],
}

const songToNotes = {
	云宫迅音: 'prelude',
	敢问路在何方: 'song',
	完整曲目: 'allInOne',
	吟唱1: 'arararar',
	吟唱2: 'arararar2',
}

module.exports = { allNotes, songToNotes }

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

// (async () => {
// 	// await Promise.all(allInOne.prelude.map(playTrack))
// 	// await Promise.all(allInOne.song.map(playTrack))
// 	// await Promise.all(allInOne.allInOne.map(playTrack))
// 	await Promise.all(allNotes.arararar2.map(playTrack))
// })()
