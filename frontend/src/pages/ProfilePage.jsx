import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../api/users.js";
import ProfilePostGridItem from "../components/posts/ProfilePostGridItem.jsx";

function ProfilePage() {

  const { username } = useParams();

  const [profileUser, setProfileUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      setIsLoading(true);
      setError("");

      try {
        const data = await getUserProfile(username);
        setProfileUser(data.user);
        setPosts(data.posts);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }

    }

    loadProfile();
  }, [username]);

  if (isLoading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!profileUser) {
    return <p>Profile not found.</p>;
  }

  return (
    <main>
      <h1>@{profileUser.username}</h1>

      <p>
        Joined {new Date(profileUser.createdAt).toLocaleDateString()}
      </p>

      {posts.length === 0 && <p>No posts yet.</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
          gap: "8px",
        }}
      >
        {posts.map((post) => (
          <ProfilePostGridItem key={post.id} post={post} />
        ))}
      </div>



    </main>
  );



}

export default ProfilePage;