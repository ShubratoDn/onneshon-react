import React, { useState, useEffect, useRef } from 'react'
import Base from '../../components/Base'
import { useFormik } from 'formik';
import * as yup from 'yup'
import JoditEditor from 'jodit-react';
import { addNewBlog, getAllCategories } from '../../services/blogServices';
import { toast } from 'react-toastify'

export default function WriteBlog() {


    //for jodit rich text editor
    const editor = useRef(null);
    const [isLoading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    const formik = useFormik({
        initialValues: {
            blogTitle: "",
            blogContent: "",
            categoryId: "",
            blogImage: ""
        },
        validationSchema: yup.object({
            blogTitle: yup.string().required("Insert Blog Title").min(4, "Minumum 4 character needed"),
            blogContent: yup.string().required("Insert Blog Content").min(10, "Write something more...").max(5000,"Maximum 5000 character"),
            categoryId: yup.number().required("Select category").typeError("Enter a valid category").required("Select a category").positive("Select a valid category"),
            blogImage: yup.mixed().required("Insert image").test('fileSize', 'Maximum 5 mb', (value) => {
                return value ? value.size <= 5000000 : true;
            }).test('fileType', 'Invalid file type', (value) => {
                return value ? ['image/jpeg', 'image/png', 'image/gif'].includes(value.type) : true;
            })
        }),
        onSubmit: (values, { resetForm }) => {
            console.log(values);

            setLoading(true);

            addNewBlog(values)
                .then(response =>{
                    // console.log(response)
                    setLoading(false);
                    toast.success('🦄Blog Added Successfully!!', {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });

                    // reseting form value
                    resetForm ({values : ""});
                    
                })
                .catch((err)=>{

                    if(err.code === 'ERR_NETWORK') {
                        // handle connection refused error
                        console.log('Connection refused error');
                        toast.error('Network error!! Conenction hoise na', {
                            position: "bottom-center",                            
                            theme: "dark",
                        });
                    }

                    // console.log(err.response.data);
                    let keys = Object.keys(err.response.data)
                    // console.log(err.response.data[keys]+"\n")
                    // console.log(err)

                    keys.map((key)=>{
                        toast.error( err.response.data[keys], {
                            position: "bottom-center",                            
                            theme: "dark",
                        });
                    })                    


                }).finally(()=>{
                    setLoading(false);

                    //protibar submit er por image field ta faka hoye jabe
                    document.getElementById("blogImage").value = "";
                });

        }
    })




    const handleInput = (e) => {
        if (e.target.type === 'file') {
            formik.setFieldValue(e.target.name, e.target.files[0]);
        } else {
            formik.handleChange(e);
        }
        // Manually mark the field as touched after the user enters a new value
        formik.setTouched({ ...formik.touched, [e.target.name]: true });
    };



    //1 key press Slow kaj kortechilo tai
    // UseEffect to manually trigger the validation after the user enters a new value
    useEffect(() => {
        if (Object.keys(formik.touched).length > 0) {
            formik.validateForm();
        }
    }, [formik.touched]);


    //loading all categories
    useEffect(() => {
        const fetchCategories = async () => {
            const categories = await getAllCategories();
            setCategories(categories);
            // console.log(categories);
        };
        fetchCategories();
    }, [])



    return (
        <Base>
            <div className="container py-5">
                <h1 className='text-center display-4'>Write Your Blog!!</h1>
                <hr />

                {isLoading && <div className='loading'></div>}

                <form onSubmit={formik.handleSubmit} style={{ "minHeight": "50vh" }} id="input-container">
                    {/* Blog Title */}
                    <div className="form-group mb-3">
                        <input type="text" name='blogTitle' onChange={handleInput} value={formik.values.blogTitle} placeholder='Enter Blog Title here' className="form-control" />
                        {formik.touched.blogTitle && formik.errors.blogTitle && <div className='invalid-field'>{formik.errors.blogTitle}</div>}
                    </div>

                    {/* blog content */}
                    <div className="form-group mb-3 d-flex justify-content-between">
                        <label htmlFor="content">Blog Content:</label>
                        <div className='col-lg-9 col-sm-7'>
                            <JoditEditor
                                id="content"
                                name="blogContent"
                                ref={editor}
                                value={formik.values.blogContent}
                                onChange={(content) => formik.setFieldValue('blogContent', content)}
                            />
                            {formik.touched.blogContent && formik.errors.blogContent && <div className='invalid-field'>{formik.errors.blogContent}</div>}
                        </div>
                    </div>

                    {/* blog content */}
                    <div className="form-group mb-3 d-flex justify-content-between">
                        <label htmlFor="sel1">Select Blog Category:</label>
                        <div className='col-lg-9 col-sm-7'>
                            <select name='categoryId' className="form-control" id="sel1"
                                onChange={handleInput} // Make sure to include the onChange handler
                                onBlur={formik.handleBlur} // Handle onBlur event to mark field as touched
                                value={formik.values.categoryId} // Set the selected value
                            >
                                <option>-- Select Category --</option>
                                {categories.length > 0 && categories.map((category)=> <option key={category.categoryId} value={category.categoryId}>{category.categoryTitle}</option>)}
                            </select>
                            {formik.touched.categoryId && formik.errors.categoryId && (<div className="invalid-field">{formik.errors.categoryId}</div>)}
                        </div>
                    </div>


                    {/* Blog image */}
                    <div className="form-group mb-3 d-flex justify-content-between">
                        <label htmlFor="blogImage">Select Blog Image:</label>
                        <div className='col-lg-9 col-sm-7'>
                            <input id="blogImage" type="file" onChange={handleInput} name="blogImage" className="form-control" />
                            {formik.touched.blogImage && formik.errors.blogImage && <div className='invalid-field'>{formik.errors.blogImage}</div>}
                        </div>
                    </div>

                    <input type="submit" value={"Add Blog"} className='mt-4 btn btn-outline-primary w-100 btn-lg' />
                </form>

            </div>
        </Base>
    )
}
