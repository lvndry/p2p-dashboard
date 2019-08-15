import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export async function request (method, path, data = {}) {
    const url = `${BASE_URL}${path}`;
    console.log(data);
    const options = {
        method,
        url,
        data,
        headers: { 'content-type': 'application/json' },
        crossDomain: true
    };
    return await axios(options);
}
