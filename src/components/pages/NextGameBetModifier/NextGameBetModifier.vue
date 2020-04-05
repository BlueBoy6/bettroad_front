<template>
	<div class="NGBetModifierPage">
		<h1 class="ma-5">Modification de ton paris</h1>
		<v-sheet
			class="pa-2 ma-5"
			:class="[colorBackgroundLight, darkText]"
			v-if="dataLoaded"
		>
			<h2>{{ nextgame.city }}</h2>
			<p class="subtitle-1">{{ nextgame.day.fr }}</p>

			<div :key="bet.id" v-for="bet in nextgame.betslist">
				<label>{{ bet.label }}</label>
				<BetsSwitch
					expanded
					:type="bet.__component"
					:defaultValue="bet.betsubmited.result"
					@input="(e) => changeValueBet(e, bet.id, bet.label)"
				/>
			</div>
			<div class="NGBetModifierPage__submit mt-5">
				<v-btn :class="[colorSuccess]" large @click="submitModification">
					<v-icon small class="mr-2">mdi-check-bold</v-icon> Modifier
				</v-btn>
			</div>
		</v-sheet>
		<v-row v-else>
			<v-col cols="8" offset="2" class="loading" align="center">
				<v-progress-circular
					:size="130"
					:width="7"
					:color="colorBackgroundLight"
					indeterminate
				/>
			</v-col>
		</v-row>
		<div class="backtohome__row ma-5">
			<v-btn link :class="[colorBackgroundLight, darkText]" to="/dashboard">
				<v-icon small dark class="mr-2">mdi-home</v-icon> Retour à l'accueil
			</v-btn>
		</div>
		<v-snackbar absolute v-model="error.status" :color="colorErrorModal"
			>{{ error.message }}
			<v-btn
				class="mx-2"
				fab
				dark
				small
				:color="colorBackgroundDark"
				@click="() => (error.status = false)"
			>
				<v-icon dark>mdi-close</v-icon>
			</v-btn>
		</v-snackbar>
	</div>
</template>

<script>
/* eslint-disable no-console */
import {
	colorBackgroundLight,
	colorBackgroundDark,
	colorErrorModal,
	whiteText,
	colorSuccess,
	darkText,
} from '@/style/colors.vars';
import BetsSwitch from '@/components/atoms/betsSwitch';
import { mapState } from 'vuex';
export default {
	components: {
		BetsSwitch,
	},
	data() {
		return {
			colorBackgroundLight,
			colorSuccess,
			colorBackgroundDark,
			colorErrorModal,
			darkText,
			whiteText,
			dataLoaded: false,
			error: { status: false, message: '' },
			betsController: [],
		};
	},
	computed: {
		...mapState({
			nextgame: (state) => state.gamedays?.nextGame,
			bets: (state) => state.bets.list,
		}),
	},
	async mounted() {
		if (!this.nextgame) {
			this.initApp();
		} else {
			this.betsController = this.nextgame.betslist.map((bet) => {
				const betValueFormated = {
					idBet: bet.id,
					value: bet.betsubmited.result,
					type: bet.__component,
					label: bet.label,
				};
				return betValueFormated;
			});
			this.dataLoaded = true;
		}
	},
	methods: {
		changeValueBet: function (e, idBet, label) {
			const betValueFormated = {
				idBet,
				value: e.value,
				type: e.type,
				label,
			};
			const controllerRebuilt = this.betsController.map((bet) => {
				if (bet.idBet === idBet) {
					return betValueFormated;
				}
				return bet;
			});
			this.betsController = controllerRebuilt;
		},
		submitModification: function () {
			const betId = this.bets.find(
				(bet) => bet.gameday.id === this.nextgame.id
			).id;

			const betToSubmit = {
				betId: betId,
				gamedayId: this.nextgame.id,
				bets: this.betsController,
			};
			this.$store
				.dispatch('updateBetNextGame', betToSubmit)
				.then((result) => {
					if (result.status === 'OK') {
						return this.$router.push({ path: '/dashboard' });
					}
					this.error.message = result.message;
					this.error.status = true;
				});
		},
		backToHome: function () {
			this.$router.push({ path: '/dashboard' });
		},
		initApp: async function () {
			try {
				await this.$store.dispatch('getGamedays');
				await this.$store.dispatch('getAllBets');
				await this.$store.dispatch('getTeammates');
				this.betsController = this.nextgame.betslist.map((bet) => {
					const betValueFormated = {
						idBet: bet.id,
						value: bet.betsubmited.result,
						type: bet.__component,
						label: bet.label,
					};
					return betValueFormated;
				});

				this.dataLoaded = true;
			} catch (err) {
				throw 'Une erreur rencontré dans la récupération';
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.NGBetModifierPage {
	&__submit {
	}
}
</style>
