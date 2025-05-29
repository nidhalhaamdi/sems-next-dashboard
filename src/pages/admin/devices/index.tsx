import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/AdminLayout';
import { refreshAccessToken } from '@/api/auth';
import { getAllDevices, deleteDeviceById } from '@/api/devices';
import { getAllNetworks } from '@/api/networks';
import { getAllDeviceTypes } from '@/api/deviceTypes';

const Devices = () => {
  const router = useRouter();
  const [devices, setDevices] = useState<any[]>([]);
  const [networks, setNetworks] = useState<any[]>([]);
  const [deviceTypes, setDeviceTypes] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const refreshToken = sessionStorage.getItem('refreshToken');
      if (!refreshToken) return;

      try {
        const accessToken = await refreshAccessToken(refreshToken);
        const [deviceList, networkList, deviceTypeList] = await Promise.all([
          getAllDevices(accessToken),
          getAllNetworks(accessToken),
          getAllDeviceTypes(accessToken),
        ]);
        setDevices(deviceList);
        setNetworks(networkList);
        setDeviceTypes(deviceTypeList);
      } catch (err) {
        console.error('Error fetching devices:', err);
      }
    };

    fetchData();
  }, []);

  const handleDetailsClick = (id: string) => {
    router.push(`/admin/devices/${id}`);
  };

  const handleAddDeviceClick = () => {
    router.push('/admin/devices/addDevice');
  };

  const handleDeleteClick = async (id: string) => {
    const confirmDelete = confirm('Are you sure you want to delete this device?');
    if (!confirmDelete) return;

    const refreshToken = sessionStorage.getItem('refreshToken');
    if (!refreshToken) return;

    try {
      const accessToken = await refreshAccessToken(refreshToken);
      await deleteDeviceById(id, accessToken);
      setDevices((prev) => prev.filter((device: any) => device.id !== id));
    } catch (err) {
      console.error('Delete device failed:', err);
      alert('Failed to delete device.');
    }
  };

  const filteredDevices = devices.filter((device) =>
    device.name.toLowerCase().includes(searchTerm.toLowerCase())
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
            placeholder="Enter device name"
          />
        </div>
        <button
          onClick={handleAddDeviceClick}
          className="px-4 py-2 bg-accent text-white rounded hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-highlight"
        >
          Add New Device
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-transparent border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Network</th>
              <th className="py-2 px-4 border-b">Device Type</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Data</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDevices.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-4 px-4 text-center text-gray-500">
                  No devices available.
                </td>
              </tr>
            ) : (
              filteredDevices.map((device) => {
                const network = networks.find((n) => n.id === device.networkId);
                const deviceType = deviceTypes.find((dt) => dt.id === device.deviceTypeId);

                return (
                  <tr key={device.id}>
                    <td className="py-2 px-4 border-b font-medium text-center">{device.name}</td>
                    <td className="py-2 px-4 border-b text-center">{network?.name || 'Unknown'}</td>
                    <td className="py-2 px-4 border-b text-center">{deviceType?.name || 'Unknown'}</td>
                    <td className="py-2 px-4 border-b text-center">
                      {device.blocked ? 'Blocked' : 'Operational'}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {device.data ? JSON.stringify(device.data) : 'N/A'}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      <button
                        className="px-2 py-1 bg-blue-500 text-white rounded mr-2 hover:bg-blue-700"
                        onClick={() => handleDetailsClick(device.id)}
                      >
                        Details
                      </button>
                      <button
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                        onClick={() => handleDeleteClick(device.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Devices;