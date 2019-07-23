import Vue from "vue";
import store from "./store";
import Router from "vue-router";
import Home from "./views/Home.vue";
Vue.use(Router);

const router = new Router({
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/books",
      name: "books",
      // lazy loading
      component: () => import("./components/books/BookTable.vue")
    },
    {
      path: "/books/add",
      name: "addBook",
      // lazy loading
      component: () => import("./components/books/BookForm.vue"),
      props: {
        editing: false
      }
    },
    {
      path: "/books/:id",
      name: "editBook",
      // lazy loading
      component: () => import("./components/books/BookForm.vue")
    },
    {
      path: "/authback",
      name: "authback",
      component: () => import("./views/AuthBack.vue"),
      props: route => ({
        token: route.query.access_token,
        expiresIn: route.query.expires_in
      })
    },
    {
      path: "/404",
      name: "notfound",
      component: () => import("./components/Error.vue"),
      props: {
        msg: "(404) Page not found"
      }
    },
    {
      path: "*",
      // named route redirection
      redirect: { name: "notfound" }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.name !== "authback" && to.name !== "home") {
    if (!store.getters["user/isLoggedIn"]) {
      next({ name: "home" });
      return;
    }
  }
  next();
});

export default router;
