<template>
  <div>
    <div class="page-title">
      <h3>{{ $filters.localize.localizeFilter('Profile') }}</h3>
    </div>

    <form class="form" @submit.prevent="handleSubmit">
      <div>
        <i class="large material-icons" v-if="!previewImage">face</i>
        <img :src="previewImage" class="uploading-image"  alt="uploading-image" v-else/>
        <input type="file" accept="image/*" @change=uploadImage($event) id="file-input">
      </div>
      <div class="input-field">
        <input
            id="name"
            type="text"
            v-model="name"
            :class="{invalid: (v$.name.$dirty && v$.name.required.$invalid)}"
        >
        <label for="name">{{ $filters.localize.localizeFilter('Name') }}</label>
        <span
            class="helper-text invalid"
            v-if="v$.name.$dirty && v$.name.required.$invalid">{{ $filters.localize.localizeFilter('Enter your name') }}</span>
      </div>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model="newEmail"
            @input="inputContext"
        >
        <label for="email">{{ $filters.localize.localizeFilter('Change Email') }}</label>
      </div>
      <div class="input-field">
        <input
            @input="inputContextPass"
            id="password"
            type="password"
            v-model.trim="password"
            :class="{invalid: (v$.password.$dirty && v$.password.minLength.$invalid)}"
        >
        <label for="password">{{$filters.localize.localizeFilter('Enter new password')}}</label>
        <small
            class="helper-text invalid"
            v-if="v$.password.$dirty && v$.password.minLength.$invalid"
        >
          {{$filters.localize.localizeFilter('The password must be')}} {{v$.password.minLength.$params.min}} {{$filters.localize.localizeFilter('characters. Now he')}} {{password.length}}
        </small>
      </div>
      <div class="input-field" v-if="changedEmailAndPassword">
        <input
            id="pass"
            type="text"
            v-model="pass"
        >
        <label class="label-pass"
               for="pass">{{ $filters.localize.localizeFilter('Enter password for change Email or Password') }}</label>
      </div>
      <div class="input-field">
        <select ref="select" v-model="currency">
          <option
              v-for="(c, idx) in currencies"
              :key="idx"
              :value="c"
          >
            {{ c }}
          </option>
        </select>
        <label for="select">{{ $filters.localize.localizeFilter('Select a currency') }}</label>
      </div>
      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isUaLocale">
          <span class="lever"></span>
          Українська
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ $filters.localize.localizeFilter('Update') }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import {required, minLength} from '@vuelidate/validators'
import {useVuelidate} from "@vuelidate/core";
import localizeFilter from "@/filter/localize.filter";
import {computed} from "vue";
import {useHead} from "@vueuse/head";
export default {
  setup: () => (
      useHead({
        title: computed(() => localizeFilter.localizeFilter('Profile'))
      }),
          {
            v$: useVuelidate()
          }
  ),
  data: () => ({
    select: null,
    name: '',
    currency: null,
    isUaLocale: true,
    currencies: [],
    newEmail: '',
    pass: '',
    changedEmailAndPassword: false,
    checkboxButton: false,
    password: '',
    previewImage: null,
  }),
  validations: {
    name: {
      required
    },
    currency: {
      required
    },
    password: {
      minLength: minLength(6)
    }
  },
  async mounted() {
    if (this.$store.getters.info.image) {
    this.previewImage = this.$store.getters.info.image
    }
    this.newEmail = await this.$store.dispatch('fetchEmail')
    this.currencies = ['UAH', 'USD', 'EUR']
    this.name = this.info.name
    this.currency = this.info.currency
    this.isUaLocale = this.info.locale === 'uk_UA'
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields()
    }, 0)
  },
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
    localizeFilter,
    ...mapActions(['updateInfo', 'fetchEmail', 'updateEmail', 'fetchAllUsers', 'updatePassword']),

    async inputContext() {
      this.changedEmailAndPassword = await this.fetchEmail() !== this.newEmail;
    },

    inputContextPass() {
      this.changedEmailAndPassword = this.password.length >= 6
      console.log(this.changedEmailAndPassword)
    },

    async handleSubmit() {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      const formData = {
        name: this.name,
        currency: this.currency,
        locale: this.isUaLocale ? 'uk_UA' : 'en_US',
        image: this.previewImage
      }
      try {
        const emailExists = (await this.fetchAllUsers()).find(user =>
            user.info.email === this.newEmail
        )
        const data = {
          email: this.newEmail,
          router: this.$router,
          pass: this.pass
        }
        const passwordData = {
          router: this.$router,
          oldPass: this.pass,
          newPass: this.password
        }

        if (this.password.length >= 6) {
          await this.checkNewPassword(passwordData)
        }

        // For Upload image in Firebase Storage

        // const file = e.target[0].files[0]
        // const storage = getStorage();
        // const storageRef = ref(storage, 'image/' + e.timeStamp + file.name);
        //
        // await uploadBytes(storageRef, file)


        if (await this.fetchEmail() !== this.newEmail) {

          if (emailExists) {
            M.toast({html: localizeFilter.localizeFilter('This email already exists')})
            return
          }

          await this.updateEmail(data)
        }
        await this.updateInfo(formData)

      } catch (e) {
        console.log(e)
      }
    },
    async checkNewPassword(passwordData) {
      await this.updatePassword(passwordData)
      this.password = ''
      this.pass = ''
      this.changedEmailAndPassword = false

    },
    uploadImage(e){
      const image = e.target.files[0];
      const reader = new FileReader();
      console.log(e)
      reader.readAsDataURL(image);
      reader.onload = e =>{
        this.previewImage = e.target.result;
      };


    }
  }
}

</script>


<style scoped lang="scss">
.switch {
  margin-bottom: 2rem;
}

.label-pass {
  color: red;
}
.uploading-image {
  max-width: 250px;
  max-height: 250px;
}

</style>