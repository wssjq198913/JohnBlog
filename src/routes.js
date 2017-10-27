/**
 * Created based on the AutoIQ-JS - 09/26/2017
 */

import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import {
  App,
  BlogList,
  BlogDetail
} from './containers';
export default () => {
  return (
    <Route path="/" component={App}>
        { /* Home (main) route - the remaining routes were removed */}
        <IndexRedirect to="/bloglist" />
        <Route path="/bloglist" component={BlogList} />
        <Route path="/blogdetail" component={BlogDetail} />
    </Route>

  );
};