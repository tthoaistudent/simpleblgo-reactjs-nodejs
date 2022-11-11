import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'material-react-toastify';

import authApi from '../../apis/auth';

// import action
import { addMessageError, addMessageSuccess } from './message'

// initial State
const initialState = {
    currentUser: {},
    isLoggedIn: Boolean(localStorage.getItem('isLoggedIn')),
    accessToken: localStorage.getItem('token') || null,
    errorMessage: '',
}

const storeLocalStorage = (state) => {
    localStorage.setItem('token', state.accessToken);
    localStorage.setItem('isLoggedIn', state.isLoggedIn);
}

const removeLocalStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
}


export const login = createAsyncThunk(
    'auth/login',
    async({email, password}, thunkApi)=>{
        return authApi.login(email, password)
            .then(response => {
                return response;
            }).catch(error => {
                if(!error.response){
                    throw new Error('Email or password incorrect !!');
                }

                return thunkApi.rejectWithValue(error.response.message);
            });
    }
)

export const getMe = createAsyncThunk(
    'auth/getMe',
    async (thunkApi) => {
       return authApi.getUserLogin()
            .then((response) => {
                return response;
            })
            .catch((error) => {
                if(!error.response){
                    throw new Error();
                }
                return thunkApi.rejectWithValue(error.response.message);
            })
    }
)

export const updateProfile = createAsyncThunk(
    'auth/updateProfile',
    async (data, thunkApi) => {
        return authApi.updateProfile(data)
            .then(response => {
                thunkApi.dispatch(addMessageSuccess('Saved!'))
                return response.user;
            })
            .catch(error => {
                if(!error.response){
                    throw new Error();
                }
                return thunkApi.rejectWithValue(error.response.message);
            })
    }
)
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        logout: (state, action) => {
            const newState = {...state};
            newState.currentUser = null;
            newState.isLoggedIn = false;
            newState.accessToken = null;

            //update localStorage
            removeLocalStorage();

            return newState;
            
        }
    },
    extraReducers: {
        [login.fulfilled]: (state, action)=>{
            state.isLoggedIn = true;
            state.accessToken = action.payload.token;
            state.currentUser = action.payload.user;
            state.errorMessage = '';
            // Update localstorage
            storeLocalStorage(state);

        },
        [login.rejected]:(state, action) =>{
            state.isLoggedIn = false;
            state.accessToken = null;
            state.errorMessage = action.payload;
        },
        [getMe.fulfilled]: (state, action) => {
            state.isLoggedIn = true;
            state.currentUser = action.payload.user;
            // Update localstorage
            storeLocalStorage(state);
        },
        [getMe.rejected]:(state,action) => {
           state.errorMessage = action.payload;
           state.isLoggedIn = false;
           // Update localstorage
           storeLocalStorage(state);
        },
        [updateProfile.rejected]: (state) => {
            state.errorMessage = 'Update Faild!';
        },
        [updateProfile.fulfilled]: (state, action) => {
            state.errorMessage = '';
            state.currentUser = action.payload;
        },
    }
})

const { reducer } = authSlice;
export const { logout } = authSlice.actions;
export default reducer;