import { Auth0Provider } from '@bcwdev/auth0provider'
import { backlogItemsService } from '../services/BacklogItemsService'
import BaseController from '../utils/BaseController'
import { tasksService } from '../services/TasksService'
// import BacklogItem from '../models/BacklogItem'

export class BacklogItemsController extends BaseController {
  constructor() {
    super('api/backlogitem')
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
      const backlogItems = await backlogItemsService.getAll(req.query)
      res.send(backlogItems)
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const backlogItem = await backlogItemsService.getOne(req.params.id)
      res.send(backlogItem)
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
      const backlogItem = await backlogItemsService.create(req.body)
      res.send(backlogItem)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const backlogItem = await backlogItemsService.edit(req.body)
      res.send(backlogItem)
    } catch (error) {
      next(error)
    }
  }

  async destroy(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id

      res.send(await backlogItemsService.destroy(req.params.id, req.userInfo.id))
    } catch (error) {
      next(error, 'could not delete')
    }
  }
}
