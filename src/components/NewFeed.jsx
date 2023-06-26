import React, { useEffect, useState } from 'react'
import { getAllBlogs } from '../services/blogServices'
import { BASE_URL } from '../utils/constants';
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

function NewFeed() {

    const [blogs, setBlogs] = useState(null);
    const [data, setData] = useState(null);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        getAllBlogs(page, 0)
            .then((data) => {
                setData(data)
                setBlogs(data.content);
                setLoading(false);
                setError(null);
            })
            .catch((err) => {
                setLoading(false);
                setError("Something went wrong in fetching Data!")
                console.log("Error in fetching data -- " + err)
            })
    }, [page])



    if (error !== null) {
        return <div className='display-4 text-danger'>{error}</div>;
    }


    if (blogs == null || loading) {
        return <div className=' mt-5 border-0 loading'></div>;
    }

  


    //if blogs are found
    if (blogs !== null) {

        return (
            <>
                {blogs.map((blog) => {
                    //maximum content legth 100
                    const truncatedContent = blog.blogContent.length > 100
                        ? blog.blogContent.substring(0, 100) + "...Read More"
                        : blog.blogContent;

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

                    //passing EACH BLOG
                    return (
                        <div key={blog.id} className="mb-3">
                            <div className="blog-card">
                                <div>
                                    {/* <img src={userImage} alt="Blog" className="blog-card-img" /> */}
                                    <img style={{ minHeight: "300px", height: "320px" }} src={BASE_URL + "/BlogImages/" + blog.blogImage} alt="Blog" className="blog-card-img" />
                                    <Link to={"/blog/" + blog.id} className="p-2 text-decoration-none d-block">
                                        <div className='d-flex justify-content-between'>
                                            <span className='blog-category'>{blog.category.categoryTitle}</span>
                                            <span><i className="fa-regular fa-comments me-2"></i>{blog.comments.length}</span>
                                        </div>
                                        <div className='blog-details'>
                                            <div className="blog-title">{blog.blogTitle}</div>
                                            <div dangerouslySetInnerHTML={{ __html: truncatedContent }} className='blog-content text-muted'></div>
                                        </div>
                                    </Link>
                                    {/* <Link to="/home" className='stretched-link'></Link> */}
                                </div>

                                <div className="blog-card-auth p-2">
                                    <div>
                                        <img src={BASE_URL + "/UserImages/" + blog.user.image} alt="User" />
                                        {blog.user.name}
                                    </div>
                                    <span>{formattedDateWithSuffix}</span>
                                </div>
                            </div>
                        </div>
                    )
                }
                )}

                <hr />

                {/* pagination part will be written here */}
                <Pagination className='d-flex'>
                    <PaginationItem className={data.first ? "d-none" : ''}>
                        <PaginationLink onClick={() => setPage(0)}
                            first
                        />
                    </PaginationItem>
                    <PaginationItem className={data.first ? "d-none" : ''}>
                        <PaginationLink  onClick={() => setPage(data.pageNumber-1)}
                            previous
                        />
                    </PaginationItem>
                    {
                        [...Array(data.totalPages)].map((item, index) => {
                            return <PaginationItem onClick={() => setPage(index)} active={data.pageNumber == index} key={index}>
                                <PaginationLink >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        })

                    }


                    <PaginationItem className={data.last ? "d-none" : ''}>
                        <PaginationLink  onClick={() => setPage(data.pageNumber+1)}                        
                            next
                        />
                    </PaginationItem>
                    <PaginationItem  className={data.last ? "d-none" : ''}>
                        <PaginationLink onClick={() => setPage(data.totalPages-1)}  last
                        />
                    </PaginationItem>
                </Pagination>
            </>
        )
    }

}

export default NewFeed