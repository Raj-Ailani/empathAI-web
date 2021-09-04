import  {createStore,combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import  {composeWithDevTools} from 'redux-devtools-extension'
import { commentListReducer, productListReducer} from './reducers/productReducers'
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers'

const reducer=combineReducers({
    productList:productListReducer,
    userLogin : userLoginReducer,
    userRegister:userRegisterReducer,
    commentList : commentListReducer
})

const userInfoFromStorage=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null

const intialState = {
    userLogin: {userInfo:userInfoFromStorage}
}

const middleware=[thunk]

const store = createStore(reducer,intialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store