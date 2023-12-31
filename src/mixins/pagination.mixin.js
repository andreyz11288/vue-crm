import _ from 'lodash'
export default {
    data() {
        return {
            allItemsCount:0,
            pageSize: 5,
            pageCount: 0,
            allItems: [],
            items: [],
            page: +this.$route.query.page || 1
        }
    },
    methods: {
        onClickHandler(page) {
            this.$router.push(`${this.$route.path}?page=${page}`)
            this.items = this.allItems[page - 1] || this.allItems[0]
        },
        setupPagination(allItems) {
            allItems.reverse()
            this.allItemsCount = allItems.length
            this.allItems = _.chunk(allItems, this.pageSize)
            this.pageCount = _.size(this.allItems)
            this.items = this.allItems[this.page - 1] || this.allItems[0]
        }
    }
}