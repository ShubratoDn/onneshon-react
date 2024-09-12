import React, { useEffect, useState } from 'react'
import Base from '../components/Base'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { addNewComment, getBlogByBlogId } from '../services/blogServices';
import { BASE_URL } from '../utils/constants';
import { toast } from 'react-toastify';
import { doLogout } from '../services/auth';

function Blog() {
    const { blogId } = useParams();
    const [blog, setBlog] = useState(null);
    const [error, setError] = useState("");

    const [comment, setComment] = useState("");
    const [commentStateChange, setCommentStateChange] = useState(1);

    const nav = useNavigate();
    const handleChange = (e) => {
        setComment(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (comment.length < 3) {
            toast.error('Comment can not be too short', {
                position: "bottom-center",
                theme: "dark",
            });
        } else {
            addNewComment(blogId, comment)
                .then((data) => {
                    toast.success('Comment added', {
                        position: "bottom-center",
                        theme: "dark",
                    });
                    setComment("");
                    setCommentStateChange(commentStateChange + 1)
                    console.log(data)
                    console.log("value is " + commentStateChange)
                })
                .catch((err) => {
                    console.log(err.response)
                    if (err.response.status === 403) {
                        doLogout();
                        nav("/login");
                    }
                })
        }
    };


    useEffect(() => {
        const number = parseInt(blogId, 10);
        if (!Number.isNaN(number)) {
            getBlogByBlogId(blogId)
                .then((data) => {
                    setBlog(data)
                })
                .catch((err) => {
                    console.log(err.response)
                    setError("Blog Not Found");
                })
        } else {
            setError("Error! 404 not found! \n Don't play with URL");
        }

    }, [blogId, commentStateChange])



    // if there is SOME ERROR
    if (error !== "") {
        return <Base>
            <div className='container d-flex justify-content-center align-items-center h-100 mt-5'>
                <div className="alert alert-danger">
                    <h1 className='text-center'>{error}</h1>
                </div>
            </div>
        </Base>
    }


    //checking if the Blog is Empty or NOT
    if (!blog) {
        return <Base>
            <div className='loading border-0'></div>
        </Base>
    }





    //SOB THIK THAKLEI EI CODE GULA KAJ KORBE



    //Date formating
    const addedDate = new Date(blog.addedDate);
    const day = addedDate.getDate();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[addedDate.getMonth()]
    const year = addedDate.getFullYear();
    const ordinalSuffix = getOrdinalSuffix(day);
    const formattedDateWithSuffix = `${day}${ordinalSuffix} ${month} ${year}`;

    // Helper function to get the ordinal suffix for the day
    function getOrdinalSuffix(day) {
        if (day >= 11 && day <= 13) {
            return 'th';
        } else {
            const lastDigit = day % 10;
            switch (lastDigit) {
                case 1:
                    return 'st';
                case 2:
                    return 'nd';
                case 3:
                    return 'rd';
                default:
                    return 'th';
            }
        }
    }


    return (
        <Base>
            <div className="container py-5">
                <div className='col-lg-8'>
                    <div className="blog">
                        {/* blog image */}
                        {blog.blogImage && <div className="blog-image"><img className='card-img rounded mb-2' src={BASE_URL + "/BlogImages/" + blog.blogImage} alt="BLog " /></div>}
                        <p className='display-6 blog-title'>{blog.blogTitle}</p>
                        <div className='d-flex my-3'>
                            <span className='blog-category me-4'>{blog.category.categoryTitle}</span>
                            <div className='d-flex justify-content-between w-100'>
                                <a href={"#comments"} className='text-decoration-none'><i className="fa-regular fa-comments me-2 "></i>{blog.comments.length}</a>
                                <span className='text-muted'> Published on: {formattedDateWithSuffix}</span>
                            </div>
                        </div>
                        {/* author info */}
                        <Link to={"/user/" + blog.user.id} className="blog-card-auth p-2 text-decoration-none text-dark">
                            <div>
                                <img src={BASE_URL + "/UserImages/" + blog.user.image} alt="User" />
                                {blog.user.name}
                            </div>
                        </Link>

                        <div dangerouslySetInnerHTML={{ __html: blog.blogContent }} className='blog-content text-muted'>
                        </div>
                    </div>
                    <br />
                    <hr />
                    {/* all comments */}
                    <div id='comments' className="blog-comments">
                        <p className='display-6'>All Comments</p>
                        {/* comment card */}

                        {blog.comments.map((comment) => {
                            return (
                                <div key={comment.commentId} className="comment-card">
                                    <Link className="author-info">
                                        <img src={BASE_URL + "/UserImages/" + comment.user.image} alt="author" className='comment-auth' /> {comment.user.name}
                                    </Link>
                                    <div className="comment-text">
                                        {comment.content}
                                    </div>
                                </div>
                            )
                        })}

                        <hr />
                        {/* write your comment */}
                        <div className="write-comment-box">
                            <form onSubmit={handleSubmit}>
                                <textarea onChange={handleChange} value={comment} name="comment" rows={5} placeholder='Write you comment here' className='form-control'></textarea>
                                <input type="submit" className='my-4 btn-lg btn btn-primary' value="Add Comment" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </Base>
    )
}

export default Blog