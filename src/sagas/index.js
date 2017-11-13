import { all, fork } from 'redux-saga/effects'
import { watchLoadBlogListAsync } from './blogList.js';

export default function* rootSaga() {
    yield all([
        fork(watchLoadBlogListAsync)
    ]);
}