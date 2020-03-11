/* eslint-disable no-console */
import Vue from "vue";
import Vuex from "vuex";
import { storeBets } from "./storeBets";
import { postBets } from "./postBetAction";
import { getGamedays } from "./getGamedays";
import { getAllBets } from "./getAllBets";
import { getTeammates } from "./getTeammates";
import { getTeams } from "./getTeams";
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
			state.gamedays = null;
			state.bets = null;
			state.teamMates = null;
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
		storeFindedSubmitedNextGame(state, payload) {
			state.gamedays.nextGame = {
				...state.gamedays.nextGame,
				betSubmited: payload
			};
		},
		storeNextGame(state, payload) {
			state.gamedays.nextGame = payload;
		},
		storePastGames(state, payload) {
			state.gamedays.pastGames = payload;
		},
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
