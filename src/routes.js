import BlogList from './containers/BlogList/BlogList';
// import BlogDetail from './containers/BlogDetail/BlogDetail';

const routes = [
  {
    path: '/',
    exact: true,
    component: BlogList
  },
  {
    path: '/detail/:id',
    // component: BlogDetail
  }
];

export default routes;