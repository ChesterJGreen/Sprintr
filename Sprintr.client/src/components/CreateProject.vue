<template>
  <div class="modal fade" id="createProject" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Create Project
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
            v-model="state.newProject.name"
            id="name"
            placeholder="Name Project..."
          >
          <br>
          <textarea
            class="form-control"
            id="description"
            v-model="state.newProject.description"
            rows="5"
            placeholder="Description..."
          >
          </textarea>
        </div>
        <div class="modal-footer">
          <button type="submit" @click="createProject" class="btn btn-primary" data-toggle="modal" data-target="#createProject">
            Submit Project
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { projectsService } from '../services/ProjectsService'
import Pop from '../utils/Notifier'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { useRouter } from 'vue-router'

export default {
  name: 'Component',
  setup() {
    const router = useRouter()
    const state = reactive({
      newProject: {}
    })
    return {
      state,
      account: computed(() => AppState.account),
      async createProject() {
        try {
          const newProject = await projectsService.createProject(state.newProject)
          state.newProject = {}
          Pop.toast('Project Created', 'success')
          router.push({ name: 'ProjectPage', params: { id: newProject.id } })
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
