import express from 'express';
import fs from 'fs';
import path from 'path';
import blogListRoute from './blogList';
import blogDetailRoute from './blogDetail';
import utils from '../utils';
let apiRouter = express.Router();

apiRouter.use('/blogList', blogListRoute);
apiRouter.use('/blogDetail', blogDetailRoute);
apiRouter.use('/loadAllCategories', (req, res) => {
    const isDevelopment = process.env.NODE_ENV == 'development';
    const blogPath = isDevelopment ? path.join(__dirname, 'Blogs/') : path.join(__dirname, 'Blogs/');
    const categories = JSON.parse(fs.readFileSync(`${blogPath}/categories.json`, 'utf-8'));
    const allBlogs = utils.getAllBlogs();
    for (let [idx, category] of categories.entries()) {
        let blogLength = 0;
        for (let blog of allBlogs) {
            if (blog.category == category.category) {
                blogLength += 1;
            }
        }
        categories[idx] = {...category, blogLength: blogLength};
    }
    res.json(categories);
});
apiRouter.use('/loadBlogsByCategory', (req, res) => {
    const category = req.body.category;
    const allBlogs = utils.getAllBlogs();
    const blogsByCategory = allBlogs.filter((itm) => {
        return itm.category == category;
    })
    res.json(blogsByCategory);
});
export default apiRouter;