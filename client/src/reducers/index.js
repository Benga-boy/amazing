import { combineReducers } from 'redux'
import auth from './auth'
import categories from './categories'


export default combineReducers({
  auth,
  categories,
})