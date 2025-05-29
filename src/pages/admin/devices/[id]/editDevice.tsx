import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/AdminLayout';
import { getAllNetworks } from '@/api/networks';
import { getAllDeviceTypes } from '@/api/deviceTypes';
import { updateDevice, getDeviceById } from '@/api/devices';
import { refreshAccessToken } from '@/api/auth';

const EditDevice = () => {
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState('');
  const [networkId, setNetworkId] = useState('');
  const [deviceTypeId, setDeviceTypeId] = useState('');
  const [operation, setOperation] = useState('Operational');
  const [data, setData] = useState('');
  const [networks, setNetworks] = useState([]);
  const [deviceTypes, setDeviceTypes] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    const refreshToken = sessionStorage.getItem('refreshToken');
    if (!refreshToken) return;

    try {
      const token = await refreshAccessToken(refreshToken);
      const [device, networksRes, deviceTypesRes] = await Promise.all([
        getDeviceById(id as string, token),
        getAllNetworks(token),
        getAllDeviceTypes(token),
      ]);
      setName(device.name);
      setNetworkId(device.networkId);
      setDeviceTypeId(device.deviceTypeId);
      setOperation(device.blocked ? 'Blocked' : 'Operational');
      setData(device.data ? JSON.stringify(device.data) : '');
      setNetworks(networksRes);
      setDeviceTypes(deviceTypesRes);
    } catch (err) {
      console.error('Failed to fetch device:', err);
    }
  };
  if (id) fetchData();
}, [id]);


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
    await updateDevice(id as string, accessToken, {
      name,
      data: parsedData,
      networkId: parseInt(networkId),
      deviceTypeId: parseInt(deviceTypeId),
      blocked: operation === 'Blocked',
    });
    router.push('/admin/devices');
  } catch (err: any) {
    console.error('Failed to update device:', err);
    alert(`Failed to update device: ${err.message}`);
  }
};

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
              value={networkId}
              onChange={(e) => setNetworkId(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
            >
              <option value="">Select Network</option>
              {networks.map((net: any) => (
                <option key={net.id} value={net.id}>{net.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1">Device Type</label>
            <select
              value={deviceTypeId}
              onChange={(e) => setDeviceTypeId(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
            >
              <option value="">Select Device Type</option>
              {deviceTypes.map((dt: any) => (
                <option key={dt.id} value={dt.id}>{dt.name}</option>
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
          <button
            onClick={() => router.push('/admin/devices')}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 mr-2"
          >Cancel</button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-accent text-white rounded hover:bg-highlight"
          >Save</button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditDevice;