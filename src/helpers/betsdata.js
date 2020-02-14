/* eslint-disable no-console */
import axios from 'axios';
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

export const getBets = async (token, idBetter) => {
	try {
		const getBets = await axios({
			method: 'get',
			url: `${backurl}/bets?user=${idBetter}`,
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		if (getBets.statusText === 'OK') {
			return getBets.data;
		}
	} catch (err) {
		console.log('error  :', err);
	}
};
export const postBet = async (token, datas) => {
	try {
		let responses = [];
		for (let i = 0; i < datas.length; ) {
			const axcall = await axios({
				method: 'post',
				url: `${backurl}/bets`,
				headers: {
					Authorization: `Bearer ${token}`
				},
				data: {
					...datas[i]
				}
			});
			if (axcall.statusText === 'OK') {
				responses.push(axcall);
				i++;
			}
		}
		if (responses.length === datas.length) {
			console.log('happy call !');
			return { status: 'OK', data: responses };
		}
	} catch (err) {
		console.log('error  :', err);
	}
};
