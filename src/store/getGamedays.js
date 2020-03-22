/* eslint-disable no-console */
import { getGamedays as getCalendar } from '../helpers/calendar';
import { dateFormater } from '../helpers/calendar';
import moment from 'moment';
import momentfr from '../helpers/momentfr';

export const getGamedays = async function(context) {
	momentfr;
	try {
		const games = await getCalendar(context.state.user.token);
		if (games) {
			const gamesSortedFormated = games
				.sort((a, b) => Date.parse(b.day) - Date.parse(a.day))
				.map(date => {
					return { ...date, day: dateFormater(date.day) };
				});
			console.log('gamesSorted : ', gamesSortedFormated);

			const pastGames = gamesSortedFormated.filter(date => {
				return moment(date.day.en).isBefore(Date.now()) && date;
			});

			const futureGames = gamesSortedFormated.filter(date => {
				return moment(date.day.en).isAfter(Date.now()) && date;
			});
			const storeGames = {
				nextGame: futureGames[0],
				futureGames: futureGames.splice(1, futureGames.length),
				pastGames: pastGames
			};
			context.commit('storeGamedays', storeGames);
			return { statusText: 'OK' };
		}
	} catch (err) {
		throw "Nous n'avons pas réussi à récupérer les jours de matchs";
	}
};
