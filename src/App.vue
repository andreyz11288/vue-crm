<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import {computed, reactive} from "vue";
import {useHead} from "@unhead/vue"
import localizeFilter from "@/filter/localize.filter";
  export default {
  setup() {
    // const siteData = reactive({
    //   title: `site`
    // })
    useHead({
      title: computed(() => 'CRM')
    })
  },
    computed: {
      layout() {
        return (this.$route.meta.layout || 'empty') + '-layout'
      }
    },
    components: {
      EmptyLayout, MainLayout
    }
  }
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
@import "assets/index.css";
</style>
