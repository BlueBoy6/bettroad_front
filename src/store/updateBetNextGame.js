/* eslint-disable no-console */
import { updateBet } from "../helpers/betsdata";
export const updateBetNextGame = async function(context, payload) {
	const dataBets = payload.bets;
	const gamedayDate = payload.gamedayId;

	// Format the query
	const postFormat = {
		user: context.state.user.id,
		userName: context.state.user.name,
		gameday: gamedayDate,
		betsSubmited_TEST: dataBets.map(v => {
			const betssubmit = Array.isArray(v.value) ? v.value[0] : v.value;
			return {
				__component: v.type,
				result: betssubmit,
				label: v.label
			};
		})
	};

	// if no bets return immediatly error
	if (payload.bets.length === 0)
		return {
			status: "KO",
			message: "Nous n'avons pas pu modifier ton pari, réessaye plus tard !"
		};

	// Post to strapi
	const putBet = await updateBet(
		context.state.user.token,
		postFormat,
		payload.betId
	);

	// Commit to store the result
	if (putBet.status === "OK") {
		const nextGameBetSubmited = putBet.data.betsSubmited_TEST;
		const rebuiltNextGame = {
			...context.state.gamedays.nextGame,
			betslist: context.state.gamedays.nextGame.betslist.map((bet, i) => {
				return {
					...bet,
					betsubmited: {
						label: nextGameBetSubmited[i].label,
						result: nextGameBetSubmited[i].result
					}
				};
			})
		};
		context.commit("storeNextGame", rebuiltNextGame);
		return { status: "OK", message: "Hé tout est ok !" };
	}
	return {
		status: "KO",
		message: "Nous n'avons pas pu modifier ton pari, réessaye plus tard !"
	};
};
