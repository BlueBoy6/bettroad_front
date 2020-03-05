/* eslint-disable no-console */
import { getBets } from "../helpers/betsdata";

export const getAllBets = async function(context) {
	const allBets = await getBets(
		context.state.user.token,
		context.state.user.id
	);

	// catch bet already stored
	const nextGamedayAlreadyBetted = allBets.filter(
		bet => bet.gameday.id === context.state.gamedays.nextGame.id
	);
	const pastGamesBets = allBets
		.map(bet => {
			const findgame = context.state.gamedays.pastGames.filter(
				game => game.id === bet.gameday.id
			);
			if (findgame.length !== 0)
				// return { ...findgame[0], betSubmited: bet.betsSubmited_TEST };
				console.log("bet", bet);
			console.log("findgame[0]", findgame[0]);
			return {
				...findgame[0],
				betslist: bet.betslist.map((betB, j) => {
					return { ...betB, submited: bet.betsSubmited_TEST[j].result };
				})
			};
		})
		.filter(Boolean);
	console.log("pastGamesBets : ", pastGamesBets);
	const pastGamesBetsRebuilt = context.state.gamedays.pastGames.map(game => {
		const idgame = game.id;
		const pastgameslist = pastGamesBets.filter(pgame => pgame.id === idgame);
		if (pastgameslist.length === 0) return game;
		return pastgameslist[0];
	});

	context.commit("storePastGames", pastGamesBetsRebuilt);

	if (nextGamedayAlreadyBetted.length === 1) {
		context.commit("storeFindedSubmitedNextGame", nextGamedayAlreadyBetted[0]);
	}

	if (allBets) return { statusText: "OK" };
};
