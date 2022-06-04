import faker from 'faker'
import { createNewDeck } from '../utils/cards'
import { IDeck, Deck } from './deck.model'
import { DeckType } from '../types'

describe('Deck model', () => {
  let newDeck: IDeck
  beforeEach(() => {
    const deckType = faker.helpers.randomize([DeckType.SHORT, DeckType.FULL])
    newDeck = {
      type: deckType,
      shuffled: faker.datatype.boolean(),
      cards: createNewDeck(deckType),
    }
  })

  it('should correctly validate', async () => {
    await expect(new Deck(newDeck).validate()).resolves.toBeUndefined()
  })

  it('should throw a validation error if type is empty', async () => {
    delete newDeck.type
    await expect(new Deck(newDeck).validate()).rejects.toThrow()
  })

  it('should throw a validation error if type is less than 4 characters', async () => {
    newDeck.type = 'xx'
    await expect(new Deck(newDeck).validate()).rejects.toThrow()
  })

  it('should throw a validation error if shuffled is empty', async () => {
    delete newDeck.shuffled
    await expect(new Deck(newDeck).validate()).rejects.toThrow()
  })
})
