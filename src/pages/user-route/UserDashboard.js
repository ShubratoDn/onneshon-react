import React, { useEffect, useState } from 'react'
import Base from '../../components/Base'
import { getCurrentUserInfo } from '../../services/auth'
import { Link } from 'react-router-dom';
import { getBlogsByUserId } from '../../services/blogServices';
import { BASE_URL } from '../../utils/constants';


function UserDashboard() {

    const [user, setUser] = useState([]);
    const [userBlogs, setUserBlogs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            //first a user Data asbe and ONLY THEN getBlogsByUserId() eta jeno kaj kore. Noile ID pabo na user er
            const userInfo = getCurrentUserInfo();
            setUser(userInfo);

            if (userInfo && userInfo.id) {
                const blogs = await getBlogsByUserId(userInfo.id);
                setUserBlogs(blogs);
            }
        };

        fetchData();

    }, []);



    return (
        <Base>
            <div className="user-page">
                <div className="container">
                    {/* user page info */}
                    <div className="user-page-info">
                        <div className="row">
                            <div className="col-lg-3 pe-0 d-flex justify-content-center align-items-center"><img src={BASE_URL + "/UserImages/" + user.image} className='mw-100' alt="User" /></div>
                            <div className="col-lg-9">
                                <table className="mb-0 table  table-striped">
                                    <tbody>
                                        <tr>
                                            <th>User Id</th>
                                            <td>{user.id}</td>
                                        </tr>
                                        <tr>
                                            <th>Name</th>
                                            <td>{user.name}</td>
                                        </tr>
                                        <tr>
                                            <th>Email</th>
                                            <td>{user.email}</td>
                                        </tr>
                                        <tr>
                                            <th>About Me</th>
                                            <td>{user.about}</td>
                                        </tr>
                                        <tr>
                                            <th>Roles</th>
                                            <td>{user.roles && user.roles.map((role) => role.role + " ")}</td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>


                    <div className="user-blogs-section p-2">
                        <div className='d-flex justify-content-between align-items-center flex-nowrap'>
                            <h1 className='display-5'>User Blogs</h1>

                            <Link to="/blog/write-blog" className='btn btn-success'>Write New Blog</Link>
                        </div>
                        <br />
                        <div className="user-all-blogs">
                            <div className="row">
                                {
                                    userBlogs && userBlogs.content && userBlogs.content.length === 0 ? <h1 className='text-muted'>No blogs found for this users</h1> : userBlogs.content && userBlogs.content.map((blog) => {
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


                                        <span>{formattedDateWithSuffix}</span>


                                        return <div key={blog.id} className="col-lg-4 mb-3">
                                            <div className="blog-card">
                                                <div>
                                                    {/* <img src={userImage} alt="Blog" className="blog-card-img" /> */}
                                                    <img src={BASE_URL + "/BlogImages/" + blog.blogImage} alt="Blog" className="blog-card-img" />
                                                    <Link to="/home" className="p-2 text-decoration-none d-block">
                                                        <div className='d-flex justify-content-between'>
                                                            <span className='blog-category'>{blog.category.categoryTitle}</span>
                                                            <span><i className="fa-regular fa-comments"></i> 10</span>
                                                        </div>
                                                        <div className='blog-details'>
                                                            <div className="blog-title">{blog.blogTitle}</div>
                                                            <div dangerouslySetInnerHTML={{ __html: truncatedContent }} className='blog-content text-muted'>

                                                                {/* {truncatedContent} */}
                                                                {/* <strong>...Read more</strong> */}
                                                            </div>
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
                                    })

                                }

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Base>
    )
}

export default UserDashboard