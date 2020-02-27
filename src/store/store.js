/* eslint-disable no-console */
import Vue from 'vue';
import Vuex from 'vuex';
import { storeGameDays } from './gamedays';
import { storeBets } from './storeBets';
import { postBets } from './postBetAction';
import { getGamedays } from './getGamedays';
import { getTeammates } from './getTeammates';
import { getTeams } from './getTeams';
Vue.use(Vuex);
export default new Vuex.Store({
	state: {
		user: {
			id: localStorage.userId ? localStorage.userId : null,
			name: localStorage.userName || null,
			role: null,
			token: localStorage.userToken || null
		},
		gamedays: {
			nextGame: null,
			futureGames: null,
			pastGames: null
		},
		bets: {
			nextGame: null,
			pastGames: null
		},
		betsCategorie: null,
		teamMates: null
	},
	mutations: {
		login(state, payload) {
			state.user = payload;
		},
		logout(state) {
			state.user = {
				id: null,
				name: null,
				role: null,
				token: null
			};
		},
		storeGamedays(state, payload) {
			state.gamedays = payload;
		},
		storeTeammates(state, payload) {
			state.teamMates = payload;
		},
		storeTeamschampionship(state, payload) {
			state.teamsChampionship = payload;
		},
		postBetCommit(state, payload) {
			state.bets.nextGame = payload;
		},
		storeGameDays,
		storeBets
	},
	actions: {
		postBets,
		getGamedays,
		getTeammates,
		getTeams
	}
});
