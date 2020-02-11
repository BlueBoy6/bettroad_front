/* eslint-disable no-console */
function log(addmessage, e) {
	console.log('log : ', addmessage, e);
}
export const storeBets = (state, payload) => {
	console.log('storebets :', payload);
	const nextGameId = state.gamedays.nextGame.id;
	const betOfNextGame = payload.filter(bet => bet.gameday.id === nextGameId);
	const nextGameBetSubmited = betOfNextGame.map(bet => {
		return { betType: bet.betstype.name, betSubmited: bet.betSubmited };
	});
	log('bets of next game : ', nextGameBetSubmited);
	if (nextGameBetSubmited.length === 0) {
		return (state.bets.nextGame = null);
	}
	return (state.bets.nextGame = nextGameBetSubmited);
};
