<script setup>

</script>

<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('click1')" @click="keyboardArrow = !keyboardArrow">
          <i class="material-icons black-text" v-if="keyboardArrow">keyboard_arrow_left</i>
          <i class="material-icons black-text" v-else>keyboard_arrow_right</i>
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
      <div style="display: flex">
          <i class="large material-icons" v-if="!previewImage">face</i>
          <img :src="srcPreviewImage" class="uploading-image"  alt="uploading-image" v-else/>
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
    </div>
  </nav>
</template>

<script>
export default {
  mounted() {
    if (this.$store.getters.info.image) {
      this.previewImage = this.$store.getters.info.image
    }
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {constrainWidth: true})
    this.interval = setInterval(()=>{
      this.date = new Date()
    },1000)
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch('logout')
        await this.$router.push('/login')
      } catch (e) {
        console.log(e)
      }
    }
  },
  data: () => ({
    date: new Date(),
    interval: null,
    dropdown: null,
    keyboardArrow: true,
    previewImage: null
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
    },
    srcPreviewImage() {
      this.previewImage = this.$store.getters.info.image
      return this.previewImage
    }
  }
}
</script>

<style scoped lang="scss">
.uploading-image {
  max-height: 65px;
}
</style>