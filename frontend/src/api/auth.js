const API_URL = import.meta.env.VITE_API_URL;

// For registering users
// POST /auth/register
export async function register(formData) {

    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.error || "Registration failed");
    }

    return result.data.user;
}

// For users logging in
// POST /auth/login
export async function login(formData) {

    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.error || "Login failed");
    }

    return result.data.user;
}

// For getting user
// GET /auth/me
export async function getCurrentUser() {
    const response = await fetch(`${API_URL}/auth/me`, {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        return null;
    }

    const result = await response.json();

    return result.data.user;
}

// For logging out user (duh)
// POST /auth/logout
export async function logout() {
    const response = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
    })

    if (!response.ok) {
        throw new Error("Logout failed");
    }
}