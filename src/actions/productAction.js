import axios from "axios"
import { COMMENT_LIST_FAIL, COMMENT_LIST_REQUEST, COMMENT_LIST_SUCCESS, PRODUCT_DETAIL_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants"

export const listProducts = () => async(dispatch) =>{
    try {
        dispatch({type:PRODUCT_LIST_REQUEST})
        const {data} =await axios.get('http://localhost:4001/api/products')
        dispatch({
            type:PRODUCT_LIST_SUCCESS,
            payload:data.data,
        })
        
     } catch (error) {
        dispatch({
            type:PRODUCT_LIST_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message :error.message,
        })
    }

}


export const listComments = (id) => async(dispatch) =>{
    try {
        
        dispatch({type:COMMENT_LIST_REQUEST})
        console.log(id)
        const {data} =await axios.get(`http://localhost:4001/api/products/comment/${id}`)
        dispatch({
            type:COMMENT_LIST_SUCCESS,
            payload:data.data,
        })
        
     } catch (error) {
        dispatch({
            type:COMMENT_LIST_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message :error.message,
        })
    }

}


