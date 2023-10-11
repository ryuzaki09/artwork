import {createStore, combineReducers} from 'redux'

import {artworkReducer} from './reducers/artwork'

const rootReducer = combineReducers({artwork: artworkReducer})

export const store = createStore(rootReducer)
