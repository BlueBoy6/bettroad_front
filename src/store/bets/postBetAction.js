/* eslint-disable no-console */
import { postBet } from '../../helpers/betsdata';
export const postBets = async function ({ commit, rootState }, payload) {
	const dataBets = payload.bets;
	const gamedayDate = payload.gamedayId;

	const postFormat = {
		user: rootState.user.id,
		userName: rootState.user.name,
		gameday: gamedayDate,
		betsSubmited_TEST: dataBets.map((v) => {
			// check if is Object
			const betssubmit = Array.isArray(v.value) ? v.value : v.value;
			return { __component: v.type, result: betssubmit, label: v.label };
		}),
	};

	try {
		const postAction = await postBet(rootState.user.token, postFormat);
		console.log('post bet : ', postAction.data);
		const nextGameBetSubmited = postAction.data.betsSubmited_TEST;
		const rebuiltNextGame = {
			...rootState.gamedays.nextGame,
			betslist: rootState.gamedays.nextGame.betslist.map((bet, i) => {
				return {
					...bet,
					betsubmited: {
						label: nextGameBetSubmited[i].label,
						result: nextGameBetSubmited[i].result,
					},
				};
			}),
		};
		commit('storeBet', postAction.data)
		commit('storeNextGame', rebuiltNextGame);
		return rebuiltNextGame;
	} catch (err) {
		throw `nous ne sommes pas arrivé à soumettre ton paris. ${err}`;
	}
};
