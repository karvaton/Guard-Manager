const MODE = process.env.REACT_APP_MODE;

interface IApi {
    getData: (date: string) => Promise<string[]>
    save: (date: string, data: string[]) => Promise<void>
    getReport: (date: string) => Promise<string[]>
}

let Api: IApi;

if (MODE === 'web') {
    const { getData, save, getReport } = require('./api/api.server');
    Api = { getData, save, getReport };
} else {
    const { getData, save, getReport } = require('./api/api.local').default;
    Api = { getData, save, getReport };
}

export default Api;