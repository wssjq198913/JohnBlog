import express from 'express';
import fs from 'fs';
import path from 'path';
let blogDetailRoute = express.Router();

const isDevelopment = process.env.NODE_ENV == 'development';
const md = isDevelopment ? path.join(__dirname, '../../Blogs/2017/06/01/test_blog/test_blog.md') : path.join(__dirname, '../Blogs/2017/06/01/test_blog/test_blog.md')
const content = fs.readFileSync(md, 'utf-8');

blogDetailRoute.get('/loadBlogDetail', (req, res) => {
   res.json({
       Content: content
   });
});

export default blogDetailRoute;

