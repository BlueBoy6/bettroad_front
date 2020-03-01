/* eslint-disable no-console */
import { getGamedays as getCalendar } from '../helpers/calendar';
import { dateFormater } from '../helpers/calendar';
import moment from 'moment';
import momentfr from '../helpers/momentfr';

export const getGamedays = async function(context) {
	momentfr;
	const games = await getCalendar(context.state.user.token);
	if (games) {
		const pastGames = games
			.filter(date => {
				return moment(date.day).isBefore(Date.now()) && date;
			})
			.sort((a, b) => a.day < b.day)
			.map(date => {
				return { ...date, day: dateFormater(date.day) };
			});

		const futureGames = games
			.filter(date => {
				return moment(date.day).isAfter(Date.now()) && date;
			})
			.sort((a, b) => a.day > b.day)
			.map(date => {
				return { ...date, day: dateFormater(date.day) };
			});

		const storeGames = {
			nextGame: futureGames[0],
			futureGames: futureGames.splice(1, futureGames.length),
			pastGames: pastGames
		};
		context.commit('storeGamedays', storeGames);
		return { statusText: 'OK' };
	}
};
