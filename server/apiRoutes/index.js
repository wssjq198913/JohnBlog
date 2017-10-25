import express from 'express';
import blogListRoute from './blogList';
let apiRouter = express.Router();

apiRouter.use('/blogList', blogListRoute);
export default apiRouter;