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
      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="newEmail"
        >
        <label for="description">{{$filters.localize.localizeFilter('New Email')}}</label>
      </div>
      <div class="input-field" >
        <select ref="select" v-model="currency">
          <option
              v-for="(c, idx) in currencies"
              :key="idx"
              :value="c"
          >
            {{c}}
          </option>
        </select>
        <label>{{$filters.localize.localizeFilter('Select a currency')}}</label>
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
    select: null,
    name: '',
    currency: null,
    isUaLocale: true,
    currencies: [],
    newEmail: ''
  }),
  validations: {
    name: {
      required
    },
    currency: {
      required
    }
  },
  async mounted() {
    this.newEmail = await this.$store.dispatch('fetchEmail')
    this.currencies = ['UAH', 'USD', 'EUR']
    this.name = this.info.name
    this.currency = this.info.currency
    this.isUaLocale = this.info.locale === 'uk_UA'
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields()
    }, 0)
  },
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
    localizeFilter,
    ...mapActions(['updateInfo', 'fetchEmail', 'updateEmail', 'fetchAllUsers']),
    async handleSubmit() {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      const formData= {
        name: this.name,
        currency: this.currency,
        locale: this.isUaLocale ? 'uk_UA' : 'en_US',
      }
      try {
        const emailExists = (await this.fetchAllUsers()).find(user =>
          user.info.email === this.newEmail
        )
        if (await this.fetchEmail() !== this.newEmail) {
          if (emailExists) {
            M.toast({html: localizeFilter.localizeFilter('This email already exists')})
            return
          }
          const data = {
            email: this.newEmail,
            router: this.$router
          }
          await this.updateEmail(data)
        }
        await this.updateInfo(formData)

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