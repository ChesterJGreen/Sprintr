import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import { api } from './AxiosService'

class SprintsService {
  async getAllSprintsByProjectId(id) {
    const res = await api.get(`api/projects/${id}/sprints`)
    console.log(res.data)
    AppState.sprints = res.data
  }

  async getSprintById(id) {
    const res = await api.get(`api/sprints/${id}`)
    AppState.activeSprint = res.data
  }

  async createSprint(newSprint) {
    try {
      const res = await api.post('api/sprints', newSprint)
      logger.log(res.data)
      AppState.sprints = [...AppState.sprints, res.data]
    } catch (error) {
      logger.error(error)
    }
  }

  async editSprint(id, body) {
    const res = await api.put('api/sprints' + id, body)
    AppState.sprints = res.data
  }

  async destroySprint(id) {
    console.log(id)
    await api.delete('api/sprints/' + id)
    const allSprints = AppState.sprints
    AppState.sprints = allSprints.filter(p => p.id !== id)
  }
}
export const sprintsService = new SprintsService()
