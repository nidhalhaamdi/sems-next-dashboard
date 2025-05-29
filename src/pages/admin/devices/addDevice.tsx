import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/AdminLayout';
import { createDevice } from '@/api/devices';
import { refreshAccessToken } from '@/api/auth';
import { getAllNetworks } from '@/api/networks';
import { getAllDeviceTypes } from '@/api/deviceTypes';
import { v4 as uuidv4 } from 'uuid';

const AddDevice = () => {
  const [name, setName] = useState('');
  const [network, setNetwork] = useState('');
  const [deviceType, setDeviceType] = useState('');
  const [operation, setOperation] = useState('Operational');
  const [data, setData] = useState('');
  const [networks, setNetworks] = useState<any[]>([]);
  const [deviceTypes, setDeviceTypes] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchOptions = async () => {
      const refreshToken = sessionStorage.getItem('refreshToken');
      if (!refreshToken) return;

      try {
        const accessToken = await refreshAccessToken(refreshToken);
        const [nets, devTypes] = await Promise.all([
          getAllNetworks(accessToken),
          getAllDeviceTypes(accessToken),
        ]);
        setNetworks(nets);
        setDeviceTypes(devTypes);
      } catch (err) {
        console.error('Failed to load options', err);
      }
    };

    fetchOptions();
  }, []);

  const handleCancel = () => {
    router.push('/admin/devices');
  };

  const handleSave = async () => {
    const refreshToken = sessionStorage.getItem('refreshToken');
    if (!refreshToken) return;

    let parsedData: object = {};
    if (data.trim()) {
      try {
        parsedData = JSON.parse(data);
      } catch (err) {
        alert('Invalid JSON in Data field');
        return;
      }
    }

    try {
      const accessToken = await refreshAccessToken(refreshToken);
      const newId = uuidv4();
      await createDevice(accessToken, newId, {
        name,
        data: parsedData,
        networkId: Number(network),
        deviceTypeId: Number(deviceType),
        blocked: operation === 'Blocked',
      });

      // ✅ Redirect after successful creation
      router.push('/admin/devices');
    } catch (err: any) {
      console.error('Failed to create device:', err);
      alert(`Failed to create device: ${err.message}`);
    }
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
              placeholder='Enter data (JSON format), e.g. {"jsonString": "value"}'
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