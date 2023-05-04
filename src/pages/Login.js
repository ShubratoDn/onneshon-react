import React, { useEffect } from 'react'
import Base from '../components/Base'
import { useFormik } from 'formik'
import * as YUP from 'yup'

function Login() {



    const formik = useFormik({
        initialValues:{
            username : "",
            password : ""
        },
        validationSchema : YUP.object({
            username : YUP.string().required("Enter your user name").min(4,"Minimum 4 character"),
            password : YUP.string().required("Enter password please").min(4,"Minimum 4 character")
        }),
        onSubmit : (values, {resetForm})=>{
            console.log("logged in")

        }
    })


    const handleChange =(e)=>{
        formik.handleChange(e);
        formik.setTouched({...formik.touched, [e.target.name] : true});
    }


    useEffect(()=>{
        formik.validateForm()
    },[formik.values])




    return (
        <Base>

            {/* form desing starts here */}
            <div className="container">
                <form onSubmit={formik.handleSubmit} className="login-from form-container border col-lg-6 m-auto p-4 my-5">
                    <h1 className=' text-center mb-4'>Login Here</h1>

                    <div id="input-container">
                        <div className="input-group mb-3">
                            <input type="text" onChange={handleChange} value={formik.values.username} name='username' className="form-control" placeholder="Enter your username" />
                            {formik.touched.username && formik.errors.username && <div className='invalid-field'>{formik.errors.username}</div>}
                        </div>
                        <div className="input-group mb-3">
                            <input type="password" onChange={handleChange} value={formik.values.password} name='password' className="form-control" placeholder="Enter your Password" />
                            {formik.touched.password && formik.errors.password && <div className='invalid-field'>{formik.errors.password}</div>}
                        </div>

                        <input type="submit" value="Login now" className='btn btn-dark w-100' />

                    </div>

                </form>
            </div>

        </Base>
    )
}

export default Login