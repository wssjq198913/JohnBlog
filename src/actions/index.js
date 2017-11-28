export const LOAD_BLOGS = 'LOAD_BLOGS';
export const LOAD_BLOGS_SUCCESS = 'LOAD_BLOGS_SUCCESS';
export const LOAD_BLOG_DETAIL = 'LOAD_BLOG_DETAIL';
export const LOAD_BLOG_DETAIL_SUCCESS = 'LOAD_BLOG_DETAIL_SUCCESS';

export function loadBlogs() {
    return {
        type: LOAD_BLOGS
    };
}

export function loadBlogsSuccess(result) {
    return {
        type: LOAD_BLOGS_SUCCESS,
        payload: result
    };
}
export function loadBlogDetail(date, topic) {
    return {
        type: LOAD_BLOG_DETAIL,
        date,
        topic
    };
}

export function loadBlogDetailSuccess(result) {
    return {
        type: LOAD_BLOG_DETAIL_SUCCESS,
        payload: result
    };
}
