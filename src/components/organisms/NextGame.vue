<template>
	<div>
		<p class="display-1 mb-5" :class="[whiteText]">Prochain match</p>
		<v-card
			class="display-1 event__card"
			:class="[spaceInside, colorBackgroundLight, darkText]"
		>
			<p class="subtitle-1 mb-0">
				<span>{{ game.city }}</span>
			</p>
			<p class="headline font-weight-bold">{{ game.day.fr }}</p>
			<!-- SI UN PARI A DEJA ETE SOUMIS -->
			<v-row v-if="nextGameSubmited">
				<v-col class="py-0">
					<p class="title">T'as parié sur</p>
					<div
						v-bind:key="i"
						v-for="(betted, i) in nextGameBetsSubmited"
						class="bets__submited mt-2"
					>
						<p class="pa-2 ma-0 body-2" :class="[colorBtn, whiteText]">
							{{ betted.label }}
						</p>
						<p
							v-if="betted.__component === 'betcategories.player-choice'"
							class="pa-2 ma-0 body-2"
						>
							{{ betted.result.name }}
						</p>
						<p
							v-else-if="
								betted.__component === 'betcategories.team-choice'
							"
							class="pa-2 ma-0 body-2"
						>
							{{ betted.result.name }} - {{ betted.result.city }}
						</p>
						<p v-else class="pa-2 ma-0 body-2">
							{{ betted.result }}
						</p>
					</div>
				</v-col>
			</v-row>
			<!-- SI AUCUN PARIS N'A ETE SOUMIS POUR CE GAMEDAY -->
			<v-row justify="end" v-else>
				<v-col>
					<v-card
						v-bind:key="bet.name"
						v-for="bet in game.betslist"
						class="mt-1 pa-3 subtitle-1 bets__available"
						:class="whiteText"
						elevation="5"
						width="100%"
						>{{ bet.label }}</v-card
					>
					<v-btn
						class="mt-10"
						:class="colorBtn"
						@click="nextGameOverlay = true"
						large
						width="100%"
						float-right
						>Oh {{ this.$store.state.user.name }}, Paris-là !</v-btn
					>
				</v-col>
			</v-row>
		</v-card>

		<!-- LORSQU'ON CLIQUE SUR PARI -->
		<v-overlay
			:absolute="false"
			:opacity="1"
			:value="nextGameOverlay"
			:z-index="99"
		>
			<v-container class="layer__bets">
				<v-sheet
					width="100%"
					:class="[spaceInside, colorBackgroundLight, darkText]"
				>
					<div
						class="headline font-weight-bold"
						:class="spaceInside"
						v-for="(bet, i) in game.betslist"
						v-bind:key="bet.label"
					>
						<p :class="darkText">{{ bet.label }}</p>
						<BetSwitch
							:id="i"
							:type="bet.__component"
							:idBet="bet.id"
							expanded
							@input="e => changeValueBet(e, i, bet.label)"
						/>
					</div>
					<v-snackbar
						absolute
						v-model="error.status"
						:color="colorErrorModal"
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
					<v-row :class="spaceInside">
						<v-col justify="center" align="center">
							<v-btn
								:color="colorBtn"
								@click="submitBet"
								large
								width="100%"
								>Prends mon paris là !</v-btn
							>
							<br />
							<v-btn
								:color="colorBtn"
								@click="nextGameOverlay = false"
								width="100%"
								large
								text
								>Peut-être plus tard !</v-btn
							>
						</v-col>
					</v-row>
				</v-sheet>
			</v-container>
		</v-overlay>
	</div>
</template>

<script>
/* eslint-disable no-console */
import {
	colorBackgroundLight,
	colorBackgroundDark,
	colorErrorModal,
	colorSuccess,
	colorBtn,
	whiteText,
	darkText,
	spaceInside
} from '../../sass/colors.vars';
import BetSwitch from '../atoms/betsSwitch';
export default {
	components: {
		BetSwitch
	},
	props: {
		game: Object
	},
	data() {
		return {
			bet: {
				gameday: {
					id: this.game.id,
					date: this.game.day.en
				},
				bets: []
			},
			betSubmited: null,
			nextGameBetsSubmited: null,
			//improve error message
			error: { status: false, message: '' },
			nextGameOverlay: false,
			colorBackgroundLight,
			colorBackgroundDark,
			colorErrorModal,
			whiteText,
			darkText,
			spaceInside,
			colorBtn,
			colorSuccess
		};
	},
	methods: {
		changeValueBet: function(e, i, label) {
			const betValueFormated = {
				id: i,
				idBet: e.idBet,
				value: e.value,
				type: e.type,
				label
			};
			const indexOfBet = this.bet.bets.findIndex(bet => bet.id === i);
			if (indexOfBet === -1)
				return (this.bet.bets = [...this.bet.bets, betValueFormated]);
			return (this.bet.bets[indexOfBet] = betValueFormated);
		},
		submitBet: function() {
			if (this.bet.bets.length < this.game.betslist.length) {
				return (this.error = {
					status: true,
					message: "Tu n'as pas remplies tous les champs !"
				});
			}
			//console.log('filter', this.bet.bets.filter(bet => bet.value.length === 0))
			// if(this.bet.bets.filter(bet => bet.value.length === 0).length > 0){
			// 	return (this.error = {
			// 		status: true,
			// 		message: "T'as oublié de remplir l'un des champs !"
			// 	});
			// }
			const betToSubmit = this.bet;
			this.$store.dispatch('postBets', betToSubmit).then(result => {
				this.nextGameBetsSubmited = this.$store.state.gamedays.nextGame.betSubmited;
				this.betSubmited = result;
			});
			this.nextGameOverlay = false;
		}
	},
	computed: {
		nextGameSubmited: function() {
			if (this.$store.state.gamedays.nextGame.betSubmited) {
				return true;
			}
			return false;
		}
	},
	mounted: function() {
		if (this.$store.state.gamedays.nextGame.betSubmited) {
			this.nextGameBetsSubmited = this.$store.state.gamedays.nextGame.betSubmited.betsSubmited_TEST;
		}
	}
};
</script>

<style lang="scss">
@import '../../sass/mixins.scss';

.bets__submited {
	p:first-child {
		border-radius: 4px 4px 0 0;
	}
	p:last-child {
		border: 2px solid #303f9f;
		border-top: none;
		border-radius: 0 0 4px 4px;
	}
}

.layer__bets {
	max-height: 95vh;
	overflow: scroll;
	@include media-min('laptop') {
		max-height: 95vh;
		overflow: hidden;
	}
	.v-input {
		&__slot {
			margin-bottom: 0;
		}
		.v-text-field__details {
			display: none;
		}
	}
}
</style>
