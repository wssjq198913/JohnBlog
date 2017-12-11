import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import { END } from 'redux-saga';
import routes from '../src/routes';
import createStore from '../src/store/create';
import rootSagas from '../src/sagas';

const store = createStore();

export default function SSRRoute(req, res) {
    try {
        match({ routes: routes, location: req.url }, (err, redirect, props) => {
            if (err) {
                res.status(500).send(err.message)
            } else if (redirect) {
                res.redirect(redirect.pathname + redirect.search)
            } else if (props && props.components) {
                const rootTask = store.runSaga(rootSagas);
                for (let component of props.components) {
                    if (component.InitialAction) {
                        if (component.InitialAction().type === 'LOAD_BLOG_DETAIL') {
                            store.dispatch(component.InitialAction(`${props.params.year}/${props.params.month}/${props.params.day}`, props.params.topic));
                        }
                        else if (component.InitialAction().type === 'LOAD_BLOGS_BY_CATEGORY') {
                            store.dispatch(component.InitialAction(props.params.category));
                        }
                        else {
                            store.dispatch(component.InitialAction());
                        }
                    }
                }
                store.dispatch(END);
                rootTask.done.then(() => {
                    const initialData = store.getState();
                    const markup = renderToString(
                        <Provider store={store}>
                            <RouterContext {...props} />
                        </Provider>
                    );
                    res.render('index', { title: 'Johnny\'s blog', markup: markup, initialData: JSON.stringify(initialData) });
                });
            }
        })
    }
    catch (err) {
        console.log(err);
    }
}
