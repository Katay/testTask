import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/index'

// store does not ready
export const store = createStore(rootReducer, applyMiddleware(thunk))