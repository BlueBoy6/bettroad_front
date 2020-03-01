/* eslint-disable no-console */
import Vue from 'vue';
import Vuex from 'vuex';
import { storeGameDays } from './gamedays';
import { storeBets } from './storeBets';
import { postBets } from './postBetAction';
import { getGamedays } from './getGamedays';
import { getAllBets } from './getAllBets';
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
		gamedays: null,
		bets: null,
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
		storeNextGameBet(state, payload) {
			console.log('state.bets :', state.bets);

			state.bets = { nextGame: payload };
			console.log('after state.bets :', state.bets);
		},
		storeFindedSubmitedNextGame(state, payload) {
			state.gamedays.nextGame = {
				...state.gamedays.nextGame,
				betSubmited: payload
			};
		},
		storeAllBets(state, payload) {
			state.bets = payload;
		},
		storeGameDays,
		storeBets
	},
	actions: {
		postBets,
		getGamedays,
		getAllBets,
		getTeammates,
		getTeams
	}
});
