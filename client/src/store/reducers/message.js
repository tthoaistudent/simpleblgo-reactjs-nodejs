import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    error: '',
    success: ''
}

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        addMessageError: (state, action) => {
            const newState = {...state};
            newState.error = action.payload;
            newState.success = '';
            return newState;
        },
        addMessageSuccess: (state, action) => {
            const newState = {...state};
            newState.success = action.payload;
            newState.error = '';
            return newState;
        },
        destroyMessage: (state) => {
            const newState = {...state};
            newState.success = ''
            newState.error = ''
            return newState
        }
    }
})

const { reducer } = messageSlice;
export const { addMessageError, addMessageSuccess, destroyMessage } = messageSlice.actions;
export default reducer;
