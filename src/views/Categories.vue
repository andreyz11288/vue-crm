<template>
  <div>
    <div class="page-title">
      <h3>{{$filters.localize.localizeFilter('Categories')}}</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div v-else class="row">
        <CategoryCreate @created="addNewCategory" />
        <CategoryEdit
            v-if="categories.length"
            :categories="categories"
            :key="categories.length + updateCount"
            @edited="editCategories"
            :currentCategory="currentCategory"
        />
        <p v-else class="center">{{$filters.localize.localizeFilter('No categories yet')}}</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "@/components/CategoryCreate.vue";
import CategoryEdit from "@/components/CategoryEdit.vue";
import Loader from "@/components/app/Loader.vue";
export default {
  name: 'categories',
  data: () =>({
    categories: [],
    loading: true,
    updateCount: 0,
    currentCategory: {},
  }),
  components: {
    Loader,
    CategoryCreate,
    CategoryEdit
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
    },
    editCategories(category) {
      this.currentCategory = {id: category.id, title:category.title, limit: category.limit}
      this.updateCount ++
      const idx = this.categories.findIndex(c => c.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
    }
  }
}
</script>

<style scoped lang="scss">

</style>