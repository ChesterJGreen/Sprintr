<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center row">
    <div class="col-md-12 bg-secondary-dark shadow">
      <div class="row mt-3 pb-3">
        <div class="col-md-6 pl-5 text-left">
          <h3> Projects</h3>
          <p>a list of all your projects</p>
        </div>
        <div class="col-md-6 d-flex flex-row justify-content-end pr-5">
          <button type="button" data-target="#createProject" data-toggle="modal" class="btn btn-primary ">
            Create Project
          </button>
        </div>
        <CreateProject />
      </div>
      <hr class="bg-primary rounded my-0">
      <div class="row  p-5">
        <div class="col-md-12 d-flex justify-content-between">
          <ProjectsComponent :projects="projects" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed, reactive } from '@vue/runtime-core'
import ProjectsComponent from '../components/ProjectsComponent.vue'
import { projectsService } from '../services/ProjectsService'
import Pop from '../utils/Notifier'
import { AppState } from '../AppState'
// import Swal from 'sweetalert2'

export default {
  name: 'Home',
  setup() {
    const state = reactive({
      dropOpen: false,
      newProject: {}
    })
    onMounted(async() => {
      try {
        // debugger
        await projectsService.getAllProjects()
        console.log('In mounted at home page')
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      state,
      projects: computed(() => AppState.projects),
      account: computed(() => AppState.account),
      components: {
        ProjectsComponent
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
hr {width: 95% ;margin-left: auto;margin-right: auto;height: 2px; opacity: 0.5;}
</style>
