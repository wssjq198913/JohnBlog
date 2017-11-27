import express from 'express';
import blogListRoute from './blogList';
import blogDetailRoute from './blogDetail';
let apiRouter = express.Router();

apiRouter.use('/blogList', blogListRoute);
apiRouter.use('/blogDetail', blogDetailRoute);
export default apiRouter;