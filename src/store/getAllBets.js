/* eslint-disable no-console */
import { getBets } from '../helpers/betsdata';

export const getAllBets = async function(context) {
	const allBets = await getBets(
		context.state.user.token,
		context.state.user.id
	);

	// init next game
	let nextGameBet;

	// catch bet who who's next game
	const allbetsWithoutNextGame = allBets.map(bet => {
		if (bet.gameday.id === context.state.gamedays.nextGame.id) {
			nextGameBet = bet;
		}
		return bet;
	});

	// fetch past games
	const pastGames = context.state.gamedays.pastGames;

	// rebuilder function to inject results
	const pastGamesWithBets = pastGames.map(game => {
		// Match the bet who got the gameday id
		const betMatchedWithGame = allbetsWithoutNextGame.filter(
			bet => bet.gameday.id === game.id
		);

		// If we found a bet
		if (betMatchedWithGame.length > 0) {
			const gameBetsListRebuilt = game.betslist.map((bet, i) => {
				return {
					...bet,
					success:
						bet.result ===
						betMatchedWithGame[0].betsSubmited_TEST[i].result,
					betsubmited: {
						label: betMatchedWithGame[0].betsSubmited_TEST[i].label,
						result: betMatchedWithGame[0].betsSubmited_TEST[i].result
					}
				};
			});

			// return the game with the bets submited
			const gameRebuilt = {
				...game,
				betslist: gameBetsListRebuilt
			};
			let successNbr = 0;
			for (let i = 0; i < gameRebuilt.betslist.length; i++) {
				gameRebuilt.betslist[i].success && successNbr++;
			}
			const successPercent =
				(successNbr / gameRebuilt.betslist.length) * 100;
			const stats = {
				successPercent: successPercent,
				numberOfSuccess: successNbr,
				numberOfBets: gameRebuilt.betslist.length
			};
			const gameRebuiltWithSuccessPercent = {
				...gameRebuilt,
				stats: stats
			};
			return gameRebuiltWithSuccessPercent;
		}

		// if no bet found or matched return game with betslist equal to null
		const gameRebuilt = {
			...game,
			betslist: game.betslist.length > 0 ? game.betslist : null,
			stats: {
				successPercent: 0,
				numberOfSuccess: 0,
				numberOfBets: game.betslist.length > 0 ? game.betslist.length : 0
			}
		};
		return gameRebuilt;
	});

	// fetch next game
	const nextGame = context.state.gamedays.nextGame;
	let nextGameWithBet;
	if (nextGameBet) {
		nextGameWithBet = {
			...nextGame,
			betslist: nextGame.betslist.map((bet, i) => {
				return {
					...bet,
					betsubmited: {
						label: nextGameBet.betsSubmited_TEST[i].label,
						result: nextGameBet.betsSubmited_TEST[i].result
					}
				};
			})
		};
	} else {
		nextGameWithBet = {
			...nextGame,
			betslist: nextGame.betslist.map(bet => {
				return {
					...bet,
					betsubmited: null
				};
			})
		};
	}

	context.commit('storePastGames', pastGamesWithBets);
	context.commit('storeAllBets', allBets);
	context.commit('storeNextGame', nextGameWithBet);

	// return a dispatch if bets was found
	if (allBets)
		return {
			statusText: 'OK'
		};
	// return a dispatch if no bets was found
	return { statusText: 'KO' };
};
