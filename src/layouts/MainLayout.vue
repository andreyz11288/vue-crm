<template>
<div>
  <Loader v-if="loading" />
  <div class="app-main-layout" v-else>
    <Navbar
        @click1="isOpen = !isOpen"
    />
    <Sidebar :value="isOpen"/>

    <main class="app-content" :class="{full: !isOpen}">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" to="/record">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</div>
</template>

<script>
import Navbar from "@/components/app/Navbar.vue";
import Sidebar from "@/components/app/Sidebar.vue";
import Loader from "@/components/app/Loader.vue";
export default {
  name: 'main-layout',
  components: {
    Loader,
    Navbar,
    Sidebar
  },
  data: () => ({
    isOpen: true,
    loading: true
  }),
  async mounted() {
    try {
      if (!Object.keys(this.$store.getters.info).length) {
        await this.$store.dispatch('fetchInfo')
      }
      this.loading = false
    } catch (e) {

    }
  },
  methods: {

  }
}
</script>