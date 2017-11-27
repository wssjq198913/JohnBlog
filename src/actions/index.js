export const LOAD_BLOGS = 'LOAD_BLOGS';
export const LOAD_BLOGS_SUCCESS = 'LOAD_BLOGS_SUCCESS';
export const LOAD_BLOG_DETAIL = 'LOAD_BLOG_DETAIL';
export const LOAD_BLOG_DETAIL_SUCCESS = 'LOAD_BLOG_DETAIL_SUCCESS';

const mockData = [
    {
        id: 1,
        author: 'Johnny'
    },
    {
        id: 2,
        author: 'Johnny'
    },
]

export function loadBlogs() {
    return {
        type: LOAD_BLOGS
    };
}

export function loadBlogsSuccess(result) {
    result = mockData;
    return {
        type: LOAD_BLOGS_SUCCESS,
        payload: result
    };
}
export function loadBlogDetail() {
    return {
        type: LOAD_BLOG_DETAIL
    };
}

export function loadBlogDetailSuccess(result) {
    return {
        type: LOAD_BLOG_DETAIL_SUCCESS,
        payload: result
    };
}
