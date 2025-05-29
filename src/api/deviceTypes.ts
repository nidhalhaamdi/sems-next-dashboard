const BASE_URL = 'http://localhost:80/api/rest';

export const getDeviceTypeCount = async (accessToken: string) => {
  const res = await fetch(`${BASE_URL}/devicetype/count`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch device type count');
  const { count } = await res.json();
  return count;
};

export const getAllDeviceTypes = async (accessToken: string) => {
  const res = await fetch('http://localhost:80/api/rest/devicetype', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch device types');
  return await res.json();
};

export const getDeviceTypeById = async (id: number, accessToken: string) => {
  const res = await fetch(`${BASE_URL}/devicetype/${id}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw new Error(`Failed to fetch device type with id ${id}`);
  return await res.json();
};

export const createDeviceType = async (
  accessToken: string,
  deviceType: { name: string; description: string }
) => {
  const res = await fetch(`${BASE_URL}/devicetype`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify(deviceType),
  });
  if (!res.ok) throw new Error('Failed to create device type');
  return await res.json();
};

export const updateDeviceType = async (
  id: number,
  accessToken: string,
  deviceType: { name: string; description: string }
) => {
  const res = await fetch(`${BASE_URL}/devicetype/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify(deviceType),
  });
  if (!res.ok) throw new Error(`Failed to update device type with id ${id}`);
};

export const deleteDeviceTypeById = async (id: number, accessToken: string) => {
  const res = await fetch(`${BASE_URL}/devicetype/${id}?force=true`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw new Error(`Failed to delete device type with id ${id}`);
};