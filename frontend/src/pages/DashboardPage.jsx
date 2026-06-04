import { useEffect, useState } from "react";
import ArtworkCard from "../components/artwork/ArtworkCard.jsx";
import PostDashboardCard from "../components/posts/PostDashboardCard.jsx";
import { getArtworks, deleteArtwork } from "../api/artworks.js";
import { createPost, getUserPosts } from "../api/posts.js";

function DashboardPage() {
  const [activeView, setActiveView] = useState("drafts");

  const [artworks, setArtworks] = useState([]);
  const [posts, setPosts] = useState([]);

  const [isLoadingArtworks, setIsLoadingArtworks] = useState(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);

  const [loadError, setLoadError] = useState("");
  const [postsError, setPostsError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [publishError, setPublishError] = useState("");

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(266px, 1fr))",
    gap: "16px",
  };

  function getViewButtonStyle(viewName) {
    return {
      border: `2px solid ${activeView === viewName ? "#222222" : "transparent"}`,
    };
  }

  async function handleDeleteArtwork(id) {
    const shouldDelete = window.confirm("Delete this draft?");

    if (!shouldDelete) return;

    setDeleteError("");

    try {
      await deleteArtwork(id);

      setArtworks((currentArtworks) =>
        currentArtworks.filter((artwork) => artwork.id !== id)
      );
    } catch (err) {
      setDeleteError(err.message);
    }
  }

  async function handlePublishArtwork(id) {
    const caption = window.prompt("Add a caption:");

    if (caption === null) return;

    const shouldPublish = window.confirm("Publish this draft?");

    if (!shouldPublish) return;

    setPublishError("");

    try {
      const createdPost = await createPost({
        artworkId: id,
        caption,
      });

      setArtworks((currentArtworks) =>
        currentArtworks.filter((artwork) => artwork.id !== id)
      );

      setPosts((currentPosts) => [createdPost, ...currentPosts]);
      setActiveView("published");
    } catch (err) {
      setPublishError(err.message);
    }
  }

  useEffect(() => {
    async function loadArtworks() {
      setIsLoadingArtworks(true);
      setLoadError("");

      try {
        const loadedArtworks = await getArtworks();
        setArtworks(loadedArtworks);
      } catch (err) {
        setLoadError(err.message);
      } finally {
        setIsLoadingArtworks(false);
      }
    }

    async function loadPosts() {
      setIsLoadingPosts(true);
      setPostsError("");

      try {
        const loadedPosts = await getUserPosts();
        setPosts(loadedPosts);
      } catch (err) {
        setPostsError(err.message);
      } finally {
        setIsLoadingPosts(false);
      }
    }

    loadArtworks();
    loadPosts();
  }, []);

  return (
    <main>
      <h1>Dashboard Page</h1>

      <div>
        <button
          type="button"
          style={getViewButtonStyle("drafts")}
          onClick={() => setActiveView("drafts")}
        >
          Drafts
        </button>

        <button
          type="button"
          style={getViewButtonStyle("published")}
          onClick={() => setActiveView("published")}
        >
          Published
        </button>
      </div>

      {loadError && <p>{loadError}</p>}
      {postsError && <p>{postsError}</p>}
      {deleteError && <p>{deleteError}</p>}
      {publishError && <p>{publishError}</p>}

      {activeView === "drafts" && (
        <>
          {isLoadingArtworks && <p>Loading drafts...</p>}

          {artworks.length === 0 && !isLoadingArtworks && (
            <p>No drafts yet.</p>
          )}

          <div style={gridStyle}>
            {artworks.map((artwork) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                onDelete={handleDeleteArtwork}
                onPublish={handlePublishArtwork}
              />
            ))}
          </div>
        </>
      )}

      {activeView === "published" && (
        <>
          {isLoadingPosts && <p>Loading posts...</p>}

          {posts.length === 0 && !isLoadingPosts && (
            <p>No published posts yet.</p>
          )}

          <div style={gridStyle}>
            {posts.map((post) => (
              <PostDashboardCard key={post.id} post={post} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}

export default DashboardPage;