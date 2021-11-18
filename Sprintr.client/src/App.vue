<template>
  <header>
    <Navbar />
  </header>
  <main class="bg-secondary-dark justify-content-center">
    <router-view />
  </main>
  <footer class="">
    <div class="bg-dark text-light text-center p-2">
      Made with 🍔 by CJ/John
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
.action:hover{
  cursor: pointer;
}

</style>
