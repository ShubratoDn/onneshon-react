import './assets/styles/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';


import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify'

import Home from "./pages/Home";
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserDashboard from './pages/user-route/UserDashboard';
import UserPrivateGate from './pages/user-route/UserPrivateGate';
import ErrorPage from './pages/ErrorPage';
import WriteBlog from './pages/blog-route/WriteBlog';
import BlogPirvateGate from './pages/blog-route/BlogPirvateGate';
import Blog from './pages/Blog';
import ProtectedBlogRoute from './pages/blog-route/BlogPirvateGate';

function App() {
    return (
        <>

            <BrowserRouter>

                <ToastContainer
                    position="bottom-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />

                <Routes>
                    <Route path='/' element={<Home></Home>}></Route>
                    <Route path="/home" element={<Home></Home>}></Route>
                    <Route path='/about' element={<About></About>}></Route>
                    <Route path='/login' element={<Login></Login>}></Route>
                    <Route path='/signup' element={<Signup></Signup>}></Route>

                    <Route path='/user' element={<UserPrivateGate></UserPrivateGate>}>
                        <Route path="" element={<Navigate to="/user/dashboard"/>} />
                        <Route path='dashboard' element={<UserDashboard></UserDashboard>}></Route>
                    </Route>

                    <Route path='/blog' element={<ProtectedBlogRoute></ProtectedBlogRoute>}>
                        {/* <Route path='' element={<Navigate to='/home'></Navigate>}></Route> */}
                        <Route path='' element={<Blog></Blog>}></Route>
                        <Route path="/blog/:blogId" element={<Blog/>} />
                        <Route path='write-blog' element={<WriteBlog></WriteBlog>}></Route>
                    </Route>

                    <Route path='*' element={<ErrorPage></ErrorPage>}></Route>
                    {/* <Route path='/blogs/:title/:id' element={<Blog></Blog>} ></Route> */}
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
