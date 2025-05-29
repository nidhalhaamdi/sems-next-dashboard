const BASE_URL = 'http://localhost:80/api/rest';

export const getDeviceCommands = async (deviceId: string, accessToken: string) => {
  const res = await fetch(`${BASE_URL}/device/${deviceId}/command?sortField=timestamp&take=100`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) throw new Error('Failed to fetch device commands');
  return await res.json();
};

export const sendCommandToDevice = async (
  deviceId: string,
  accessToken: string,
  command: {
    command: string;
    timestamp: string;
    parameters: object;
    lifetime: number;
    status: string;
    result: object;
  }
) => {
  const res = await fetch(`${BASE_URL}/device/${deviceId}/command`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify(command),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to send command: ${text}`);
  }

  return await res.json();
};
