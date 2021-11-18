<template>
  <div class="col-md-12 d-flex flex-row">
    <div v-for="t in tasks" :key="t.id" :task="t">
      <ol>
        <li class="card p-2">
          <div>
            Tasks:
            {{ t.description }}
            <div>
              <button type="button" data-target="#createNote" data-toggle="modal" class="mx-2 my-1">
                Notes
              </button>
              <CreateNote :task="t" />
              <button title="delete" @click.prevent="destroyTask(t.id)">
                Delete
              </button>
            </div>
            <div class="p-1">
              <p>task weight: {{ t.weight }} </p>
              Status: {{ t.status }}
              <br>
              <br>
              Change Status:
              <select v-model="state.selectedStatus" @change="logStatus(t.id)" class="pb-1 action">
                <!-- inline object literal -->
                <option v-for="s in status" :value="s.name" :key="s.id">
                  {{ s.name }}
                </option>
              </select>
              <div class="mt-1">
                Sprint:
                <select v-model="state.selectedSprint" @change="assignSprint(t.id)" :value="sprint.name" class="pb-1 action">
                  <!-- inline object literal -->
                  <option v-for="sprint in sprints" :value="sprint.id" :key="sprint.id">
                    {{ sprint.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </li>
      </ol>
    </div>
    <!-- <CreateNote :task="t" /> -->
    <!-- <div> Total Weight</div> -->
  </div>
</template>

<script>
import { computed, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { tasksService } from '../services/TasksService'
import Swal from 'sweetalert2/dist/sweetalert2.all'
import Pop from '../utils/Notifier'
import { logger } from '../utils/Logger'
import { sprintsService } from '../services/SprintsService'
import CreateNote from '../components/CreateNote.vue'

export default {
  name: 'Component',
  props: {
    btask: {
      type: Object,
      required: true
    },
    task: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const state = reactive({
      selectedStatus: '',
      selectedSprint: ''
    })
    return {
      state,
      status: [
        { name: 'pending', value: 1 },
        { name: 'in-progress', value: 2 },
        { name: 'review', value: 3 },
        { name: 'done', value: 4 }
      ],
      selectedStatus: '',
      sprint: {},
      tasks: computed(() => AppState.tasks.filter(t => t.backlogItemId === props.btask.id)),
      sprints: computed(() => AppState.sprints),
      weight: computed(() => AppState.tasks.weight),
      // task: computed(() => AppState.task),
      async logStatus(task) {
        console.log(task)
        // do a put status
        try {
          const newStatus = state.selectedStatus
          // const editedTask = task
          // editedTask.status = newStatus
          // debugger
          console.log(newStatus)
          await tasksService.editTask(task, newStatus)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async assignSprint(task) {
        try {
          const newSprint = state.selectedSprint
          await tasksService.editTaskBySprint(task, newSprint)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async destroyTask(id) {
        try {
          await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then(async(result) => {
            if (result.isConfirmed) {
              await tasksService.destroyTask(id)
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }

    }
  },
  components: {
    CreateNote
  }
}
</script>

<style lang="scss" scoped>

</style>
