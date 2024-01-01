<template>
  <div>
    <Loader v-if="loading"/>
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{$filters.localize.localizeFilter('Story')}}</router-link>
        <a @click.prevent class="breadcrumb">
          {{record.type === 'income' ? $filters.localize.localizeFilter('Income') : $filters.localize.localizeFilter('Outcome')}}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
              class="card"
              :class="{
            'red': record.type === 'outcome',
            'green': record.type === 'income'
              }"
          >
            <div class="card-content white-text">
              <p>{{$filters.localize.localizeFilter('Description')}}: {{record.description}}</p>
              <p>{{$filters.localize.localizeFilter('Sum')}}: {{$filters.filter.currencyFilter(Math.abs(record.amount), info.currency)}}</p>
              <p>{{$filters.localize.localizeFilter('Category')}}: {{record.categoryName}}</p>
              <small>{{ originalDate(record.date) }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p v-else class="center">{{$filters.localize.localizeFilter('Entry with id')}}={{$route.params.id}} {{$filters.localize.localizeFilter('not found')}}</p>

  </div>
</template>
<script>
import Loader from "@/components/app/Loader.vue";
import {mapGetters} from "vuex";

export default {
  name: 'detailRecord',
  components: {Loader},
  data: () => ({
    record: null,
    loading: true,
  }),
  async mounted() {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById', id)
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)

    this.record = {
      ...record,
      categoryName: category.title
    }

    this.loading = false
  },
  methods: {
    originalDate(data) {
      const originalDate = new Date(data);
      const options = { timeZone: "UTC", hour12: false };
      return `${originalDate.toISOString().split('T')[0]}, ${originalDate.toLocaleTimeString("en-US", options)}`;

    }
  },
  computed: {
    ...mapGetters(['info'])

  },
}
</script>

<style scoped lang="scss">

</style>