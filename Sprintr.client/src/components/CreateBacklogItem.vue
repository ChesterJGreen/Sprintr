<template>
  <div class="modal fade" id="createBacklogItem" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Create BacklogItem
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
            v-model="state.newBacklogItem.name"
            id="name"
            placeholder="Name BacklogItem..."
          >
          <br>
          <input
            class="form-control"
            id="body"
            v-model="state.newBacklogItem.body"
            rows="5"
            placeholder="Body..."
          >
        </div>
        <div class="modal-footer">
          <button type="submit" @click="createBacklogItem" class="btn btn-primary" data-toggle="modal" data-target="#createBacklogItem">
            Submit BacklogItem
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { backlogItemsService } from '../services/BacklogItemsService'
import Pop from '../utils/Notifier'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'Component',
  setup() {
    const route = useRoute()
    const state = reactive({

      newBacklogItem: {}
    })
    return {
      state,
      account: computed(() => AppState.account),
      backlogs: computed(() => AppState.backlogs),
      async createBacklogItem() {
        try {
          state.newBacklogItem.projectId = route.params.id
          await backlogItemsService.createBacklogItem(state.newBacklogItem)
          state.newBacklogItem = {}
          Pop.toast('BacklogItem Created', 'success')
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
