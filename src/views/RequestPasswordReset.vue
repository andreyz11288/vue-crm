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
    </div>
    <p class="text-content">{{
        $filters.localize.localizeFilter('We will send a verification code to this email address if they match an existing CRM account.')
      }}</p>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          {{ $filters.localize.localizeFilter('Go') }}
          <i class="material-icons right">send</i>
        </button>
        <router-link
            class="btn waves-effect waves-light auth-submit return-button"
            to="/login"
        >
          {{ $filters.localize.localizeFilter('Return') }}
        </router-link>
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

export default {
  name: 'request-password-reset',
  setup: () => ({v$: useVuelidate()}),
  data: () => ({
    email: '',
  }),
  validations() {
    return {
      email: {email, required},
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
      }
      try {
        await this.$store.dispatch('forgotPassword', formData);
        await this.$router.push('/login');
      } catch (e) {}
    }
  }
}
</script>

<style scoped lang="scss">
.text-content {
  margin-top: 0;
  padding: 0 24px;
}
.return-button {
  background-color: inherit;
  box-shadow: none;
  color: inherit;
  padding-right: 45px;
}
</style>