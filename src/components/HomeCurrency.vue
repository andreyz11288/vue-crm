<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{$filters.localize.localizeFilter('Currencies rates')}}</span>
        </div>
        <table>
          <thead>
          <tr>
            <th>{{$filters.localize.localizeFilter('Currency')}}</th>
            <th>{{$filters.localize.localizeFilter('Rate')}}</th>
            <th>{{$filters.localize.localizeFilter('Date')}}</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="cur in currencies">
            <th>{{cur}}</th>
            <th>{{rates[cur].toFixed(2)}}</th>
            <th>{{date}}</th>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rates', 'date'],
  data: () => ({
    currencies: ['UAH', 'USD', 'EUR']
  })
}
</script>

<style scoped lang="scss">

</style>