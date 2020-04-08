/* eslint-disable no-console */
import axios from 'axios';
import moment from 'moment';
import { back } from './constants';

const backurl = back.url;

export const getGamedays = token => {
	return axios
		.get(`${backurl}/gamedays`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(result => {
			const dates = result.data;
			return dates;
		})
		.catch(err => {
			console.log('=================');
			console.log(err);
			return err;
		});
};

export const dateFormater = date => {
	const endate = moment(date).format('YYYY-MM-DD');
	const frdate = moment(date).format('LL');
	return { en: endate, fr: frdate };
};

export const getSeason = date => {
	const monthNumber = Number(moment(date).format('MM'));
	const year = moment(date).year()
	const season = monthNumber < 7 ? [year - 1, year] : [year, year + 1];
	return season;
}
