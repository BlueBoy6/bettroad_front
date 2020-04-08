<template>
	<v-app class="page__view">
		<v-app-bar class="top__menu" v-if="userConnected" fixed>
			<v-app-bar-nav-icon @click="openMenuAction"></v-app-bar-nav-icon>
			<v-spacer></v-spacer>
			<v-avatar size="40">
				<img :src="require('./assets/favicon.jpg')" alt="road" />
			</v-avatar>
		</v-app-bar>
		<Menu v-if="userConnected" v-model="openMenu" />
		<router-view></router-view>
	</v-app>
</template>

<script>
import Menu from '@/components/organisms/Menu'
import '@/style/main.scss'
export default {
	components: {
		Menu,
	},
	data() {
		return {
			openMenu: false,
		};
	},
	computed: {
		userConnected: function () {
			if (this.$store.state.user.id === null) {
				return false;
			}
			return true;
		},
	},
	methods: {
		openMenuAction: function () {
			this.openMenu = true;
		},
		disconnect: async function () {
			this.openMenu = false;
			try {
				await this.$store.dispatch('logout');
				this.$router.push({
					path: '/',
				});
			} catch (err) {
				throw `Un problème est arrivé lors de la déconnexion ${err}`;
			}
		},
	},
};
</script>
<style lang="scss">
.page__view {
	.top__menu {
		max-height: 60px;
	}
}
</style>
