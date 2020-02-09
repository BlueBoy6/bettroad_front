/* eslint-disable no-console */
import axios from 'axios';
import { getGameDays } from '../helpers/calendar';
import { back } from './constants';

const backurl = back.url;

export const getBetsType = token => {
	return axios
		.get(`${backurl}/betstypes`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(result => {
			console.log('success', result);
			const betsTypes = result.data;
			return betsTypes;
		})
		.catch(err => {
			console.log('=================');
			console.log(err);
			return err;
		});
};

export const getBetsTypeCategories = token => {
	return axios
		.get(`${backurl}/betstype-categories`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(result => {
			const betsTypeCategories = result.data;
			return betsTypeCategories;
		})
		.catch(err => {
			console.log('=================');
			console.log(err);
			return err;
		});
};
export const getPlayersTeam = token => {
	return axios
		.get(`${backurl}/players`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(result => {
			const players = result.data.map(player => player.name);
			return players;
		})
		.catch(err => {
			console.log('=================');
			console.log(err);
			return err;
		});
};

export const getAllDatas = async token => {
	const games = await getGameDays(token);
	const betsTypes = await getBetsTypeCategories(token);
	const players = await getPlayersTeam(token);
	return [games, betsTypes, players];
};

export const postBet = (token, datas) => {
	datas.map(bet => {
		axios({
			method: 'post',
			url: `${backurl}/bets`,
			headers: {
				Authorization: `Bearer ${token}`
			},
			data: {
				...bet
			}
		})
			.then(() => {})
			.catch(err => {
				console.log('=================');
				console.log(err);
				return err;
			});
	});
	return { status: 'OK' };
};
