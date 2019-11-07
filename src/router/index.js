import Vue from "vue";
import VueRouter from "vue-router";
import SignIn from "../views/Sign-In";
import SignUp from "../views/Sign-Up";
import Dashboard from "../views/Dashboard";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Sign-In",
    component: SignIn,
  },
  {
    path: "/signup",
    name: "Sign-Up",
    component: SignUp,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
