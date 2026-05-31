import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext.jsx";

function HomePage() {
  
  return (
    <main>
      <h1>Home Page</h1>

      <Link to="/login">
        <button type="button">Login</button>
      </Link>

      {" "}

      <Link to="/register">
        <button type="button">Register</button>
      </Link>

    </main>
  );
}

export default HomePage;