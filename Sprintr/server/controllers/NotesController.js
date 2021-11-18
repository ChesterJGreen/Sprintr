import { Auth0Provider } from '@bcwdev/auth0provider'
import { notesService } from '../services/NotesService'
import BaseController from '../utils/BaseController'
// import Note from '../models/Note'

export class NotesController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getOne)
      // .get('/:id/sprint', this.getBySprint)
      // .get('/:id/backlogid', this.getByBacklogId)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.destroy)
  }

  async getAll(req, res, next) {
    try {
      const notes = await notesService.getAll(req.query)
      res.send(notes)
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const note = await notesService.getOne(req.params.id)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const note = await notesService.create(req.body)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const note = await notesService.edit(req.body)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async destroy(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await notesService.destroy(req.params.id, req.userInfo.id))
    } catch (error) {
      next(error, 'could not delete')
    }
  }
}
