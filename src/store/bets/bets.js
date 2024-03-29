/* eslint-disable no-console */
import { getAllBets } from './getAllBets';
import { updateBetNextGame } from './updateBetNextGame';
import { postBets } from './postBetAction';
export default {
	state: { list: null },
	mutations: {
		storeAllBets(state, payload) {
			state.list = payload;
		},
		storeFindedSubmitedNextGame(state, payload) {
			state.gamedays.nextGame = {
				...state.gamedays.nextGame,
				betSubmited: payload,
			};
		},
		storeBets(state, payload) {
			const nextGameId = state.gamedays.nextGame.id;
			const betOfNextGame = payload.filter((bet) => bet.gameday.id === nextGameId);
			const nextGameBetSubmited = betOfNextGame.map((bet) => {
				return { betType: bet.betstype.name, betSubmited: bet.betSubmited };
			});
			if (nextGameBetSubmited.length === 0) {
				return (state.bets.nextGame = null);
			}
			return (state.bets.nextGame = nextGameBetSubmited);
		},
		clearBets(state) {
			state.list = null;
		},
	},
	actions: {
		postBets,
		updateBetNextGame,
		getAllBets,
	},
};
