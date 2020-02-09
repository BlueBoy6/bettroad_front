/* eslint-disable no-console */
import Vue from 'vue';
import Vuex from 'vuex';
import { storeGameDays } from './gamedays';
import { postBet } from '../helpers/betsdata';
Vue.use(Vuex);
export default new Vuex.Store({
	state: {
		user: {
			id: 2,
			token: localStorage.userToken
		},
		gamedays: {
			next: null,
			futureGames: null,
			pastGames: null
		},
		betNextGameStatus: null,
		betsCategorie: null,
		teamMates: null
	},
	mutations: {
		login(state, payload) {
			state.user = payload;
		},
		betnextgamestatus(state, payload) {
			console.log('state', state);
			console.log('comit', payload);
			state.betNextGameStatus = payload;
		},
		storeBetsCategories(state, payload) {
			state.betsCategorie = payload;
		},
		storeTeamMates(state, payload) {
			state.teamMates = payload;
		},
		postBetPlayer(state, payload) {
			const dataBets = payload.bets;
			// const dataGameId = payload.gamedayId;
			const gamedayDate = payload.gameday.date;
			// console.log('postBetPlayer : ', dataGameId);
			console.log('datas value : ', payload);
			const dataToSubmit = dataBets.map(bet => {
				return {
					user: state.user.id,
					betSubmited: bet.value,
					gameday: gamedayDate,
					betstype: bet.idBet
				};
			});
			console.log('dataToSubmit : ', dataToSubmit);

			const postAction = postBet(state.user.token, dataToSubmit);
			if (postAction.status === 'OK') {
				localStorage.setItem(`betnextgame${state.gamedays.next.id}`, 'OK');
				return (state.betNextGameStatus = 'OK');
			}
		},
		storeGameDays
	},
	actions: {
		postBet(context, commit) {
			context.post;
			console.log('commit : ', commit);
		}
	}
});
