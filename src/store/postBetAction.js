/* eslint-disable no-console */
import { postBet } from '../helpers/betsdata';
export const postBets = async function(context, payload) {
	const dataBets = payload.bets;
	const gamedayDate = payload.gameday.id;
	const tryPost = {
		user: context.state.user.id,
		userName: context.state.user.name,
		gameday: gamedayDate,
		betsSubmited_TEST: dataBets.map(v => {
			const betssubmit = Array.isArray(v.value) ? v.value[0] : v.value;
			return { __component: v.type, result: betssubmit, label: v.label };
		})
	};
	const postAction = await postBet(context.state.user.token, tryPost);
	if (postAction.status === 'OK') {
		const nextGameBetSubmited = postAction.data.betsSubmited_TEST;
		context.commit('storeNextGameBet', nextGameBetSubmited);
		return nextGameBetSubmited;
	}
};
