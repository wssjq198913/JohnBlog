import express from 'express';
import fs from 'fs';
import path from 'path';
let blogListRoute = express.Router();

blogListRoute.get('/loadBlogList', (req, res) => {
   res.json(getAllBlogs());
});

function getAllBlogs() {
    const blogPath = path.join(__dirname, '../../Blogs/');
    let blogs = [];
    const files = fs.readdirSync(blogPath);
    files.forEach((itm) => {
        const key = JSON.parse(fs.readFileSync(`${blogPath}${itm}/key.json`, 'utf-8'));
        blogs.push(key)
    })
    return blogs;
}

export default blogListRoute;

