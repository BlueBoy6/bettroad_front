/* eslint-disable no-console */
import { getBetsOfGameDay } from "../helpers/betsdata";

export const getPrizePool = async (context, idGameday) => {
	const gameday = context.state.gamedays.allGames.find(
		game => game.id === idGameday
	);

	let fetchBets;
	try {
		fetchBets = await getBetsOfGameDay(context.state.user.token, idGameday);
	} catch (err) {
		throw "Nous n'avons pas pu récupérer les données des autres joueurs";
	}

	const goodresultsofBets = gameday.betslist;

	let ownResult;
	const resultsOfPlayers = fetchBets
		.map(betPlayer => {
			// remove comment of following line  if you want too remove your own bet
			// if (betPlayer.userName === context.state.user.name) return;

			// function to get a simple boolean of win or not
			const betsSubmitedRebuilt = betPlayer.betsSubmited_TEST.map(
				betsubmited => {
					// return the corresponding good result
					const correspondingGoodResult = goodresultsofBets.filter(
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
			if (betPlayer.userName === context.state.user.name)
				ownResult = { ...betPlayer, betsSubmited_TEST: betsSubmitedRebuilt };
			// return bet of player with boolean in
			return { ...betPlayer, betsSubmited_TEST: betsSubmitedRebuilt };
		})
		.filter(r => Boolean(r));
	console.log("resultsOfPlayers : ", resultsOfPlayers);

	// prepare the counter
	const labelsPrepareCounter = goodresultsofBets.reduce((acc, curr) => {
		const labelFormat = curr.label;
		acc[labelFormat] = { wins: 0, lose: 0, nbrBetters: 0 };
		return acc;
	}, {});
	// console.log("labelsPrepareCounter", labelsPrepareCounter);

	// counter of wins in total
	const counterGoodResults = resultsOfPlayers.reduce((acc, curr) => {
		curr.betsSubmited_TEST.forEach(bet => {
			if (bet.win) acc[bet.label].wins += 1;
			else acc[bet.label].lose += 1;
			acc[bet.label].nbrBetters += 1;
		});
		return acc;
	}, labelsPrepareCounter);

	console.log("counterGoodResults : ", counterGoodResults);
	// console.log("gameday : ", gameday);

	console.log("ownResult : ", ownResult);

	// console.log("context : ", context.state);
	const prizeEnter = gameday.betPrize;

	const cashPrizeForThisgame = ownResult.betsSubmited_TEST.reduce(
		(acc, curr) => {
			if (curr.win) {
				const stat = counterGoodResults[curr.label];
				const prizeByBets =
					(stat.nbrBetters * prizeEnter) / gameday.betslist.length;
				const cashPrice = prizeByBets / stat.wins;
				console.log("cashprice for :", curr.label, cashPrice);
				const result = { label: curr.label, cashprice: cashPrice };
				acc.cashprice += cashPrice;
				acc.betsResults.push(result);
				return acc;
			}
			const result = { label: curr.label, cashprice: 0 };
			acc.betsResults.push(result);
			return acc;
		},
		{ cashprice: 0, betsResults: [] }
	);
	console.log("cashPrizeForThisgame", cashPrizeForThisgame);

	/*
		
		TO DO :
		Ensuite je récupère les paris où j'ai gagné, je récupère les scores correspondant (counterGoodResult), et le nombre de joueurs totaux de l'équipe 
		(car si un joueur oublie de parier son pari est considérer comme perdu)
		et enfin je fais cagnote individuel journalier divisé par nombre de paris fois nombre de joueur de l'équipe
		et je divise ce résultat par le score correspondant (counterGoodResult) de gagnant


		*/
};
