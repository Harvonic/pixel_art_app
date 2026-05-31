import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function FeedPage() {

  const navigate = useNavigate();
  const { logoutUser } = useAuth();


  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState("");

  async function handleLogout(e) {
    e.preventDefault();

    setError("");
    setIsLoggingOut(true);

    try {

      await logoutUser();
      navigate("/login");

    }
    catch(err){
      setError(err.message);
    } finally {
      setIsLoggingOut(false);
    }

  }

  return (
    <main>
      <h1>Feed Page</h1>

      {error && <p>{error}</p>}

      <form onSubmit={ handleLogout }>
        <button type="submit" disabled={isLoggingOut}>
          {isLoggingOut ? "Logging out..." : "Log out"}
        </button>
      </form>

    </main>
  );

}

export default FeedPage;