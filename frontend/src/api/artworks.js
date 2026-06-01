const API_URL = import.meta.env.VITE_API_URL;

export async function createArtwork(artworkData) {
     
    const response = await fetch(`${API_URL}/artworks/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(artworkData),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.error || "Artwork creation failed");
    }

    return result.data.artwork;
}

export async function updateArtwork(id, artworkData) {
  const response = await fetch(`${API_URL}/artworks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(artworkData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Failed to update artwork");
  }

  return result.data.artwork;
}