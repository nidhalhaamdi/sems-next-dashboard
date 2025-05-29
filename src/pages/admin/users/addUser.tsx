import React, { useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/AdminLayout';
import { refreshAccessToken } from '@/api/auth';
import { createUser } from '@/api/users';

const AddUser = () => {
  const [login, setLogin] = useState('');
  const [role, setRole] = useState('Admin');
  const [status, setStatus] = useState('Active');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [data, setData] = useState('');
  const router = useRouter();

  const handleCancel = () => {
    router.push('/admin/users');
  };

  const handleSave = async () => {
    if (!login || !password) {
      alert('Login and password are required.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    const refreshToken = sessionStorage.getItem('refreshToken');
    if (!refreshToken) {
      alert('No refresh token. Please log in again.');
      return;
    }

    try {
      const accessToken = await refreshAccessToken(refreshToken);

      const userPayload = {
        login,
        role: role === 'Admin' ? 0 : 1,
        status: status === 'Active' ? 0 : status === 'Locked' ? 1 : 2,
        password,
        data: {
          jsonString: data,
        },
        introReviewed: true,
      };

      await createUser(userPayload, accessToken);
      router.push('/admin/users');
    } catch (err) {
      console.error(err);
      alert('Failed to create user.');
    }
  };

  return (
    <AdminLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Create New User</h1>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <label className="block mb-1">Login</label>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
              placeholder="Enter login name"
            />
          </div>
          <div>
            <label className="block mb-1">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
            >
              <option value="Admin">Administrator</option>
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
              placeholder="Enter password"
            />
          </div>
          <div>
            <label className="block mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
              placeholder="Confirm password"
            />
          </div>
          <div>
            <label className="block mb-1">Data</label>
            <input
              type="text"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
              placeholder="Enter data"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-accent text-white rounded hover:bg-highlight"
          >
            Save
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddUser;
