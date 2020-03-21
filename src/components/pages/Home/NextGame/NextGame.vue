<template>
	<div>
		<p class="display-1 mb-5" :class="[whiteText]">Prochain match</p>
		<v-sheet
			class="display-1 event__card"
			:class="[spaceInside, colorBackgroundLight, darkText]"
		>
			<p class="subtitle-1 mb-0">
				<span>{{ game.city }}</span>
			</p>
			<p class="headline font-weight-bold">{{ game.day.fr }}</p>
			<NextGameAlreadyBetted
				v-if="nextGameSubmitedBool"
				:nextGameBetted="nextGameSubmitedList"
			/>
			<!-- SI AUCUN PARIS N'A ETE SOUMIS POUR CE GAMEDAY -->
			<v-row justify="end" v-else>
				<v-col>
					<v-card
						:key="bet.id"
						v-for="bet in game.betslist"
						class="mt-1 pa-3 subtitle-1 bets__available"
						:class="[whiteText, colorBackgroundDark]"
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
		</v-sheet>

		<!-- LORSQU'ON CLIQUE SUR PARI -->
		<NextGameBettOverlay
			:isShow="nextGameOverlay"
			@close="nextGameOverlay = false"
			:game="game"
		/>
	</div>
</template>

<script>
	/* eslint-disable no-console */
	import { mapState } from "vuex";
	import {
		colorBackgroundLight,
		colorBackgroundDark,
		colorErrorModal,
		colorSuccess,
		colorBtn,
		whiteText,
		darkText,
		spaceInside
	} from "../../../../style/colors.vars";

	import NextGameAlreadyBetted from "./NextGameAlreadyBetted.vue";
	import NextGameBettOverlay from "./NextGameBettOverlay.vue";
	export default {
		components: {
			NextGameAlreadyBetted,
			NextGameBettOverlay
		},
		props: {
			game: Object
		},
		data() {
			return {
				//improve error message
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
		computed: {
			...mapState({
				nextGameSubmitedBool: state =>
					state.gamedays?.nextGame?.betslist?.[0]?.betsubmited !== null,
				nextGameSubmitedList: state => state.gamedays?.nextGame?.betslist
			})
		}
	};
</script>

<style lang="scss">
	@import "../../../../style/mixins.scss";

	.bets__submited {
		p:first-child {
			border-radius: 4px 4px 0 0;
		}
		p:last-child {
			border: 2px solid #263238;
			border-top: none;
			border-radius: 0 0 4px 4px;
		}
	}

	.layer__bets {
		max-height: 95vh;
		overflow: scroll;
		scrollbar-width: thin;
		::-webkit-scrollbar {
			width: 5px;
		}
		// @include media-min('laptop') {
		// 	max-height: 95vh;
		// 	overflow: hidden;
		// }
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
