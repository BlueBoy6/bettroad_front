/* eslint-disable no-console */

import { getBetsOfGameDay } from "../helpers/betsdata";

export const getPrizePool = async context => {
	const pastGames = context.state.gamedays.pastGames;

	let fetchBets = [];
	try {
		for (let i = 0; i < pastGames.length; i++) {
			const numberGameId = pastGames[i].id;
			const betsGame = await getBetsOfGameDay(
				context.state.user.token,
				numberGameId
			);
			fetchBets.push({ id: numberGameId, bets: betsGame });
		}
	} catch (err) {
		throw "Nous n'avons pas pu récupérer les données des autres joueurs";
	}

	const globalcashPriceRegister = fetchBets.reduce((acc, curr) => {
		const gameday = pastGames.find(game => game.id === curr.id);
		const gamedayBetslist = gameday.betslist;
		const prizeEnter = gameday.betPrize;
		let cashPrizeForThisgame;
		let ownResult;

		// Test if bets exist on this gameday
		if (gamedayBetslist !== null) {
			const resultsOfPlayers = curr.bets
				.map(betPlayer => {
					// function to get a simple boolean of win or not
					const betsSubmitedRebuilt = betPlayer.betsSubmited_TEST.map(
						betsubmited => {
							// return the corresponding good result
							const correspondingGoodResult = gamedayBetslist.filter(
								betResult => betResult.label === betsubmited.label
							);

							// Compare the bet submited with good result
							const betWin =
								correspondingGoodResult[0]?.result === betsubmited.result;
							return {
								...betsubmited,
								win: betWin
							};
						}
					);
					// let's save the bet of player
					if (betPlayer.userName === context.state.user.name) {
						const ownbet = {
							...betPlayer,
							betsSubmited_TEST: betsSubmitedRebuilt
						};
						ownResult = ownbet;
					}
					// return bet of player with boolean in
					return { ...betPlayer, betsSubmited_TEST: betsSubmitedRebuilt };
				})
				.filter(r => Boolean(r));

			// prepare the counter
			const labelsPrepareCounter = gamedayBetslist.reduce((acc, curr) => {
				const labelFormat = curr.label;
				acc[labelFormat] = { wins: 0, lose: 0, nbrBetters: 0 };
				return acc;
			}, {});

			// counter of wins in total
			const counterGoodResults = resultsOfPlayers.reduce((acc, curr) => {
				curr.betsSubmited_TEST.forEach(bet => {
					if (bet.win) acc[bet.label].wins += 1;
					else acc[bet.label].lose += 1;
					acc[bet.label].nbrBetters += 1;
				});
				return acc;
			}, labelsPrepareCounter);

			// lets calculate the cashprice
			if (ownResult) {
				cashPrizeForThisgame = ownResult.betsSubmited_TEST.reduce(
					(acc, curr) => {
						if (curr.win) {
							const stat = counterGoodResults[curr.label];
							const prizeByBets =
								(stat.nbrBetters * prizeEnter) / gameday.betslist.length;
							const cashPrice = prizeByBets / stat.wins;
							const result = { label: curr.label, cashprice: cashPrice };
							acc.cashprice += cashPrice;
							acc.betsResults.push(result);
							return acc;
						}
						const result = { label: curr.label, cashprice: 0 };
						acc.betsResults.push(result);
						return acc;
					},
					{ game: gameday.day.dayNumber, cashprice: 0, betsResults: [] }
				);
			} else {
				cashPrizeForThisgame = {
					game: gameday.day.dayNumber,
					cashprice: 0,
					betsResults: []
				};
			}
		} else {
			cashPrizeForThisgame = {
				game: gameday.day.dayNumber,
				cashprice: 0,
				betsResults: []
			};
		}

		acc.push(cashPrizeForThisgame);
		return acc;
	}, []);
	const totalCashPricer = globalcashPriceRegister.reduce((acc, curr) => {
		return (acc += curr.cashprice);
	}, 0);
	const personnalPrizePool = {
		total: totalCashPricer.toFixed(2),
		games: globalcashPriceRegister
	};
	context.commit("storePrizePool", personnalPrizePool);
	return { status: "OK" };
};
