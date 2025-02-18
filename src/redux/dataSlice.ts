import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
    name: "data",
    initialState: {
        data: null,
        loading: false,
        error: null,
        loginData:{}
    },
    reducers: {
        fetchDataRequest: (state) => {
            state.loading = true;
        },
        fetchDataSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        fetchDataFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        addLoginData:(state,action)=>{
            state.loginData = action.payload
        }
    },
});

export const { 
    fetchDataRequest, 
    fetchDataSuccess, 
    fetchDataFailure,
    addLoginData
 } = dataSlice.actions;
export default dataSlice.reducer;
