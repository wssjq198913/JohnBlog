import express from 'express';
import fs from 'fs';
import path from 'path';
let blogDetailRoute = express.Router();

blogDetailRoute.post('/loadBlogDetail', (req, res) => {
    const { date, topic } = req.body;
    res.json(getBlog(date, topic));
});

function getBlog(date, topic) {
    const isDevelopment = process.env.NODE_ENV == 'development';
    const blogPath = isDevelopment ? path.join(__dirname, '../../Blogs/') : path.join(__dirname, 'Blogs/');
    const files = fs.readdirSync(blogPath);
    let content = null;
    let key = null;
    files.forEach((itm) => {
        if (itm === topic) {
            key = JSON.parse(fs.readFileSync(`${blogPath}${itm}/key.json`, 'utf-8'));
            console.log(key.date, date)
            if (compareDate(key.date, date)) {
                content = fs.readFileSync(`${blogPath}${itm}/${itm}.md`, 'utf-8');
            }
        }
    })
    return {
        content,
        date: key != null ? key.date : null,
        topic: key != null ? key.title : null
    };
}

function compareDate(date1, date2) {
    const [year1, month1, day1] = date1.split('/');
    const [year2, month2, day2] = date2.split('/');
    return (year1 === year2 && month1.padStart(2, '0') === month2.padStart(2, '0') && day1.padStart(2, '0') === day2.padStart(2, '0'))
}

export default blogDetailRoute;

