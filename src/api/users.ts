const BASE_URL = 'http://localhost:80/api/rest';

export const getUserCount = async (accessToken: string) => {
  const res = await fetch(`${BASE_URL}/user/count`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch user count');
  const { count } = await res.json();
  return count;
};

export const getAllUsers = async (accessToken: string) => {
  const res = await fetch(`${BASE_URL}/user?take=100`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch users');
  return await res.json();
};

export const deleteUserById = async (id: number, accessToken: string) => {
  const res = await fetch(`${BASE_URL}/user/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw new Error('Failed to delete user');
};

export const createUser = async (userData: any, accessToken: string) => {
  const res = await fetch(`${BASE_URL}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify(userData),
  });
  if (!res.ok) throw new Error('Failed to create user');
  return await res.json();
};

export const getUserById = async (id: number, accessToken: string) => {
  const res = await fetch(`${BASE_URL}/user/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw new Error('Failed to get user');
  return await res.json();
};

export const updateUserById = async (id: number, userData: any, accessToken: string) => {
  const res = await fetch(`${BASE_URL}/user/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify(userData),
  });
  if (!res.ok) throw new Error('Failed to update user');
};

export const assignNetworkToUser = async (userId: number, networkId: number, accessToken: string) => {
  const res = await fetch(`${BASE_URL}/user/${userId}/network/${networkId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw new Error('Failed to assign network');
};

export const unassignNetworkFromUser = async (userId: number, networkId: number, accessToken: string) => {
  const res = await fetch(`${BASE_URL}/user/${userId}/network/${networkId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw new Error('Failed to unassign network');
};

export const getUserDeviceTypes = async (id: number, accessToken: string) => {
  const res = await fetch(`${BASE_URL}/user/${id}/devicetype`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch user device types');
  return await res.json();
};

export const assignDeviceTypeToUser = async (userId: number, deviceTypeId: number, accessToken: string) => {
  const res = await fetch(`${BASE_URL}/user/${userId}/devicetype/${deviceTypeId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw new Error('Failed to assign device type');
};

export const unassignDeviceTypeFromUser = async (userId: number, deviceTypeId: number, accessToken: string) => {
  const res = await fetch(`${BASE_URL}/user/${userId}/devicetype/${deviceTypeId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw new Error('Failed to unassign device type');
};

export const allowAllDeviceTypesForUser = async (userId: number, accessToken: string) => {
  const res = await fetch(`${BASE_URL}/user/${userId}/devicetype/all`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw new Error('Failed to allow all device types');
};

export const disallowAllDeviceTypesForUser = async (userId: number, accessToken: string) => {
  const res = await fetch(`${BASE_URL}/user/${userId}/devicetype/all`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw new Error('Failed to disallow all device types');
};
