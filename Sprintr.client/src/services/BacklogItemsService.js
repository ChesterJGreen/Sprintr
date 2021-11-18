import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import { api } from './AxiosService'

class BacklogItemsService {
  async getBacklogItemByProjectId(id) {
    const res = await api.get(`api/projects/${id}/backlogitem`)
    logger.log(res.data)
    AppState.activeBacklog = res.data
  }

  async createBacklogItem(newBacklogs) {
    try {
      const res = await api.post('api/backlogitem', newBacklogs)
      logger.log(res.data)
      AppState.activeBacklog = [...AppState.activeBacklog, res.data]
    } catch (error) {
      logger.error(error)
    }
  }

  async countWeight(id, weight) {
    const res = await api.put('api/backlogitem' + id, weight)
    const count = 0
    weight += count
    console.log(count)
    AppState.backlogItems.weight = res.data
  }

  async editBacklogItem(id, body) {
    const res = await api.put('api/backlogitem' + id, body)
    AppState.backlogItems = res.data
  }

  async destroyBacklogItem(id) {
    await api.delete('api/backlogitem/' + id)
    const allBacklogItems = AppState.activeBacklog
    AppState.activeBacklog = allBacklogItems.filter(p => p.id !== id)
  }
}
export const backlogItemsService = new BacklogItemsService()
