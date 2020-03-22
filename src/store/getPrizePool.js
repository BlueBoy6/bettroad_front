/* eslint-disable no-console */
import { getBetsOfGameDay } from '../helpers/betsdata';

export const getPrizePool = async (context, idGameday) => {
	try {
		const fetchBets = await getBetsOfGameDay(
			context.state.user.token,
			idGameday
		);
		console.log('fetchBets : ', fetchBets);

		const goodresultsofBets = fetchBets[0].gameday.betslist;
		console.log('goodresultsofBets : ', goodresultsofBets);

		const resultsOfPlayers = fetchBets
			.map(betPlayer => {
				console.log('betPlayer', betPlayer);
				if (betPlayer.userName === context.state.user.name) return;
				// function to get a simple boolean of win or not
				const betsSubmitedRebuilt = betPlayer.betsSubmited_TEST.map(
					betsubmited => {
						// return the corresponding good result
						const correspondingGoodResult = goodresultsofBets.filter(
							betResult => betResult.label === betsubmited.label
						);

						// Compare the bet submited with good result
						const betWin =
							correspondingGoodResult[0].result === betsubmited.result;

						return {
							...betsubmited,
							win: betWin
						};
					}
				);
				// return bet of player with boolean in
				return { ...betPlayer, betsSubmited_TEST: betsSubmitedRebuilt };
			})
			.filter(r => Boolean(r));
		console.log('resultsOfPlayers : ', resultsOfPlayers);

		// prepare the counter
		const labelsPrepareCounter = goodresultsofBets.reduce((acc, curr) => {
			const labelFormat = curr.label;
			acc[labelFormat] = 0;
			return acc;
		}, {});
		console.log('labelsPrepareCounter', labelsPrepareCounter);

		// counter of wins in total
		const counterGoodResult = resultsOfPlayers.reduce((acc, curr) => {
			curr.betsSubmited_TEST.forEach(bet => {
				if (bet.win) acc[bet.label] += 1;
			});
			return acc;
		}, labelsPrepareCounter);
		console.log('reducection : ', counterGoodResult);

		/*
		
		TO DO :

		Il me manque à récupérer la mise total individuel de l'année divisé par le nombre de journée
		Ensuite je récupère les paris où j'ai gagné, je récupère les scores correspondant (counterGoodResult), et le nombre de joueurs totaux de l'équipe 
		(car si un joueur oublie de parier son pari est considérer comme perdu)
		et enfin je fais cagnote individuel journalier divisé par nombre de paris fois nombre de joueur de l'équipe
		et je divise ce résultat par le score correspondant (counterGoodResult) de gagnant


		*/
	} catch (err) {
		throw "Nous n'avons pas pu récupérer les données des autres joueurs";
	}
};
