const BASE_URL = 'http://localhost:80/api/rest';

export const getDeviceNotifications = async (
  deviceId: string,
  accessToken: string,
  take = 100
) => {
  const res = await fetch(`${BASE_URL}/device/${deviceId}/notification?sortField=timestamp&take=${take}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to fetch notifications: ${errorText}`);
  }

  return await res.json();
};

export const createNotification = async (
  deviceId: string,
  accessToken: string,
  body: {
    notification: string;
    timestamp: string;
    parameters: object;
  }
) => {
  const res = await fetch(`${BASE_URL}/device/${deviceId}/notification`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to send notification: ${text}`);
  }

  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return await res.json();
  }

  return null;
};