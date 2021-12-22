import axios from "axios";
import * as type from "./types";
import Swal from 'sweetalert2';

const baseUrl = "https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list"

export const getDataTodo = () => async dispatch => {
    try {
        const res = await axios.get(`${baseUrl}`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
        dispatch({
            type: type.SUCCESS_GET_DATA,
            payload: res.data
        })
    }
    catch (err) {
        dispatch({
            type: type.FAILED_GET_DATA,
            payload: err.response.data
        })
    }
}