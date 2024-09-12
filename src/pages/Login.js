import React, { useEffect, useState } from 'react'
import Base from '../components/Base'

import { useFormik } from 'formik'
import * as YUP from 'yup'
import { toast } from 'react-toastify'

import { userLogin } from '../services/userServices'
import { doLogin, getCurrentUserInfo } from '../services/auth'
import { useNavigate } from 'react-router-dom'

function Login() {

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            userName: "",
            password: ""
        },
        validationSchema: YUP.object({
            userName: YUP.string().required("Enter your user name").min(4, "Minimum 4 character"),
            password: YUP.string().required("Enter password please").min(4, "Minimum 4 character")
        }),
        onSubmit: (values, { resetForm }) => {            
            
            setIsLoading(true);

            console.log(values)

            userLogin(values)
                .then((respData) => {
                    // console.log(respData)

                    //after logged in success full
                    doLogin(respData,()=>{
                        console.log("Logged in successfully " );
                        navigate("/user/dashboard")
                    })

                    console.log(getCurrentUserInfo())

                    setIsLoading(false);
                    toast.success("Logged In!")
                    resetForm({values:""});
                })
                .catch((err) => {
                    if (err.code === 'ERR_NETWORK') {
                        // handle connection refused error
                        toast.error('Network error!! Conenction hoise na' + JSON.stringify(err), {
                            position: "bottom-center",
                            theme: "dark",
                        });
                    }

                    console.log(err)
                    let keys = Object.keys(err.response.data)                    
                    console.log(err.response.data[keys])

                    toast.error(err.response.data[keys], {
                        position: "bottom-center",
                        theme: "dark",
                    });
                })
                .finally(() => {
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 2000)
                })

        }
    })


    const handleChange = (e) => {
        formik.handleChange(e);
        formik.setTouched({ ...formik.touched, [e.target.name]: true });
    }


    // useEffect(() => {
    //     formik.validateForm()
    // }, [formik.values])
    //1 key press Slow kaj kortechilo tai
    // UseEffect to manually trigger the validation after the user enters a new value
    useEffect(() => {
        if (Object.keys(formik.touched).length > 0) {
            formik.validateForm();
        }
    }, [formik.touched]);





    return (
        <Base>

            {/* form desing starts here */}
            <div className="container">
                <form onSubmit={formik.handleSubmit} className="login-from form-container border col-lg-6 m-auto p-4 my-5">
                    <h1 className=' text-center mb-4'>Login Here</h1>

                    {isLoading && <div className='loading'></div>}

                    <div id="input-container">
                        <div className="input-group mb-3">
                            <input type="text" onChange={handleChange} value={formik.values.userName} name='userName' className="form-control" placeholder="Enter your userName" />
                            {formik.touched.userName && formik.errors.userName && <div className='invalid-field'>{formik.errors.userName}</div>}
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