<template>
  <div class="component container-fluid text-light">
    <div class="row  bg-info bar  ">
      <div class="col-md-2 pr-0">
        Project:
        <br>
        <em> {{ project.name }}</em>
      </div>
      <div class="col-md-1 action text-left pt-2 text-light">
        <router-link class="btn btn-outline-light pb-3 action" :to="{ name: 'BacklogPage'}">
          Backlog
        </router-link>
      </div>
      <div class="col-md-1 action pt-2 text-light">
        <router-link class="btn btn-outline-light pb-3 ml-3" :to="{ name: 'SprintPage'}">
          Sprints
        </router-link>
      </div>
      <div class="col-md-7 text-right pt-2">
        <button class="btn btn-warning" title="Delete" @click="destroyProject(project.id)">
          X
        </button>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { projectsService } from '../services/ProjectsService'
import { useRoute, useRouter } from 'vue-router'
import Pop from '../utils/Notifier'
import { sprintsService } from '../services/SprintsService'
import { backlogItemsService } from '../services/BacklogItemsService'
import Swal from 'sweetalert2/dist/sweetalert2.all'

export default {
  // props: {
  //   backlog: {
  //     type: Object,
  //     required: true
  //   }
  // },
  name: 'Backlog',
  setup() {
    const router = useRouter()
    const route = useRoute()
    onMounted(async() => {
      try {
        await projectsService.getProjectById(route.params.id)
        console.log('PD on mounted')
        await backlogItemsService.getBacklogItemByProjectId(route.params.id)
        await sprintsService.getAllSprintsByProjectId(route.params.id)
      } catch (error) {
        Pop.toast('You failed' + error, 'error')
      }
    })
    return {
      backlogs: computed(() => AppState.backlogs),
      project: computed(() => AppState.activeProject),
      activeProject: computed(() => AppState.activeProject),
      activeBacklog: computed(() => AppState.activeBacklog),
      sprints: computed(() => AppState.tasks),
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
      },
      async destroyProject(id) {
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
              router.push({ name: 'Home' })
              await projectsService.destroyProject(id)
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

  }
}
</script>

<style lang="scss" scoped>
.bar{
  height: 4rem;
}

</style>
