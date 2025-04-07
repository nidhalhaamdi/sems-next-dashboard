import React from 'react';
import { useRouter } from 'next/router';
import { devices, networks, deviceTypes } from '@/data/placeholderData';
import AdminLayout from '@/components/AdminLayout';

const Devices = () => {
  const router = useRouter();

  const handleDetailsClick = (id: string) => {
    router.push(`/admin/devices/${id}`);
  };

  const handleAddDeviceClick = () => {
    router.push('/admin/devices/addDevice');
  }

  return (
    <AdminLayout>
      <div className="flex justify-between p-4">
        <div className="flex items-center">
          <label className="mr-2">Search By Name:</label>
          <input
            type="text"
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
              <th className="py-2 px-4 border-b">DeviceType</th>
              <th className="py-2 px-4 border-b">Operation</th>
              <th className="py-2 px-4 border-b">Data</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device) => {
              const network = networks.find((n) => n.id === device.networkId);
              const deviceType = deviceTypes.find((dt) => dt.id === device.deviceTypeId);

              return (
                <tr key={device.id}>
                  <td className="py-2 px-4 border-b font-medium text-center">{device.name}</td>
                  <td className="py-2 px-4 border-b text-center">{network ? network.name : 'Unknown Network'}</td>
                  <td className="py-2 px-4 border-b text-center">{deviceType ? deviceType.name : 'Unknown DeviceType'}</td>
                  <td className="py-2 px-4 border-b text-center">{device.blocked ? 'Blocked' : 'Operational'}</td>
                  <td className="py-2 px-4 border-b text-center">{JSON.stringify(device.data)}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <button className="px-2 py-1 bg-blue-500 text-white rounded mr-2 hover:bg-blue-700" onClick={() => handleDetailsClick(device.id)}>
                      Details
                    </button>
                    <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700">Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Devices;