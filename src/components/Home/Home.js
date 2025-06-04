import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Home Page</h1>
      <div style={{ marginTop: '20px' }}>
        <Link to="/login" style={{ margin: '10px', textDecoration: 'none', fontSize: '18px', color: '#007bff' }}>
          Login
        </Link>
        <Link to="/register" style={{ margin: '10px', textDecoration: 'none', fontSize: '18px', color: '#28a745' }}>
          Register
        </Link>
      </div>
    </div>
  );
}

export default Home;
