<template>
  <div>
    <div class="page-title">
      <h3>{{$filters.localize.localizeFilter('Planning')}}</h3>
      <h4>{{$filters.filter.currencyFilter(info.bill)}}</h4>
    </div>

    <Loader v-if="loading"/>

    <p v-else-if="!categories.length" class="center">{{$filters.localize.localizeFilter('No categories yet')}}. <router-link to="/categories">{{$filters.localize.localizeFilter('Add a new category')}}</router-link></p>


    <section v-else>
        <div
            v-for="cat in categories"
            :key="cat.id"
        >
          <p>
            <strong>{{cat.title}}</strong>
            {{$filters.filter.currencyFilter(cat.spend)}} {{$filters.localize.localizeFilter('fo')}} {{$filters.filter.currencyFilter(cat.limit)}}
          </p>
          <div class="progress" v-tooltip="cat.tooltip">
            {{categories.length}}
            <div
                class="determinate"
                :class="[cat.colorProgressBar]"
                :style="{width: cat.progressPercent + '%'}"
            ></div>
          </div>
        </div>
    </section>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import Loader from "@/components/app/Loader.vue";
export default {
  components: {Loader},
  data: () => ({
    loading: true,
    categories: [],
  }),
  computed: {
    ...mapGetters(['info'])

  },
  async mounted() {

    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')

    this.categories = categories.map(cat => {
      const spend = records
          .filter(r => r.categoryId === cat.id)
          .filter(r => r.type === 'outcome')
          .reduce((total, record) => {
            return total += +record.amount
          }, 0)
      const percent = 100 * spend / cat.limit
      const progressPercent = percent > 100 ? 100 : percent
      const colorProgressBar = percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red'
      const tooltipValue = cat.limit - spend
      const tooltip = `${tooltipValue < 0 ? this.$filters.localize.localizeFilter('Excess by') : this.$filters.localize.localizeFilter('Left')} ${this.$filters.filter.currencyFilter(Math.abs(tooltipValue))}`

      return {
        ...cat, progressPercent, colorProgressBar, spend, tooltip
      }
    })

    this.loading = false
  }
}
</script>

<style scoped lang="scss">

</style>