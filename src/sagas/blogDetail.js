import { call, put, take } from 'redux-saga/effects'
import apiClient from '../helpers/apiClient';
import * as actions from '../actions';
import config from '../config';
const { host, port } = config;
export function* loadBlogDetailAsync(date, topic) {
    try {
        const request = {
            date,
            topic
        }
        let result = yield call(apiClient, `${host}:${port}/api/blogDetail/loadBlogDetail`, 'POST', JSON.stringify(request));
        yield put(actions.loadBlogDetailSuccess(result))
    }
    catch (error) {
        console.log(error);
    }
}

export function* watchLoadBlogDetailAsync() {
    while (true) {
        const { date, topic } = yield take(actions.LOAD_BLOG_DETAIL);
        yield call(loadBlogDetailAsync, date, topic);
    }
}

