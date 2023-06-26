import React, { useEffect, useState } from 'react'
import Base from '../components/Base'


import { useFormik } from "formik";
import * as YUP from 'yup'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { userSignUp } from '../services/userServices';


export default function Signup() {

    const [isloading, setIsloading] = useState(false);


    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPass: "",
            image: "",
            about: ""
        },
        validationSchema: YUP.object({
            name: YUP.string().required("Please, insert your name").min(3, "Minimum 3 character"),
            email: YUP.string().required("Insert email").email("Invalid Email"),
            password: YUP.string().required("Enter password").min(4, "Password should contain minimum 4 character"),
            confirmPass: YUP.string().required("Confirm your password").oneOf([YUP.ref("password"), null], "Password must match"),
            about: YUP.string().required("Write something about you").min(3, "About should more than 3 letter"),
            image: YUP.mixed().required("Insert image").test('fileSize', 'File too large', (value) => {
                return value ? value.size <= 5000000 : true;
            }).test('fileType', 'Invalid file type', (value) => {
                return value ? ['image/jpeg', 'image/png', 'image/gif'].includes(value.type) : true;
            })
        }),
        onSubmit: (values, { resetForm }) => {

            console.log(values);

            //for loading
            setIsloading(true);
            let inpContainer = document.getElementById("input-container");
            inpContainer.style.display = "none";

            //signup message
            userSignUp(values)
                .then((respData) => {
                    //SUCCESS MESSAGE
                    // console.log(respData);
                    
                    toast.success('🦄Register Success!', {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                    
                    resetForm({ values: "" })
                })
                .catch((err) => {
                    if(err.code === 'ERR_NETWORK') {
                        // handle connection refused error
                        console.log('Connection refused error');
                        toast.error('Network error!! Conenction hoise na', {
                            position: "bottom-center",                            
                            theme: "dark",
                        });
                    }

                    console.log(err)
                    let keys = Object.keys(err.response.data)
                    console.log(err.response.data[keys])

                    toast.error( err.response.data[keys], {
                        position: "bottom-center",                            
                        theme: "dark",
                    });
                })
                .finally(() => {
                    //eta kaj korbei
                    setTimeout(() => {
                        console.log("waitning ... ")
                        setIsloading(false);
                        inpContainer.style.display = "block";
                    }, 2000);
                    //protibar submit er por image field ta faka hoye jabe
                    document.getElementById("image").value = "";
                });

        }
    });


    //1 key press Slow kaj kortechilo tai
    // UseEffect to manually trigger the validation after the user enters a new value
    useEffect(() => {
        if (Object.keys(formik.touched).length > 0) {
            formik.validateForm();
        }
    }, [formik.touched]);




    const handleInput = (e) => {

        if (e.target.type === 'file') {
            formik.setFieldValue(e.target.name, e.target.files[0]);
        } else {
            formik.handleChange(e);
        }
        //                                    [] eta diye bujhay j Name field ta bar bar change hobe      
        formik.setTouched({ ...formik.touched, [e.target.name]: true });
    }



    return (
        <Base>
            <div className="container">
                <form onSubmit={formik.handleSubmit} id='myForm' className="form-container border col-lg-6 m-auto p-4 my-5">
                    <h2 className='text-center'>Sign Up to ONNESHON</h2>

                    {isloading && <div className='loading'></div>}
                    

                    <hr className='my-3' />
                    <div id="input-container">
                        {/* name */}
                        <div className="input-group mb-3">
                            <input type="text" value={formik.values.name} onChange={handleInput} name='name' className="form-control" placeholder="Your name" />
                            {formik.touched.name && formik.errors.name && <div className='invalid-field'>{formik.errors.name}</div>}
                        </div>

                        {/* Email */}
                        <div className="input-group mb-3">
                            <input onChange={handleInput} value={formik.values.email} name='email' type="text" className="form-control" placeholder="Email Address" />
                            {formik.touched.email && formik.errors.email && <div className='invalid-field'>{formik.errors.email}</div>}
                        </div>

                        {/* Password */}
                        <div className="input-group mb-3">
                            <input type="password" onChange={handleInput} value={formik.values.password} name='password' className="form-control" placeholder="password" />
                            {formik.touched.password && formik.errors.password && <div className='invalid-field'>{formik.errors.password}</div>}
                        </div>

                        {/* Confirm password */}
                        <div className="input-group mb-3">
                            <input type="password" onChange={handleInput} value={formik.values.confirmPass} name='confirmPass' className="form-control" placeholder="Confirm password" />
                            {formik.touched.confirmPass && formik.errors.confirmPass && <div className='invalid-field'>{formik.errors.confirmPass}</div>}
                        </div>


                        {/* text area */}
                        <div className="input-group mb-3">
                            <textarea onChange={handleInput} value={formik.values.about} className="form-control" name="about" placeholder="Write something about you">{formik.values.about}</textarea>
                            {formik.touched.about && formik.errors.about && <div className='invalid-field'>{formik.errors.about}</div>}
                        </div>


                        {/* Image input */}
                        <div className="input-group mb-3">
                            <input type="file" onChange={handleInput} name="image" id="image" />
                            {formik.touched.image && formik.errors.image && <div className='invalid-field'>{formik.errors.image}</div>}
                        </div>


                        <input type="submit" value="Sign Up" className='btn btn-dark w-100' />

                    </div>

                </form>
            </div>
        </Base>
    )
}
