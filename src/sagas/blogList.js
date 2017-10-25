import { call, put, take } from 'redux-saga/effects'
import apiClient from '../helpers/ApiClient';
import * as blogListAction from '../actions/bloglist';

export function* loadBlogListAsync() {
    try {
        let result = yield call(apiClient, 'api/blogList/loadBlogList', 'GET');
        yield put(blogListAction.retrieveBlogListSuccess(result))
    }
    catch (error) {
        console.log(error);
    }
}

export function* watchLoadBlogListAsync() {
    while (true) {
        yield take(blogListAction.RETRIEVE_BLOGLIST);
        yield call(loadBlogListAsync);
    }
}

