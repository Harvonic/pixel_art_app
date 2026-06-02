import ArtworkCard from "../components/artwork/ArtworkCard.jsx"
import { getArtworks, deleteArtwork } from "../api/artworks.js";
import { useState, useEffect } from "react";


function DashboardPage() {

  const [artworks, setArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [deleteError, setDeleteError] = useState("");

  async function handleDeleteArtwork(id) {
    const shouldDelete = window.confirm("Delete this draft?");

    if (!shouldDelete) {
      return;
    }

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

  useEffect(() => {

    async function loadArtworks() {
      setIsLoading(true);
      setLoadError("");

      try {
        const loadedArtworks = await getArtworks();

        setArtworks(loadedArtworks);

      } catch (err) {
        setLoadError(err.message);
      } finally {
        setIsLoading(false);
      }

    }

    loadArtworks();
  }, []);

  return (
    <main>
      <h1>Dashboard Page</h1>

      {isLoading && <p>Loading drafts...</p>}
      {loadError && <p>{loadError}</p>}
      {deleteError && <p>{deleteError}</p>}

      {artworks.length === 0 && !isLoading && <p>No drafts yet.</p>}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(266px, 1fr))",
        gap: "16px",
      }}>
        {artworks.map((artwork) => (
          <ArtworkCard
            key={artwork.id}
            artwork={artwork}
            onDelete={handleDeleteArtwork}
          />
        ))}
      </div>
    </main>

  );
}

export default DashboardPage;