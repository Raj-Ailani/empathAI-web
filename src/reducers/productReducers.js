import { COMMENT_LIST_FAIL, COMMENT_LIST_REQUEST, COMMENT_LIST_SUCCESS, PRODUCT_DETAIL_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_SUCCESS } from '../constants/productConstants'
import {PRODUCT_LIST_REQUEST} from '../constants/productConstants'

export const productListReducer =(state={ products:[]  } ,action) =>{
    switch(action.type){
       case PRODUCT_LIST_REQUEST:
           return{ loading:true}
	        case PRODUCT_LIST_SUCCESS:
	            return{loading:false , products:action.payload}
	        case PRODUCT_LIST_FAIL:
	            return{loading:false, error:action.payload}
	        default:
	            return state 
    }

} 

export const commentListReducer =(state={ comments:[]  } ,action) =>{
    switch(action.type){
       case COMMENT_LIST_REQUEST:
           return{ loading:true}
	        case COMMENT_LIST_SUCCESS:
	            return{loading:false , comments:action.payload}
	        case COMMENT_LIST_FAIL:
	            return{loading:false, error:action.payload}
	        default:
	            return state 
    }

} 

