<template>
  <div class="modal fade" id="createSprint" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Create Sprint
          </h5>
          <button type="button" class="btn-close btn btn-outline-danger" data-dismiss="modal" aria-label="Close" title="close">
            X
          </button>
        </div>
        <div class="modal-body">
          <!-- VModel -->
          <input
            class="form-control"
            type="text"
            v-model="state.newSprint.name"
            id="name"
            placeholder="Sprint name..."
          >
          <br>
          <div>
            <label for="date" class="text-dark">Start Date</label>
            <input
              type="date"
              class="form-control"
              id="startDate"
              v-model="state.newSprint.startDate"
              rows="5"
              placeholder="Date"
            >
          </div>
          <div>
            <label for="date" class="text-dark">End Date</label>
            <input
              type="date"
              class="form-control"
              id="endDate"
              v-model="state.newSprint.endDate"
              rows="5"
              placeholder="Date"
            >
          </div>
        </div>
        <div class="modal-footer">
          <button type="submit" @click="createSprint" class="btn btn-primary" data-toggle="modal" data-target="#createSprint">
            Create Sprint
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { sprintsService } from '../services/SprintsService'
import Pop from '../utils/Notifier'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'Component',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const state = reactive({
      newSprint: {}
    })
    return {
      state,
      route,
      router,
      account: computed(() => AppState.account),
      sprints: computed(() => AppState.sprints),
      async createSprint() {
        try {
          state.newSprint.projectId = route.params.id
          await sprintsService.createSprint(state.newSprint)
          state.newSprint = {}
          Pop.toast('Sprint Created', 'success')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  },

  components: {}
}
</script>

<style lang="scss" scoped>

</style>
