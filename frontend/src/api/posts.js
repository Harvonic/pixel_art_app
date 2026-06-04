const API_URL = import.meta.env.VITE_API_URL;

export async function createPost({ artworkId, caption }) {

    const postData = {
        artworkId,
        caption,
    };

    const response = await fetch(`${API_URL}/posts/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(postData),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.error || "Post creation failed");
    }

    return result.data.post;

}

export async function getUserPosts() {
  const response = await fetch(`${API_URL}/posts/me`, {
    method: "GET",
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Failed to load posts");
  }

  return result.data.posts;
}