/* eslint-disable no-console */
import axios from 'axios';
import { back } from './constants';

const backurl = back.url;

export const getTeammates = token => {
	return axios
		.get(`${backurl}/players`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(result => {
			const players = result.data.map(player => {
				return { id: player.id, name: player.name };
			});
			return players;
		})
		.catch(err => {
			console.log('=================');
			console.log(err);
			return err;
		});
};
export const getTeams = token => {
	return axios
		.get(`${backurl}/teams`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(result => {
			const teams = result.data.map(team => {
				return { id: team.id, name: team.name, city: team.city };
			});
			return teams;
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
		const betcall = await axios({
			method: 'post',
			url: `${backurl}/bets`,
			headers: {
				Authorization: `Bearer ${token}`
			},
			data: {
				...datas
			}
		});
		if (betcall.statusText === 'OK') {
			return { status: 'OK', data: betcall.data };
		} else {
			console.log('ERROR', betcall);
		}
	} catch (err) {
		console.log('error  :', err);
	}
};
