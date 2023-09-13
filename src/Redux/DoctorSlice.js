import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    doctorInfo : {},

};

const doctorSlice = createSlice({
    name:"doctor",
    initialState,
    reducers:{
        setdoctordetails : (state,action) => {
            state.doctorInfo = action.payload.doctorInfo
        },
        Logoutdetails : (state,action) => {
            state.doctorInfo = {}
        },

    }
})

export const {

    setdoctordetails,
    Logoutdetails

} = doctorSlice.actions;

export default doctorSlice.reducer;