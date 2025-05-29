import React, { useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/AdminLayout';
import { refreshAccessToken } from '@/api/auth';
import { createNetwork } from '@/api/networks';

const AddNetwork = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleCancel = () => {
    router.push('/admin/networks');
  };

  const handleSave = async () => {
    const refreshToken = sessionStorage.getItem('refreshToken');
    if (!refreshToken) return;
    try {
      const accessToken = await refreshAccessToken(refreshToken);
      await createNetwork(accessToken, { name, description });
      router.push('/admin/networks');
    } catch (error) {
      console.error('Error creating network:', error);
      alert('Failed to create network');
    }
  };

  return (
    <AdminLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Create New Network</h1>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <label className="block mb-1">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="p-2 border border-gray-300 rounded w-full" placeholder="Enter network name" />
          </div>
          <div>
            <label className="block mb-1">Description</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="p-2 border border-gray-300 rounded w-full" placeholder="Enter network description" />
          </div>
        </div>
        <div className="flex justify-end">
          <button onClick={handleCancel} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 mr-2">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-accent text-white rounded hover:bg-highlight">Save</button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddNetwork;