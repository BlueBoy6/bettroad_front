/* eslint-disable no-console */
import { getBets } from "../helpers/betsdata";

export const getAllBets = async function(context) {
	const allBets = await getBets(
		context.state.user.token,
		context.state.user.id
	);

	let nextGameBet;
	// catch bet already stored
	const allbetsWithoutNextGame = allBets.map(bet => {
		if (bet.gameday.id === context.state.gamedays.nextGame.id) {
			nextGameBet = bet;
		}
		return bet;
	});
	console.log("nextGameBet : ", nextGameBet);

	console.log("allbets : ", allBets);
	const pastGames = context.state.gamedays.pastGames;
	const pastGamesWithBets = pastGames.map(game => {
		const betMatchedWithGame = allbetsWithoutNextGame.filter(
			bet => bet.gameday.id === game.id
		);
		if (betMatchedWithGame.length > 0) {
			console.log("game", game);
			const gameBetsListRebuilt = game.betslist.map((bet, i) => {
				return {
					...bet,
					betsubmited: {
						label: betMatchedWithGame[0].betsSubmited_TEST[i].label,
						result: betMatchedWithGame[0].betsSubmited_TEST[i].result
					}
				};
			});
			const gameRebuilt = { ...game, betslist: gameBetsListRebuilt };
			console.log("gameRebuilt", gameRebuilt);
			return gameRebuilt;
		}
		return game;
	});
	console.log("pastGamesWithBets", pastGamesWithBets);

	context.commit("storePastGames", pastGamesWithBets);

	if (nextGameBet) {
		context.commit("storeFindedSubmitedNextGame", nextGameBet);
	}

	if (allBets) return { statusText: "OK" };
};
