import * as api from './api/api.server';

const MODE = process.env.REACT_APP_MODE;

// interface IApi {
//     getData: (date: string) => Promise<string[]>
//     save: (date: string, data: string[]) => Promise<void>
// }

let Api = api;

if (MODE !== 'web') {
    // const { getData, save } = require('../../server/service');
    // Api = { getData, save };
}

export default Api;