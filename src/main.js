import { createApp } from "vue";
// import * as Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "materialize-css/dist/js/materialize.min";
import filters from '@/filter/currency.filter'

// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import  "firebase/compat/auth";
import  "firebase/compat/database";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

        vue.config.globalProperties.$filters = filters
        vue.use(store)
        vue.use(router)
        vue.mount("#app");
    }
})
