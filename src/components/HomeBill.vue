<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">{{$filters.localize.localizeFilter('Bill in currency')}}</span>

        <p
            v-for="cur in currencies"
            key="cur"
            class="currency-line">
          <span>
            {{$filters.filter.currencyFilter(getCurrency(cur), cur)}}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rates'],
  data: () => ({
    currencies: ['UAH', 'USD', 'EUR']
  }),
  computed: {
    base() {
      console.log(this.$store.getters.info.currency)
      if (this.$store.getters.info.currency === 'UAH') {
        return this.$store.getters.info.bill / (this.rates['UAH'] / this.rates['EUR'])
      }
      if (this.$store.getters.info.currency === 'USD') {
        return this.$store.getters.info.bill / (this.rates['USD'] / this.rates['EUR'])
      }
      if (this.$store.getters.info.currency === 'EUR') {
        return this.$store.getters.info.bill
      }
    }
  },
  methods: {
    getCurrency(currency) {
      return Math.floor(this.base * this.rates[currency])
    }
  },
}
</script>

<style scoped lang="scss">

</style>