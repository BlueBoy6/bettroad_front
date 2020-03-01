<template>
	<v-container class="modal__container">
		<v-row align="center" justify="center" class="modal__connect__row">
			<v-col cols="10" sm="6" md="8" class="grey darken-4 pa-sm-3 pa-md-10 modal__connect">
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
					@keydown="keyDownSwitcher"
					outlined
				></v-text-field>
				<v-row justify="end">
					<v-col cols="auto" class="py-0">
						<v-btn class="" :class="colorBtn" @click="connect" large float-right> 
							Go parier !
							<v-progress-circular
							v-if="waitForLog"
								:size="10"
								:width="2"
								:color="colorBackgroundLight"
								indeterminate
							/>
							</v-btn>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
/* eslint-disable no-console */
import { colorInputs, colorBtn, colorBackgroundLight } from '../../sass/colors.vars';
import { loginConnect } from '../../helpers/login';
export default {
	data() {
		return {
			colorInputs,
			colorBtn,
			colorBackgroundLight,
			login: '',
			password: '',
			showMdp: false,
			waitForLog: false
		};
	},
	methods: {
		keyDownSwitcher: function(e){
			console.log('e',e)
			if(e.key === "Enter") return this.connect()
		},
		connect: async function() {
			this.waitForLog = true;
			const connection = await loginConnect(this.login, this.password);
			if (connection.status === 'OK') {
				this.$store.commit('login', connection.user);
				this.$router.push({
					path: '/dashboard'
				});
			}
		}
	},
	mounted(){
		if(localStorage.userId !== undefined && localStorage.userToken !== undefined){
			this.$router.push({
				path: '/dashboard'
			});
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
