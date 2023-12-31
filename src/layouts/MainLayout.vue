<template>
<div>
  <Loader v-if="loading" />
  <div class="app-main-layout" v-else>
    <Navbar
        @click1="isOpen = !isOpen"
    />
    <Sidebar :value="isOpen" :key="locale"/>

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
import messages from "@/utils/messages";
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

  },
  computed: {
    error() {
      return this.$store.getters.error
    },
    locale() {
      return this.$store.getters.info.locale
    }
  },
  watch: {
    error(fbError) {
      M.toast({html: messages[fbError.code] || 'Что-то пошло не так'})
    }
  }
}
</script>