import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Dashboard from './pages/user/Dashboard';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminLogin from './pages/admin/AdminLogin'
import AddUser from './pages/admin/AddUser';
import '../src/index.css'
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Profile from './pages/user/Profile';


function App() {
  return (
    <>
        <Router>
          <div className='container'>
            <Routes>
            <Route path="/admin/*" element={null} />
            <Route path="*" element={<Header />} />
           </Routes>
        
            <Routes>
              {/* User Routes */}
              <Route path='/' element={<Dashboard/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/userProfile' element={<Profile/>}/>

              {/* Admin Routes */}
              <Route path='/admin' element={<AdminDashboard/>}/>
              <Route path='/admin/login' element={<AdminLogin/>}/>
              <Route path='/admin/addUser' element={<AddUser/>}/>
              
            </Routes>
          </div>
        </Router>
      <ToastContainer/>
    </>
    
  );
}

export default App;
