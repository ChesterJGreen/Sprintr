<template>
  <div class="row">
    <div class="col-md-12 d-flex justify-content-between mb-3">
      <div><h5><u>Project Name:</u></h5></div>
      <div><h5><u>Created By:</u></h5></div>
      <div><h5><u>Date Created:</u></h5></div>
    </div>
    <ProjectCard v-for="p in projects" :key="p.id" :project="p" />
  </div>
</template>

<script>

export default {
  name: 'ProjectsComponent',
  props: {
    projects: {
      type: Array,
      required: true
    }
  },

  setup() {
    return {
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
