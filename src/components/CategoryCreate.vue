<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
              id="name"
              type="text"
              v-model="title"
              :class="{invalid: v$.title.$dirty && v$.title.required.$invalid}"
          >
          <label for="name">Название</label>
          <span
              v-if="v$.title.$dirty && v$.title.required.$invalid"
              class="helper-text invalid"
          >
            Введите название категории
          </span>
        </div>

        <div class="input-field">
          <input
              id="limit"
              type="number"
              v-model.number="limit"
              :class="{invalid: v$.limit.$dirty && v$.limit.minValue.$invalid}"
          >
          <label for="limit">Лимит</label>
          <span
              v-if="v$.limit.$dirty && v$.limit.minValue.$invalid"
              class="helper-text invalid"
          >
            Минимальная величина {{v$.limit.minValue.$params.min}}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import { useVuelidate } from '@vuelidate/core'
import {required, minValue} from '@vuelidate/validators'
import messages from "@/utils/messages";
export default  {
  name: "CategoryCreate",
  setup: () => ({ v$: useVuelidate() }),
  data: () => ({
    title: '',
    limit: 20
  }),
  validations: {
    title: {required},
    limit: {minValue: minValue(20)}
  },
  mounted() {
    M.updateTextFields();
  },
  methods: {
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }

      try {
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit
        })
        this.title = ''
        this.limit= 20
        this.v$.$reset()
        this.$emit('created', category)
        M.toast({html: 'Категория успешно создана'})

      } catch (e) {
        M.toast({html: 'Что-то пошло не так'})
      }
    }
  }
}
</script>