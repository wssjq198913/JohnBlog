/**
 * Created based on the AutoIQ-JS - 09/26/2017
 */

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import {
  App,
  BlogList,
  BlogDetail
} from './containers';

export default (
  <Route path="/" component={App}>
    { /* Home (main) route - the remaining routes were removed */}
    <IndexRoute component={BlogList}/>>
    <Route path="/blogdetail" component={BlogDetail} />
    <Route path="*" component={BlogDetail} status={404} />
  </Route>
);