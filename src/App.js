import './assets/styles/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';


import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ToastContainer} from 'react-toastify'

import  Home  from "./pages/Home";
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <>
        
        <BrowserRouter>

            <ToastContainer></ToastContainer>

            <Routes>
                <Route path='/' element={<Home></Home>}></Route>
                <Route path="/home" element={<Home></Home>}></Route>
                <Route path='/about' element={<About></About>}></Route>
                <Route path='/login' element={<Login></Login>}></Route>
                <Route path='/signup' element={<Signup></Signup>}></Route>


                {/* <Route path='/blogs/:title/:id' element={<Blog></Blog>} ></Route>
                <Route path='*' element={<ErrorPage></ErrorPage>}></Route> */}
            </Routes>
        </BrowserRouter>


    </>
  );
}

export default App;
