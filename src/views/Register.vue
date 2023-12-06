<script setup>

</script>

<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
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
        >Поле Email не должно быть пустым</small>
        <small
            class="helper-text invalid"
            v-else-if="v$.email.$dirty && v$.email.$invalid"
        >Введите корретный Email</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{invalid: (v$.password.$dirty && v$.password.minLength.$invalid) || (v$.password.$dirty && v$.password.required.$invalid)}"
        >
        <label for="password">Пароль</label>
        <small
            class="helper-text invalid"
            v-if="v$.password.$dirty && v$.password.required.$invalid"
        >
          Введите пароль
        </small>
        <small
            class="helper-text invalid"
            v-else-if="v$.password.$dirty && v$.password.minLength.$invalid"
        >
          Пароль должен быть {{v$.password.minLength.$params.min}} символов. Сейчас он {{password.length}}
        </small>
      </div>
      <div class="input-field">
        <input
            id="name"
            type="text"
            v-model.trim="name"
            :class="{invalid: (v$.name.$dirty && v$.name.minLength.$invalid) || (v$.name.$dirty && v$.name.required.$invalid)}"
        >
        <label for="name">Имя</label>
        <small
            class="helper-text invalid"
            v-if="v$.name.$dirty && v$.name.required.$invalid"
        >
          Введите имя
        </small>
        <small
            class="helper-text invalid"
            v-else-if="v$.name.$dirty && v$.name.minLength.$invalid"
        >
          Имя должен быть {{v$.name.minLength.$params.min}} символов. Сейчас оно {{name.length}}
        </small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree"/>
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
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
        name: this.name
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