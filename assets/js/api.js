const API_BASE_URL = "https://profile.zlg.gg:1111";

export async function fetchUserProfile(token) {
  const response = await fetch(`${API_BASE_URL}/api/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Session expired');
    }
    throw new Error('Network response was not ok ' + response.statusText);
  }
  return response.json();
}
