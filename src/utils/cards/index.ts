import { DeckType, ICard } from '../../types'

export const createNewDeck = (type: DeckType): ICard[] => {
  const suits = ['HEARTS', 'CLUBS', 'SPADES', 'DIAMONDS']
  let symbols = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'JACK', 'QUEEN', 'KING', 'ACE']
  if (type === DeckType.SHORT) {
    symbols = symbols.slice(5)
  }
  const deck = []

  for (let i = 0; i < suits.length; i++) {
    for (let c = 0; c < symbols.length; c++) {
      const code =
        typeof symbols[c] === 'string' ? String(symbols[c])[0].concat(suits[i][0]) : String(symbols[c]).concat(suits[i][0])
      deck.push({
        value: String(symbols[c]),
        suit: suits[i],
        code,
      })
    }
  }

  return deck
}

export const shuffle = (deck: ICard[]): ICard[] => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i)
    const temp = deck[i]
    deck[i] = deck[j]
    deck[j] = temp
  }
  return deck
}
