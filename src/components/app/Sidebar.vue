<script setup>

</script>

<template>
  <ul class="sidenav app-sidenav" :class="{open:value}">
    <li class="sidenav-li" v-for="(link, index) in links" :key="index" @click.prevent="active">
      <router-link :to="link.url" active-class="active" exact class="waves-effect waves-orange pointer">{{link.title}}</router-link>
    </li>

  </ul>
</template>

<script>
import localize from "@/filter/localize.filter";
export default {
  props: {
    value: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    links: [
      {
        title: localize.localizeFilter('Bill'),
        url:'/'
      },
      {
        title: localize.localizeFilter('Story'),
        url:'/history'
      },
      {
        title: localize.localizeFilter('Planning'),
        url:'/planning'
      },
      {
        title: localize.localizeFilter('New entry'),
        url:'/record'
      },
      {
        title: localize.localizeFilter('Categories'),
        url:'/categories'
      }
    ],
  }),
  mounted() {
    this.active()
  },
  methods: {
    active() {
      setTimeout(()=> {
        const sidenavLi = document.querySelectorAll('.sidenav-li');
        sidenavLi.forEach(el => {
          el.classList.remove('active')
          if (el.children[0].classList.contains('active')) {
            el.classList.add('active')
          }
        })
      }, 200)
    }
  }
}
</script>

<style scoped lang="scss">

</style>