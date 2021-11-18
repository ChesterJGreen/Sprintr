import mongoose from 'mongoose'

import { AccountSchema } from '../models/Account'
import { Project } from '../models/Project'
import { BacklogItem } from '../models/BacklogItem'
import { Note } from '../models/Note'
import { Task } from '../models/Task'
import { Sprint } from '../models/Sprint'

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Project = mongoose.model('Project', Project);
  BacklogItem = mongoose.model('BacklogItem', BacklogItem);
  Note = mongoose.model('Note', Note);
  Task = mongoose.model('Task', Task)
  Sprint = mongoose.model('Sprint', Sprint)
}

export const dbContext = new DbContext()
