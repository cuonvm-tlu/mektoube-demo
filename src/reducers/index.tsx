
import notiReducer from './noti'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    noti: notiReducer
})

export default rootReducer;