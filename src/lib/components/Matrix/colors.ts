import type { TColor } from "./types"

const colors = {
  'important-urgent': 'green-deck',
  'important-not-urgent': 'yellow-deck',
  'not-important-urgent':'orange-deck',
  'not-important-not-urgent':'red-deck'
}

const quadrantColor = (color: TColor) => {
  return colors[color]
}

export default quadrantColor