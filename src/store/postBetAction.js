import { postBet } from '../helpers/betsdata';
export const postBets = async function(context, payload) {
	const dataBets = payload.bets;
	const gamedayDate = payload.gameday.id;
	// const dataToSubmit = dataBets.map(bet => {
	// 	return {
	// 		user: context.state.user.id,
	// 		userName: context.state.user.name,
	// 		betSubmited: bet.value,
	// 		gameday: gamedayDate,
	// 		betstype: bet.idBet
	// 	};
	// });
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
		const nextGameId = context.state.gamedays.nextGame.id;
		const betOfNextGame = postAction.data.filter(
			bet => bet.data.gameday.id === nextGameId
		);
		const nextGameBetSubmited = betOfNextGame.map(bet => {
			return {
				betType: bet.data.betstype.name,
				betSubmited: bet.data.betSubmited
			};
		});
		context.commit('postBetCommit', nextGameBetSubmited);
		return nextGameBetSubmited;
	}
};
