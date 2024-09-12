import React, { useEffect, useState } from 'react'
import { getAllBlogs } from '../services/blogServices'
import { BASE_URL } from '../utils/constants';
import { Link } from 'react-router-dom';
// import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import InfiniteScroll from 'react-infinite-scroll-component'

function NewFeedInfinite() {

    const [blogs, setBlogs] = useState(null);
    const [data, setData] = useState(null);
    const [page, setPage] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {

        console.log("Page number : " + page)


        // setLoading(true);
        getAllBlogs(page, 0)
            .then((data) => {
                setData(data)
                if (blogs == null) {
                    setBlogs(data.content)
                } else {
                    setBlogs((prevBlogs) => [...prevBlogs, ...data.content]);
                }
                setError(null);
            })
            .catch((err) => {
                setError("Something went wrong in fetching Data!")
                console.log("Error in fetching data -- " + err)
            })
    }, [page])



    if (error !== null) {
        return <div className='display-4 text-danger'>{error}</div>;
    }


    if (blogs == null) {
        return <div className=' mt-5 border-0 loading'></div>;
    }



    const fetchData = () => {
        console.log("Req for next data")
        setPage((prevPage) => prevPage + 1)
    }



    //if blogs are found
    return (
        <>

            <InfiniteScroll
                dataLength={blogs.length} //This is important field to render the next data
                next={fetchData}
                hasMore={data ? !data.last : true}
                loader={<div className="border-0 loading"></div>}
                endMessage={<div className="my-3 text-center text-muted">No more blogs to load.</div>}

            >
                {blogs.map((blog) => {

                    // Function to extract text content from HTML
                    const extractTextFromHTML = (html) => {
                        // Create a temporary DOM element
                        const tempDiv = document.createElement('div');
                        tempDiv.innerHTML = html;

                        // Extract and return the text content
                        return tempDiv.textContent || tempDiv.innerText || '';
                    };

                    // Extract text from the blog content
                    const fullText = extractTextFromHTML(blog.blogContent);
                    // Slice the first 100 characters of the text
                    const truncatedContent = fullText.length > 100 ?
                        fullText.slice(0, 100) + "...Read More" :
                        fullText;



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

                                    {blog.blogImage && <img style={{ minHeight: "300px", height: "320px" }} src={BASE_URL + "/BlogImages/" + blog.blogImage} alt="Blog" className="blog-card-img" />}
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

                                <Link to={"/user/" + blog.user.id} className="blog-card-auth p-2 text-decoration-none text-dark">
                                    <div>
                                        <img src={BASE_URL + "/UserImages/" + blog.user.image} alt="User" />
                                        {blog.user.name}
                                    </div>
                                    <span>{formattedDateWithSuffix}</span>
                                </Link>
                            </div>
                        </div>
                    )
                }
                )}

            </InfiniteScroll>

        </>
    )
}


export default NewFeedInfinite