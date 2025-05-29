import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/AdminLayout';
import {
  getUserById,
  updateUserById,
  assignNetworkToUser,
  unassignNetworkFromUser,
  getUserDeviceTypes,
  assignDeviceTypeToUser,
  unassignDeviceTypeFromUser,
  allowAllDeviceTypesForUser,
  disallowAllDeviceTypesForUser,
} from '@/api/users';
import { getAllNetworks } from '@/api/networks';
import { refreshAccessToken } from '@/api/auth';

const UserDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [login, setLogin] = useState('');
  const [role, setRole] = useState('Client');
  const [status, setStatus] = useState('Active');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [data, setData] = useState('{}');
  const [userNetworks, setUserNetworks] = useState<any[]>([]);
  const [allNetworks, setAllNetworks] = useState<any[]>([]);
  const [selectedNetworkId, setSelectedNetworkId] = useState<number>();
  const [allDeviceTypes, setAllDeviceTypes] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;

      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        console.error('Refresh token not found');
        return;
      }

      try {
        const token = await refreshAccessToken(refreshToken);
        const user = await getUserById(Number(id), token);
        setLogin(user.login);
        setRole(user.role === 0 ? 'Admin' : 'Client');
        setStatus(user.status === 0 ? 'Active' : user.status === 1 ? 'Locked' : 'Disabled');
        setData(JSON.stringify(user.data || {}));
        setAllDeviceTypes(user.allDeviceTypesAvailable || false);

        const networks = await fetch(`http://localhost:80/api/rest/user/${id}/network`, {
          headers: { Authorization: `Bearer ${token}` },
        }).then((res) => res.json());

        setUserNetworks(networks);
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          console.error('Refresh token not found');
          return;
        }

        const accessToken = await refreshAccessToken(refreshToken);

        const allNets = await getAllNetworks(accessToken); // <-- correct
        setAllNetworks(allNets);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const refreshToken = sessionStorage.getItem('refreshToken');
    if (!refreshToken) {
      alert('No refresh token. Please log in again.');
      return;
    }
    const token = await refreshAccessToken(refreshToken);

    await updateUserById(Number(id), {
      login,
      role: role === 'Admin' ? 0 : 1,
      status: status === 'Active' ? 0 : status === 'Locked' ? 1 : 2,
      password,
      data: JSON.parse(data),
      introReviewed: true,
    }, token);

    alert('User updated successfully!');
  };

  const handleGrantNetwork = async () => {
    if (!selectedNetworkId) return;
    const refreshToken = sessionStorage.getItem('refreshToken');
    if (!refreshToken) {
      alert('No refresh token. Please log in again.');
      return;
    }
    const token = await refreshAccessToken(refreshToken);
    await assignNetworkToUser(Number(id), selectedNetworkId, token);
    const updated = await fetch(`http://localhost:80/api/rest/user/${id}/network`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => res.json());
    setUserNetworks(updated);
  };

  const handleRevokeNetwork = async (networkId: number) => {
    const refreshToken = sessionStorage.getItem('refreshToken');
    if (!refreshToken) {
      alert('No refresh token. Please log in again.');
      return;
    }
    const token = await refreshAccessToken(refreshToken);
    await unassignNetworkFromUser(Number(id), networkId, token);
    const updated = await fetch(`http://localhost:80/api/rest/user/${id}/network`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => res.json());
    setUserNetworks(updated);
  };

  const handleDeviceTypeToggle = async () => {
    const refreshToken = sessionStorage.getItem('refreshToken');
    if (!refreshToken) {
      alert('No refresh token. Please log in again.');
      return;
    }
    const token = await refreshAccessToken(refreshToken);
    if (!allDeviceTypes) {
      await allowAllDeviceTypesForUser(Number(id), token);
      setAllDeviceTypes(true);
    } else {
      await disallowAllDeviceTypesForUser(Number(id), token);
      setAllDeviceTypes(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">User Info</h2>
        <form onSubmit={handleSave} className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <label className="block mb-1">Login</label>
            <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} className="p-2 border border-gray-300 rounded w-full" />
          </div>
          <div>
            <label className="block mb-1">Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="p-2 border border-gray-300 rounded w-full">
              <option value="Admin">Admin</option>
              <option value="Client">Client</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="p-2 border border-gray-300 rounded w-full">
              <option value="Active">Active</option>
              <option value="Locked">Locked</option>
              <option value="Disabled">Disabled</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="p-2 border border-gray-300 rounded w-full" />
          </div>
          <div>
            <label className="block mb-1">Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="p-2 border border-gray-300 rounded w-full" />
          </div>
          <div>
            <label className="block mb-1">Data (JSON)</label>
            <input type="text" value={data} onChange={(e) => setData(e.target.value)} className="p-2 border border-gray-300 rounded w-full" />
          </div>
          <div className="flex justify-end">
            <button type="button" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 mr-2">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-accent text-white rounded hover:bg-highlight">Save</button>
          </div>
        </form>
      </div>

      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Networks</h2>
        <table className="min-w-full bg-transparent border border-gray-200 mb-4">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Network</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userNetworks.map((network) => (
              <tr key={network.id}>
                <td className="py-2 px-4 border-b text-center">{network.name}</td>
                <td className="py-2 px-4 border-b text-center">{network.description}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button onClick={() => handleRevokeNetwork(network.id)} className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700">
                    Revoke Access
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center mb-4">
          <label className="mr-2">Grant Access to Network:</label>
            <select
              className="p-2 border border-gray-300 rounded"
              onChange={(e) => setSelectedNetworkId(Number(e.target.value))}
              value={selectedNetworkId}
            >
              <option value="">Select network</option>
              {allNetworks.map((network) => (
                <option key={network.id} value={network.id}>
                  {network.name}
                </option>
              ))}
            </select>
          <button onClick={handleGrantNetwork} className="ml-4 px-4 py-2 bg-accent text-white rounded hover:bg-highlight">
            Grant Access
          </button>
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Device Types</h2>
        <div className="flex items-center mb-4">
          <input type="checkbox" id="allDeviceTypes" className="mr-2" checked={allDeviceTypes} onChange={handleDeviceTypeToggle} />
          <label htmlFor="allDeviceTypes">All device types are available to user</label>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserDetails;