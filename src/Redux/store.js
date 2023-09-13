import {persistStore,persistReducer} from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import UserSlice from './UserSlice'
import DoctorSlice from './DoctorSlice'
const persistConfig ={
    key : "root",
    storage,
};

const persistedUserReducer = persistReducer(persistConfig,UserSlice);
const persistedDoctorReducer = persistReducer(persistConfig,DoctorSlice);

const Store = configureStore({
    reducer : {
        user : persistedUserReducer,
        doctor : persistedDoctorReducer
    }
})

const persistor = persistStore(Store)

export {Store,persistor};