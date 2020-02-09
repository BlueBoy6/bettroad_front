/* eslint-disable no-console */
import Vue from 'vue';
import Vuex from 'vuex';
import { storeGameDays } from './gamedays';
Vue.use(Vuex);
export default new Vuex.Store({
	state: {
		user: {
			token: localStorage.tokenUser
		},
		gamedays: {
			next: null,
			futureGames: null,
			pastGames: null
		},
		betsCategorie: null
	},
	mutations: {
		login(state, payload) {
			state.user = payload;
			localStorage.tokenUser = payload.token;
		},
		storeBetsType(state, payload) {
			state.betsCategorie = payload;
		},
		storeGameDays
	}
});
