// src/lib/api.ts

export const BASE_URL = "https://api.spotlesscare.com.ng";

export const api = async (endpoint: string, options?: RequestInit) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  });

  const data = await response.json();

  // ✅ HANDLE UNAUTHORIZED
  if (response.status === 401 || data?.detail === "No access token") {
    // clear storage if needed
    localStorage.removeItem("user_email");

    // redirect to login
    window.location.href = "/login";

    throw new Error("Unauthorized");
  }

  // ✅ HANDLE OTHER ERRORS
  if (!response.ok) {
    throw data;
    //throw new Error(data.message || data.detail || "Something went wrong");
  }

  return data;
};
