<template>
  <div>
    <div class="page-title">
      <h3>{{$filters.localize.localizeFilter('Bill')}}</h3>

      <button class="btn waves-effect waves-light btn-small" @click.prevent="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading"/>

    <div v-else class="row">

      <HomeBill
      :rates="currency.rates"
      />
      <HomeCurrency
          :rates="currency.rates"
          :date="currency.date"
      />

    </div>
  </div>
</template>

<script>
import HomeBill from "@/components/HomeBill.vue";
import HomeCurrency from "@/components/HomeCurrency.vue";
import Loader from "@/components/app/Loader.vue";
import {computed} from "vue";
import {useHead} from "@vueuse/head";
import localizeFilter from "@/filter/localize.filter";
export default {
  name: "Home",
  components: {
    Loader,
    HomeBill,
    HomeCurrency
  },
  setup:() => (
      useHead({
        title: computed(() => localizeFilter.localizeFilter('Home')),
        meta: [
          {
            "http-equiv": "Content-Security-Policy",
            content:"upgrade-insecure-requests"
          }
        ]
      })
  ),
  data: () => ({
    loading: true,
    currency: null
  }),
  async mounted() {
    this.currency =  await this.$store.dispatch('fetchCurrency')
    const email =  await this.$store.dispatch('fetchEmail')
    await this.$store.dispatch('updateInfo', {email})
    this.loading = false
  },
  methods: {
    async refresh() {
      this.loading = true
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    }
  }
};
</script>
