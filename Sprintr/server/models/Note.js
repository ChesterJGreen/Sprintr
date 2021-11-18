import mongoose from 'mongoose'
import { AccountSchema } from './Account'
const Schema = mongoose.Schema

export const Note = new Schema(
  {

    body: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    taskId: { type: Schema.Types.ObjectId, ref: 'Task', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

AccountSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: 'id',
  justOne: true
})
