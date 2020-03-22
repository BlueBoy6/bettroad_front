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
		const labelsPrepareCounter = goodresultsofBets.reduce(
			(acc, curr) => acc[curr.label.split(' ').join('')],
			{}
		);
		console.log('labelsPrepareCounter', labelsPrepareCounter);
		const reducection = goodresultsofBets.reduce((acc, curr) => {
			const labelFormat = curr.label.split(' ').join('');
			if (!acc[labelFormat]) {
				acc[labelFormat] = 0;
			}
			acc[labelFormat] += 1;
			return acc;
		}, {});
		console.log('reducection : ', reducection);
	} catch (err) {
		throw "Nous n'avons pas pu récupérer les données des autres joueurs";
	}
};
