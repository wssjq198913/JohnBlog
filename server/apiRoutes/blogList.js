import express from 'express';
let blogListRoute = express.Router();

blogListRoute.get('/loadBlogList', (req, res) => {
   res.json('');
});

export default blogListRoute;

