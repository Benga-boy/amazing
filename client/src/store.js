import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers'


// * Save state to local storage
function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (err) {
    console.log(err)
  }
}

// * load localstorage into redux state
function loadFromStorage() {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) return undefined
    return JSON.parse(serializedState)
  } catch (err) {
    console.log(err)
  }
}


// const initialState = {}

const middleware = [thunk]


// * Call function to load state from local storage
const persistedState = loadFromStorage()

const store = createStore(rootReducer, persistedState, composeWithDevTools(applyMiddleware(...middleware)))


// Automatically update state in the local storage
store.subscribe(() => saveToLocalStorage(store.getState()))

export default store
