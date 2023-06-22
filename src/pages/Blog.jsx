import React from 'react'
import Base from '../components/Base'
import { Link, useParams } from 'react-router-dom'

function Blog() {
    const { blogId } = useParams();


    return (
        <Base>
            <div className="container py-5">
                <div className='col-lg-8'>
                    <div className="blog">
                        {/* blog image */}
                        <div className="blog-image"><img className='card-img rounded mb-2' src="http://localhost:1234/BlogImages/User_Image_33bfda86259c3fd12bbe_1687429238045_.jpg" alt="BLog " /></div>
                        <p className='display-4 blog-title'>This is blog Title</p>
                        <div className='d-flex my-3'>
                            <span className='blog-category me-4'>Technology</span>
                            <div className='d-flex justify-content-between w-100'>
                                <span><i className="fa-regular fa-comments"></i> 10</span>
                                <span>Published on: 19th june 2023</span>
                            </div>
                        </div>
                        <div className='blog-content'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores quod, dolor vero inventore sint fuga suscipit, provident ipsa libero quo laudantium necessitatibus nihil architecto earum? Necessitatibus impedit ratione doloribus? Hic natus animi totam rerum provident ad, error quibusdam blanditiis quasi dicta facere voluptas maiores harum debitis deserunt ducimus obcaecati! Illo nobis temporibus adipisci ipsa facilis explicabo, numquam porro quae tempore maiores mollitia aliquid culpa enim voluptatibus magni laborum incidunt impedit reprehenderit minima. Id magnam ducimus ea natus esse maxime totam, aperiam dolor libero ad quisquam voluptatum veritatis recusandae impedit quis hic facilis suscipit minus voluptates odio excepturi deleniti et! Recusandae.</div>
                    </div>
                    <hr />
                    {/* all comments */}
                    <div id='comments' className="blog-comments">
                        <p className='display-6'>All Comments</p>
                        {/* comment card */}
                        <div className="comment-card">
                            <Link className="author-info">
                                <img src="http://localhost:1234/BlogImages/User_Image_33bfda86259c3fd12bbe_1687429238045_.jpg" alt="author" className='comment-auth' /> Shubrato Debnath
                            </Link>
                            <div className="comment-text">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia, beatae.
                            </div>
                        </div>
                        <div className="comment-card">
                            <Link className="author-info">
                                <img src="http://localhost:1234/BlogImages/User_Image_33bfda86259c3fd12bbe_1687429238045_.jpg" alt="author" className='comment-auth' /> Shubrato Debnath
                            </Link>
                            <div className="comment-text">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia, beatae.
                            </div>
                        </div>

                        <hr />
                        <div className="write-comment-box">
                            <form className=''>
                                <textarea name="comment" rows={5} placeholder='Write you comment here' className='form-control'></textarea>
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