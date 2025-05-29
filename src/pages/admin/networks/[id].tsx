import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/AdminLayout';
import { refreshAccessToken } from '@/api/auth';
import { getNetworkById, updateNetwork } from '@/api/networks';

const NetworkDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchNetwork = async () => {
      const refreshToken = sessionStorage.getItem('refreshToken');
      if (!refreshToken || !id) return;

      try {
        const accessToken = await refreshAccessToken(refreshToken);
        const network = await getNetworkById(Number(id), accessToken);
        setName(network.name);
        setDescription(network.description);
      } catch (error) {
        console.error('Error loading network:', error);
      }
    };

    fetchNetwork();
  }, [id]);

  const handleCancel = () => {
    router.push('/admin/networks');
  };

  const handleSave = async () => {
    const refreshToken = sessionStorage.getItem('refreshToken');
    if (!refreshToken || !id) return;

    try {
      const accessToken = await refreshAccessToken(refreshToken);
      await updateNetwork(Number(id), accessToken, { name, description });
      alert('Network updated successfully!');
      router.push('/admin/networks');
    } catch (error) {
      console.error('Failed to update network:', error);
      alert('Update failed.');
    }
  };

  return (
    <AdminLayout>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Edit Network Info</h2>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
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

export default NetworkDetails;
