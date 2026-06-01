import ArtworkCard from "../components/artwork/ArtworkCard.jsx"
import { getArtworks } from "../api/artworks.js";
import { useState, useEffect } from "react";


function DashboardPage() {

  const [artworks, setArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState("");

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

      {artworks.length === 0 && !isLoading && <p>No drafts yet.</p>}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(266px, 1fr))",
        gap: "16px",
      }}>
        {artworks.map((artwork) => (
          <ArtworkCard key={artwork.id} artwork={artwork} />
        ))}
      </div>
    </main>

  );
}

export default DashboardPage;