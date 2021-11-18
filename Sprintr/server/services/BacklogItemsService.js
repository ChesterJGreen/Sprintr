import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class BacklogItemsService {
  async getBacklogItemById(query) {
    return await dbContext.BacklogItem.find(query)
  }

  async getAll(query) {
    return await dbContext.BacklogItem.find(query).populate('creator', 'name')
  }

  async getOne(id) {
    const backlogItem = await dbContext.BacklogItem.findById(id).populate('creator', 'name')
    if (!backlogItem) {
      throw new BadRequest('invalid id')
    }
    // if (!backlogItem.creatorId.toString() !== userId) {
    //   throw new Forbidden('This is not your backlogItem')
    // }
    // NOTE can we use userId or accountId?
    return backlogItem
  }

  async create(body) {
    const backlogItem = await dbContext.BacklogItem.create(body)
    return await this.getOne(backlogItem.id)
  }

  async edit(body) {
    await this.getOne(body.id)
    const backlogItem = await dbContext.BacklogItem.findByIdAndUpdate(body.id, body, { new: true, runValidators: true })
    return backlogItem
  }

  async destroy(id, userId) {
    await this.getOne(id)
    const deleted = await dbContext.BacklogItem.findOneAndDelete({ _id: id, creatorId: userId })
    if (!deleted) {
      throw new BadRequest('backlog not deleted')
    }
    return deleted
  }
}
export const backlogItemsService = new BacklogItemsService()
