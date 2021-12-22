import * as type from "../actions/types";

const initialState = {
    isAuthenticate: false,
    isLoading: true,
    data: [],
}

export const crudState = (state = initialState, action) => {

    switch (action.type) {
        default:
            return {
                ...state
            }
        case type.SUCCESS_GET_DATA:
            return {
                ...state,
                isAuthenticate: true,
                isLoading: false,
                data: action.payload
            }
        case type.FAILED_GET_DATA:
            return {
                ...state,
                isAuthenticate: initialState.isAuthenticate
            }
    }

}