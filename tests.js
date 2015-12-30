import test from 'ava';
import http from 'http';
import request from 'request';
import app from './main';

const baseUrl = 'http://127.0.0.1:3000';
let server;

test.before(() => {
    server = http.createServer(app).listen(3000, '127.0.0.1');
});

test.after(() => {
    server.close();
});

const getMethod = (t, url, params) => {
    t.plan(3);

    request.get({uri: url, qs: params}, (err, response, body) => {
        t.notOk(err, `Request error for url ${url}`);
        t.true(response && (response.statusCode >= 200 && response.statusCode < 399), `Url ${url} failed with status ${response ? response.statusCode : ''}`);
        t.ok(body, `Body is empty`);
        t.end();
    });
};

const postMethod = (t, url, params) => {
    t.plan(3);

    request.post(url, {form: params}, (err, response, body) => {
        t.notOk(err, `Request error for url ${url}`);
        t.true(response && (response.statusCode >= 200 && response.statusCode < 399), `Url ${url} failed with status ${response ? response.statusCode : ''}`);
        t.ok(body, `Body is empty`);
        t.end();
    });
};


test.cb('test / url', t => {
    const url = `${baseUrl}/`;
    getMethod(t, url);
});

test.cb('test /login url', t => {
    const url = `${baseUrl}/auth/login`;
    getMethod(t, url);
});

test.cb('test /logout url', t => {
    const url = `${baseUrl}/auth/logout`;
    getMethod(t, url);
});

test.cb('test /logout url', t => {
    const url = `${baseUrl}/register`;
    getMethod(t, url);
});

test.cb('test /logout url', t => {
    const url = `${baseUrl}/register`;
    postMethod(t, url, {name: 'test', last_name: 'last name', user_name: 'username', password: '123'});
});
