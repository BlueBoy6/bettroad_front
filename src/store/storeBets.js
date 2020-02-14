/* eslint-disable no-console */

export const storeBets = (state, payload) => {
	const nextGameId = state.gamedays.nextGame.id;
	const betOfNextGame = payload.filter(bet => bet.gameday.id === nextGameId);
	const nextGameBetSubmited = betOfNextGame.map(bet => {
		return { betType: bet.betstype.name, betSubmited: bet.betSubmited };
	});
	if (nextGameBetSubmited.length === 0) {
		return (state.bets.nextGame = null);
	}
	return (state.bets.nextGame = nextGameBetSubmited);
};
