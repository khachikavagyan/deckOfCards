import { DeckType } from '../../types'
import { createNewDeck } from './'

describe('Deck model', () => {
  it('should create a short deck', async () => {
    const deck = createNewDeck(DeckType.SHORT)
    expect(deck.length).toBe(32)
  })

  it('should create a full deck', async () => {
    const deck = createNewDeck(DeckType.FULL)
    expect(deck.length).toBe(52)
  })
})
