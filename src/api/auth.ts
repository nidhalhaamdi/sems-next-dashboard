export const loginUser = async (login: string, password: string) => {
  const res = await fetch('http://localhost:80/auth/rest/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login, password }),
  });

  if (!res.ok) throw new Error('Invalid credentials');

  return await res.json(); // returns { accessToken, refreshToken }
};

export const refreshAccessToken = async (refreshToken: string) => {
  const res = await fetch('http://localhost:80/auth/rest/token/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) throw new Error('Failed to refresh access token');

  const { accessToken } = await res.json();
  return accessToken;
};
