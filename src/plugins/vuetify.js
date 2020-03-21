import Vue from "vue";
// import Vuetify from "vuetify/lib";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		dark: true
	},
	icons: {
		iconfont: "mdiSvg" // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
	}
});
