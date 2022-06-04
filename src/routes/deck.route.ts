import { Deck } from '@/models/deck.model'
import ApiError from '@/utils/ApiError'
import express from 'express'
import httpStatus from 'http-status'
import { createNewDeck, shuffle } from '../utils/cards'

const router = express.Router()

// create a deck
router.post('/', async (req, res, next) => {
  try {
    const payload = req.body
    payload.cards = createNewDeck(req.body.type)
    if (payload.shuffled) payload.cards = shuffle(payload.cards)
    const deck = new Deck(payload)
    await deck.save()
    res.json({
      deckId: deck._id,
      type: deck.type,
      shuffled: deck.shuffled,
      remaining: deck.cards.length,
    })
  } catch (e) {
    next(e)
  }
})

// open the deck
router.get('/:id', async (req, res, next) => {
  try {
    const deck = await Deck.findOne({ _id: req.params.id })
    if (!deck) throw new ApiError(httpStatus.NOT_FOUND, 'Deck not found')
    res.json({
      deckId: deck._id,
      shuffled: deck.shuffled,
      type: deck.type,
      cards: deck.cards,
      remaining: deck.cards.length,
    })
  } catch (e) {
    next(e)
  }
})

// draw cards
router.get('/:id/draw', async (req, res, next) => {
  try {
    const deck = await Deck.findOne({ _id: req.params.id }, { _id: 0, cards: 1 })
    if (!deck) throw new ApiError(httpStatus.NOT_FOUND, 'Deck not found')
    deck.cards.splice(0, Number(req.query.count || 0))
    await Deck.updateOne({ _id: req.params.id }, { $set: { cards: deck.cards } })
    res.json(deck)
  } catch (e) {
    next(e)
  }
})

export default router
