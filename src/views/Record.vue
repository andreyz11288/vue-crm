<template>
  <div>
    <div class="page-title">
      <h3>{{$filters.localize.localizeFilter('New entry')}}</h3>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!categories.length" class="center">{{$filters.localize.localizeFilter('No categories yet')}}. <router-link to="/categories">{{$filters.localize.localizeFilter('Add a new category')}}</router-link></p>

    <form v-else class="form" @submit.prevent="handleSubmit">
      <div class="input-field" >
        <select ref="select" v-model="category">
          <option
              v-for="c in categories"
              :key="c.id"
              :value="c.id"
          >
            {{c.title}}
          </option>
        </select>
        <label>{{$filters.localize.localizeFilter('Add a new category')}}</label>
      </div>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
              v-model="type"
          />
          <span>{{$filters.localize.localizeFilter('Income')}}</span>
        </label>
      </p>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
              v-model="type"
          />
          <span>{{$filters.localize.localizeFilter('Outcome')}}</span>
        </label>
      </p>

      <div class="input-field">
        <input
            id="amount"
            type="number"
            v-model.number="amount"
            :class="{invalid: v$.amount.$dirty && v$.amount.minValue.$invalid}"
        >
        <label for="amount">{{$filters.localize.localizeFilter('Sum')}}</label>
        <span
            class="helper-text invalid"
            v-if="v$.amount.$dirty && v$.amount.minValue.$invalid"
        >
           {{$filters.localize.localizeFilter('Minimum value')}} {{v$.amount.minValue.$params.min}}
        </span>
      </div>

      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="description"
            :class="{invalid: v$.description.$dirty && v$.description.required.$invalid}"
        >
        <label for="description">{{$filters.localize.localizeFilter('Description')}}</label>
        <span
            class="helper-text invalid"
            v-if="v$.description.$dirty && v$.description.required.$invalid"
        >
          {{$filters.localize.localizeFilter('Enter a description')}}
        </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{$filters.localize.localizeFilter('Create')}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import Loader from "@/components/app/Loader.vue";
import { useVuelidate } from '@vuelidate/core'
import {required, minValue} from '@vuelidate/validators'
import {mapGetters} from 'vuex'
export default {
  name: 'record',
  setup: () => ({ v$: useVuelidate() }),
  components: {Loader},
  data: () => ({
    loading: true,
    categories: [],
    category: null,
    type: 'income',
    amount: 1,
    description: '',
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false


    if (this.categories.length) {
      this.category = this.categories[0].id
    }

    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
    }, 0)
  },
  validations: {
    description: {required},
    amount: {minValue: minValue(1)}
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if (this.type === 'income') {
        return true
      }

      return this.info.bill >= this.amount
    }
  },
  methods: {
    async handleSubmit() {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }

      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          })
          const bill = this.type === 'income'
              ? this.info.bill + this.amount
              : this.info.bill - this.amount

          await this.$store.dispatch('updateInfo', {bill})
          M.toast({html: this.$filters.localize.localizeFilter('Entry created successfully')})
          this.v$.$reset()
          this.amount = 1
          this.description = ''
        } catch (e) {
          console.log(e)
        }
        
      }else {
        M.toast({html: `${this.$filters.localize.localizeFilter('Insufficient funds in the account')} ${this.amount - this.info.bill}`})
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

<style scoped lang="scss">

</style>