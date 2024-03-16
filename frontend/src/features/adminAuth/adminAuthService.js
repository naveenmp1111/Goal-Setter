import axios from 'axios'

const API_URL='/api/admin/'

//register user
// const register =async (userData)=>{
//     const response=await axios.post(API_URL,userData)

//     if(response.data){
//         localStorage.setItem('user',JSON.stringify(response.data))
//     }
//     return response.data
// }

//login user
const login =async (userData)=>{
    const response=await axios.post(API_URL + 'adminLogin',userData)

    if(response.data){
        localStorage.setItem('admin',JSON.stringify(response.data))
    }
    return response.data
}

//getUsers
const getUsers=async(token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response= await axios.get(API_URL + 'getUsers',config)
    console.log('response',response.data)
    return response.data
}

//addUser
const addUser=async(token,userData)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    
    const response=await axios.post(API_URL + 'addUser',{userData},config)
    return response.data
}

//blockUSer
const blockUser=async(userId,token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    console.log(userId,token);
    const response= await axios.post(API_URL + 'block',{userId},config)
    // console.log(response.data)
    return response.data
}


//editUser
const editUser=async(token,userData)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response= await axios.post(API_URL + 'editUser',{userData},config)
    return response.data
}

//deleteUser
// const deleteUser=async(userId,token)=>{
//     const config={
//         headers:{
//             Authorization:`Bearer ${token}`
//         }
//     }
//     const response=await axios.post
// }

//logout user
const logout=()=>{
    localStorage.removeItem('admin')
}

const adminAuthService ={
    logout,
    login,
    getUsers,
    blockUser,
    addUser,
    editUser
}

export default adminAuthService