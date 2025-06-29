import "../../formstyle/formstyle.css";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../UserContext";

const api = process.env.REACT_APP_API_URL;

function BlogCard({ filterType }) {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [statusMap, setStatusMap] = useState({});
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      // Fetch blogs
      const res = await axios.get(`${api}/api/auth/getblogs`);
      let fetchedBlogs = res.data.blogs;

      // Sort blogs
      if (filterType === 'button2') {
        fetchedBlogs.sort((a, b) => b.likesCount - a.likesCount);
      } else {
        fetchedBlogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }

      setBlogs(fetchedBlogs);

      // Fetch blog status only if user is logged in
      if (user) {
        const statusRes = await axios.get(`${api}/api/auth/blogstatus`, {
          withCredentials: true,
        });
        setStatusMap(statusRes.data.status);
      } else {
        setStatusMap({}); // Reset if no user
      }

    } catch (err) {
      alert('Error loading blogs or status');
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterType, user]);

  const handleLike = async (blogId) => {
    if (!user) return navigate('/login');
    await axios.post(`${api}/api/auth/like/${blogId}`, {}, { withCredentials: true });
    await fetchData(); // Refresh blogs and status
  };

  const handleWatchlist = async (blogId) => {
    if (!user) return navigate('/login');
    await axios.post(`${api}/api/auth/watchlist/${blogId}`, {}, { withCredentials: true });
    await fetchData(); // Refresh blogs and status
  };

  return (
    <div className="cards">
      {blogs.map((blog) => {
        const blogStatus = statusMap[blog._id] || { liked: false, watchlisted: false };

        return (
          <div key={blog._id} className="blog-card" 
          onClick={() => {
                  if (!user) {
                    navigate('/login');
                  } else {
                    navigate(`/blog/${blog._id}`);
                  }
                }}
                >
            {blog.image && (
              <img
                src={`data:${blog.image.contentType};base64,${blog.image.data}`}
                alt="Blog"
                className="blog-image"
              />
            )}
            <p className="blog-meta">
              {new Date(blog.createdAt).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              })}
            </p>
            <div className="blog-content">
              <h3 className="blog-title">{blog.title}</h3>
              <p className="blog-desc">
                {blog.content.length > 150
                  ? blog.content.slice(0, 150) + "..."
                  : blog.content}
              </p>
            </div>

            <div className="blog-footer">
              <div className="author">
                <img
                  src="https://tse3.mm.bing.net/th?id=OIP.dtlHz4I4sENafs8TnZC3dwHaHa&pid=Api&P=0&h=180"
                  alt="Author"
                  className="author-img"
                />
                <div>
                  <p className="author-name">{blog.author}</p>
                  <p className="author-role">Content Creator</p>
                </div>
              </div>
              <div className="blog-stats">
                <span onClick={() => handleLike(blog._id)} style={{ marginRight: '10px', cursor: 'pointer' }}>
                  <i className={`${blogStatus.liked ? 'fas liked-icon' : 'far'} fa-heart`}></i>
                  <span style={{ marginLeft: '5px' }}>{blog.likesCount}</span>
                </span>
                <span onClick={() => handleWatchlist(blog._id)} style={{ cursor: 'pointer' }}>
                  <i className={`${blogStatus.watchlisted ? 'fas watchlisted-icon' : 'far'} fa-bookmark`}></i>
                  <span style={{ marginLeft: '5px' }}>{blog.watchlistCount}</span>
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BlogCard;
