import { createStore } from "vuex";
import auth from './auth'
import info from "@/store/info";

export default createStore({
  state: {
    error: null
  },
  getters: {
    error: s => s.error
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    cleanError(state) {
      state.error = null
    }
  },
  actions: {
    async fetchCurrency() {
      const key = process.env.VUE_APP_FIXER
      const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&format=1`)
      return await res.json()
    }
  },
  modules: {
    auth,
    info
  },
});
