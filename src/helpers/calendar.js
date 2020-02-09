/* eslint-disable no-console */
import axios from 'axios';
import moment from 'moment';
import { back } from './constants';

const backurl = back.url;

export const getGameDays = token => {
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

export const dateFormater = date => moment(date).format('LL');
