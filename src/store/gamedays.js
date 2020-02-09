/* eslint-disable no-console */
import moment from 'moment';
import momentfr from '../helpers/momentfr';
import { dateFormater } from '../helpers/calendar';

export const storeGameDays = (state, payload) => {
	momentfr;
	// console.log('payload : ', payload);
	const betscategories = payload[0];
	const findbetcategorielabel = id => {
		const catFinded = betscategories.find(cat => cat.id === id);
		if (catFinded !== undefined)
			return { id: catFinded.id, name: catFinded.name };
	};

	const allGamesSorted = payload[1].map(game => {
		return {
			...game,
			betstypes: game.betstypes.map(betcat => {
				return {
					...betcat,
					betstype_categorie: findbetcategorielabel(
						betcat.betstype_categorie
					)
				};
			})
		};
	});

	const pastGames = allGamesSorted
		.filter(date => {
			return moment(date.day).isBefore(Date.now()) && date;
		})
		.sort((a, b) => a.day < b.day)
		.map(date => {
			return { ...date, day: dateFormater(date.day) };
		});

	const futureGames = allGamesSorted
		.filter(date => {
			return moment(date.day).isAfter(Date.now()) && date;
		})
		.sort((a, b) => a.day > b.day)
		.map(date => {
			return { ...date, day: dateFormater(date.day) };
		});

	const storeGames = {
		next: futureGames[0],
		futuregames: futureGames.splice(1, futureGames.length),
		pastgames: pastGames
	};
	return (state.gamedays = storeGames);
};
