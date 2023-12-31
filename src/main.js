import { createApp } from "vue";
// import * as Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import localize from "@/filter/localize.filter";
import tooltipDirective from "@/directives/tooltip.directive";
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";
import "materialize-css/dist/js/materialize.min";
import filter from '@/filter/currency.filter';
import firebase from "firebase/compat/app";
import  "firebase/compat/auth";
import  "firebase/compat/database";
import { getAnalytics } from "firebase/analytics";
import { createHead } from '@vueuse/head';

const firebaseConfig = {
    apiKey: "AIzaSyAvOtkh1wNiWcsD4FIQuBQXdc3e0CFHxqM",
    authDomain: "vue-crm-111.firebaseapp.com",
    projectId: "vue-crm-111",
    storageBucket: "vue-crm-111.appspot.com",
    messagingSenderId: "594713184556",
    appId: "1:594713184556:web:c9a3825a331eb6b0f90489",
    measurementId: "G-K2X6XV9HK8"
};


// Initialize Firebase
const analytic = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(analytic);

// Vue.filter('currency', currencyFilter)

let app
firebase.auth().onAuthStateChanged(() => {
    if (!app) {
        const vue = createApp(App)
        const head = createHead()

        vue.config.globalProperties.$filters = {filter, localize}
        vue.use(store)
        vue.use(router)
        vue.use(VueAwesomePaginate)
        vue.use(head)
        vue.directive('tooltip', tooltipDirective)
        vue.mount("#app");
    }
})
