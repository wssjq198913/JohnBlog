import express from 'express';
let blogDetailRoute = express.Router();

blogDetailRoute.get('/loadBlogDetail', (req, res) => {
   res.json({
       Content: '### 方法1：通过原型链'
   });
});

export default blogDetailRoute;

