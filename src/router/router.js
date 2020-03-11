import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/pages/Home/Home";
import LoginPage from "../components/pages/LoginPage";
import NextGameBetModifier from "../components/pages/NextGameBetModifier/NextGameBetModifier";

Vue.use(VueRouter);

export default new VueRouter({
	routes: [
		{ path: "/", component: LoginPage },
		{ path: "/dashboard", component: Home },
		{ path: "/nextgame-modifier", component: NextGameBetModifier }
	]
});
