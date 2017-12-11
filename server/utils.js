import fs from 'fs';
import path from 'path';

export default class Utils {
    static getAllBlogs() {
        const isDevelopment = process.env.NODE_ENV == 'development';
        const blogPath = isDevelopment ? path.join(__dirname, 'Blogs/') : path.join(__dirname, 'Blogs/');
        let blogs = [];
        const files = fs.readdirSync(blogPath);
        files.forEach((itm) => {
            const stat = fs.statSync(`${blogPath}${itm}`);
            if(stat.isDirectory()) {
                const key = JSON.parse(fs.readFileSync(`${blogPath}${itm}/key.json`, 'utf-8'));
                blogs.push(key)
            }
            });
        
        return blogs;
    }
}