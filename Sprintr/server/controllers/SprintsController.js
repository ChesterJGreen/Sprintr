import { Auth0Provider } from '@bcwdev/auth0provider'
import { sprintsService } from '../services/SprintsService'
import { tasksService } from '../services/TasksService'
import BaseController from '../utils/BaseController'
// import Sprint from '../models/Sprint'

export class SprintsController extends BaseController {
  constructor() {
    super('api/sprints')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getOne)
      .get('/:id/tasks', this.getTasksById)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.destroy)
  }

  async getAll(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const sprints = await sprintsService.getAll(req.query)
      res.send(sprints)
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const sprint = await sprintsService.getOne(req.params.id)
      res.send(sprint)
    } catch (error) {
      next(error)
    }
  }

  async getTasksById(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const tasks = await tasksService.getTasksById({ taskId: req.params.id })
      res.send(tasks)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const sprint = await sprintsService.create(req.body)
      res.send(sprint)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const sprint = await sprintsService.edit(req.body)
      res.send(sprint)
    } catch (error) {
      next(error)
    }
  }

  async destroy(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await sprintsService.destroy(req.params.id))
    } catch (error) {
      next(error, 'could not delete')
    }
  }
}
