<template>
	<div>
		<p class="display-1 mb-5" :class="[whiteText]">Prochain match</p>
		<v-card
			class="display-1 event__card"
			:class="[spaceInside, colorBackgroundLight, darkText]"
		>
			<p class="subtitle-1 mb-0">
				<!-- <v-icon :color="colorBackgroundDark">mdi-map-marker-radius</v-icon> -->
				<span>{{ game.city }}</span>
			</p>
			<p class="headline font-weight-bold">{{ game.day.fr }}</p>
			<v-row v-if="nextGameSubmited">
				<v-col class="py-0">
					<p class="title">T'as parié sur</p>
					<div
						v-bind:key="i"
						v-for="(betted, i) in betSubmited"
						class="bets__submited mt-2"
					>
						<p class="pa-2 ma-0 body-2" :class="[colorBtn, whiteText]">
							{{ betted.betType }}
						</p>
						<p class="pa-2 ma-0 body-2">{{ betted.betSubmited }}</p>
					</div>
				</v-col>
			</v-row>
			<v-row justify="end" v-else>
				<v-col>
					<v-card
						v-bind:key="bet.name"
						v-for="bet in game.betstypes"
						class="mt-1 pa-3 subtitle-1 bets__available"
						:class="whiteText"
						elevation="5"
						width="100%"
						>{{ bet.name }}</v-card
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
						v-for="(bet, i) in game.betstypes"
						v-bind:key="bet.name"
					>
						<p :class="darkText">{{ bet.name }}</p>
						<BetSwitch
							:id="i"
							:type="bet.betstype_categorie"
							:idBet="bet.id"
							expanded
							@input="e => changeValueBet(e, i)"
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
			betSubmited: this.$store.state.bets.nextGame,
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
		changeValueBet: function(e, i) {
			const betValueFormated = {
				id: i,
				idBet: e.idBet,
				value: e.value,
				idType: e.type.id
			};
			const indexOfBet = this.bet.bets.findIndex(bet => bet.id === i);
			if (indexOfBet === -1)
				return (this.bet.bets = [...this.bet.bets, betValueFormated]);
			return (this.bet.bets[indexOfBet] = betValueFormated);
		},
		submitBet: function() {
			if (this.bet.bets.length < this.game.betstypes.length) {
				return (this.error = {
					status: true,
					message: "Tu n'as pas remplies tous les champs !"
				});
			}
			const betToSubmit = this.bet;
			this.$store
				.dispatch('postBets', betToSubmit)
				.then(result => (this.betSubmited = result));
			this.nextGameOverlay = false;
		}
	},
	computed: {
		nextGameSubmited: function() {
			if (this.$store.state.bets.nextGame !== null) {
				return true;
			}
			return false;
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
