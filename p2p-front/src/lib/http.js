import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

export async function request(method, path, data = {}) {
    const url = `${BASE_URL}${path}`;
    const options = {
        method,
        url,
        data,
        headers: { 'content-type': 'application/json' },
        crossDomain: true,
    };
    console.log(options);
    return axios(options);
}
