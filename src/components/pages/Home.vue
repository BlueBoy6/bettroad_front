<template>
	<v-container v-if="dataLoaded" class="dashboard">
		<v-row justify="center">
			<v-col cols="12" md="8">
				<NextGame :game="gamedays.nextGame" />
			</v-col>
		</v-row>
	</v-container>
	<v-container v-else>
		<v-row>
			<v-col cols="8" offset="2" class="loading">
				<v-progress-circular
					:size="130"
					:width="7"
					:color="colorBackgroundLight"
					indeterminate
				/>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
/* eslint-disable no-console */
import {
	colorBackgroundLight,
	colorBackgroundDark,
	whiteText,
	darkText,
	spaceInside
} from '../../sass/colors.vars';
import NextGame from '../organisms/NextGame';
export default {
	components: {
		NextGame
	},
	data() {
		return {
			dataLoaded: false,
			gamedays: null,
			colorBackgroundLight,
			colorBackgroundDark,
			whiteText,
			darkText,
			spaceInside
		};
	},
	mounted: async function() {
		const token = this.$store.state.user.token;
		if (token === null) {
			return this.$router.push({
				path: '/'
			});
		}
		this.fetchGameData();
	},
	methods: {
		fetchGameData: async function() {
			// const gamedays = await getGameDays(token);
			this.$store.dispatch('getGamedays').then(() =>{
				this.gamedays = this.$store.state.gamedays;
				this.dataLoaded = true;
			})

			// // const betsCategoriesData = await getBetsTypeCategories(token);
			// // const players = await getPlayersTeam(token);
			// const bets = await getBets(token, this.$store.state.user.id);
			// if (bets) {
			// 	this.$store.commit('storeBetsCategories', betsCategoriesData);
			// 	this.$store.commit('storeTeamMates', players);
			// 	this.$store.commit('storeGameDays', [
			// 		betsCategoriesData,
			// 		gamedaysdata
			// 	]);
			// 	this.$store.commit('storeBets', bets);
			// 	if (this.$store.state.gamedays.nextGame !== null) {
			// 		this.gamedays = this.$store.state.gamedays;
			// 		this.dataLoaded = true;
			// 	}
			// }
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
