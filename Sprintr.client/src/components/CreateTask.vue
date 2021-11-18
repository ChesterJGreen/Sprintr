<template>
  <div class="modal fade" :id="'create-task'+ btask.id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Add Task
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
            v-model="state.newTask.description"
            :id="`description-${btask.id}`"
            placeholder="Task description..."
          >
          <br>
          <label for="weight" class="text-dark">Weight</label>
          <input
            class="form-control"
            type="number"
            v-model="state.newTask.weight"
            id="weight"
            max="5"
            min="1"
            placeholder="1"
          >
        </div>
        <div class="modal-footer">
          <button type="button" @click.stop="createTask" class="btn btn-primary" data-toggle="modal" data-target="#create-task">
            Create Task
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { tasksService } from '../services/TasksService'
import Pop from '../utils/Notifier'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { useRoute, useRouter } from 'vue-router'
import $ from 'jquery'

export default {
  name: 'Component',
  props: {
    btask: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    const route = useRoute()
    const state = reactive({
      newTask: {
        weight: 0
      }
    })
    return {
      state,
      route,
      router,
      account: computed(() => AppState.account),
      tasks: computed(() => AppState.tasks),
      async createTask() {
        try {
          state.newTask.projectId = route.params.id
          state.newTask.backlogItemId = props.btask.id
          await tasksService.createTask(state.newTask)
          state.newTask = {}
          Pop.toast('Task Created', 'success')
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
