import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { networks } from '@/data/placeholderData';
import AdminLayout from '@/components/AdminLayout';

const Networks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const filteredNetworks = networks.filter((network) =>
    network.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (id: number) => {
    router.push(`/admin/networks/${id}`);
  };

  const handleAddNetworkClick = () => {
    router.push('/admin/networks/addNetwork');
  };

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
            placeholder="Enter network name"
          />
        </div>
        <button
          onClick={handleAddNetworkClick} 
          className="px-4 py-2 bg-accent text-white rounded hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-highlight"
        >
          Add New Network
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
            {filteredNetworks.map((network) => (
              <tr key={network.id}>
                <td className="py-2 px-4 border-b font-medium text-center">{network.name}</td>
                <td className="py-2 px-4 border-b text-center">{network.description}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button className="px-2 py-1 bg-blue-500 text-white rounded mr-2 hover:bg-blue-700" onClick={() => handleEditClick(network.id)}>
                    Edit
                  </button>
                  <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Networks;
