<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>
<script>
import {computed} from "vue";
import messages from "@/utils/messages";
export default {
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error(fbError) {
      M.toast({html: messages[fbError.code] || 'Что-то пошло не так'})
    }
  }
}
</script>