import express from 'express';
import fs from 'fs';
import path from 'path';
let blogDetailRoute = express.Router();

const content = fs.readFileSync(path.join(process.cwd(), 'Blogs/2017/06/01/test_blog/test_blog.md'), 'utf-8');
console.log(path.join(process.cwd(), 'Blogs/2017/06/01/test_blog/test_blog.md'));

blogDetailRoute.get('/loadBlogDetail', (req, res) => {
   res.json({
       Content: content
   });
});

export default blogDetailRoute;

