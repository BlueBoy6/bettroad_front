import axios from 'axios';
import { back } from './constants';

export const loginConnect = (login, password) => {
	return axios
		.post(`${back.url}/auth/local`, {
			identifier: login,
			password: password
		})
		.then(result => {
			const token = {
				status: 'OK',
				user: {
					id: result.data.user.id,
					name: result.data.user.username,
					role: result.data.user.role.name,
					token: result.data.jwt,
					confirmed: result.data.user.confirmed
				}
			};
			if (result.statusText === 'OK') {
				return token;
			}
		})
		.catch(err => {
			//console.log('=================');
			// eslint-disable-next-line no-console
			console.log(err);
			return { status: 'ERROR', token: false };
		});
};
