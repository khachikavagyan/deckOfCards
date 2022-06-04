import express from 'express'

import deck from './deck.route'

const router = express.Router()

router.use('/deck', deck)

export default router
