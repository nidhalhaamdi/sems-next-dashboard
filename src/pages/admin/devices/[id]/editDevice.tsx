import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { devices, networks, deviceTypes } from '@/data/placeholderData';
import AdminLayout from '@/components/AdminLayout';

const EditDevice = () => {
  const router = useRouter();
  const { id } = router.query;
  const device = devices.find((d) => d.id === parseInt(id as string, 10));

  const [name, setName] = useState(device?.name || '');
  const [network, setNetwork] = useState(device?.networkId || '');
  const [deviceType, setDeviceType] = useState(device?.deviceTypeId || '');
  const [operation, setOperation] = useState(device?.blocked || 'Operational');
  const [data, setData] = useState(JSON.stringify(device?.data || ''));

  return (
    <AdminLayout>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Device Info</h2>
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
    </AdminLayout>
  );
};

export default EditDevice;