<template>
  <div>
    <div class="page-title">
      <h3>{{$filters.localize.localizeFilter('Post history')}}</h3>
    </div>

    <VueBarChart/>

    <Loader v-if="loading"/>

    <p v-else-if="!records.length" class="center">
      {{$filters.localize.localizeFilter('There are no posts yet')}}
      <router-link to="/categories">{{$filters.localize.localizeFilter('Add a new category')}}</router-link>
    </p>


    <section v-else>
      <HistoryTable
          :records="items"
      />
      <vue-awesome-paginate
          :total-items="allItemsCount"
          :items-per-page="pageSize"
          :max-pages-shown="5"
          v-model="page"
          :on-click="onClickHandler"
          :prev-button-content="back"
          :next-button-content="next"
          paginate-buttons-class="btn"
          active-page-class="active-page-custom"
      />
    </section>
  </div>
</template>
<script>
import HistoryTable from "@/components/HistoryTable.vue";
import Loader from "@/components/app/Loader.vue";
import paginationMixin from "@/mixins/pagination.mixin";
import VueBarChart from "@/components/VueBarChart.vue";

export default {
  name: 'history',
  mixins: [paginationMixin],
  components: {
    Loader,
    HistoryTable,
    VueBarChart,
  },
  data: () => ({
    loading: true,
    records: [],
    categories: [],
    back: '',
    next: '',
  }),
  async mounted() {
    this.back = this.$filters.localize.localizeFilter('Back')
    this.next = this.$filters.localize.localizeFilter('Next')
    this.records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')
    this.categories = categories

    this.setup(categories)

    this.loading = false
  },
  methods: {
    setup(categories) {
      this.setupPagination(this.records.map(record => {
        return {
          ...record,
          categoryName: categories.find(cat => cat.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? this.$filters.localize.localizeFilter('Income') : this.$filters.localize.localizeFilter('Outcome')
        }
      }))
    }
  },
}
</script>

<style>
.btn.active-page-custom {
  background-color: #1d7d74 !important;
}
</style>