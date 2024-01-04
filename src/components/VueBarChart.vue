<template>
  <div class="df">
    <div class="container mt-5" v-for="item in dataForChart">
      <h3 class="title">{{$filters.localize.localizeFilter(item.title)}}</h3>
      <h5 class="title">{{$filters.localize.localizeFilter('Total')}} {{item.totalCount}}</h5>
      <Pie id="my-chart-id" :options="chartOptions" :data="item.data"/>
    </div>
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
    chartOptions: {
      responsive: false
    },
    records: '',
    categories: '',
    outcome: null,
    income: null,
    dataForChart:[]
  }),
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords')
    this.categories = await this.$store.dispatch('fetchCategories')

    this.records.map((record) => {
      return record.type === 'outcome' ? this.outcome += record.amount : this.income += record.amount
    })
    this.dataForChart = [
      {
        title: 'outcome',
        data: this.chartData('outcome'),
        totalCount: this.outcome
      },
      {
        title: 'income',
        data: this.chartData('income'),
        totalCount: this.income
      }
    ]
  },
  methods: {
    generateRandomColor() {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);

      return `rgba(${r}, ${g}, ${b}, 0.2)`;
    },
    chartData(type) {
      const labelTitle = type === 'outcome' ? 'Expenses by category' : 'Income by category'
      const color = []
      const borderColor = []

      return {
        labels: this.categories.map(c => c.title),
            datasets: [{
        label: this.$filters.localize.localizeFilter(labelTitle),
        data: this.categories.map(c => {
          color.push(this.generateRandomColor())
          borderColor.push(this.generateRandomColor())

          return this.records.reduce((total, r) => {

            if (r.categoryId === c.id && r.type === type) {
              total += +r.amount
            }

            return total
          }, 0)
        }),
        backgroundColor: color,
        borderColor: borderColor,
        borderWidth: 1
      }]
      }
    }
  }
}
</script>
<style scoped>
#my-chart-id {
  margin: auto;
}
.df {
  display: flex;
}
.title {
  text-align: center;
}
</style>