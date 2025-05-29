const BASE_URL = 'http://localhost:80/api/rest';

export const getDeviceCount = async (accessToken: string) => {
  const res = await fetch(`${BASE_URL}/device/count`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch device count');
  const { count } = await res.json();
  return count;
};

export const getAllDevices = async (accessToken: string) => {
  const res = await fetch(`${BASE_URL}/device`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch devices');
  return await res.json();
};

export const createDevice = async (
  accessToken: string,
  id: string,
  device: {
    name: string;
    data: object;
    networkId: number;
    deviceTypeId: number;
    blocked: boolean;
  }
) => {
  const res = await fetch(`http://localhost:80/api/rest/device/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(device),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to create device: ${errorText}`);
  }

  // ✅ Final bulletproof fix for empty response
  if (res.status === 204 || res.headers.get('content-length') === '0') {
    return null;
  }

  const contentType = res.headers.get('content-type');
  if (contentType?.includes('application/json')) {
    return await res.json();
  }

  return null;
};

export const getDeviceById = async (id: string, accessToken: string) => {
  const res = await fetch(`${BASE_URL}/device/${id}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw new Error(`Failed to fetch device with id ${id}`);
  return await res.json();
};

export const updateDevice = async (
  id: string,
  accessToken: string,
  device: {
    name: string;
    data: object;
    networkId: number;
    deviceTypeId: number;
    blocked: boolean;
  }
) => {
  const res = await fetch(`http://localhost:80/api/rest/device/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(device),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to update device: ${text}`);
  }

  const contentType = res.headers.get('content-type');
  if (res.status === 204 || res.headers.get('content-length') === '0') return null;

  if (contentType && contentType.includes('application/json')) {
    return await res.json();
  }

  return null;
};


export const deleteDeviceById = async (id: string, accessToken: string) => {
  const res = await fetch(`${BASE_URL}/device/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw new Error(`Failed to delete device with id ${id}`);
};