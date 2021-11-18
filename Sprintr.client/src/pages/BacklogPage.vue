<template>
  <div class="row bg-secondary-dark mx-5 pb-5 d-flex justify-content-start mt-2 shadow">
    <div class="col-md-6 py-2 ">
      Backlog Items for:
      <br>
      <h4>
        <em>
          {{ project.name }}</em>
      </h4>
      {{ project.description }}
    </div>
    <div class="col-md-6 text-right p-4">
      <button class="btn btn-outline-primary" type="button" data-target="#createBacklogItem" data-toggle="modal">
        Add Item
      </button>
    </div>
    <CreateBacklogItem />
  </div>
  <div class="row bg-secondary-dark mx-5">
    <div class="col-md-10 offset-1 card mb-3 shadow py-2 bg-warning" v-for="b in activeBacklog" :key="b.id">
      <!-- THIS IS THE CARD -->
      <div class="row  ">
        <div class="col-md-1">
          <button class="btn btn-outline-primary" title="delete" @click.prevent="destroyBacklogItem(b.id)">
            X
          </button>
        </div>
        <div class="col-md-5  ">
          <span class="text-uppercase"> 🐢 {{ b.name }} </span>
          <br>
          <p class="text-italic pt-1">
            description: {{ b.body }}
          </p>
        </div>
        <div class="col-md-3 ">
          Total Weight:
          <br>
          {{ weight }}
          <!-- <p>{{ weight }}</p> -->
        </div>
        <div class="col-md-3 d-flex justify-content-end">
          <button class="btn btn-outline-primary btn-sm m-2" :data-target="'#create-task'+ b.id" data-toggle="modal">
            Add Task +
          </button>
        </div>
        <hr>
      </div>
      <div class="row">
        <BLItemComponent :btask="b" />
      </div>
      <CreateTask :btask="b" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { projectsService } from '../services/ProjectsService'
import { useRoute, useRouter } from 'vue-router'
import Pop from '../utils/Notifier'
import CreateBacklogItem from '../components/CreateBacklogItem.vue'
import { backlogItemsService } from '../services/BacklogItemsService'
import Swal from 'sweetalert2/dist/sweetalert2.all'
import { tasksService } from '../services/TasksService'

export default {

  name: 'Backlog',
  props: {
    // count: {
    //   type: Number,
    //   required: true,
    //   total: 0
    // }
  },
  setup(props) {
    const route = useRoute()
    onMounted(async() => {
      try {
        await projectsService.getProjectById(route.params.id)
        // await backlogItemsService.countWeight()
        await backlogItemsService.getBacklogItemByProjectId(route.params.id)
        await tasksService.getAllTasksByProjectId(route.params.id)
        // await tasksService.getAllTasksByBacklogId(route.params.id)
      } catch (error) {
        Pop.toast('You failed' + error, 'error')
      }
    })
    return {
      backlogs: computed(() => AppState.backlogs),
      project: computed(() => AppState.activeProject),
      activeProject: computed(() => AppState.activeProject),
      activeBacklog: computed(() => AppState.activeBacklog),
      tasks: computed(() => AppState.tasks),
      weight: computed(() => AppState.tasks.weight),

      // async counter(count) {

      // },

      async destroyBacklogItem(id) {
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
              await backlogItemsService.destroyBacklogItem(id)
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
    CreateBacklogItem
  }
}
</script>

<style lang="scss" scoped>

</style>
