const BASE_URL = 'http://localhost:80/api/rest';

export const getNetworkCount = async (accessToken: string) => {
  const res = await fetch(`${BASE_URL}/network/count`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch network count');
  const { count } = await res.json();
  return count;
};

export const deleteNetworkById = async (id: number, accessToken: string) => {
  const res = await fetch(`${BASE_URL}/network/${id}?force=true`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw new Error(`Failed to delete network with id ${id}`);
};

export const getNetworkById = async (id: number, accessToken: string) => {
  const res = await fetch(`${BASE_URL}/network/${id}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw new Error(`Failed to fetch network with id ${id}`);
  return await res.json();
};

export const getAllNetworks = async (accessToken: string) => {
  const res = await fetch('http://localhost:80/api/rest/network', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch networks');
  return await res.json();
};


export const createNetwork = async (
  accessToken: string,
  network: { name: string; description: string }
) => {
  const res = await fetch(`${BASE_URL}/network`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify(network),
  });
  if (!res.ok) throw new Error('Failed to create network');
  return await res.json();
};

export const updateNetwork = async (
  id: number,
  accessToken: string,
  network: { name: string; description: string }
) => {
  const res = await fetch(`${BASE_URL}/network/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify(network),
  });
  if (!res.ok) throw new Error(`Failed to update network with id ${id}`);
};
