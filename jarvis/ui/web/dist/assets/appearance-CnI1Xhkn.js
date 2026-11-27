import { Ia as numberType, La as objectType, Ma as arrayType, Na as booleanType, Pa as enumType, Ra as recordType, za as stringType } from "./index-BOzhgzD7.js";
var accessories_default = {
	schema: 2,
	slots: [
		"back",
		"outfit",
		"neck",
		"mouth",
		"face",
		"head",
		"held"
	],
	slotDepth: {
		"back": -1,
		"outfit": 1,
		"neck": 1,
		"mouth": 1,
		"face": 1,
		"head": 0,
		"held": .4
	},
	slotFlatShift: {
		"outfit": 1,
		"neck": 1
	},
	frontDepthM: .25,
	shapes: {
		"circle": {
			"top": 3.8,
			"bottom": 36.2,
			"eyeY": 17.2,
			"anchors": {
				"head": [
					20,
					5.2,
					1
				],
				"neck": [
					20,
					22.4,
					1
				],
				"held": [
					33.5,
					29,
					1.35
				],
				"back": [
					20,
					20,
					1
				],
				"outfit": [
					20,
					22.4,
					1
				],
				"face": [
					20,
					17.2,
					1
				],
				"mouth": [
					20,
					24,
					1.15
				]
			},
			"depth": {
				"back": -.499,
				"face": .491,
				"head": 0,
				"held": .166,
				"mouth": .484,
				"neck": .494,
				"outfit": .494
			}
		},
		"squircle": {
			"top": 3.8,
			"bottom": 36.2,
			"eyeY": 17.2,
			"anchors": {
				"head": [
					20,
					4.4,
					1
				],
				"neck": [
					20,
					22.4,
					1
				],
				"held": [
					34,
					29,
					1.35
				],
				"back": [
					20,
					20,
					1
				],
				"outfit": [
					20,
					22.4,
					1
				],
				"face": [
					20,
					17.2,
					1
				],
				"mouth": [
					20,
					24,
					1.15
				]
			},
			"depth": {
				"back": -.46,
				"face": .46,
				"head": 0,
				"held": .182,
				"mouth": .46,
				"neck": .46,
				"outfit": .46
			}
		},
		"pill": {
			"top": 8.48,
			"bottom": 31.52,
			"eyeY": 17.2,
			"anchors": {
				"head": [
					20,
					9.6,
					.95
				],
				"neck": [
					20,
					22.2,
					.85
				],
				"held": [
					35.5,
					26,
					1.282
				],
				"back": [
					20,
					20,
					.95
				],
				"outfit": [
					20,
					22.2,
					.85
				],
				"face": [
					20,
					17.2,
					1
				],
				"mouth": [
					20,
					24,
					1.15
				]
			},
			"depth": {
				"back": -.499,
				"face": .485,
				"head": 0,
				"held": .171,
				"mouth": .469,
				"neck": .49,
				"outfit": .49
			}
		},
		"triangle": {
			"top": 5.5,
			"bottom": 33.5,
			"eyeY": 23,
			"anchors": {
				"head": [
					20,
					8.6,
					.72
				],
				"neck": [
					20,
					28,
					.8
				],
				"held": [
					32.5,
					31,
					1.215
				],
				"back": [
					20,
					22,
					.9
				],
				"outfit": [
					20,
					28,
					.8
				],
				"face": [
					20,
					23,
					.9
				],
				"mouth": [
					20,
					29.12,
					1.035
				]
			},
			"depth": {
				"back": -.337,
				"face": .357,
				"head": 0,
				"held": .208,
				"mouth": .482,
				"neck": .459,
				"outfit": .459
			}
		},
		"hexagon": {
			"top": 3.5,
			"bottom": 36.5,
			"eyeY": 17.2,
			"anchors": {
				"head": [
					20,
					5.8,
					.9
				],
				"neck": [
					20,
					22.4,
					.95
				],
				"held": [
					33,
					29,
					1.282
				],
				"back": [
					20,
					20,
					.95
				],
				"outfit": [
					20,
					22.4,
					.95
				],
				"face": [
					20,
					17.2,
					1
				],
				"mouth": [
					20,
					24,
					1.15
				]
			},
			"depth": {
				"back": -.381,
				"face": .381,
				"head": 0,
				"held": .138,
				"mouth": .381,
				"neck": .381,
				"outfit": .381
			}
		},
		"cloud": {
			"top": 5.028,
			"bottom": 32,
			"eyeY": 23,
			"anchors": {
				"head": [
					19.2,
					6.6,
					.95
				],
				"neck": [
					20,
					27.6,
					.7
				],
				"held": [
					37,
					27.5,
					1.215
				],
				"back": [
					21,
					20,
					1
				],
				"outfit": [
					20,
					27.6,
					.7
				],
				"face": [
					20,
					23,
					.9
				],
				"mouth": [
					20,
					29.12,
					1.035
				]
			},
			"depth": {
				"back": -.298,
				"face": .359,
				"head": 0,
				"held": .143,
				"mouth": .314,
				"neck": .356,
				"outfit": .356
			}
		},
		"drop": {
			"top": 3,
			"bottom": 40.5,
			"eyeY": 25,
			"anchors": {
				"head": [
					20,
					9.6,
					.72
				],
				"neck": [
					20,
					30,
					.95
				],
				"held": [
					32.5,
					34,
					1.282
				],
				"back": [
					20,
					25,
					.95
				],
				"outfit": [
					20,
					30,
					.95
				],
				"face": [
					20,
					25,
					1
				],
				"mouth": [
					20,
					31.8,
					1.15
				]
			},
			"depth": {
				"back": -.365,
				"face": .365,
				"head": 0,
				"held": .128,
				"mouth": .348,
				"neck": .364,
				"outfit": .364
			}
		}
	},
	items: [
		{
			"id": "suit",
			"slot": "outfit",
			"scale": 1,
			"bounds": [
				-8.42,
				-.4,
				8.42,
				10.62
			],
			"regions": true,
			"parts": [
				{
					"t": "region",
					"pts": [
						[-20, 7],
						[-15, 3.2],
						[-10, 1],
						[-5, -.2],
						[5, -.2],
						[10, 1],
						[15, 3.2],
						[20, 7],
						[60, 60],
						[-60, 60]
					],
					"mode": "wrap",
					"fill": "#2c3a55"
				},
				{
					"t": "region",
					"pts": [
						[8, 1.2],
						[60, 1.2],
						[60, 60],
						[11.5, 60]
					],
					"mode": "front",
					"fill": "#05070d",
					"opacity": .16,
					"only": "2d"
				},
				{
					"t": "region",
					"pts": [
						[-60, 0],
						[-9.5, .8],
						[-12.5, 60],
						[-60, 60]
					],
					"mode": "front",
					"fill": "#ffffff",
					"opacity": .05,
					"only": "2d"
				},
				{
					"t": "region",
					"pts": [
						[-4.6, -.4],
						[4.6, -.4],
						[0, 8.8]
					],
					"mode": "front",
					"fill": "#f4f6f8"
				},
				{
					"t": "region",
					"pts": [
						[-4.4, -.4],
						[-.9, .2],
						[-2.6, 2.8]
					],
					"mode": "front",
					"fill": "#dfe4ea"
				},
				{
					"t": "region",
					"pts": [
						[4.4, -.4],
						[2.6, 2.8],
						[.9, .2]
					],
					"mode": "front",
					"fill": "#dfe4ea"
				},
				{
					"t": "region",
					"pts": [
						[-4.6, -.4],
						[4.6, -.4],
						[3.6, 1.3],
						[-3.6, 1.3]
					],
					"mode": "front",
					"fill": "#05070d",
					"opacity": .2,
					"only": "2d"
				},
				{
					"t": "region",
					"pts": [
						[-1, 2],
						[1, 2],
						[2.1, 8.2],
						[0, 10.4],
						[-2.1, 8.2]
					],
					"mode": "front",
					"fill": "#b3243b"
				},
				{
					"t": "region",
					"pts": [
						[-1.1, 3.9],
						[1.2, 3.1],
						[1.32, 3.75],
						[-1.2, 4.55]
					],
					"mode": "front",
					"fill": "#86182b"
				},
				{
					"t": "region",
					"pts": [
						[-1.6, 6.7],
						[1.75, 5.6],
						[1.85, 6.3],
						[-1.65, 7.4]
					],
					"mode": "front",
					"fill": "#86182b"
				},
				{
					"t": "poly",
					"pts": [
						[-1.55, -.4],
						[1.55, -.4],
						[1, 2.1],
						[-1, 2.1]
					],
					"z": .9,
					"d": .9,
					"smooth": false,
					"fill": "#b3243b"
				},
				{
					"t": "region",
					"pts": [
						[-4.6, -.4],
						[0, 8.8],
						[-1.3, 10.4],
						[-6.9, 3.4],
						[-8.2, .2]
					],
					"mode": "front",
					"fill": "#212b42"
				},
				{
					"t": "region",
					"pts": [
						[8.2, .2],
						[6.9, 3.4],
						[1.3, 10.4],
						[0, 8.8],
						[4.6, -.4]
					],
					"mode": "front",
					"fill": "#212b42"
				},
				{
					"t": "tube",
					"pts": [
						[
							-8.2,
							.2,
							.3
						],
						[
							-6.9,
							3.4,
							.3
						],
						[
							-1.3,
							10.4,
							.3
						]
					],
					"w": .45,
					"smooth": false,
					"fill": "#ffffff",
					"opacity": .16,
					"only": "2d"
				},
				{
					"t": "tube",
					"pts": [
						[
							8.2,
							.2,
							.3
						],
						[
							6.9,
							3.4,
							.3
						],
						[
							1.3,
							10.4,
							.3
						]
					],
					"w": .45,
					"smooth": false,
					"fill": "#ffffff",
					"opacity": .1,
					"only": "2d"
				},
				{
					"t": "region",
					"pts": [
						[.739, 12.006],
						[.306, 12.439],
						[-.306, 12.439],
						[-.739, 12.006],
						[-.739, 11.394],
						[-.306, 10.961],
						[.306, 10.961],
						[.739, 11.394]
					],
					"mode": "front",
					"fill": "#18202f"
				},
				{
					"t": "region",
					"pts": [
						[.739, 14.706],
						[.306, 15.139],
						[-.306, 15.139],
						[-.739, 14.706],
						[-.739, 14.094],
						[-.306, 13.661],
						[.306, 13.661],
						[.739, 14.094]
					],
					"mode": "front",
					"fill": "#18202f"
				},
				{
					"t": "region",
					"pts": [
						[5, 4],
						[8.8, 4],
						[8.8, 4.5],
						[5, 4.5]
					],
					"mode": "front",
					"fill": "#18202f"
				},
				{
					"t": "region",
					"pts": [
						[5.4, 4],
						[6.9, 4],
						[6, 2.3]
					],
					"mode": "front",
					"fill": "#f4f6f8"
				},
				{
					"t": "region",
					"pts": [
						[6.4, 4],
						[8.2, 4],
						[7.6, 2.5]
					],
					"mode": "front",
					"fill": "#f4f6f8"
				}
			]
		},
		{
			"id": "tuxedo",
			"slot": "outfit",
			"scale": 1,
			"bounds": [
				-8.42,
				-1.5,
				8.42,
				11.62
			],
			"regions": true,
			"parts": [
				{
					"t": "region",
					"pts": [
						[-20, 7],
						[-15, 3.2],
						[-10, 1],
						[-5, -.2],
						[5, -.2],
						[10, 1],
						[15, 3.2],
						[20, 7],
						[60, 60],
						[-60, 60]
					],
					"mode": "wrap",
					"fill": "#22232b"
				},
				{
					"t": "region",
					"pts": [
						[8, 1.2],
						[60, 1.2],
						[60, 60],
						[11.5, 60]
					],
					"mode": "front",
					"fill": "#05070d",
					"opacity": .22,
					"only": "2d"
				},
				{
					"t": "region",
					"pts": [
						[-60, 0],
						[-9.5, .8],
						[-12.5, 60],
						[-60, 60]
					],
					"mode": "front",
					"fill": "#ffffff",
					"opacity": .06,
					"only": "2d"
				},
				{
					"t": "region",
					"pts": [
						[-4.4, -.4],
						[4.4, -.4],
						[0, 9.8]
					],
					"mode": "front",
					"fill": "#f4f6f8"
				},
				{
					"t": "region",
					"pts": [
						[-4.4, -.4],
						[4.4, -.4],
						[3.4, 1.3],
						[-3.4, 1.3]
					],
					"mode": "front",
					"fill": "#05070d",
					"opacity": .2,
					"only": "2d"
				},
				{
					"t": "region",
					"pts": [
						[-1.85, 3],
						[-1.5, 3],
						[-1.5, 7.6],
						[-1.85, 7.6]
					],
					"mode": "front",
					"fill": "#dfe4ea"
				},
				{
					"t": "region",
					"pts": [
						[1.5, 3],
						[1.85, 3],
						[1.85, 7.6],
						[1.5, 7.6]
					],
					"mode": "front",
					"fill": "#dfe4ea"
				},
				{
					"t": "region",
					"pts": [
						[.462, 3.791],
						[.191, 4.062],
						[-.191, 4.062],
						[-.462, 3.791],
						[-.462, 3.409],
						[-.191, 3.138],
						[.191, 3.138],
						[.462, 3.409]
					],
					"mode": "front",
					"fill": "#101014"
				},
				{
					"t": "region",
					"pts": [
						[.462, 5.991],
						[.191, 6.262],
						[-.191, 6.262],
						[-.462, 5.991],
						[-.462, 5.609],
						[-.191, 5.338],
						[.191, 5.338],
						[.462, 5.609]
					],
					"mode": "front",
					"fill": "#101014"
				},
				{
					"t": "region",
					"pts": [
						[.416, 8.172],
						[.172, 8.416],
						[-.172, 8.416],
						[-.416, 8.172],
						[-.416, 7.828],
						[-.172, 7.584],
						[.172, 7.584],
						[.416, 7.828]
					],
					"mode": "front",
					"fill": "#101014"
				},
				{
					"t": "region",
					"pts": [
						[-4.6, -.4],
						[0, 9.8],
						[-1.3, 11.4],
						[-6.9, 3.4],
						[-8.2, .2]
					],
					"mode": "front",
					"fill": "#3a3c48",
					"gloss": true
				},
				{
					"t": "region",
					"pts": [
						[8.2, .2],
						[6.9, 3.4],
						[1.3, 11.4],
						[0, 9.8],
						[4.6, -.4]
					],
					"mode": "front",
					"fill": "#3a3c48",
					"gloss": true
				},
				{
					"t": "tube",
					"pts": [
						[
							-8.2,
							.2,
							.3
						],
						[
							-6.9,
							3.4,
							.3
						],
						[
							-1.3,
							11.4,
							.3
						]
					],
					"w": .45,
					"smooth": false,
					"fill": "#ffffff",
					"opacity": .16,
					"only": "2d"
				},
				{
					"t": "tube",
					"pts": [
						[
							8.2,
							.2,
							.3
						],
						[
							6.9,
							3.4,
							.3
						],
						[
							1.3,
							11.4,
							.3
						]
					],
					"w": .45,
					"smooth": false,
					"fill": "#ffffff",
					"opacity": .1,
					"only": "2d"
				},
				{
					"t": "poly",
					"pts": [
						[0, -.1],
						[3.6, -1.5],
						[4.1, .9],
						[3.6, 2.7],
						[0, 1.3],
						[-3.6, 2.7],
						[-4.1, .9],
						[-3.6, -1.5]
					],
					"z": .9,
					"d": 1,
					"smooth": false,
					"fill": "#22232b"
				},
				{
					"t": "sphere",
					"c": [
						0,
						.6,
						1.4
					],
					"r": [
						1.1,
						1.3,
						.7
					],
					"fill": "#26272f"
				},
				{
					"t": "region",
					"pts": [
						[5, 4],
						[8.8, 4],
						[8.8, 4.5],
						[5, 4.5]
					],
					"mode": "front",
					"fill": "#0d0d10"
				},
				{
					"t": "region",
					"pts": [
						[5.4, 4],
						[6.9, 4],
						[6, 2.3]
					],
					"mode": "front",
					"fill": "#f4f6f8"
				},
				{
					"t": "region",
					"pts": [
						[6.4, 4],
						[8.2, 4],
						[7.6, 2.5]
					],
					"mode": "front",
					"fill": "#f4f6f8"
				}
			]
		},
		{
			"id": "lab_coat",
			"slot": "outfit",
			"scale": 1,
			"bounds": [
				-9.03,
				-.4,
				9.03,
				9.42
			],
			"regions": true,
			"parts": [
				{
					"t": "region",
					"pts": [
						[-20, 7],
						[-15, 3.2],
						[-10, 1],
						[-5, -.2],
						[5, -.2],
						[10, 1],
						[15, 3.2],
						[20, 7],
						[60, 60],
						[-60, 60]
					],
					"mode": "wrap",
					"fill": "#f2f4f7"
				},
				{
					"t": "region",
					"pts": [
						[8, 1.2],
						[60, 1.2],
						[60, 60],
						[11.5, 60]
					],
					"mode": "front",
					"fill": "#05070d",
					"opacity": .08,
					"only": "2d"
				},
				{
					"t": "region",
					"pts": [
						[-4, -.4],
						[4, -.4],
						[0, 7.6]
					],
					"mode": "front",
					"fill": "#a9c8ef"
				},
				{
					"t": "region",
					"pts": [
						[-4, -.4],
						[4, -.4],
						[3, 1.3],
						[-3, 1.3]
					],
					"mode": "front",
					"fill": "#05070d",
					"opacity": .2,
					"only": "2d"
				},
				{
					"t": "region",
					"pts": [
						[-.9, 1.8],
						[.9, 1.8],
						[1.8, 6.6],
						[0, 8.4],
						[-1.8, 6.6]
					],
					"mode": "front",
					"fill": "#0f766e"
				},
				{
					"t": "poly",
					"pts": [
						[-1.4, -.4],
						[1.4, -.4],
						[.9, 1.9],
						[-.9, 1.9]
					],
					"z": .9,
					"d": .8,
					"smooth": false,
					"fill": "#0f766e"
				},
				{
					"t": "region",
					"pts": [
						[-4.6, -.4],
						[0, 7.6],
						[-1.3, 9.2],
						[-7.5, 3.4],
						[-8.8, .2]
					],
					"mode": "front",
					"fill": "#dde2e9"
				},
				{
					"t": "region",
					"pts": [
						[8.8, .2],
						[7.5, 3.4],
						[1.3, 9.2],
						[0, 7.6],
						[4.6, -.4]
					],
					"mode": "front",
					"fill": "#dde2e9"
				},
				{
					"t": "tube",
					"pts": [
						[
							-8.8,
							.2,
							.3
						],
						[
							-7.5,
							3.4,
							.3
						],
						[
							-1.3,
							9.2,
							.3
						]
					],
					"w": .45,
					"smooth": false,
					"fill": "#ffffff",
					"opacity": .16,
					"only": "2d"
				},
				{
					"t": "tube",
					"pts": [
						[
							8.8,
							.2,
							.3
						],
						[
							7.5,
							3.4,
							.3
						],
						[
							1.3,
							9.2,
							.3
						]
					],
					"w": .45,
					"smooth": false,
					"fill": "#ffffff",
					"opacity": .1,
					"only": "2d"
				},
				{
					"t": "region",
					"pts": [
						[-.2, 9.2],
						[.25, 9.2],
						[.25, 40],
						[-.2, 40]
					],
					"mode": "front",
					"fill": "#dde2e9"
				},
				{
					"t": "region",
					"pts": [
						[5.6, 1.8],
						[6.3, 1.8],
						[6.3, 4.6],
						[5.6, 4.6]
					],
					"mode": "front",
					"fill": "#2f6fe0"
				},
				{
					"t": "region",
					"pts": [
						[6.9, 2.3],
						[7.6, 2.3],
						[7.6, 4.6],
						[6.9, 4.6]
					],
					"mode": "front",
					"fill": "#e0483e"
				},
				{
					"t": "region",
					"pts": [
						[4.6, 3.8],
						[8.8, 3.8],
						[8.8, 7.6],
						[4.6, 7.6]
					],
					"mode": "front",
					"fill": "#dde2e9"
				},
				{
					"t": "region",
					"pts": [
						[-8.8, 4.4],
						[-5, 4.4],
						[-5, 8.8],
						[-8.8, 8.8]
					],
					"mode": "front",
					"fill": "#ffffff"
				},
				{
					"t": "region",
					"pts": [
						[-8.8, 4.4],
						[-5, 4.4],
						[-5, 5.5],
						[-8.8, 5.5]
					],
					"mode": "front",
					"fill": "#0f766e"
				},
				{
					"t": "region",
					"pts": [
						[-8.2, 6.4],
						[-5.6, 6.4],
						[-5.6, 6.8],
						[-8.2, 6.8]
					],
					"mode": "front",
					"fill": "#c5ccd6"
				},
				{
					"t": "region",
					"pts": [
						[-8.2, 7.4],
						[-6.4, 7.4],
						[-6.4, 7.8],
						[-8.2, 7.8]
					],
					"mode": "front",
					"fill": "#c5ccd6"
				}
			]
		},
		{
			"id": "hoodie",
			"slot": "outfit",
			"scale": 1,
			"bounds": [
				-2.55,
				1.85,
				8.47,
				7.7
			],
			"regions": true,
			"parts": [
				{
					"t": "rim",
					"w": 1.9,
					"fill": "#4a5160",
					"maxY": 4
				},
				{
					"t": "rim",
					"w": .75,
					"fill": "#3a404c",
					"maxY": 4,
					"only": "2d"
				},
				{
					"t": "region",
					"pts": [
						[-20, 7.8],
						[-15, 4],
						[-10, 1.8],
						[-5, .6],
						[5, .6],
						[10, 1.8],
						[15, 4],
						[20, 7.8],
						[60, 60.8],
						[-60, 60.8]
					],
					"mode": "wrap",
					"fill": "#4a5160"
				},
				{
					"t": "region",
					"pts": [
						[8, 2],
						[60, 2],
						[60, 60.8],
						[11.5, 60.8]
					],
					"mode": "front",
					"fill": "#05070d",
					"opacity": .18,
					"only": "2d"
				},
				{
					"t": "region",
					"pts": [
						[-5.2, .8],
						[5.2, .8],
						[4, 2.7],
						[0, 3.3],
						[-4, 2.7]
					],
					"mode": "front",
					"fill": "#3a404c"
				},
				{
					"t": "region",
					"pts": [
						[-6.4, 7.6],
						[6.4, 7.6],
						[7.8, 13],
						[-7.8, 13]
					],
					"mode": "front",
					"fill": "#3a404c"
				},
				{
					"t": "tube",
					"pts": [[
						2.2,
						2.2,
						.7
					], [
						1.9,
						6.6,
						.7
					]],
					"w": .7,
					"smooth": false,
					"fill": "#e5e7eb"
				},
				{
					"t": "sphere",
					"c": [
						1.9,
						7,
						.8
					],
					"r": [
						.45,
						.7,
						.45
					],
					"fill": "#9ca3af"
				},
				{
					"t": "tube",
					"pts": [[
						-2.2,
						2.2,
						.7
					], [
						-1.9,
						6.6,
						.7
					]],
					"w": .7,
					"smooth": false,
					"fill": "#e5e7eb"
				},
				{
					"t": "sphere",
					"c": [
						-1.9,
						7,
						.8
					],
					"r": [
						.45,
						.7,
						.45
					],
					"fill": "#9ca3af"
				},
				{
					"t": "tube",
					"pts": [
						[
							5.2,
							2.6,
							.5
						],
						[
							4.2,
							3.5,
							.5
						],
						[
							5.2,
							4.4,
							.5
						]
					],
					"w": .55,
					"smooth": false,
					"fill": "#34d399"
				},
				{
					"t": "tube",
					"pts": [[
						6.6,
						2.4,
						.5
					], [
						5.8,
						4.6,
						.5
					]],
					"w": .55,
					"smooth": false,
					"fill": "#34d399"
				},
				{
					"t": "tube",
					"pts": [
						[
							7.2,
							2.6,
							.5
						],
						[
							8.2,
							3.5,
							.5
						],
						[
							7.2,
							4.4,
							.5
						]
					],
					"w": .55,
					"smooth": false,
					"fill": "#34d399"
				}
			]
		},
		{
			"id": "crown",
			"slot": "head",
			"scale": 1.15,
			"bounds": [
				-10.3,
				-12.23,
				10.3,
				2.6
			],
			"regions": false,
			"parts": [
				{
					"t": "sphere",
					"c": [
						0,
						.9,
						0
					],
					"r": [
						8.8,
						1.7,
						.1
					],
					"fill": "#05070d",
					"opacity": .22,
					"only": "2d"
				},
				{
					"t": "dome",
					"c": [
						0,
						-1.6,
						0
					],
					"r": [
						7.2,
						6,
						7.2
					],
					"fill": "#a61e36"
				},
				{
					"t": "cyl",
					"c": [
						0,
						-1.8,
						0
					],
					"r": [8, 8.5],
					"h": 4.4,
					"dz": 1,
					"fill": "#f2c14e",
					"metal": true
				},
				{
					"t": "cyl",
					"c": [
						0,
						.25,
						0
					],
					"r": [8.15, 8.15],
					"h": .9,
					"dz": 1,
					"fill": "#c8922a",
					"metal": true
				},
				{
					"t": "cyl",
					"c": [
						0,
						-3.75,
						0
					],
					"r": [8.55, 8.55],
					"h": .7,
					"dz": 1,
					"fill": "#c8922a",
					"metal": true
				},
				{
					"t": "cyl",
					"c": [
						4.82,
						-6.5,
						6.634
					],
					"r": [2.5, 0],
					"h": 5.6,
					"dz": 1,
					"fill": "#f2c14e",
					"metal": true
				},
				{
					"t": "sphere",
					"c": [
						4.82,
						-9.7,
						6.634
					],
					"r": [
						1.05,
						1.05,
						1.05
					],
					"fill": "#ffe08a",
					"metal": true
				},
				{
					"t": "cyl",
					"c": [
						7.799,
						-6.5,
						-2.534
					],
					"r": [2.5, 0],
					"h": 5.6,
					"dz": 1,
					"fill": "#f2c14e",
					"metal": true
				},
				{
					"t": "sphere",
					"c": [
						7.799,
						-9.7,
						-2.534
					],
					"r": [
						1.05,
						1.05,
						1.05
					],
					"fill": "#ffe08a",
					"metal": true
				},
				{
					"t": "cyl",
					"c": [
						0,
						-6.5,
						-8.2
					],
					"r": [2.5, 0],
					"h": 5.6,
					"dz": 1,
					"fill": "#f2c14e",
					"metal": true
				},
				{
					"t": "sphere",
					"c": [
						0,
						-9.7,
						-8.2
					],
					"r": [
						1.05,
						1.05,
						1.05
					],
					"fill": "#ffe08a",
					"metal": true
				},
				{
					"t": "cyl",
					"c": [
						-7.799,
						-6.5,
						-2.534
					],
					"r": [2.5, 0],
					"h": 5.6,
					"dz": 1,
					"fill": "#f2c14e",
					"metal": true
				},
				{
					"t": "sphere",
					"c": [
						-7.799,
						-9.7,
						-2.534
					],
					"r": [
						1.05,
						1.05,
						1.05
					],
					"fill": "#ffe08a",
					"metal": true
				},
				{
					"t": "cyl",
					"c": [
						-4.82,
						-6.5,
						6.634
					],
					"r": [2.5, 0],
					"h": 5.6,
					"dz": 1,
					"fill": "#f2c14e",
					"metal": true
				},
				{
					"t": "sphere",
					"c": [
						-4.82,
						-9.7,
						6.634
					],
					"r": [
						1.05,
						1.05,
						1.05
					],
					"fill": "#ffe08a",
					"metal": true
				},
				{
					"t": "sphere",
					"c": [
						0,
						-1.9,
						8.6
					],
					"r": [
						1.7,
						1.7,
						.8
					],
					"fill": "#d7263d",
					"gloss": true
				},
				{
					"t": "sphere",
					"c": [
						-6.317,
						-1.9,
						5.688
					],
					"r": [
						1.1,
						1.1,
						.6
					],
					"fill": "#2f6fe0"
				},
				{
					"t": "sphere",
					"c": [
						6.317,
						-1.9,
						5.688
					],
					"r": [
						1.1,
						1.1,
						.6
					],
					"fill": "#2f6fe0"
				},
				{
					"t": "sphere",
					"c": [
						-.55,
						-2.5,
						9.5
					],
					"r": [
						.5,
						.4,
						.1
					],
					"fill": "#ffffff",
					"opacity": .85,
					"only": "2d"
				},
				{
					"t": "sphere",
					"c": [
						0,
						-7.8,
						0
					],
					"r": [
						1.25,
						1.25,
						1.25
					],
					"fill": "#f2c14e",
					"metal": true
				},
				{
					"t": "tube",
					"pts": [[
						0,
						-8.8,
						0
					], [
						0,
						-11.8,
						0
					]],
					"w": .85,
					"smooth": false,
					"fill": "#f2c14e",
					"metal": true
				},
				{
					"t": "tube",
					"pts": [[
						-1.1,
						-10.7,
						0
					], [
						1.1,
						-10.7,
						0
					]],
					"w": .85,
					"smooth": false,
					"fill": "#f2c14e",
					"metal": true
				},
				{
					"t": "box",
					"c": [
						-3.2,
						-2.9,
						8.9
					],
					"s": [
						4.2,
						.6,
						.1
					],
					"round": .3,
					"fill": "#ffe39b",
					"only": "2d"
				}
			]
		},
		{
			"id": "top_hat",
			"slot": "head",
			"scale": 1.12,
			"bounds": [
				-13.82,
				-13.84,
				13.63,
				3.79
			],
			"regions": false,
			"parts": [
				{
					"t": "sphere",
					"c": [
						.105,
						1.795,
						0
					],
					"r": [
						10.8,
						1.7,
						.1
					],
					"fill": "#05070d",
					"opacity": .24,
					"only": "2d",
					"rot": -6
				},
				{
					"t": "cyl",
					"c": [
						-.052,
						.303,
						0
					],
					"r": [12.4, 12.4],
					"h": 1.4,
					"dz": 1,
					"fill": "#1e1f26",
					"rot": -6
				},
				{
					"t": "sphere",
					"c": [
						-12.227,
						1.18,
						0
					],
					"r": [
						1.6,
						1.2,
						4.2
					],
					"fill": "#1e1f26",
					"only": "2d",
					"rot": -6
				},
				{
					"t": "sphere",
					"c": [
						12.039,
						-1.37,
						0
					],
					"r": [
						1.6,
						1.2,
						4.2
					],
					"fill": "#1e1f26",
					"only": "2d",
					"rot": -6
				},
				{
					"t": "cyl",
					"c": [
						-.794,
						-6.758,
						0
					],
					"r": [7.4, 7.8],
					"h": 12.6,
					"dz": 1,
					"fill": "#272832",
					"rot": -6
				},
				{
					"t": "cyl",
					"c": [
						-.261,
						-1.686,
						0
					],
					"r": [7.5, 7.55],
					"h": 2.8,
					"dz": 1,
					"fill": "#b3243b",
					"gloss": true,
					"rot": -6
				},
				{
					"t": "box",
					"c": [
						-5.275,
						-7.293,
						7.9
					],
					"s": [
						1.3,
						9.6,
						.1
					],
					"round": .6,
					"fill": "#3b3d4a",
					"only": "2d",
					"rot": -6
				}
			]
		},
		{
			"id": "cap",
			"slot": "head",
			"scale": 1.15,
			"bounds": [
				-11.6,
				-7.8,
				11.6,
				6.1
			],
			"regions": false,
			"parts": [
				{
					"t": "sphere",
					"c": [
						0,
						3,
						0
					],
					"r": [
						9.4,
						1.6,
						.1
					],
					"fill": "#05070d",
					"opacity": .18,
					"only": "2d"
				},
				{
					"t": "dome",
					"c": [
						0,
						1.8,
						0
					],
					"r": [
						9.4,
						8.4,
						9.4
					],
					"fill": "#2f6fe0"
				},
				{
					"t": "tube",
					"pts": [[
						0,
						-6.2,
						0
					], [
						0,
						1.4,
						0
					]],
					"w": .45,
					"smooth": false,
					"fill": "#2556b8",
					"only": "2d"
				},
				{
					"t": "tube",
					"pts": [[
						-4.8,
						-5.6,
						0
					], [
						-6.2,
						1.6,
						0
					]],
					"w": .45,
					"smooth": true,
					"fill": "#2556b8",
					"only": "2d"
				},
				{
					"t": "tube",
					"pts": [[
						4.8,
						-5.6,
						0
					], [
						6.2,
						1.6,
						0
					]],
					"w": .45,
					"smooth": true,
					"fill": "#2556b8",
					"only": "2d"
				},
				{
					"t": "sphere",
					"c": [
						0,
						-6.6,
						0
					],
					"r": [
						1.2,
						1.2,
						1.2
					],
					"fill": "#2556b8"
				},
				{
					"t": "poly",
					"pts": [
						[0, -3.4],
						[.529, -2.128],
						[1.902, -2.018],
						[.856, -1.122],
						[1.176, .218],
						[0, -.5],
						[-1.176, .218],
						[-.856, -1.122],
						[-1.902, -2.018],
						[-.529, -2.128]
					],
					"z": 8.7,
					"d": .4,
					"smooth": false,
					"fill": "#ffffff"
				},
				{
					"t": "sphere",
					"c": [
						0,
						4.7,
						7.5
					],
					"r": [
						10.4,
						1.4,
						.1
					],
					"fill": "#05070d",
					"opacity": .2,
					"only": "2d"
				},
				{
					"t": "sphere",
					"c": [
						0,
						2.4,
						7.6
					],
					"r": [
						11.6,
						1.9,
						7.4
					],
					"fill": "#1f4aa0"
				},
				{
					"t": "box",
					"c": [
						0,
						1.6,
						8.9
					],
					"s": [
						14,
						.5,
						.1
					],
					"round": .25,
					"fill": "#3a6fd0",
					"only": "2d"
				}
			]
		},
		{
			"id": "headphones",
			"slot": "head",
			"scale": 1,
			"bounds": [
				-15.7,
				-9.8,
				15.7,
				12.6
			],
			"regions": false,
			"parts": [
				{
					"t": "tube",
					"pts": [
						[
							-12.8,
							5.6,
							0
						],
						[
							-12,
							-1.8,
							0
						],
						[
							-6.8,
							-7.2,
							0
						],
						[
							0,
							-8.6,
							0
						],
						[
							6.8,
							-7.2,
							0
						],
						[
							12,
							-1.8,
							0
						],
						[
							12.8,
							5.6,
							0
						]
					],
					"w": 2.4,
					"smooth": true,
					"fill": "#2b2d34"
				},
				{
					"t": "tube",
					"pts": [
						[
							-5.4,
							-6.4,
							.9
						],
						[
							0,
							-7.6,
							.9
						],
						[
							5.4,
							-6.4,
							.9
						]
					],
					"w": 1.6,
					"smooth": true,
					"fill": "#454956"
				},
				{
					"t": "sphere",
					"c": [
						11.4,
						7.4,
						0
					],
					"r": [
						1.4,
						4.6,
						4.2
					],
					"fill": "#f97316"
				},
				{
					"t": "sphere",
					"c": [
						13.1,
						7.4,
						0
					],
					"r": [
						2.6,
						5.2,
						4.8
					],
					"fill": "#2b2d34"
				},
				{
					"t": "box",
					"c": [
						14,
						7.4,
						0
					],
					"s": [
						1.2,
						4.4,
						3.2
					],
					"round": .5,
					"fill": "#3d404a"
				},
				{
					"t": "sphere",
					"c": [
						-11.4,
						7.4,
						0
					],
					"r": [
						1.4,
						4.6,
						4.2
					],
					"fill": "#f97316"
				},
				{
					"t": "sphere",
					"c": [
						-13.1,
						7.4,
						0
					],
					"r": [
						2.6,
						5.2,
						4.8
					],
					"fill": "#2b2d34"
				},
				{
					"t": "box",
					"c": [
						-14,
						7.4,
						0
					],
					"s": [
						1.2,
						4.4,
						3.2
					],
					"round": .5,
					"fill": "#3d404a"
				}
			]
		},
		{
			"id": "sunglasses",
			"slot": "face",
			"scale": 1,
			"bounds": [
				-11.8,
				-4.05,
				11.8,
				3.58
			],
			"regions": false,
			"parts": [
				{
					"t": "poly",
					"pts": [
						[-9.638, -3.625],
						[-.59, -3.625],
						[-.706, .335],
						[-1.402, 2.495],
						[-2.91, 3.455],
						[-6.854, 3.575],
						[-8.594, 2.615],
						[-9.406, .575]
					],
					"z": .7,
					"d": 1.2,
					"smooth": false,
					"fill": "#0b0c10",
					"gloss": true
				},
				{
					"t": "poly",
					"pts": [
						[9.406, .575],
						[8.594, 2.615],
						[6.854, 3.575],
						[2.91, 3.455],
						[1.402, 2.495],
						[.706, .335],
						[.59, -3.625],
						[9.638, -3.625]
					],
					"z": .7,
					"d": 1.2,
					"smooth": false,
					"fill": "#0b0c10",
					"gloss": true
				},
				{
					"t": "poly",
					"pts": [
						[-9, -2.9],
						[-1.2, -2.9],
						[-1.3, .4],
						[-1.9, 2.2],
						[-3.2, 3],
						[-6.6, 3.1],
						[-8.1, 2.3],
						[-8.8, .6]
					],
					"z": 1,
					"d": .7,
					"smooth": false,
					"fill": "#243049",
					"gloss": true,
					"gradient": ["#151925", "#3d4f78"]
				},
				{
					"t": "poly",
					"pts": [
						[8.8, .6],
						[8.1, 2.3],
						[6.6, 3.1],
						[3.2, 3],
						[1.9, 2.2],
						[1.3, .4],
						[1.2, -2.9],
						[9, -2.9]
					],
					"z": 1,
					"d": .7,
					"smooth": false,
					"fill": "#243049",
					"gloss": true,
					"gradient": ["#151925", "#3d4f78"]
				},
				{
					"t": "poly",
					"pts": [
						[-7, -2.5],
						[-5.9, -2.5],
						[-7.7, 1.9],
						[-8.4, 1]
					],
					"z": 1.5,
					"d": .1,
					"smooth": false,
					"fill": "#ffffff",
					"opacity": .16,
					"only": "2d"
				},
				{
					"t": "poly",
					"pts": [
						[-5.2, -2.5],
						[-4.75, -2.5],
						[-6.5, 2.7],
						[-7, 2.5]
					],
					"z": 1.5,
					"d": .1,
					"smooth": false,
					"fill": "#ffffff",
					"opacity": .1,
					"only": "2d"
				},
				{
					"t": "poly",
					"pts": [
						[3, -2.5],
						[4.1, -2.5],
						[2.3, 1.9],
						[1.6, 1]
					],
					"z": 1.5,
					"d": .1,
					"smooth": false,
					"fill": "#ffffff",
					"opacity": .16,
					"only": "2d"
				},
				{
					"t": "poly",
					"pts": [
						[4.8, -2.5],
						[5.25, -2.5],
						[3.5, 2.7],
						[3, 2.5]
					],
					"z": 1.5,
					"d": .1,
					"smooth": false,
					"fill": "#ffffff",
					"opacity": .1,
					"only": "2d"
				},
				{
					"t": "tube",
					"pts": [[
						-9.7,
						-3.2,
						1.3
					], [
						9.7,
						-3.2,
						1.3
					]],
					"w": 1.7,
					"smooth": false,
					"fill": "#0b0c10",
					"gloss": true
				},
				{
					"t": "tube",
					"pts": [[
						-8.9,
						-3.7,
						1.6
					], [
						8.9,
						-3.7,
						1.6
					]],
					"w": .35,
					"smooth": false,
					"fill": "#626a7e",
					"opacity": .9,
					"only": "2d"
				},
				{
					"t": "tube",
					"pts": [
						[
							-1.4,
							-1.7,
							1.1
						],
						[
							0,
							-2.4,
							1.1
						],
						[
							1.4,
							-1.7,
							1.1
						]
					],
					"w": 1,
					"smooth": true,
					"fill": "#0b0c10",
					"gloss": true
				},
				{
					"t": "tube",
					"pts": [[
						-9.6,
						-2.7,
						.8
					], [
						-11.3,
						-2.4,
						-1.2
					]],
					"w": 1,
					"smooth": false,
					"fill": "#0b0c10",
					"gloss": true
				},
				{
					"t": "tube",
					"pts": [[
						9.6,
						-2.7,
						.8
					], [
						11.3,
						-2.4,
						-1.2
					]],
					"w": 1,
					"smooth": false,
					"fill": "#0b0c10",
					"gloss": true
				},
				{
					"t": "sphere",
					"c": [
						-8.9,
						-2.9,
						1.9
					],
					"r": [
						.5,
						.5,
						.3
					],
					"fill": "#d5d9e2",
					"metal": true
				},
				{
					"t": "sphere",
					"c": [
						8.9,
						-2.9,
						1.9
					],
					"r": [
						.5,
						.5,
						.3
					],
					"fill": "#d5d9e2",
					"metal": true
				},
				{
					"t": "poly",
					"pts": [
						[6.9, -3.2],
						[7.126, -1.726],
						[8.6, -1.5],
						[7.126, -1.274],
						[6.9, .2],
						[6.674, -1.274],
						[5.2, -1.5],
						[6.674, -1.726]
					],
					"z": 1.8,
					"d": .1,
					"smooth": false,
					"fill": "#ffffff",
					"only": "2d",
					"anim": "twinkle"
				},
				{
					"t": "poly",
					"pts": [
						[-3.6, -2.9],
						[-3.444, -2.056],
						[-2.6, -1.9],
						[-3.444, -1.744],
						[-3.6, -.9],
						[-3.756, -1.744],
						[-4.6, -1.9],
						[-3.756, -2.056]
					],
					"z": 1.8,
					"d": .1,
					"smooth": false,
					"fill": "#ffffff",
					"only": "2d",
					"anim": "twinkle-late"
				}
			]
		},
		{
			"id": "cigar",
			"slot": "mouth",
			"scale": 1,
			"bounds": [
				-1.04,
				-10.52,
				19.22,
				5.61
			],
			"regions": false,
			"parts": [
				{
					"t": "tube",
					"pts": [[
						.783,
						.166,
						.8
					], [
						10.368,
						2.204,
						.8
					]],
					"w": 3.2,
					"smooth": false,
					"fill": "#6f3f1f"
				},
				{
					"t": "tube",
					"pts": [[
						1.309,
						-.386,
						1.4
					], [
						10.504,
						1.568,
						1.4
					]],
					"w": 1,
					"smooth": false,
					"fill": "#a8693a",
					"opacity": .55,
					"only": "2d"
				},
				{
					"t": "tube",
					"pts": [[
						2.175,
						-.611,
						1.6
					], [
						9.609,
						.969,
						1.6
					]],
					"w": .32,
					"smooth": false,
					"fill": "#e6ab72",
					"opacity": .45,
					"only": "2d"
				},
				{
					"t": "tube",
					"pts": [[
						.781,
						1.137,
						1.4
					], [
						10.366,
						3.175,
						1.4
					]],
					"w": .9,
					"smooth": false,
					"fill": "#3d2110",
					"opacity": .5,
					"only": "2d"
				},
				{
					"t": "tube",
					"pts": [[
						10.368,
						2.204,
						.8
					], [
						10.76,
						2.287,
						.8
					]],
					"w": 3.2,
					"smooth": false,
					"fill": "#6f3f1f"
				},
				{
					"t": "tube",
					"pts": [[
						5.192,
						-.379,
						1.6
					], [
						5.382,
						2.575,
						1.6
					]],
					"w": .22,
					"smooth": false,
					"fill": "#4a2812",
					"opacity": .5,
					"only": "2d"
				},
				{
					"t": "tube",
					"pts": [[
						7.54,
						.12,
						1.6
					], [
						7.73,
						3.074,
						1.6
					]],
					"w": .22,
					"smooth": false,
					"fill": "#4a2812",
					"opacity": .5,
					"only": "2d"
				},
				{
					"t": "tube",
					"pts": [[
						9.594,
						.557,
						1.6
					], [
						9.784,
						3.511,
						1.6
					]],
					"w": .22,
					"smooth": false,
					"fill": "#4a2812",
					"opacity": .5,
					"only": "2d"
				},
				{
					"t": "tube",
					"pts": [[
						.587,
						.125,
						.82
					], [
						1.467,
						.312,
						.84
					]],
					"w": 3.25,
					"smooth": false,
					"fill": "#5a3519"
				},
				{
					"t": "cyl",
					"c": [
						3.326,
						.707,
						.8
					],
					"r": [1.74, 1.74],
					"h": 1.8,
					"dz": 1,
					"fill": "#f2c14e",
					"rot": 102,
					"metal": true
				},
				{
					"t": "cyl",
					"c": [
						3.326,
						.707,
						.8
					],
					"r": [1.77, 1.77],
					"h": .55,
					"dz": 1,
					"fill": "#b3243b",
					"rot": 102
				},
				{
					"t": "sphere",
					"c": [
						3.326,
						.707,
						2.6
					],
					"r": [
						.62,
						.62,
						.3
					],
					"fill": "#ffe08a",
					"metal": true,
					"rot": 12
				},
				{
					"t": "tube",
					"pts": [[
						2.848,
						-1.133,
						1.7
					], [
						2.141,
						2.193,
						1.7
					]],
					"w": .2,
					"smooth": false,
					"fill": "#c8922a",
					"opacity": .9,
					"only": "2d",
					"metal": true
				},
				{
					"t": "tube",
					"pts": [[
						4.511,
						-.779,
						1.7
					], [
						3.804,
						2.546,
						1.7
					]],
					"w": .2,
					"smooth": false,
					"fill": "#c8922a",
					"opacity": .9,
					"only": "2d",
					"metal": true
				},
				{
					"t": "cyl",
					"c": [
						11.395,
						2.422,
						.8
					],
					"r": [1.55, 1.52],
					"h": 1.3,
					"dz": 1,
					"fill": "#9a9a9a",
					"rot": 102
				},
				{
					"t": "tube",
					"pts": [[
						11.463,
						.903,
						1.6
					], [
						10.839,
						3.837,
						1.6
					]],
					"w": .25,
					"smooth": false,
					"fill": "#d0d0d0",
					"opacity": .75,
					"only": "2d"
				},
				{
					"t": "tube",
					"pts": [[
						11.952,
						1.007,
						1.6
					], [
						11.328,
						3.941,
						1.6
					]],
					"w": .25,
					"smooth": false,
					"fill": "#d0d0d0",
					"opacity": .75,
					"only": "2d"
				},
				{
					"t": "cyl",
					"c": [
						12.227,
						2.599,
						.8
					],
					"r": [1.5, 1.35],
					"h": .45,
					"dz": 1,
					"fill": "#ff5a14",
					"rot": 102,
					"glow": true
				},
				{
					"t": "sphere",
					"c": [
						12.52,
						2.661,
						1
					],
					"r": [
						3,
						3,
						.1
					],
					"fill": "#ff7a2a",
					"opacity": .2,
					"only": "2d",
					"anim": "ember",
					"rot": 12
				},
				{
					"t": "sphere",
					"c": [
						12.52,
						2.661,
						1.1
					],
					"r": [
						1.7,
						1.9,
						.1
					],
					"fill": "#ff9a3c",
					"opacity": .35,
					"only": "2d",
					"anim": "ember",
					"rot": 12
				},
				{
					"t": "sphere",
					"c": [
						12.569,
						2.672,
						1.2
					],
					"r": [
						.45,
						1.2,
						.4
					],
					"fill": "#ffd25a",
					"glow": true,
					"anim": "ember",
					"rot": 12
				},
				{
					"t": "tube",
					"pts": [
						[
							13.018,
							1.682,
							1.4
						],
						[
							14.518,
							-.918,
							1.5
						],
						[
							13.118,
							-3.718,
							1.6
						],
						[
							14.818,
							-6.718,
							1.7
						]
					],
					"w": .85,
					"smooth": true,
					"fill": "#d9dbe2",
					"opacity": .55,
					"only": "2d"
				},
				{
					"t": "tube",
					"pts": [
						[
							13.818,
							.482,
							1.4
						],
						[
							15.618,
							-1.318,
							1.5
						],
						[
							15.018,
							-3.518,
							1.6
						]
					],
					"w": .55,
					"smooth": true,
					"fill": "#d9dbe2",
					"opacity": .4,
					"only": "2d"
				},
				{
					"t": "smoke",
					"c": [
						13.218,
						1.482,
						1.5
					],
					"size": 1,
					"fill": "#e4e6ec"
				}
			]
		}
	]
};
const ACCESSORY_SLOTS = [
	"back",
	"outfit",
	"neck",
	"mouth",
	"face",
	"head",
	"held"
];
function slotDepthM(shape, slot) {
	return ACCESSORY_CATALOG.shapes[shape].depth?.[slot] ?? ACCESSORY_CATALOG.slotDepth[slot] * ACCESSORY_CATALOG.frontDepthM;
}
const ACCESSORY_CATALOG = accessories_default;
const ACCESSORY_ITEMS = ACCESSORY_CATALOG.items;
var BY_ID = new Map(ACCESSORY_ITEMS.map((item) => [item.id, item]));
const ACCESSORY_IDS_BY_SLOT = Object.fromEntries(ACCESSORY_SLOTS.map((slot) => [slot, ACCESSORY_ITEMS.filter((item) => item.slot === slot).map((item) => item.id)]));
const OFFERED_SLOTS = ACCESSORY_SLOTS.filter((slot) => ACCESSORY_IDS_BY_SLOT[slot].length > 0);
const FACE_SLOTS = new Set(["face", "mouth"]);
function accessoryItem(id) {
	return id ? BY_ID.get(id) : void 0;
}
function wornAccessories(choice) {
	if (!choice) return [];
	const worn = [];
	for (const slot of ACCESSORY_SLOTS) {
		const item = accessoryItem(choice[slot]);
		if (item && item.slot === slot) worn.push(item);
	}
	return worn;
}
function shadeHex(hex$1, amount) {
	const value = parseInt(hex$1.slice(1), 16);
	const channel = (shift) => {
		const c = value >> shift & 255;
		const next = amount < 0 ? c * (1 + amount) : c + (255 - c) * amount;
		return Math.round(Math.max(0, Math.min(255, next)));
	};
	return `#${[
		16,
		8,
		0
	].map((s) => channel(s).toString(16).padStart(2, "0")).join("")}`;
}
function resolveFill(fill, bodyColor) {
	if (fill === "body") return bodyColor;
	if (fill === "bodyDark") return shadeHex(bodyColor, -.3);
	if (fill === "bodyLight") return shadeHex(bodyColor, .45);
	if (fill === "ink") return "#101014";
	return fill;
}
function smoothPath(points, closed) {
	const n = points.length;
	if (n < 3) return `M${points.map((p) => p.join(" ")).join(" L")}${closed ? "Z" : ""}`;
	const at = (i) => closed ? points[(i + n) % n] : points[Math.max(0, Math.min(n - 1, i))];
	const f = (v) => +v.toFixed(2);
	let d = `M${f(points[0][0])} ${f(points[0][1])}`;
	const segments = closed ? n : n - 1;
	for (let i = 0; i < segments; i++) {
		const p0 = at(i - 1), p1 = at(i), p2 = at(i + 1), p3 = at(i + 2);
		d += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
	}
	return closed ? `${d}Z` : d;
}
function partDepth(part) {
	if (part.t === "poly") return part.z;
	if (part.t === "tube") return part.pts.reduce((sum, p) => sum + p[2], 0) / part.pts.length;
	if (part.t === "region" || part.t === "rim") return -Infinity;
	return part.c[2];
}
function symbolViewBox(shape, worn) {
	if (!worn.length) return "0 0 40 44";
	const anchors = ACCESSORY_CATALOG.shapes[shape].anchors;
	let x0 = 0, y0 = 0, x1 = 40, y1 = 44;
	for (const item of worn) {
		const [ax, ay, anchorK] = anchors[item.slot];
		const k = anchorK * (item.scale ?? 1);
		const [bx0, by0, bx1, by1] = item.bounds;
		if (bx0 === bx1 && by0 === by1) continue;
		const pad = FACE_SLOTS.has(item.slot) ? 2.5 : .8;
		x0 = Math.min(x0, ax + bx0 * k - pad);
		y0 = Math.min(y0, ay + by0 * k - pad);
		x1 = Math.max(x1, ax + bx1 * k + pad);
		y1 = Math.max(y1, ay + by1 * k + pad);
	}
	let w = x1 - x0, h = y1 - y0;
	if (w / h < 40 / 44) {
		const grow = h * 40 / 44 - w;
		x0 -= grow / 2;
		w += grow;
	} else {
		const grow = w * 44 / 40 - h;
		y0 -= grow / 2;
		h += grow;
	}
	const r = (v) => +v.toFixed(2);
	return `${r(x0)} ${r(y0)} ${r(w)} ${r(h)}`;
}
function randomAccessories(random = Math.random) {
	const choice = {};
	for (const slot of ACCESSORY_SLOTS) {
		const ids = ACCESSORY_IDS_BY_SLOT[slot];
		if (ids.length && random() < (slot === "head" ? .7 : .3)) choice[slot] = ids[Math.floor(random() * ids.length)];
	}
	return choice;
}
const SKIN_PATTERNS = ["linear", "radial"];
const SKIN_EFFECTS = [
	"none",
	"stars",
	"shimmer",
	"flow",
	"glow",
	"sparkle"
];
const skinSchema = objectType({
	colors: arrayType(stringType().regex(/^#[0-9a-fA-F]{6}$/)).min(2).max(4),
	pattern: enumType(SKIN_PATTERNS).default("linear"),
	angle: numberType().int().min(0).max(359).default(135),
	effect: stringType().regex(/^[a-z]{1,20}$/).default("none"),
	name: stringType().max(40).regex(/^[^\x00-\x1f\x7f]*$/).default("")
}).strict();
function skinEffect(skin) {
	return SKIN_EFFECTS.includes(skin.effect) ? skin.effect : "none";
}
const SKIN_PRESETS = [
	{
		id: "galaxy",
		skin: {
			colors: [
				"#e05cc5",
				"#6a2fc2",
				"#160f3d"
			],
			pattern: "radial",
			angle: 135,
			effect: "stars"
		}
	},
	{
		id: "aurora",
		skin: {
			colors: [
				"#22e3a5",
				"#2bb3e0",
				"#8a5cf0"
			],
			pattern: "linear",
			angle: 160,
			effect: "flow"
		}
	},
	{
		id: "holo",
		skin: {
			colors: [
				"#ffc6ec",
				"#bdf3ff",
				"#d6c4ff",
				"#fff1b8"
			],
			pattern: "linear",
			angle: 120,
			effect: "shimmer"
		}
	},
	{
		id: "lava",
		skin: {
			colors: [
				"#ffd23f",
				"#ff5a1f",
				"#8c1010"
			],
			pattern: "radial",
			angle: 135,
			effect: "glow"
		}
	},
	{
		id: "neon",
		skin: {
			colors: ["#ff2fd6", "#2ff3ff"],
			pattern: "linear",
			angle: 90,
			effect: "glow"
		}
	},
	{
		id: "ocean",
		skin: {
			colors: [
				"#64e1ff",
				"#1f7ae0",
				"#0b2a6b"
			],
			pattern: "linear",
			angle: 180,
			effect: "flow"
		}
	},
	{
		id: "sunset",
		skin: {
			colors: [
				"#ffb347",
				"#ff5f6d",
				"#7b3fa0"
			],
			pattern: "linear",
			angle: 180,
			effect: "none"
		}
	},
	{
		id: "gold",
		skin: {
			colors: [
				"#fff1a8",
				"#e3a92b",
				"#8a5a12"
			],
			pattern: "linear",
			angle: 145,
			effect: "sparkle"
		}
	},
	{
		id: "frost",
		skin: {
			colors: [
				"#ffffff",
				"#bfe6ff",
				"#7aa8e8"
			],
			pattern: "linear",
			angle: 200,
			effect: "sparkle"
		}
	}
];
function rgb(hex$1) {
	const n = parseInt(hex$1.slice(1), 16);
	return [
		n >> 16 & 255,
		n >> 8 & 255,
		n & 255
	];
}
function hex([r, g, b]) {
	return `#${[
		r,
		g,
		b
	].map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0")).join("")}`;
}
function luminance(color) {
	const [r, g, b] = rgb(color).map((v) => {
		const c = v / 255;
		return c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4;
	});
	return .2126 * r + .7152 * g + .0722 * b;
}
function skinBlend(colors) {
	const lin = colors.map((c) => rgb(c).map((v) => (v / 255) ** 2.2));
	return hex([
		0,
		1,
		2
	].map((i) => lin.reduce((sum, c) => sum + c[i], 0) / lin.length).map((v) => 255 * v ** (1 / 2.2)));
}
function skinHighlight(colors) {
	return [...colors].sort((a, b) => luminance(b) - luminance(a))[0];
}
function skinCss(skin) {
	return skin.pattern === "radial" ? `radial-gradient(circle at 38% 34%, ${skin.colors.join(", ")})` : `linear-gradient(${skin.angle}deg, ${skin.colors.join(", ")})`;
}
function angleVector(angle) {
	const rad = angle * Math.PI / 180;
	const dx = Math.sin(rad) / 2;
	const dy = -Math.cos(rad) / 2;
	const r = (v) => Math.round(v * 1e3) / 1e3;
	return [
		r(.5 - dx),
		r(.5 - dy),
		r(.5 + dx),
		r(.5 + dy)
	];
}
function sameSkin(a, b) {
	if (!a || !b) return a === b;
	return a.pattern === b.pattern && a.angle === b.angle && a.effect === b.effect && a.colors.length === b.colors.length && a.colors.every((c, i) => c.toLowerCase() === b.colors[i].toLowerCase());
}
var CODE_PREFIX = "jarvis-design:";
function encodeDesignCode(skin) {
	const json = JSON.stringify({
		v: 1,
		...skin
	});
	const bytes = new TextEncoder().encode(json);
	let binary = "";
	bytes.forEach((b) => {
		binary += String.fromCharCode(b);
	});
	return CODE_PREFIX + btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function decodeDesignCode(text) {
	const body = text.slice(14).trim().replace(/-/g, "+").replace(/_/g, "/");
	const binary = atob(body + "=".repeat((4 - body.length % 4) % 4));
	return JSON.parse(new TextDecoder().decode(Uint8Array.from(binary, (c) => c.charCodeAt(0))));
}
function fromObject(value) {
	if (!value || typeof value !== "object") return null;
	const { v: _version, ...rest } = value;
	const inner = rest.companion?.skin ?? rest.skin ?? rest;
	const parsed = skinSchema.safeParse(inner);
	return parsed.success ? {
		...parsed.data,
		colors: parsed.data.colors.map((c) => c.toLowerCase())
	} : null;
}
var CSS_COLOR = /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b|rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}[^)]*\)/g;
var CSS_SIDES = {
	"to top": 0,
	"to top right": 45,
	"to right top": 45,
	"to right": 90,
	"to bottom right": 135,
	"to right bottom": 135,
	"to bottom": 180,
	"to bottom left": 225,
	"to left bottom": 225,
	"to left": 270,
	"to top left": 315,
	"to left top": 315
};
function cssColorHex(token) {
	if (token.startsWith("#")) {
		const h = token.slice(1);
		return `#${h.length <= 4 ? h.slice(0, 3).split("").map((c) => c + c).join("") : h.slice(0, 6)}`.toLowerCase();
	}
	return hex(token.match(/\d{1,3}/g).slice(0, 3).map(Number));
}
function spread(colors) {
	if (colors.length <= 4) return colors;
	return [
		0,
		1,
		2,
		3
	].map((i) => colors[Math.round(i * (colors.length - 1) / 3)]);
}
function fromCss(text) {
	const match = /(linear|radial|conic)-gradient\s*\(/i.exec(text);
	if (!match) return null;
	const colors = spread([...text.slice(match.index).matchAll(CSS_COLOR)].map((m) => cssColorHex(m[0])));
	if (colors.length < 2) return null;
	const body = text.slice(match.index + match[0].length).toLowerCase();
	const degrees = /(-?\d+(?:\.\d+)?)deg/.exec(body);
	const side = Object.keys(CSS_SIDES).sort((a, b) => b.length - a.length).find((key) => body.startsWith(key));
	const angle = degrees ? (Math.round(Number(degrees[1])) % 360 + 360) % 360 : side ? CSS_SIDES[side] : 180;
	return {
		colors,
		pattern: match[1].toLowerCase() === "radial" ? "radial" : "linear",
		angle,
		effect: "none",
		name: ""
	};
}
function parseDesignImport(text) {
	const trimmed = text.trim();
	if (!trimmed) return null;
	try {
		if (trimmed.startsWith(CODE_PREFIX)) return fromObject(decodeDesignCode(trimmed));
		if (trimmed.startsWith("{")) return fromObject(JSON.parse(trimmed));
	} catch {
		return null;
	}
	const css = fromCss(trimmed);
	if (css) return css;
	const colors = spread([...trimmed.matchAll(CSS_COLOR)].map((m) => cssColorHex(m[0])));
	return colors.length >= 2 ? {
		colors,
		pattern: "linear",
		angle: 135,
		effect: "none",
		name: ""
	} : null;
}
function paletteFromPixels(data, count = 3) {
	const buckets = /* @__PURE__ */ new Map();
	for (let i = 0; i + 3 < data.length; i += 4) {
		if (data[i + 3] < 128) continue;
		const r = data[i], g = data[i + 1], b = data[i + 2];
		const key = r >> 4 << 8 | g >> 4 << 4 | b >> 4;
		const bucket = buckets.get(key) ?? {
			n: 0,
			r: 0,
			g: 0,
			b: 0
		};
		bucket.n++;
		bucket.r += r;
		bucket.g += g;
		bucket.b += b;
		buckets.set(key, bucket);
	}
	const ranked = [...buckets.values()].map((b) => ({
		n: b.n,
		c: [
			b.r / b.n,
			b.g / b.n,
			b.b / b.n
		]
	})).map((b) => ({
		...b,
		score: b.n * (1 + 2 * (Math.max(...b.c) - Math.min(...b.c)) / 255)
	})).sort((a, b) => b.score - a.score);
	const picked = [];
	for (const minDistance of [
		90,
		60,
		30,
		0
	]) {
		for (const { c } of ranked) {
			if (picked.length >= count) break;
			if (picked.every((p) => Math.hypot(p[0] - c[0], p[1] - c[1], p[2] - c[2]) >= minDistance) && !picked.includes(c)) picked.push(c);
		}
		if (picked.length >= count) break;
	}
	return picked.map(hex).sort((a, b) => luminance(b) - luminance(a));
}
async function skinFromImage(file) {
	const bitmap = await createImageBitmap(file);
	try {
		const canvas = document.createElement("canvas");
		canvas.width = 64;
		canvas.height = 64;
		const context = canvas.getContext("2d", { willReadFrequently: true });
		if (!context) return null;
		context.drawImage(bitmap, 0, 0, 64, 64);
		const colors = paletteFromPixels(context.getImageData(0, 0, 64, 64).data);
		if (colors.length < 2) return null;
		const dark = colors.reduce((sum, c) => sum + luminance(c), 0) / colors.length < .12;
		return {
			colors,
			pattern: dark ? "radial" : "linear",
			angle: 160,
			effect: dark ? "stars" : "none",
			name: ""
		};
	} finally {
		bitmap.close();
	}
}
const COMPANION_SHAPES = [
	"circle",
	"squircle",
	"pill",
	"triangle",
	"hexagon",
	"cloud",
	"drop"
];
const COMPANION_COLORS = [
	"#ffffff",
	"#875b36",
	"#dd2233",
	"#ff6801",
	"#ff9700",
	"#029858",
	"#00a591",
	"#1174da",
	"#804ee1",
	"#df2a87",
	"#777777",
	"#e8c89a",
	"#ff7a6b",
	"#ffd23f",
	"#9ccc3a",
	"#3cc4e8",
	"#b59cf0",
	"#222222",
	"#8c1c3a",
	"#6b7a1f",
	"#0f5c63",
	"#1f3a8a",
	"#f49ac1"
];
var DEFAULT_COLOR_COUNT = 11;
const COMPANION_SIZE_M = .5;
const companionSchema = objectType({
	shape: enumType(COMPANION_SHAPES),
	color: stringType().regex(/^#[0-9a-fA-F]{6}$/),
	eyes: enumType(["dots", "lines"]).default("lines"),
	enabled: booleanType().default(true),
	accessories: recordType(enumType(ACCESSORY_SLOTS), stringType().regex(/^[a-z0-9_]{1,40}$/)).default({}),
	pet: stringType().regex(/^[a-z0-9][a-z0-9-]{0,31}$/).optional(),
	skin: skinSchema.optional(),
	sizeM: numberType().finite().min(.25).max(.8).default(COMPANION_SIZE_M).transform(() => COMPANION_SIZE_M),
	followDistanceM: numberType().finite().min(.5).max(2).default(1).transform(() => 1)
}).strict();
function identityHash(identity) {
	let hash = 2166136261;
	for (const character of identity) hash = Math.imul(hash ^ character.charCodeAt(0), 16777619) >>> 0;
	return hash;
}
function defaultCompanion(identity) {
	return {
		shape: COMPANION_SHAPES[identityHash(`shape:${identity}`) % COMPANION_SHAPES.length],
		color: COMPANION_COLORS[identityHash(`color:${identity}`) % DEFAULT_COLOR_COUNT],
		eyes: "lines",
		enabled: true,
		accessories: {},
		sizeM: COMPANION_SIZE_M,
		followDistanceM: 1
	};
}
function resolveCompanion(identity, stored) {
	const parsed = companionSchema.safeParse(stored);
	return parsed.success ? parsed.data : defaultCompanion(identity);
}
function companionEyeColors(_color) {
	return {
		eye: "#101014",
		highlight: "#101014"
	};
}
export { partDepth as C, smoothPath as D, slotDepthM as E, symbolViewBox as O, accessoryItem as S, resolveFill as T, skinHighlight as _, resolveCompanion as a, FACE_SLOTS as b, SKIN_PRESETS as c, parseDesignImport as d, sameSkin as f, skinFromImage as g, skinEffect as h, defaultCompanion as i, wornAccessories as k, angleVector as l, skinCss as m, COMPANION_SHAPES as n, SKIN_EFFECTS as o, skinBlend as p, companionEyeColors as r, SKIN_PATTERNS as s, COMPANION_COLORS as t, encodeDesignCode as u, ACCESSORY_CATALOG as v, randomAccessories as w, OFFERED_SLOTS as x, ACCESSORY_IDS_BY_SLOT as y };
