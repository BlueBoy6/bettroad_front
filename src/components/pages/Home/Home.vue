<template>
	<v-container v-if="dataLoaded" class="dashboard">
		<v-row justify="center">
			<v-col cols="12" md="8">
				<NextGame v-if="_nextgame" :game="_nextgame" />
				<v-sheet :class="[spaceInside, colorBackgroundLight, darkText]">
					<p class="title ma-0">P***** c**, y a pas un pari à slaper là ! 🏒</p>
				</v-sheet>
				<PrizePool />
				<PersonnalStats />
				<PastGames v-if="_pastgames" :games="_pastgames" />
			</v-col>
		</v-row>
	</v-container>

	<v-container v-else>
		<v-row>
			<v-col v-if="!dataError" cols="8" offset="2" class="loading" align="center">
				<v-progress-circular
					:size="130"
					:width="7"
					:color="colorBackgroundLight"
					indeterminate
				/>
			</v-col>
			<v-col v-else cols="8" offset="2" class="loading" align="center">
				<v-alert
					v-model="dataError.status"
					close-text="Close Alert"
					:class="colorErrorModal"
					dark
					>{{ dataError.message }}</v-alert
				>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	/* eslint-disable no-console */
	import {
		colorBackgroundLight,
		colorBackgroundDark,
		colorErrorModal,
		whiteText,
		darkText,
		spaceInside
	} from "../../../style/colors.vars";
	import { mapState } from "vuex";
	import NextGame from "./NextGame/NextGame";
	import PastGames from "./PastGames";
	import PersonnalStats from "./PersonnalStats/PersonnalStats";
	import PrizePool from "./PrizePool";

	export default {
		components: {
			PastGames,
			NextGame,
			PersonnalStats,
			PrizePool
		},
		data() {
			return {
				dataLoaded: false,
				dataError: {status: false},
				gamedays: null,
				colorBackgroundLight,
				colorBackgroundDark,
				colorErrorModal,
				whiteText,
				darkText,
				spaceInside
			};
		},
		mounted: async function() {
			console.log('this.$store from home : ', this.$store)
			const token = this.$store.state.user.token;
			if (token === null) {
				return this.$router.push({
					path: "/"
				});
			}
			this.initApp();
		},
		computed: {
			...mapState({
				_games: state => state.gamedays,
				_nextgame: state => state.gamedays.NextGame,
				_pastgames: state => state.gamedays.pastGames
			})
		},

		methods: {
			initApp: async function() {
				if (this._games.gamesLoaded === false) {
					try {
						await this.$store.dispatch("getGamedays").then(() => console.log('getgamedays : ', this.$store.state));
					} catch (err) {
						this.dataError = {status: true, message: "Hey ! il y a un petit problème de démarage, de l'application, l'équipe bosse certainement déjà dessus ! 🏒"}
						throw `Petit problème dans la récupération des journées de matchs`;
					}
					try {
						await this.$store.dispatch("getAllBets").then(() => console.log('getAllBets : ', this.$store.state));
					} catch (err) {
						this.dataError = {status: true, message: "Hey ! il y a un petit problème de démarage, de l'application, l'équipe bosse certainement déjà dessus ! 🏒"}
						throw `Petit problème dans la récupération des paris soumis`;
					}
					try {
						await this.$store.dispatch("getTeammates").then(() => console.log('getTeammates : ', this.$store.state));
					} catch (err) {
						this.dataError = {status: true, message: "Hey ! il y a un petit problème de démarage, de l'application, l'équipe bosse certainement déjà dessus ! 🏒"}
						throw `Petit problème dans la récupération des teammates`;
					}
						this.gamedays = this.$store.state.gamedays;
						this.dataLoaded = true;
				}
				this.gamedays = this.$store.state.gamedays;
				this.dataLoaded = true;
			}
		}
	};
</script>

<style lang="scss">
	// $card-adjacent-sibling-text-padding-top: 45px;
	.container.dashboard {
		min-height: calc(100% - 60px);
		& > .row {
			min-height: 100%;
			.col.loading {
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
	.v-card {
		.event__card {
			border-radius: 6px;
			text-align: left;
			p.headline {
				margin-bottom: 0px;
			}
			.bets__available {
				width: 100%;
				border-radius: 4px;
			}
		}
	}
</style>
