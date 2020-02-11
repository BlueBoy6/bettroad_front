/* eslint-disable no-console */
import Vue from 'vue';
import Vuex from 'vuex';
import { storeGameDays } from './gamedays';
import { storeBets } from './storeBets';
import { postBet } from '../helpers/betsdata';
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
		storeBetsCategories(state, payload) {
			state.betsCategorie = payload;
		},
		storeTeamMates(state, payload) {
			state.teamMates = payload;
		},
		postBetPlayer: async function(state, payload) {
			const dataBets = payload.bets;
			const gamedayDate = payload.gameday.id;
			const dataToSubmit = dataBets.map(bet => {
				return {
					user: state.user.id,
					betSubmited: bet.value,
					gameday: gamedayDate,
					betstype: bet.idBet
				};
			});
			const postAction = await postBet(state.user.token, dataToSubmit);
			if (postAction.status === 'OK') {
				console.log(postAction);
				const nextGameId = state.gamedays.nextGame.id;
				const betOfNextGame = postAction.data.filter(
					bet => bet.data.gameday.id === nextGameId
				);
				console.log('betOfNextGame', betOfNextGame);
				const nextGameBetSubmited = betOfNextGame.map(bet => {
					return {
						betType: bet.data.betstype.name,
						betSubmited: bet.data.betSubmited
					};
				});
				if (nextGameBetSubmited.length === 0) {
					return (state.bets.nextGame = null);
				}
				console.log('nextGameBetSubmited', nextGameBetSubmited);
				return (state.bets.nextGame = nextGameBetSubmited);
			}
		},
		storeGameDays,
		storeBets
	},
	actions: {
		postBet(context, commit) {
			context.post;
			console.log('commit : ', commit);
		}
	}
});
