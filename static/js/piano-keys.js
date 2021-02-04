pianoKeys = [
	{
		black: {
			note: 'C#2',
			midi: 37,
		},
		white: {
			note: 'C2',
			midi: 36,
		},
	},
	{
		black: {
			note: 'D#2',
			midi: 39,
		},
		white: {
			note: 'D2',
			midi: 38,
		},
	},
	{
		black: {
			note: null,
		},
		white: {
			note: 'E2',
			midi: 40,
		},
	},
	{
		black: {
			note: 'F#2',
			midi: 42,
		},
		white: {
			note: 'F2',
			midi: 41,
		},
	},
	{
		black: {
			note: 'G#2',
			midi: 44,
		},
		white: {
			note: 'G2',
			midi: 43,
		},
	},
	{
		black: {
			note: 'A#2',
			midi: 46,
		},
		white: {
			note: 'A2',
			midi: 45,
		},
	},
	{
		black: {
			note: null,
		},
		white: {
			note: 'B2',
			midi: 47,
		},
	},
	{
		black: {
			note: 'C#3',
			midi: 49,
		},
		white: {
			note: 'C3',
			midi: 48,
		},
	},
	{
		black: {
			note: 'D#3',
			midi: 51,
		},
		white: {
			note: 'D3',
			midi: 50,
		},
	},
	{
		black: {
			note: null,
		},
		white: {
			note: 'E3',
			midi: 52,
		},
	},
	{
		black: {
			note: 'F#3',
			midi: 54,
		},
		white: {
			note: 'F3',
			midi: 53,
		},
	},
	{
		black: {
			note: 'G#3',
			midi: 56,
		},
		white: {
			note: 'G3',
			midi: 55,
		},
	},
	{
		black: {
			note: 'A#3',
			midi: 58,
		},
		white: {
			note: 'A3',
			midi: 57,
		},
	},
	{
		black: {
			note: null,
		},
		white: {
			note: 'B3',
			midi: 59,
		},
	},
	{
		black: {
			note: 'C#4',
			midi: 61,
		},
		white: {
			note: 'C4',
			midi: 60,
		},
	},
	{
		black: {
			note: 'D#4',
			midi: 63,
		},
		white: {
			note: 'D4',
			midi: 62,
		},
	},
	{
		black: {
			note: null,
		},
		white: {
			note: 'E4',
			midi: 64,
		},
	},
	{
		black: {
			note: 'F#4',
			midi: 66,
		},
		white: {
			note: 'F4',
			midi: 65,
		},
	},
	{
		black: {
			note: 'G#4',
			midi: 68,
		},
		white: {
			note: 'G4',
			midi: 67,
		},
	},
	{
		black: {
			note: 'A#4',
			midi: 70,
		},
		white: {
			note: 'A4',
			midi: 69,
		},
	},
	{
		black: {
			note: null,
		},
		white: {
			note: 'B4',
			midi: 71,
		},
	},
	{
		black: {
			note: 'C#5',
			midi: 73,
		},
		white: {
			note: 'C5',
			midi: 72,
		},
	},
	{
		black: {
			note: 'D#5',
			midi: 75,
		},
		white: {
			note: 'D5',
			midi: 74,
		},
	},
	{
		black: {
			note: null,
		},
		white: {
			note: 'E5',
			midi: 76,
		},
	},
	{
		black: {
			note: 'F#5',
			midi: 78,
		},
		white: {
			note: 'F5',
			midi: 77,
		},
	},
	{
		black: {
			note: 'G#5',
			midi: 80,
		},
		white: {
			note: 'G5',
			midi: 79,
		},
	},
	{
		black: {
			note: 'A#5',
			midi: 82,
		},
		white: {
			note: 'A5',
			midi: 81,
		},
	},
	{
		black: {
			note: null,
		},
		white: {
			note: 'B5',
			midi: 83,
		},
	},
	{
		black: {
			note: 'C#6',
			midi: 85,
		},
		white: {
			note: 'C6',
			midi: 84,
		},
	},
	// {
	// 	black: { name: 'D#6' },
	// 	white: { name: 'D6' },
	// },
	// {
	// 	black: { name: null,  },
	// 	white: { name: 'E6' },
	// },
	// {
	// 	black: { name: 'F#6' },
	// 	white: { name: 'F6' },
	// },
	// {
	// 	black: { name: 'G#6' },
	// 	white: { name: 'G6' },
	// },
	// {
	// 	black: { name: 'A#6' },
	// 	white: { name: 'A6' },
	// },
	// {
	// 	black: { name: null,  },
	// 	white: { name: 'B6' },
	// }
]

midiToNote = {
	36: 'C2',
	37: 'C#2',
	38: 'D2',
	39: 'D#2',
	40: 'E2',
	41: 'F2',
	42: 'F#2',
	43: 'G2',
	44: 'G#2',
	45: 'A2',
	46: 'A#2',
	47: 'B2',
	48: 'C3',
	49: 'C#3',
	50: 'D3',
	51: 'D#3',
	52: 'E3',
	53: 'F3',
	54: 'F#3',
	55: 'G3',
	56: 'G#3',
	57: 'A3',
	58: 'A#3',
	59: 'B3',
	60: 'C4',
	61: 'C#4',
	62: 'D4',
	63: 'D#4',
	64: 'E4',
	65: 'F4',
	66: 'F#4',
	67: 'G4',
	68: 'G#4',
	69: 'A4',
	70: 'A#4',
	71: 'B4',
	72: 'C5',
	73: 'C#5',
	74: 'D5',
	75: 'D#5',
	76: 'E5',
	77: 'F5',
	78: 'F#5',
	79: 'G5',
	80: 'G#5',
	81: 'A5',
	82: 'A#5',
	83: 'B5',
	84: 'C6',
	85: 'C#6',
}

if (typeof module !== 'undefined') {
	module.exports = { midiToNote }
}
