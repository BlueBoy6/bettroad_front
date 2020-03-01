/* eslint-disable no-console */
import { getBets } from '../helpers/betsdata';

export const getAllBets = async function(context) {
	console.log('get all bettttttssss');
	const allBets = await getBets(
		context.state.user.token,
		context.state.user.id
	);
	context.commit('storeAllBets', allBets);
	const nextGamedayAlreadyBetted = allBets.filter(
		bet => bet.gameday.id === context.state.gamedays.nextGame.id
	);
	if (nextGamedayAlreadyBetted.length === 1) {
		console.log('jusque la tout va bien ', nextGamedayAlreadyBetted);
		context.commit(
			'storeFindedSubmitedNextGame',
			nextGamedayAlreadyBetted[0]
		);
	}
	if (allBets) return { statusText: 'OK' };
};
