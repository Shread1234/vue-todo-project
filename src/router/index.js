import Vue from "vue";
import VueRouter from "vue-router";
import SignIn from "../views/Sign-In";
import SignUp from "../views/Sign-Up";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_DOMAIN,
};

firebase.initializeApp(firebaseConfig);

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
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
