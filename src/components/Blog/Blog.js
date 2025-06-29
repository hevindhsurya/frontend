import BlogCard from "./BlogCard";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";

function Blog() {
    const [active, setActive] = useState('button1');
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5 seconds delay
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

    
    return(
        <div>
        <div className="blog">
            <div>
            <h1 className="blogHeading">To-Let Tales</h1>
            <p className="blogContent">Dive into a Sea of Endless Stories and Insights</p>

            <div className="navbtn">
                <p onClick={() => setActive('button1')} style={{ backgroundColor: active === 'button1' ? '#00ffff' : 'rgba(0,255,255,0.6)'}}>Latest</p>
                <p onClick={() => setActive('button2')} style={{ backgroundColor: active === 'button2' ? '#00ffff' : 'rgba(0,255,255,0.6)'}}>Trending</p>

            </div>
            </div>
            <div className="blogcards">    
                <BlogCard filterType={active} />
            </div>
        </div>
        <Link to="/addblog" className="addblog-link">
            <div className="addBlog-button">
                <div></div>
                <div></div>
            </div>
        </Link>
        </div>
    );
}

export default Blog;