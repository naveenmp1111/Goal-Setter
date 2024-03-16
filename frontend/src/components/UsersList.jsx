import { useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { blockUser, getUsers,reset ,editUser} from "../features/adminAuth/adminAuthSlice";
import {useNavigate} from 'react-router-dom';
import '../../src/index.css'
import EditUserModal from "./EditUserModal";
import Spinner from "./Spinner";

function UsersList() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {users,isLoading}=useSelector((state)=>state.adminAuth)
    console.log(users)
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const updateUser=(updatedUser)=>{
            console.log('Updated user:', updatedUser);
            dispatch(editUser(updatedUser)).then(() => {
                dispatch(getUsers());
                handleCloseModal(); // Close the modal after updating
            });
           
    }

    useEffect(() => {
        dispatch(getUsers());       
      },[]);

   

    const handleBlock=(userId)=>{
        // if (window.confirm("Are you sure want to block the user?")) {
            dispatch(blockUser(userId)).then(()=>dispatch(getUsers()))
        //   }  
    }

    // const handleEdit=(user)=>{
    //     setUser(user)
    //     setModal(true)
    //     dispatch(getEditUser(user))
    // }
  
    
    return (
        <>
        {isLoading && <Spinner/>}
            {users ? (
            <>
             <input type="text" placeholder="Search User"/>
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Profile</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user,index) => (
                            <tr key={user.id}>
                                <td>{index +1}</td>
                                <td>will update</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.is_active ? "Active" : "Blocked"}</td>
                                <td >
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <button className="action-btn" onClick={()=>handleEditClick(user)}>Edit</button>
                                    <button className="action-btn" onClick={()=>handleBlock(user._id)}>Block</button>
                                    <button className="action-btn">Delete</button>
                                    </div>
                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
               
            ) : null}
            
            {isModalOpen && (
                <EditUserModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    user={selectedUser}
                    onUpdate={updateUser}
                />
            )}
        </>
    )
}

export default UsersList