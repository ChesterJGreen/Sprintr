import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import { api } from './AxiosService'

class NotesService {
  async getAllNotesByTaskId(id) {
    const res = await api.get(`api/tasks/${id}/notes`)
    console.log(res.data)
    AppState.notes = res.data
  }

  async getNoteById(id) {
    const res = await api.get(`api/notes/${id}`)
    AppState.activeNote = res.data
  }

  async createNote(newNote) {
    try {
      logger.log(newNote)
      const res = await api.post('api/notes', newNote)
      logger.log(res.data)
      AppState.notes = [...AppState.notes, res.data]
      return res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async editNote(id, body) {
    const res = await api.put('api/notes' + id, body)
    AppState.notes = res.data
  }

  async destroyNote(id) {
    console.log(id)
    await api.delete('api/notes/' + id)
    const allNotes = AppState.notes
    AppState.notes = allNotes.filter(p => p.id !== id)
  }
}
export const notesService = new NotesService()
