import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../UserContext';

const api = process.env.REACT_APP_API_URL;

function BlogContent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [status, setStatus] = useState({ liked: false, watchlisted: false });

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`${api}/api/auth/blog/${id}`);
      setBlog(res.data.blog);
    } catch (err) {
      setError('Blog not found or failed to load.');
    } finally {
      setLoading(false);
    }
  };

  const fetchStatus = async () => {
    if (!user) return;
    try {
      const res = await axios.get(`${api}/api/auth/blogstatus`, {
        withCredentials: true,
      });
      const currentStatus = res.data.status[id];
      if (currentStatus) {
        setStatus(currentStatus);
      }
    } catch (err) {
      console.error('Failed to fetch blog status:', err);
    }
  };

  const refreshBlog = async () => {
    const res = await axios.get(`${api}/api/auth/blog/${id}`);
    setBlog(res.data.blog);
  };

  const handleLike = async () => {
    if (!user) return navigate('/login');
    await axios.post(`${api}/api/auth/like/${id}`, {}, { withCredentials: true });
    await refreshBlog();
    await fetchStatus();
  };

  const handleWatchlist = async () => {
    if (!user) return navigate('/login');
    await axios.post(`${api}/api/auth/watchlist/${id}`, {}, { withCredentials: true });
    await refreshBlog();
    await fetchStatus();
  };

  useEffect(() => {
    fetchBlog();
    fetchStatus();
  }, [id, user]);

  if (loading) return <p>Loading blog...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="blog-details">
      <Link to="/blog"><i class="fas fa-arrow-left fa-2x"></i></Link>
      <h2>{blog.title}</h2>
      {blog.image && (
        <img
          src={`data:${blog.image.contentType};base64,${blog.image.data}`}
          alt="Blog"
          className="blog-detail-image"
        />
      )}
      <div className='blog-details-status'>
        <p><strong>Author:</strong> {blog.author}</p>
        <div className="blog-stats">
          <span onClick={handleLike} style={{ marginRight: '10px', cursor: 'pointer' }}>
            <i className={`${status.liked ? 'fas liked-icon' : 'far'} fa-heart`}></i>
            <span style={{ marginLeft: '5px' }}>{blog.likesCount || 0}</span>
          </span>
          <span onClick={handleWatchlist} style={{ cursor: 'pointer' }}>
            <i className={`${status.watchlisted ? 'fas watchlisted-icon' : 'far'} fa-bookmark`}></i>
            <span style={{ marginLeft: '5px' }}>{blog.watchlistCount || 0}</span>
          </span>
        </div>
      </div>
      
      <p><strong>Date:</strong> {new Date(blog.createdAt).toLocaleString()}</p>
      <p>{blog.content}</p>
    </div>
  );
}

export default BlogContent;
