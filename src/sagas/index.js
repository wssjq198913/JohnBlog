import { all, fork } from 'redux-saga/effects'
import { watchLoadBlogListAsync } from './blogList.js';
import { watchLoadBlogDetailAsync } from './blogDetail.js';

export default function* rootSaga() {
    yield all([
        fork(watchLoadBlogListAsync),
        fork(watchLoadBlogDetailAsync)
    ]);
}