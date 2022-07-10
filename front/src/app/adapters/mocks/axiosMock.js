import axios from 'axios';
import authHeader from '../api-client/authentification/auth-header';
import MockAdapter from 'axios-mock-adapter';
import data from './datas.json';

const axiosMock = axios.create({
    baseURL: `${process.env.REACT_APP_BFF_HOSTNAME}`,
    headers: authHeader()
});

const mock = new MockAdapter(axiosMock, { delayResponse: 400 });

mock.onGet('/datas').reply(() => {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve([200, data.datas]);
        }, 1000);
    });
});

export default axiosMock;
