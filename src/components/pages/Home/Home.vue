<template>
	<v-container v-if="dataLoaded" class="dashboard">
		<v-row justify="center">
			<v-col cols="12" md="8">
				<NextGame :game="gamedays.nextGame" />
				<PrizePool />
				<PersonnalStats />
				<PastGames :games="gamedays.pastGames" />
			</v-col>
		</v-row>
	</v-container>
	<v-container v-else>
		<v-row>
			<v-col cols="8" offset="2" class="loading" align="center">
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
} from '../../../style/colors.vars';
import { mapState } from 'vuex';
import NextGame from './NextGame/NextGame';
import PastGames from './PastGames';
import PersonnalStats from './PersonnalStats/PersonnalStats';
import PrizePool from './PrizePool';

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
		this.initApp();
	},
	computed: {
		...mapState({
			_nextgame: state => state.NextGame,
			_pastgames: state => state.pastGames
		})
	},

	methods: {
		initApp: async function() {
			if (this.$store.state.gamedays === null) {
				const getGames = await this.$store.dispatch('getGamedays');
				const getBets = await this.$store.dispatch('getAllBets');
				if (getGames.statusText === 'OK' && getBets.statusText === 'OK') {
					this.gamedays = this.$store.state.gamedays;
					this.dataLoaded = true;
				}
			} else {
				this.gamedays = this.$store.state.gamedays;
				this.dataLoaded = true;
			}
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
