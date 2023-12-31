<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{$filters.localize.localizeFilter('Edit')}}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field" >
          <select ref="select" v-model="current">
            <option
                v-for="c in categories"
                :key="c.id"
                :value="c.id"
                >
                {{c.title}}
            </option>
          </select>
          <label>{{$filters.localize.localizeFilter('Select a category')}}</label>
        </div>

        <div class="input-field">
          <input
              id="name"
              type="text"
              v-model="title"
              :class="{invalid: v$.title.$dirty && v$.title.required.$invalid}"
          >
          <label for="name">{{$filters.localize.localizeFilter('Name')}}</label>
          <span
              v-if="v$.title.$dirty && v$.title.required.$invalid"
              class="helper-text invalid"
          >
            {{$filters.localize.localizeFilter('Enter category name')}}
          </span>
        </div>

        <div class="input-field">
          <input
              id="limit"
              type="number"
              v-model.number="limit"
              :class="{invalid: v$.limit.$dirty && v$.limit.minValue.$invalid}"
          >
          <label for="limit">{{$filters.localize.localizeFilter('Limit')}}</label>
          <span
              v-if="v$.limit.$dirty && v$.limit.minValue.$invalid"
              class="helper-text invalid"
          >
            {{$filters.localize.localizeFilter('Minimum value')}} {{v$.limit.minValue.$params.min}}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{$filters.localize.localizeFilter('Update')}}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import { useVuelidate } from '@vuelidate/core'
import {required, minValue} from '@vuelidate/validators'
export default {
  name: 'CategoryEdit',
  setup: () => ({ v$: useVuelidate() }),
  props: {
    categories: {
      type: Array,
      required: true,
    },
    currentCategory: {
      required: true
    }
  },
  data: () => ({
    select: null,
    limit: 20,
    title: '',
    current: null
  }),
  validations: {
    title: {required},
    limit: {minValue: minValue(20)}
  },
  watch: {
    current(catId) {
      const {title, limit} = this.categories.find(c => c.id === catId)
      this.title = title
      this.limit = limit
    }
  },
  created() {
    if (Object.keys(this.$props.currentCategory).length) {
      this.showCurrentCategory(this.$props.currentCategory)
    } else {
      this.showCurrentCategory(this.categories[0])
    }
  },
  mounted() {
    M.updateTextFields();
    this.select = M.FormSelect.init(this.$refs.select);
    },
  methods: {
    showCurrentCategory({id, title, limit}) {
      this.current = id
      this.title = title
      this.limit = limit
    },
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }

      try {
        const category = await this.$store.dispatch('editCategory', {
          id: this.current,
          title: this.title,
          limit: this.limit
        })
        M.toast({html: this.$filters.localize.localizeFilter('Category successfully changed')})
        this.$emit('edited', {
          id: this.current,
          title: this.title,
          limit: this.limit
        })

      } catch (e) {
        M.toast({html: this.$filters.localize.localizeFilter('Something went wrong')})
      }
    }
  },
  deactivated() {
    if (this.select && this.select.deactivated) {
      this.select.deactivated()
    }
  }
}
</script>