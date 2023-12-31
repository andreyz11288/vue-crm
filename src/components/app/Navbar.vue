<script setup>

</script>

<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('click1')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{
            `${date.getFullYear()}.`
            + `${date.getMonth() + 1 }.`
            + `${date.getDate()} `
            + `${date.getHours()}:`
            + `${date.getMinutes()}:`
            + `${date.getSeconds()}`
          }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
              class="dropdown-trigger black-text"
              href="#"
              data-target="dropdown"
              ref="dropdown"
          >
            {{name}}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>
                {{$filters.localize.localizeFilter('Profile')}}
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i><br>
                {{$filters.localize.localizeFilter('Out')}}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  mounted() {
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {constrainWidth: true})
    this.interval = setInterval(()=>{
      this.date = new Date()
    },1000)
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch('logout')
        await this.$router.push('/login?message=logout')
      } catch (e) {

      }
    }
  },
  data: () => ({
    date: new Date(),
    interval: null,
    dropdown: null,
  }),
  beforeDestroy() {
    clearInterval(this.interval);
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  },
  computed: {
    name() {
      return this.$store.getters.info.name
    }
  }
}
</script>

<style scoped lang="scss">

</style>