/* eslint-disable no-console */
import { getBets } from '../helpers/betsdata';

export const getAllBets = async function(context) {
	const allBets = await getBets(
		context.state.user.token,
		context.state.user.id
	);
	const nextGamedayAlreadyBetted = allBets.filter(
		bet => bet.gameday.id === context.state.gamedays.nextGame.id
	);
	const pastGamesBets = allBets
		.map(bet => {
			const findgame = context.state.gamedays.pastGames.filter(
				game => game.id === bet.gameday.id
			);
			if (findgame.length !== 0)
				return { ...findgame[0], betSubmited: bet.betsSubmited_TEST };
		})
		.filter(Boolean);

	const pastGamesBetsRebuilt = context.state.gamedays.pastGames.map(game => {
		const idgame = game.id;
		const pastgameslist = pastGamesBets.filter(pgame => pgame.id === idgame);
		if (pastgameslist.length === 0) return game;
		return pastgameslist[0];
	});

	context.commit('storePastGames', pastGamesBetsRebuilt);

	if (nextGamedayAlreadyBetted.length === 1) {
		context.commit(
			'storeFindedSubmitedNextGame',
			nextGamedayAlreadyBetted[0]
		);
	}

	if (allBets) return { statusText: 'OK' };
};
