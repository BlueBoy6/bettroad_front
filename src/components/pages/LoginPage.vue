<template>
	<v-container class="modal__container">
		<v-row align="center" justify="center" class="modal__connect__row">
			<v-col cols="6" class="grey darken-4 pa-10 modal__connect">
				<v-text-field
					@input="val => (login = val)"
					:color="colorInputs"
					label="Ton pseudo"
					outlined
				></v-text-field>
				<v-text-field
					:type="showMdp ? 'text' : 'password'"
					@input="val => (password = val)"
					label="Ton mot de passe"
					:color="colorInputs"
					:append-icon="showMdp ? 'mdi-eye' : 'mdi-eye-off'"
					@click:append="showMdp = !showMdp"
					outlined
				></v-text-field>
				<v-row justify="end">
					<v-col cols="auto">
						<v-btn :class="colorBtn" @click="connect" large float-right
							>Go parier !</v-btn
						>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
/* eslint-disable no-console */
import { colorInputs, colorBtn } from '../../sass/colors.vars';
import { loginConnect } from '../../helpers/login';
export default {
	data() {
		return {
			colorInputs,
			colorBtn,
			login: '',
			password: '',
			showMdp: false
		};
	},
	methods: {
		connect: async function() {
			const connection = await loginConnect(this.login, this.password);
			if (connection.status === 'OK') {
				this.$store.commit('login', connection.user);
				this.$router.push({
					path: '/dashboard'
				});
			}
		}
	}
};
</script>

<style lang="scss">
.modal__container {
	min-height: 100%;
	.modal__connect__row {
		height: 100%;
		.modal__connect {
			border-radius: 4px;
		}
	}
}
</style>
