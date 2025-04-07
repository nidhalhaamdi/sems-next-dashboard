import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { deviceTypes } from '@/data/placeholderData';
import AdminLayout from '@/components/AdminLayout';

const DeviceTypeDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const deviceType = deviceTypes.find((dt) => dt.id === parseInt(id as string));

  const [name, setName] = useState(deviceType?.name || '');
  const [description, setDescription] = useState(deviceType?.description || '');

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
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 mr-2">Cancel</button>
          <button className="px-4 py-2 bg-accent text-white rounded hover:bg-highlight">Save</button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DeviceTypeDetails;