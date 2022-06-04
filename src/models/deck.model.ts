import { ICard } from '@/types'
import { Schema, Document, model } from 'mongoose'

export interface IDeck {
  type: string
  shuffled: string
  cards: ICard[]
}

export default interface IDeckModel extends Document, IDeck {}

const schema = new Schema(
  {
    type: {
      type: String,
      required: true,
      minlength: 4,
    },
    shuffled: {
      type: Boolean,
      required: true,
    },
    cards: [
      {
        value: String,
        suit: String,
        code: String,
      },
    ],
  },
  {
    timestamps: true,
  },
)

export const Deck = model<IDeckModel>('Deck', schema)
