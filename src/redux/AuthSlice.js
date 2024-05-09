import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import  axios  from 'axios'
import { BASE_URL, api, setAuthHeader } from '../api/Api'

export const login = createAsyncThunk("auth/login",async(userData)=>{
    try {
        const {data} = await axios.post(`${BASE_URL}/auth/signing`,userData)
localStorage.setItem("jwt",data.jwt)
console.log("sign in successfully",data);
return data;

    } catch (error) {
     console.log("catch error at login",error)   
     throw Error(error.response.data.error)
    }
})

export const register = createAsyncThunk("auth/register",async(userData)=>{
    try {
        const {data} = await axios.post(`${BASE_URL}/auth/signup`,userData)
localStorage.setItem("jwt",data.jwt)
localStorage.setItem('localuser',data.user.id)

console.log("add user successfully",data);
return data;

    } catch (error) {
     console.log("catch error at adduser",error)  
     throw Error(error.response.data.error) 
    }
})


export const logout = createAsyncThunk("auth/logout",async()=>{
    try {
        localStorage.clear()
console.log("logout successfully");
    } catch (error) {
     console.log("catch error at logout",error) 
     throw Error(error.response.data.error)  
    }
})

export const getUserProfile = createAsyncThunk("auth/getUserProfile",async(jwt)=>{
    setAuthHeader(jwt,api)
    try {
        const {data} = await api.get(`/api/users/profile`)
console.log("user profile successfully",data);
return data;

    } catch (error) {
     console.log("catch error at getUserProfile",error)   
     throw Error(error.response.data.error)
    }
})

export const getUserList = createAsyncThunk("auth/getUserList",async(jwt)=>{
    setAuthHeader(jwt,api)
    try {
        const {data} = await api.get(`/api/users/allProfiles`)
console.log("user getUserList successfully",data);
return data;

    } catch (error) {
     console.log("catch error at getUserList",error)   
     throw Error(error.response.data.error)
    }
})

 const authSlice =createSlice({
    name:"auth",
    initialState:{
        user:null,
        loggedIn:false,
        loading:false,
        error:null,
        jwt:"",
        users:[],
        userList:[]
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(login.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.loading=false
            state.jwt=action.payload.jwt
            state.loggedIn=true
        })
        .addCase(login.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })
        .addCase(register.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.loading=false
            state.jwt=action.payload.jwt
            state.loggedIn=true

        }) 
        .addCase(register.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })
        .addCase(getUserProfile.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(getUserProfile.fulfilled,(state,action)=>{
            state.loading=false
            state.user=action.payload
            state.loggedIn=true
        })
        .addCase(getUserProfile.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })
        .addCase(getUserList.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(getUserList.fulfilled,(state,action)=>{
            state.loading=false
            state.users=action.payload
            state.loggedIn=true
        })
        .addCase(getUserList.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })
        .addCase(logout.fulfilled,(state)=>{
            state.user=null
            state.jwt=null
            state.users=[]
            state.error=null
            state.loggedIn=false
        })
      
    }
 }) 

 export default authSlice.reducer;