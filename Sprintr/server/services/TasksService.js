import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class TasksService {
  async getTasksByProjectId(query) {
    return await dbContext.Task.find(query).populate('creator', 'name')
  }

  async getTasksById(query) {
    return await dbContext.Task.find(query)
  }

  async getTasksByUserId(query) {
    return await dbContext.Task.find(query)
  }

  async getAll(query) {
    return await dbContext.Task.find(query).populate('creator', 'name')
  }

  async getOne(id) {
    const task = await dbContext.Task.findById(id).populate('creator', 'name')
    if (!task) {
      throw new BadRequest('invalid id')
    }
    // if (!task.creatorId.toString() !== userId) {
    //   throw new Forbidden('This is not your task')
    // }
    // NOTE can we use userId or accountId?
    return task
  }

  async create(body) {
    const task = await dbContext.Task.create(body)
    return await this.getOne(task.id)
  }

  async edit(body) {
    await this.getOne(body.id)
    const task = await dbContext.Task.findByIdAndUpdate(body.id, body, { new: true, runValidators: true })
    return task
  }

  async destroy(id) {
    await this.getOne(id)
    return await dbContext.Task.findByIdAndDelete(id)
  }
}
export const tasksService = new TasksService()
