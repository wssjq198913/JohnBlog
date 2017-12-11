import express from 'express';
import utils from '../utils';
let blogListRoute = express.Router();

blogListRoute.get('/loadBlogList', (req, res) => {
   res.json(getAllBlogs());
});

function getAllBlogs() {
    return utils.getAllBlogs();
}

export default blogListRoute;

