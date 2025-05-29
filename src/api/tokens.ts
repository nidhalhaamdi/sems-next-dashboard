// src/api/tokens.ts

const BASE_URL = 'http://localhost:80/auth/rest'; // Make sure this is accessible

export interface TokenPayload {
  networkIds: string[];
  deviceTypeIds: string[];
  expiration: string;
  refreshExpiration: string;
}

export const createToken = async (
  payload: TokenPayload,
  accessToken: string
) => {
  const res = await fetch(`${BASE_URL}/token/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to create token: ${res.status} - ${error}`);
  }

  return await res.json(); // { accessToken, refreshToken }
};

export const getAllTokens = async (accessToken: string) => {
  const res = await fetch(`${BASE_URL}/token`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to get tokens: ${res.status} - ${error}`);
  }

  return await res.json(); // depends on your backend's response shape
};

// src/api/tokens.ts

export const getApiInfo = async () => {
  const res = await fetch('http://localhost:80/auth/rest/info', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch API info: ${res.status}`);
  }

  return await res.json(); // { apiVersion, serverTimestamp, webSocketServerUrl }
};
