import axios from 'axios'

const API_URL='/api/users/'

//register user
const register =async (userData)=>{
    const response=await axios.post(API_URL,userData)

    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
}

//login user
const login =async (userData)=>{
    const response=await axios.post(API_URL + 'login',userData)

    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
}

//update user
const updateUser=async(token,userData)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    } 
    const response=await axios.post(API_URL+'updateUser',{userData},config)
    return response.data
    console.log(response.data)
}

//update Profile Image
const updateProfileImage=async(token,userData)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response =await axios.post(API_URL+'updateProfileImage',{userData},config)
    return response.data
}

//logout user
const logout=()=>{
    localStorage.removeItem('user')
}

const authService ={
    register,
    logout,
    login,
    updateUser,
    updateProfileImage
}

export default authService