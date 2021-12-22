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

export const addTodo = (body) => async dispatch => {
    try {
        const res = await axios.post(`${baseUrl}`, body, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
        if (res.status === 200 || res.status === 201) {
            dispatch({
                type: type.SUCCESS_CREATE_DATA,
                payload: res
            })
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Success Add Data',
            })
        }
    }
    catch (err) {
        dispatch({
            type: type.FAILED_CREATE_DATA,
            payload: err.response.data
        })
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error Add Data',
        })
    }
}

export const deleteTodo = (id) => async dispatch => {
    try {
        await axios.delete(`${baseUrl}`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            params: {
                id: id
            }
        })
        dispatch({
            type: type.SUCCESS_DELETE_DATA,
            payload: id
        })
    }
    catch (err) {
        dispatch({
            type: type.FAILED_DELETE_DATA,
            payload: err.response.data
        })
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Gagal Menghapus',
        })
    }
}

export const getIdTodo = (id) => {
    return {
        type: type.GET_ID_TODO,
        payload: id
    }
};

export const editTodo = (body, id) => async dispatch => {
    try {
        const res = await axios.put(`${baseUrl}`, body, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            params: {
                id: id
            }
        })
        dispatch({
            type: type.SUCCESS_UPDATE_DATA,
            payload: res
        })
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Success Edit Data',
        })
    }
    catch (err) {
        dispatch({
            type: type.FAILED_UPDATE_DATA,
            payload: err.response.data
        })
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Gagal Edit Data',
        })
    }
}