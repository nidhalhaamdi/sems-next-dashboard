import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { users, networks } from '@/data/placeholderData';
import AdminLayout from '@/components/AdminLayout';

const UserDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const user = users.find((u) => u.id === parseInt(id as string));

  const [login, setLogin] = useState(user?.login || '');
  const [role, setRole] = useState(user?.role === 0 ? 'Admin' : 'Client');
  const [status, setStatus] = useState(user?.status === 0 ? 'Active' : user?.status === 1 ? 'Locked' : 'Disabled');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [data, setData] = useState(JSON.stringify(user?.data));

  return (
    <AdminLayout>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">User Info</h2>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <label className="block mb-1">Login</label>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
            >
              <option value="Admin">Admin</option>
              <option value="Client">Client</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
            >
              <option value="Active">Active</option>
              <option value="Locked">Locked</option>
              <option value="Disabled">Disabled</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Data</label>
            <input
              type="text"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 mr-2">Cancel</button>
          <button className="px-4 py-2 bg-accent text-white rounded hover:bg-highlight">Save</button>
        </div>
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
            {networks.slice(0, 2).map((network) => (
              <tr key={network.id}>
                <td className="py-2 px-4 border-b font-medium text-center">{network.name}</td>
                <td className="py-2 px-4 border-b text-center">{network.description}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700">Revoke Access</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center mb-4">
          <label className="mr-2">Grant Access to Network:</label>
          <select className="p-2 border border-gray-300 rounded">
            {networks.map((network) => (
              <option key={network.id} value={network.id}>
                {network.name}
              </option>
            ))}
          </select>
          <button className="ml-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700">Clear</button>
          <button className="ml-2 px-4 py-2 bg-accent text-white rounded hover:bg-highlight">Grant Access</button>
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Device Types</h2>
        <div className="flex items-center mb-4">
          <input type="checkbox" id="allDeviceTypes" className="mr-2" />
          <label htmlFor="allDeviceTypes">All device types are available to user</label>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserDetails;