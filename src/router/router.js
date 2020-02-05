import Vue from 'vue'
import VueRouter from "vue-router";
// import Home from '../components/pages/Home'
import LoginPage from '../components/pages/LoginPage'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: "/", component: LoginPage },
    { path: "/login", component: LoginPage },
  ]
});
