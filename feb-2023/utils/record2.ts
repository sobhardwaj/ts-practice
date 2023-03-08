type Properties = 'green' | 'blue' | 'red';

type RGB = [
  red: number,
  green: number,
  blue: number
]

const color: Record<Properties, RGB | string> = {
  red: [255, 0, 0],
  blue: '#00ff00',
  green: [255, 255, 0],
}

color.blue.toUpperCase() // complian about it

const color2 = {
  red: [255, 0, 0],
  blue: '#00ff00',
  green: [255, 255, 0],
} satisfies  Record<Properties, RGB | string>

color2.blue.toUpperCase()