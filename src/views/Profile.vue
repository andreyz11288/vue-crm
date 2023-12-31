<template>
  <div>
    <div class="page-title">
      <h3>{{$filters.localize.localizeFilter('Profile')}}</h3>
    </div>

    <form class="form" @submit.prevent="handleSubmit">
      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="name"
            :class="{invalid: (v$.name.$dirty && v$.name.required.$invalid)}"
        >
        <label for="description">{{$filters.localize.localizeFilter('Name')}}</label>
        <span
            class="helper-text invalid" v-if="v$.name.$dirty && v$.name.required.$invalid">{{$filters.localize.localizeFilter('Enter your name')}}</span>
      </div>
      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isUaLocale">
          <span class="lever"></span>
          Українська
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{$filters.localize.localizeFilter('Update')}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import {required} from '@vuelidate/validators'
import {useVuelidate} from "@vuelidate/core";
import localizeFilter from "@/filter/localize.filter";
import {computed} from "vue";
import {useHead} from "@vueuse/head";
export default {
  setup:() => (
        useHead({
          title: computed(() => localizeFilter.localizeFilter('Profile'))
        }),
      {
         v$: useVuelidate()
      }
  ),
  data: () => ({
    name: '',
    isUaLocale: true,
  }),
  validations: {
    name: {
      required
    }
  },
  mounted() {
    this.name = this.info.name
    this.isUaLocale = this.info.locale === 'uk_UA'
    setTimeout(() => {
      M.updateTextFields()
    }, 0)
  },
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
    localizeFilter,
    ...mapActions(['updateInfo']),
    async handleSubmit() {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      const formData= {
        name: this.name
      }
      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isUaLocale ? 'uk_UA' : 'en_US'
        })
      } catch (e) {}
    }
  }
}

</script>


<style scoped lang="scss">
.switch {
  margin-bottom: 2rem;
}
</style>