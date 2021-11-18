<template>
  <div class="component container-fluid">
    <div class="row bg-secondary-dark mx-5 pb-5 d-flex justify-content-start mt-2 shadow">
      <div class="col-md-6 py-2 ">
        Sprints for:
        <br>
        <h4>
          <em>
            {{ project.name }}</em>
        </h4>
        {{ project.description }}
      </div>
      <div class="col-md-6 text-right p-4">
        <button class="btn btn-outline-primary" type="button" data-target="#createSprint" data-toggle="modal">
          Create Sprint
        </button>
      </div>
      <CreateSprint />
    </div>
    <div class="row bg-secondary-dark mx-5">
      <!-- NOTE Creating Sprint v-model here -->
      <SprintCard v-for="s in sprints" :key="s.id" :sprint="s" />
      <!--  -->
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { projectsService } from '../services/ProjectsService'
import { useRoute, useRouter } from 'vue-router'
import Pop from '../utils/Notifier'
import CreateSprint from '../components/CreateSprint.vue'
import Swal from 'sweetalert2/dist/sweetalert2.all'
import { sprintsService } from '../services/SprintsService'
import { tasksService } from '../services/TasksService'

export default {
  // props: {
  //   backlog: {
  //     type: Object,
  //     required: true
  //   }
  // },
  name: 'Sprint',
  setup() {
    const route = useRoute()
    const state = reactive({
      // selectedTask: ''
    })
    onMounted(async() => {
      try {
        await projectsService.getProjectById(route.params.id)
        await sprintsService.getAllSprintsByProjectId(route.params.id)
        // await tasksService.getAllTasksBySprintId(route.params.id)
      } catch (error) {
        Pop.toast('You failed' + error, 'error')
      }
    })
    return {
      state,
      task: {},

      backlogs: computed(() => AppState.backlogs),
      project: computed(() => AppState.activeProject),
      activeProject: computed(() => AppState.activeProject),
      activeSprint: computed(() => AppState.activeSprint),
      sprints: computed(() => AppState.sprints)

    }
  },
  components: {
    CreateSprint
  }
}
</script>

<style lang="scss" scoped>
.bar{
  height: 3rem;
}

</style>
