<template>
  <div class="col-md-10 offset-1 card mb-3 shadow py-2">
    <!-- I want the following idea here v-if="projectId === b.projectId" -->
    <div class="row">
      <div class="col-md-1">
        <button class="btn btn-outline-primary" title="delete" @click.prevent="destroySprint(sprint.id)">
          X
        </button>
      </div>
      <div class="col-md-11 pb-2 text-uppercase ">
        🐢 {{ sprint.name }}<br>
        {{ sprint.projectName }} It is {{ sprint.isOpen }} that this sprint is open
      </div>

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
                <button @click.prevent="destroyTask(t.id)">
                  Delete
                </button>
              </div>
              <div class="p-1">
                <p>task weight: {{ t.weight }} </p>
                <br>
                Status:{{ t.status }}
              </div>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2/dist/sweetalert2.all'
import { sprintsService } from '../services/SprintsService'
import Pop from '../utils/Notifier'
import { AppState } from '../AppState'
import { computed } from '@vue/runtime-core'
export default {
  name: 'Component',
  props: {
    sprint: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {

      tasks: computed(() => AppState.tasks.filter(t => t.sprintId === props.sprint.id)),

      async destroySprint(id) {
        console.log(id)
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
              await sprintsService.destroySprint(id)
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
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
