import { IDeck } from '@/models/deck.model'
import request from 'supertest'
import app from '@/app'
import setupTestDB from '../utils/setupTestDB'
import { DeckType } from '@/types'

setupTestDB()

describe('Deck Routes', () => {
  let payload: IDeck

  beforeEach(async () => {
    payload = {
      type: DeckType.SHORT,
      shuffled: true,
    }
  })

  describe('POST /deck', () => {
    it('should create a deck with 200 status', async () => {
      const res = await request(app).post('/deck').send(payload).expect(200)
      expect(res.body).toHaveProperty('deckId')
      expect(res.body).toHaveProperty('type')
      expect(res.body).toHaveProperty('shuffled')
      expect(res.body).toHaveProperty('remaining')
    })
  })

  describe('GET /deck/:id', () => {
    it('should return deck with 200 status ', async () => {
      const resInsert = await request(app).post('/deck').send(payload).expect(200)
      const res = await request(app).get(`/deck/${resInsert.body.deckId}`).expect(200)
      expect(res.body).toHaveProperty('type')
      expect(res.body).toHaveProperty('remaining')
      expect(res.body).toHaveProperty('shuffled')
      expect(res.body).toHaveProperty('cards')
    })

    it('should return 404 error if not found deck by id ', async () => {
      await request(app).get('/deck/60aa2e8ed87c9ffe67df0000').expect(404)
    })
  })

  describe('GET /deck/:id/draw', () => {
    it('should return cards with 200 status ', async () => {
      const resInsert = await request(app).post('/deck').send(payload).expect(200)
      const res = await request(app).get(`/deck/${resInsert.body.deckId}/draw?count=2`).expect(200)
      expect(res.body).toHaveProperty('cards')
    })

    it('should return 404 error if not found deck by id ', async () => {
      await request(app).get('/deck/60aa2e8ed87c9ffe67df0000/draw').expect(404)
    })
  })
})
