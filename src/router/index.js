import { createRouter, createWebHistory } from "vue-router";
import firebase from "firebase/compat/app";

const routes = [
  {
    path: "/",
    name: "home",
    meta: {
      layout: 'main',
      auth: true,
    },
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: {
      layout: 'empty'
    },
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/categories",
    name: "categories",
    meta: {
      layout: 'main',
      auth: true,
    },
    component:  () => import("../views/Categories.vue"),
  },
  {
    path: "/detail-record/:id",
    name: "detail-record",
    meta: {
      layout: 'main',
      auth: true,
    },
    component:  () => import("../views/DetailRecord.vue"),
  },
  {
    path: "/history",
    name: "history",
    meta: {
      layout: 'main',
      auth: true,
    },
    component:  () => import("../views/History.vue"),
  },
  {
    path: "/planning",
    name: "planning",
    meta: {
      layout: 'main',
      auth: true,
    },
    component:  () => import("../views/Planning.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    meta: {
      layout: 'main',
      auth: true,
    },
    component:  () => import("../views/Profile.vue"),
  },
  {
    path: "/record",
    name: "record",
    meta: {
      layout: 'main',
      auth: true,
    },
    component:  () => import("../views/Record.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta: {
      layout: 'empty'
    },
    component:  () => import("../views/Register.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next)=> {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)

  if (requireAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
});


export default router;
