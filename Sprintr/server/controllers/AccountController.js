import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { projectsService } from '../services/ProjectsService'
import { tasksService } from '../services/TasksService'
import { notesService } from '../services/NotesService'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/:id/projects', this.getProjectsByUserId)
      .get('/:id/tasks', this.getTasksByUserId)
      .get('/:id/notes', this.getNotesByUserId)
  }

  async getProjectsByUserId(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const projects = await projectsService.getProjectsByUserId({ userId: req.params.id })
      res.send(projects)
    } catch (error) {
      next(error)
    }
  }

  async getTasksByUserId(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const tasks = await tasksService.getTasksByUserId({ userId: req.params.id })
      res.send(tasks)
    } catch (error) {
      next(error)
    }
  }

  async getNotesByUserId(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const notes = await notesService.getNotesByUserId({ userId: req.params.id })
      res.send(notes)
    } catch (error) {
      next(error)
    }
  }

  async getUserAccount(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }
}
