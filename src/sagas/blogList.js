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

export function* loadBlogListByCategoryAsync(category) {
    try {
        let result = yield call(apiClient, `${host}:${port}/api/loadBlogsByCategory`, 'POST', JSON.stringify({category}));
        yield put(blogListAction.loadBlogsByCategorySuccess(result))
    }
    catch (error) {
        console.log(error);
    }
}

export function* loadAllCategoriesAsync() {
    try {
        let result = yield call(apiClient, `${host}:${port}/api/loadAllCategories`, 'GET');
        yield put(blogListAction.loadAllCategoriesSuccess(result))
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

export function* watchLoadAllCategoriesAsync() {
    while (true) {
        yield take(blogListAction.LOAD_ALL_CATEGORIES);
        yield call(loadAllCategoriesAsync);
    }
}

export function* watchLoadBlogsByCategoryAsync() {
    while (true) {
        const { category } = yield take(blogListAction.LOAD_BLOGS_BY_CATEGORY);
        yield call(loadBlogListByCategoryAsync, category);
    }
}

