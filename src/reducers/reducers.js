import { LOAD_BLOGS, LOAD_BLOGS_SUCCESS } from '../actions';
const initialState = {
    blogs: [],
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
        default:
            return state;
    }
}

export default reducers;