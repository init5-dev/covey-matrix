import type { TColor } from "../../types"

const colors = {
  'important-urgent': 'green-deck',
  'important-not-urgent': 'yellow-deck',
  'not-important-urgent':'orange-deck',
  'not-important-not-urgent':'red-deck'
}

const quadrantColor = (color: TColor) => {
  const entries = Object.entries(colors)
  
  if (entries.length) {
    const match = entries.find(entry => entry[0] === color)

    if (match?.length) {
      return match[1]
    }
  }

  return 'bg-transparent'
}

export default quadrantColor