import express from 'express';
import fs from 'fs';
let blogDetailRoute = express.Router();

const content = fs.readFileSync('Blogs/2017/06/01/test_blog/test_blog.md', 'utf-8');

blogDetailRoute.get('/loadBlogDetail', (req, res) => {
   res.json({
       Content: content
   });
});

export default blogDetailRoute;

