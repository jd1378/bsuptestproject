import Vue from "vue";
import Router from "vue-router";

import { TokenService } from "@/services/storage.service";
Vue.use(Router);

const router = new Router({
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login.vue"),
      meta: {
        public: true, // Allow access to even if not logged in
        onlyWhenLoggedOut: true // Redirect if user is logged in
      }
    },
    {
      path: "/books",
      name: "books",
      component: () => import("@/components/books/BookTable.vue")
    },
    {
      path: "/books/add",
      name: "addBook",
      component: () => import("@/components/books/BookForm.vue"),
      props: {
        editing: false
      }
    },
    {
      path: "/books/:id",
      name: "editBook",
      component: () => import("@/components/books/BookForm.vue")
    },
    {
      path: "/authback",
      name: "authback",
      component: () => import("@/views/AuthBack.vue"),
      props: route => ({
        token: route.query.access_token,
        expiresIn: route.query.expires_in
      }),
      meta: {
        public: true, // Allow access to even if not logged in
        onlyWhenLoggedOut: true // Redirect if user is logged in
      }
    },
    {
      path: "/404",
      name: "notfound",
      component: () => import("@/components/Error.vue"),
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
  const isPublic = to.matched.some(record => record.meta.public);
  const onlyWhenLoggedOut = to.matched.some(
    record => record.meta.onlyWhenLoggedOut
  );
  const isLoggedIn = !!TokenService.getToken();

  if (!isPublic && !isLoggedIn) {
    return next({
      path: "/login",
      query: { redirect: to.fullPath } // Store the full path to redirect the user to after login
    });
  }

  // Do not allow user to visit login page or register page if they are logged in
  if (isLoggedIn && onlyWhenLoggedOut) {
    return next("/");
  }

  next();
});

export default router;
