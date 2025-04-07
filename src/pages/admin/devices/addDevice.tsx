import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { networks, deviceTypes } from '@/data/placeholderData';
import AdminLayout from '@/components/AdminLayout';

const AddDevice = () => {
  const [name, setName] = useState('');
  const [network, setNetwork] = useState('');
  const [deviceType, setDeviceType] = useState('');
  const [operation, setOperation] = useState('Operational');
  const [data, setData] = useState('');
  const router = useRouter();

  const handleCancel = () => {
    router.push('/admin/devices');
  };

  const handleSave = () => {
    // Add functionality to save the new device
    console.log('Device saved');
  };

  return (
    <AdminLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Create New Device</h1>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
              placeholder="Enter device name"
            />
          </div>
          <div>
            <label className="block mb-1">Network</label>
            <select
              value={network}
              onChange={(e) => setNetwork(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
            >
              <option value="">Select Network</option>
              {networks.map((net) => (
                <option key={net.id} value={net.id}>
                  {net.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1">Device Type</label>
            <select
              value={deviceType}
              onChange={(e) => setDeviceType(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
            >
              <option value="">Select Device Type</option>
              {deviceTypes.map((dt) => (
                <option key={dt.id} value={dt.id}>
                  {dt.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1">Operation</label>
            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
            >
              <option value="Operational">Operational</option>
              <option value="Blocked">Blocked</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Data</label>
            <textarea
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
              placeholder="Enter data (JSON format)"
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

export default AddDevice;