<template>
  <div class="col-md-12 procard shadow bg-secondary mb-2 rounded">
    <router-link :to="{ name: 'BacklogPage', params: {id: project.id}}" @click.stop="">
      <div class="row my-4">
        <div class="col-12 action text-right mb-2">
          <button class="btn btn-outline-primary" title="Delete" @click.stop.prevent="destroyProject(project.id)">
            X
          </button>
        </div>
        <div class="col-md-4 text-left" v-if="project">
          <b>{{ project.name }}</b>
          <p>{{ project.description }}</p>
        </div>
        <div class="text-center col-md-4">
          {{ project.creator.name }}
        </div>
        <div class="col-md-4 text-right">
          {{ new Date(project.createdAt).toLocaleString() }}
        </div>
      </div>
    </router-link>
  </div>

  <!-- <hr class="bg-primary"> -->
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Swal from 'sweetalert2/dist/sweetalert2.all'
import { projectsService } from '../services/ProjectsService'
import Pop from '../utils/Notifier'

export default {
  name: 'ProjectCard',
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      account: computed(() => AppState.account),
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
  }
}
</script>
<style scoped>
hr {width: 98% ;margin-left: auto;margin-right: auto;height: 1px; opacity: 0.1;}
.procard:hover{
  color: #003566;
  transform: scale(1.02);
  cursor: pointer;
}
</style>
