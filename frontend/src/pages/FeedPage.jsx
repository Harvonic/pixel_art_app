import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { getPosts } from "../api/posts.js";
import PostFeedCard from "../components/posts/PostFeedCard.jsx";

function FeedPage() {

  const navigate = useNavigate();
  const { logoutUser } = useAuth();


  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState("");

  const [posts, setPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [postsError, setPostsError] = useState("");

  useEffect(() => {
    async function loadPosts() {
      setIsLoadingPosts(true);
      setPostsError("");

      try {
        const loadedPosts = await getPosts();
        setPosts(loadedPosts);
      } catch (err) {
        setPostsError(err.message);
      } finally {
        setIsLoadingPosts(false);
      }
    }

    loadPosts();
  }, []);

  async function handleLogout(e) {
    e.preventDefault();

    setError("");
    setIsLoggingOut(true);

    try {

      await logoutUser();
      navigate("/login");

    }
    catch (err) {
      setError(err.message);
    } finally {
      setIsLoggingOut(false);
    }

  }

  return (
    <main>
      <h1>Feed Page</h1>

      {error && <p>{error}</p>}

      {isLoadingPosts && <p>Loading feed...</p>}
      {postsError && <p>{postsError}</p>}

      {posts.length === 0 && !isLoadingPosts && (
        <p>No posts yet.</p>
      )}

      <form onSubmit={handleLogout}>
        <button type="submit" disabled={isLoggingOut}>
          {isLoggingOut ? "Logging out..." : "Log out"}
        </button>
      </form>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {posts.map((post) => (
          <PostFeedCard key={post.id} post={post} />
        ))}
      </div>

    </main>
  );

}

export default FeedPage;