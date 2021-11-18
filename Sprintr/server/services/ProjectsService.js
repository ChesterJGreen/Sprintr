import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class ProjectsService {
  async getProjectsByUserId(query) {
    return await dbContext.Project.find(query)
  }

  async getAll(query) {
    return await dbContext.Project.find(query).populate('creator', 'name')
  }

  async getOne(id) {
    const project = await dbContext.Project.findById(id).populate('creator', 'name')
    if (!project) {
      throw new BadRequest('invalid id')
    }
    // if (!project.creatorId.toString() !== userId) {
    //   throw new Forbidden('This is not your project')
    // }
    // NOTE can we use userId or accountId?
    return project
  }

  async create(body) {
    const project = await dbContext.Project.create(body)
    return await this.getOne(project.id)
  }

  async edit(body) {
    await this.getOne(body.id)
    const project = await dbContext.Project.findByIdAndUpdate(body.id, body, { new: true, runValidators: true })
    return project
  }

  async destroy(id, userId) {
    await this.getOne(id)
    const deleted = await dbContext.Project.findOneAndDelete({ _id: id, creatorId: userId })
    if (!deleted) {
      throw new BadRequest('project was not deleted')
    }
    return deleted
  }
}
export const projectsService = new ProjectsService()
