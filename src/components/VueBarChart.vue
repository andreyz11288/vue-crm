<template>
  <div class="container mt-5">
    <Pie id="my-chart-id" :options="chartOptions" :data="chartData"/>
  </div>
</template>

<script>
import {Pie} from 'vue-chartjs'
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'PieChart',
  components: {Pie},
  data: () => ({
    chartData: {
      labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
      datasets: [
        {
          backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
          data: [40, 20, 80, 10]
        }
      ]
    },
    chartOptions: {
      responsive: false
    }
  }),
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')
    this.chartData = {
      labels: categories.map(c => c.title),
      datasets: [{
        label: this.$filters.localize.localizeFilter('Expenses by category'),
        data: categories.map(c => {
          return records.reduce((total, r) => {
            if (r.categoryId === c.id && r.type === 'outcome') {
              total += +r.amount
            }
            return total
          }, 0)
        }),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    }
  }
}
</script>
<style scoped>
#my-chart-id {
  margin: auto;
}
</style>