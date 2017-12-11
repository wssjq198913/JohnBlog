/**
 * Created based on the AutoIQ-JS - 09/26/2017
 */

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import {
  App,
  BlogList,
  BlogDetail,
  Category,
  NotFound
} from './containers';

export default (
  <Route path="/" component={App}>
    { /* Home (main) route - the remaining routes were removed */}
    <IndexRoute component={BlogList}/>>
    <Route path="/blogs/:year/:month/:day/:topic" component={BlogDetail} />
    <Route path="/categories/:category" component={Category} />
    <Route path="*" component={NotFound} status={404} />
  </Route>
);