import * as type from "../actions/types";

const initialState = {
    isAuthenticate: false,
    isLoading: true,
    data: [],
    dataDetail: []
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
        case type.SUCCESS_CREATE_DATA:
            return {
                ...state,
                isAuthenticate: true,
                isLoading: false,
            }
        case type.FAILED_CREATE_DATA:
            return {
                ...state,
            }
        case type.SUCCESS_DELETE_DATA:
            return {
                ...state,
                isAuthenticate: true,
                isLoading: false,
                data: state.data.filter((item) => item.id !== action.payload)
            }
        case type.FAILED_DELETE_DATA:
            return {
                ...state,
                isAuthenticate: initialState.isAuthenticate,
                isLoading: false,
            };
        case type.GET_ID_TODO:
            return {
                ...state,
                dataDetail: state.data.find(item => item.id === action.payload)
            }
        case type.SUCCESS_UPDATE_DATA:
            return {
                ...state,
                isAuthenticate: true,
                isLoading: false,
            }
        case type.FAILED_UPDATE_DATA:
            return {
                ...state,
            }
    }

}