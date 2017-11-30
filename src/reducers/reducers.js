import { LOAD_BLOGS, LOAD_BLOGS_SUCCESS, LOAD_BLOG_DETAIL, LOAD_BLOG_DETAIL_SUCCESS, CLEAN_BLOG_DETAIL } from '../actions';
const initialState = {
    blogs: [],
    detail: {
        content: null,
        date: null,
        topic: null
    },
    loading: false
}

function reducers(state = initialState, action = {}) {
    switch (action.type) {
        case LOAD_BLOGS: {
            return {
                ...state,
                loading: true
            };
        }
        case LOAD_BLOGS_SUCCESS:
            {
                return {
                    ...state,
                    loading: false,
                    blogs: action.payload
                };
            }
            case LOAD_BLOG_DETAIL: {
                return {
                    ...state,
                    loading: true
                };
            }
            case LOAD_BLOG_DETAIL_SUCCESS:
                {
                    return {
                        ...state,
                        loading: false,
                        detail: {
                            content: action.payload.content,
                            date: action.payload.date,
                            topic: action.payload.topic
                        }
                    };
                }
            case CLEAN_BLOG_DETAIL:
            {
                return {
                    ...state,
                    detail: {
                        content: null,
                        date: null,
                        topic: null
                    },
                }
            }
        default:
            return state;
    }
}

export default reducers;