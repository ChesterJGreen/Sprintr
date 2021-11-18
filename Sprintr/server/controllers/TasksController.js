import { Auth0Provider } from '@bcwdev/auth0provider'
import { tasksService } from '../services/TasksService'
import BaseController from '../utils/BaseController'
import { notesService } from '../services/NotesService'
// import Task from '../models/Task'

export class TasksController extends BaseController {
  constructor() {
    super('api/tasks')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getOne)
      .get('/:id/notes', this.getNotesByTaskId)
      // .get('/:id/backlogid', this.getByBacklogId)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.destroy)
  }

  async getAll(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const tasks = await tasksService.getAll(req.query)
      res.send(tasks)
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const task = await tasksService.getOne(req.params.id)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async getNotesByTaskId(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const notes = await notesService.getNotesByTaskId({ taskId: req.params.id })
      res.send(notes)
    } catch (error) {

    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const task = await tasksService.create(req.body)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const task = await tasksService.edit(req.body)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async destroy(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await tasksService.destroy(req.params.id))
    } catch (error) {
      next(error, 'could not delete')
    }
  }
}
