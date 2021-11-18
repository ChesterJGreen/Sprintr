import { Auth0Provider } from '@bcwdev/auth0provider'
import { projectsService } from '../services/ProjectsService'
import BaseController from '../utils/BaseController'
import { sprintsService } from '../services/SprintsService'
import { backlogItemsService } from '../services/BacklogItemsService'
import { tasksService } from '../services/TasksService'
// import Project from '../models/Project'

export class ProjectsController extends BaseController {
  constructor() {
    super('api/projects')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getOne)
      .get('/:id/sprints', this.getSprintById)
      .get('/:id/backlogitem', this.getBacklogItemById)
      .get('/:id/tasks', this.getTasksByProjectId)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.destroy)
  }

  async getTasksByProjectId(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const tasks = await tasksService.getTasksByProjectId({ projectId: req.params.id })
      res.send(tasks)
    } catch (error) {
      next(error)
    }
  }

  async getProjectsByUserId(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const projects = await projectsService.getProjectsByUserId(req.query)
      res.send(projects)
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const projects = await projectsService.getAll(req.query)
      res.send(projects)
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const project = await projectsService.getOne(req.params.id)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }

  async getSprintById(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const sprint = await sprintsService.getSprintById({ projectId: req.params.id })
      res.send(sprint)
    } catch (error) {
      next(error)
    }
  }

  async getBacklogItemById(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const backlogItem = await backlogItemsService.getBacklogItemById({ projectId: req.params.id })
      res.send(backlogItem)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const project = await projectsService.create(req.body)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const project = await projectsService.edit(req.body)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }

  async destroy(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await projectsService.destroy(req.params.id, req.userInfo.id))
    } catch (error) {
      next(error, 'could not delete')
    }
  }
}
