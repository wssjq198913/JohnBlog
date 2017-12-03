import fetch from 'isomorphic-fetch';
if (__CLIENT__) {
    var nprogress = require('nprogress');
}

export default async function apiClient(url, method, data) {
    if (__CLIENT__) {
        nprogress.start();
    }
    const fetchOptions = {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    };

    let options = { ...fetchOptions, body: data };

    let response = await fetch(url, options);
    if (response.status >= 200 && response.status < 300) {
        let json = await response.json();
        if (__CLIENT__) {
            nprogress.done();
        }
        return json;
    }
    else {
        if (__CLIENT__) {
            nprogress.done();
        }
        throw response.statusText;
    }
}