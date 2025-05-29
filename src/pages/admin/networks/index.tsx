import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/AdminLayout';
import { refreshAccessToken } from '@/api/auth';
import { deleteNetworkById, getAllNetworks } from '@/api/networks';

const Networks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [networks, setNetworks] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchNetworks = async () => {
      const refreshToken = sessionStorage.getItem('refreshToken');
      if (!refreshToken) return;
      try {
        const accessToken = await refreshAccessToken(refreshToken);
        const data = await getAllNetworks(accessToken);
        setNetworks(data);
      } catch (err) {
        console.error('Error fetching networks:', err);
      }
    };
    fetchNetworks();
  }, []);

  const handleEditClick = (id: number) => {
    router.push(`/admin/networks/${id}`);
  };

  const handleAddNetworkClick = () => {
    router.push('/admin/networks/addNetwork');
  };

  const handleDeleteClick = async (id: number) => {
    const confirmDelete = confirm('Are you sure you want to delete this network?');
    if (!confirmDelete) return;
    const refreshToken = sessionStorage.getItem('refreshToken');
    if (!refreshToken) return;
    try {
      const accessToken = await refreshAccessToken(refreshToken);
      await deleteNetworkById(id, accessToken);
      setNetworks((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error('Delete network failed:', err);
      alert('Failed to delete network.');
    }
  };

  const filteredNetworks = networks.filter((n: any) =>
    n.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="flex justify-between p-4">
        <div className="flex items-center">
          <label className="mr-2">Search By Name:</label>
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="p-2 border border-gray-300 rounded" placeholder="Enter network name" />
        </div>
        <button onClick={handleAddNetworkClick} className="px-4 py-2 bg-accent text-white rounded hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-highlight">
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
            {filteredNetworks.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-4 px-4 text-center text-gray-500">No networks available.</td>
              </tr>
            ) : (
              filteredNetworks.map((network: any) => (
                <tr key={network.id}>
                  <td className="py-2 px-4 border-b font-medium text-center">{network.name}</td>
                  <td className="py-2 px-4 border-b text-center">{network.description}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <button className="px-2 py-1 bg-blue-500 text-white rounded mr-2 hover:bg-blue-700" onClick={() => handleEditClick(network.id)}>
                      Edit
                    </button>
                    <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700" onClick={() => handleDeleteClick(network.id)}>
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

export default Networks;
