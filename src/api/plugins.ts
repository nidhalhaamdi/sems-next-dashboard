export const getPluginCount = async (accessToken: string) => {
  const res = await fetch('http://localhost:80/plugin/rest/plugin/count', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) throw new Error('Failed to fetch plugin count');

  const { count } = await res.json();
  return count;
};
