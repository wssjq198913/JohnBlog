import { call, put, take } from 'redux-saga/effects'
import apiClient from '../helpers/apiClient';
import * as blogListAction from '../actions';
import config from '../config';
const { host, port } = config;
export function* loadBlogListAsync() {
    try {
        let result = yield call(apiClient, `${host}:${port}/api/blogList/loadBlogList`, 'GET');
        yield put(blogListAction.loadBlogsSuccess(result))
    }
    catch (error) {
        console.log(error);
    }
}

export function* watchLoadBlogListAsync() {
    while (true) {
        yield take(blogListAction.LOAD_BLOGS);
        yield call(loadBlogListAsync);
    }
}

