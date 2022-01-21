// Import Dependencies
import { configureStore } from '@reduxjs/toolkit'

// Import Reducers
import winesReducer from './reducers/wineReducers';

// Create Store
export default configureStore({
    reducer: {
        wines: winesReducer
    }
})