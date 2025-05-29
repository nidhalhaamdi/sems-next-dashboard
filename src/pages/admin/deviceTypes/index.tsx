import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/AdminLayout';
import { refreshAccessToken } from '@/api/auth';
import { deleteDeviceTypeById, getAllDeviceTypes } from '@/api/deviceTypes';

type DeviceType = {
  id: number;
  name: string;
  description: string;
};

const DeviceTypes = () => {
  const [deviceTypes, setDeviceTypes] = useState<DeviceType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const refreshToken = sessionStorage.getItem('refreshToken');
      if (!refreshToken) return;
      try {
        const accessToken = await refreshAccessToken(refreshToken);
        const data = await getAllDeviceTypes(accessToken);
        setDeviceTypes(data);
      } catch (error) {
        console.error('Error fetching device types:', error);
      }
    };
    fetchData();
  }, []);

  const handleEditClick = (id: number) => {
    router.push(`/admin/deviceTypes/${id}`);
  };

  const handleAddClick = () => {
    router.push('/admin/deviceTypes/addDeviceType');
  };

  const handleDeleteClick = async (id: number) => {
    const confirmDelete = confirm('Are you sure you want to delete this device type?');
    if (!confirmDelete) return;

    const refreshToken = sessionStorage.getItem('refreshToken');
    if (!refreshToken) return;

    try {
      const accessToken = await refreshAccessToken(refreshToken);
      await deleteDeviceTypeById(id, accessToken);
      setDeviceTypes((prev) => prev.filter((dt) => dt.id !== id));
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const filtered = deviceTypes.filter((dt) =>
    dt.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="flex justify-between p-4">
        <div className="flex items-center">
          <label className="mr-2">Search By Name:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            placeholder="Enter device type name"
          />
        </div>
        <button
          onClick={handleAddClick}
          className="px-4 py-2 bg-accent text-white rounded hover:bg-highlight"
        >
          Add New Device Type
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-transparent border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-4 px-4 text-center text-gray-500">
                  No device types found.
                </td>
              </tr>
            ) : (
              filtered.map((dt) => (
                <tr key={dt.id}>
                  <td className="py-2 px-4 border-b text-center">{dt.name}</td>
                  <td className="py-2 px-4 border-b text-center">{dt.description}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      onClick={() => handleEditClick(dt.id)}
                      className="mr-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(dt.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default DeviceTypes;
