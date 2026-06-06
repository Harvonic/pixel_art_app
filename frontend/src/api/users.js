const API_URL = import.meta.env.VITE_API_URL;

export async function getUserProfile(username) {

    const encodedUsername = encodeURIComponent(username);

    const response = await fetch(`${API_URL}/users/${encodedUsername}`, {
        method: "GET",
        credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.error || "Failed to load profile");
    }

    return result.data;
    
}