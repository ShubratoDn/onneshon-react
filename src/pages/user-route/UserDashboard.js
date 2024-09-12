import React, { useEffect, useState } from 'react'
import Base from '../../components/Base'
import { getCurrentUserInfo } from '../../services/auth'
import { Link, useLocation, useParams } from 'react-router-dom';
import { getBlogsByUserId } from '../../services/blogServices';
import { BASE_URL } from '../../utils/constants';
import { getUserById } from '../../services/userServices';


function UserDashboard() {

    const [user, setUser] = useState([]);
    const [userBlogs, setUserBlogs] = useState([]);
    const [myAccount, setMyAccount] = useState(false);

    /** VVI */
    //from request param
    const { userId } = useParams();
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            const userInfo = getCurrentUserInfo();

            let userIdInt = Number.parseInt(userId)

            if (userId) {

                // *** ONEK IMPORTANT (Feedback given at last moment of the project)
                const fetchedUser = await getUserById(userIdInt)
                    .then(data => setUser(data))
                    .catch((err) => setUser([]))
                // setUser(fetchedUser);

                //first a user Data asbe and ONLY THEN getBlogsByUserId() eta jeno kaj kore. Noile ID pabo na user er
                const blogs = await getBlogsByUserId(userIdInt);
                setUserBlogs(blogs);

            } else {
                setUser(userInfo);
                if (userInfo && userInfo.id) {
                    const blogs = await getBlogsByUserId(userInfo.id);
                    setUserBlogs(blogs);
                }
            }

            if (userInfo.id === userIdInt) {
                setMyAccount(true)
            } else {
                setMyAccount(false)
            }

        };

        fetchData();
    }, [userId, location.pathname]);


    if (user.length == 0) {
        return (<Base>
            <div className='display-3 text-center text-danger'>User Not Found</div>
        </Base>)
    }
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


                                        return <div key={blog.id} className="col-lg-4 mb-3">

                                            <div className="blog-card">
                                                <div>
                                                    {/* <img src={userImage} alt="Blog" className="blog-card-img" /> */}
                                                    {blog.blogImage && <img src={BASE_URL + "/BlogImages/" + blog.blogImage} alt="Blog" className="blog-card-img" />}
                                                    <Link to={"/blog/" + blog.id} className="p-2 text-decoration-none d-block">
                                                        <div className='d-flex justify-content-between'>
                                                            <span className='blog-category'>{blog.category.categoryTitle}</span>
                                                            <span><i className="fa-regular fa-comments me-2"></i>{blog.comments.length}</span>
                                                        </div>
                                                        <div className='blog-details'>
                                                            <div className="blog-title">{blog.blogTitle}</div>
                                                            <div dangerouslySetInnerHTML={{ __html: truncatedContent }} className='blog-content text-muted'>
                                                            </div>
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