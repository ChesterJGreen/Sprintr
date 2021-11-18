import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class SprintsService {
  async getSprintById(query) {
    return await dbContext.Sprint.find(query)
  }

  async getAll(query) {
    return await dbContext.Sprint.find(query).populate('creator', 'name')
  }

  async getOne(id) {
    const sprint = await dbContext.Sprint.findById(id).populate('creator', 'name')
    if (!sprint) {
      throw new BadRequest('invalid id')
    }
    // if (!sprint.creatorId.toString() !== userId) {
    //   throw new Forbidden('This is not your sprint')
    // }
    // NOTE can we use userId or accountId?
    return sprint
  }

  async create(body) {
    const sprint = await dbContext.Sprint.create(body)
    return await this.getOne(sprint.id)
  }

  async edit(body) {
    await this.getOne(body.id)
    const sprint = await dbContext.Sprint.findByIdAndUpdate(body.id, body, { new: true, runValidators: true })
    return sprint
  }

  async destroy(id, userId) {
    await this.getOne(id)
    const deleted = await dbContext.Sprint.findOneAndDelete({ _id: id, creatorId: userId })
    if (!deleted) {
      throw new BadRequest('sprint was not deleted')
    }
    return deleted
  }
}
export const sprintsService = new SprintsService()
