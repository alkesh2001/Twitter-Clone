import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : 'false',
    userData :  null,
    postData : null,
    updateData : null,
    profileData : null,
    coverImageData : null,
    getUserAccountData : null
}

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        login: (state , action) =>{
            state.status = true ;
            state.userData = action.payload;
            // saveState(state);
        },
        logout: ( state)=>{
            state.status = false ,
            state.userData = null
            // saveState(state);
        },
        createPostData : (state , action) =>{
            state.status = true ;
            state.postData = action.payload;
            
        },
        updateProfileData : (state , action) =>{
            state.status = true ;
            state.updateData = action.payload;
        },
        ProfileData : (state , action) =>{
            state.status = true ;
            state.profileData = action.payload;
        },
        CoverImage : (state , action) =>{
            state.status = true ;
            state.coverImageData = action.payload;
        },
        GetUserAccount : (state , action) =>{
            state.status = true ;
            state.getUserAccountData = action.payload;
        },
        ResetUserAccount : (state , action) =>{
            console.log('resent user account when inpu tis empty')
            state.status = true ;
            state.getUserAccountData =  null;
        }
    }
})

export const {login , logout , createPostData ,updateProfileData , ProfileData ,CoverImage ,GetUserAccount ,ResetUserAccount} = authSlice.actions;

export default authSlice.reducer ;