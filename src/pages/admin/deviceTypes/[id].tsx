import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/AdminLayout';
import { refreshAccessToken } from '@/api/auth';
import { getDeviceTypeById, updateDeviceType } from '@/api/deviceTypes';

const DeviceTypeDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchDeviceType = async () => {
      const refreshToken = sessionStorage.getItem('refreshToken');
      if (!refreshToken || !id) return;
      const accessToken = await refreshAccessToken(refreshToken);
      const deviceType = await getDeviceTypeById(Number(id), accessToken);
      setName(deviceType.name);
      setDescription(deviceType.description);
    };
    fetchDeviceType();
  }, [id]);

  const handleCancel = () => {
    router.push('/admin/deviceTypes');
  };

  const handleSave = async () => {
    const refreshToken = sessionStorage.getItem('refreshToken');
    if (!refreshToken || !id) return;
    try {
      const accessToken = await refreshAccessToken(refreshToken);
      await updateDeviceType(Number(id), accessToken, { name, description });
      alert('Device type updated successfully!');
      router.push('/admin/deviceTypes');
    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update device type');
    }
  };

  return (
    <AdminLayout>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Device Type Info</h2>
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
          <button onClick={handleCancel} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 mr-2">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-accent text-white rounded hover:bg-highlight">
            Save
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DeviceTypeDetails;
