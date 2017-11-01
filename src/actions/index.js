export const LOAD_BLOGS = 'LOAD_BLOGS';
export const LOAD_BLOGS_SUCCESS = 'LOAD_BLOGS_SUCCESS';

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
