<script setup>

</script>

<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{$filters.localize.localizeFilter('Home accounting')}}</span>
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
        >{{$filters.localize.localizeFilter('The Email field must not be empty')}}</small>
        <small
            class="helper-text invalid"
            v-else-if="v$.email.$dirty && v$.email.$invalid"
        >{{$filters.localize.localizeFilter('Enter correct Email')}}</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{invalid: (v$.password.$dirty && v$.password.minLength.$invalid) || (v$.password.$dirty && v$.password.required.$invalid)}"
        >
        <label for="password">{{$filters.localize.localizeFilter('Password')}}</label>
        <small
            class="helper-text invalid"
            v-if="v$.password.$dirty && v$.password.required.$invalid"
        >
          {{$filters.localize.localizeFilter('Enter password')}}
        </small>
        <small
            class="helper-text invalid"
            v-else-if="v$.password.$dirty && v$.password.minLength.$invalid"
        >
          {{$filters.localize.localizeFilter('The password must be')}} {{v$.password.minLength.$params.min}} {{$filters.localize.localizeFilter('characters. Now he')}} {{password.length}}
        </small>
      </div>
      <div class="input-field">
        <input
            id="name"
            type="text"
            v-model.trim="name"
            :class="{invalid: (v$.name.$dirty && v$.name.minLength.$invalid) || (v$.name.$dirty && v$.name.required.$invalid)}"
        >
        <label for="name">{{$filters.localize.localizeFilter('Name')}}</label>
        <small
            class="helper-text invalid"
            v-if="v$.name.$dirty && v$.name.required.$invalid"
        >
          {{$filters.localize.localizeFilter('Enter your name')}}
        </small>
        <small
            class="helper-text invalid"
            v-else-if="v$.name.$dirty && v$.name.minLength.$invalid"
        >
          {{$filters.localize.localizeFilter('The name must be')}} {{v$.name.minLength.$params.min}} {{$filters.localize.localizeFilter('characters. Now it is')}} {{name.length}}
        </small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree"/>
          <span>{{$filters.localize.localizeFilter('I agree with the rules')}}</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          {{$filters.localize.localizeFilter('Register')}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{$filters.localize.localizeFilter('Already have an account?')}}
        <router-link to="/login">{{$filters.localize.localizeFilter('Login')}}!</router-link>
      </p>
    </div>
  </form>
</template>
<script>
import { useVuelidate } from '@vuelidate/core'
import {email, required, minLength} from '@vuelidate/validators'
export default {
  setup: () => ({ v$: useVuelidate() }),
  data: () => ({
    email: '',
    password: '',
    name:'',
    agree: false,
  }),
  validations () {
    return {
      email: { email, required },
      password: {required, minLength: minLength(6) },
      name: {required, minLength: minLength(2)},
      agree: {checked: v => v}
    }
  },
  methods: {
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      const formData= {
        email: this.email,
        password: this.password,
        name: this.name,
      }
      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/')
      } catch (e) {}
    }
  }
}
</script>
<style scoped lang="scss">

</style>