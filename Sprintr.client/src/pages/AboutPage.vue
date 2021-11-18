<template>
  <div class="about bg-turtle d-flex justify-content-center bg-secondary">
    <img src="../assets/img/turtle.gif" class="w-100">
  </div>
</template>

<script>
export default {
  name: 'AboutPage'
}
</script>
<style scoped>
.about{
  width: 50%;
 }

.bg-turtle{
  background: url("turtle.gif");
  background-size: cover;
  background-position: center;
}
</style>
