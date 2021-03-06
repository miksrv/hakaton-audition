import * as types from './actionTypes'

const initialState = {
    dataJSON: {},
}

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.GET_DATA:
            return {
                ...state,
                dataJSON: action.payload,
            }

        case types.CLEAR_DATA:
            return {
                ...state,
                dataJSON: {},
            }

        default:
            return state
    }
}