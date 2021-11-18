import mongoose from 'mongoose'
import { AccountSchema } from './Account'
import { BacklogItem } from './BacklogItem'
import { Project } from './Project'
import { Sprint } from './Sprint'
const Schema = mongoose.Schema

export const Task = new Schema(
  {

    description: { type: String, required: true },
    sprintId: { type: Schema.Types.ObjectId, ref: 'Sprint' },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    backlogItemId: { type: Schema.Types.ObjectId, ref: 'BacklogItem', required: true },
    status: { type: String, enum: ['pending', 'in-progress', 'review', 'done'] },
    weight: { type: Number, default: 0, required: true },
    assignedTo: { type: [Schema.Types.ObjectId] }

  },
  { timestamps: true, toJSON: { virtuals: true } }
)

AccountSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
Project.virtual('project', {
  localField: 'projectId',
  ref: 'Project',
  foreignField: '_id',
  justOne: true
})
Sprint.virtual('sprint', {
  localField: 'sprintId',
  ref: 'Sprint',
  foreignField: '_id',
  justOne: true
})
BacklogItem.virtual('backlogitem', {
  localField: 'backlogId',
  ref: 'BacklogItem',
  foreignField: '_id',
  justOne: true
})
