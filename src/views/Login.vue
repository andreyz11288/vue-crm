<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{ $filters.localize.localizeFilter('Home accounting') }}</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{invalid: (v$.email.$dirty && v$.email.$invalid) || (v$.email.$dirty && v$.email.required.$invalid)}"
        >
        <label for="email">Email</label>
        <small
            class="helper-text invalid"
            v-if="v$.email.$dirty && v$.email.required.$invalid"
        >{{ $filters.localize.localizeFilter('The Email field must not be empty') }}</small>
        <small
            class="helper-text invalid"
            v-else-if="v$.email.$dirty && v$.email.$invalid"
        >{{ $filters.localize.localizeFilter('Enter correct Email') }}</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{invalid: (v$.password.$dirty && v$.password.minLength.$invalid) || (v$.password.$dirty && v$.password.required.$invalid)}"
        >
        <label for="password">{{ $filters.localize.localizeFilter('Password') }}</label>
        <small
            class="helper-text invalid"
            v-if="v$.password.$dirty && v$.password.required.$invalid"
        >
          {{ $filters.localize.localizeFilter('Enter password') }}
        </small>
        <small
            class="helper-text invalid"
            v-else-if="v$.password.$dirty && v$.password.minLength.$invalid"
        >
          {{ $filters.localize.localizeFilter('The password must be') }}
          {{ v$.password.minLength.$params.min }}
          {{ $filters.localize.localizeFilter('characters. Now he') }}
          {{ password.length }}
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          {{ $filters.localize.localizeFilter('Login') }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ $filters.localize.localizeFilter('Don\'t have an account?') }}
        <router-link to="/register">{{ $filters.localize.localizeFilter('Register') }}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {useVuelidate} from '@vuelidate/core'
import {email, required, minLength} from '@vuelidate/validators'
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'login',
  setup: () => ({v$: useVuelidate()}),
  data: () => ({
    email: '',
    password: '',
  }),
  validations() {
    return {
      email: {email, required},
      password: {required, minLength: minLength(6)}
    }
  },
  mounted() {
    if (
        this.$route.query.message === 'login'
        || this.$route.query.message === 'logout'
        || this.$route.query.message === 'changed-email'
    ) {
      M.toast({html: this.$filters.localize.localizeFilter(this.$route.query.message)})
    }
  },
  methods: {
    async submitHandler() {
      if (this.v$.$invalid) {
        await this.v$.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      }
      try {
        await this.$store.dispatch('login', formData);
        await this.$router.push('/');
      } catch (e) {

      }
    }
  }
}

</script>

<style scoped lang="scss">

</style>