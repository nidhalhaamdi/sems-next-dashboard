import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { users } from '@/data/placeholderData';
import AdminLayout from '@/components/AdminLayout';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const filteredUsers = users.filter((user) =>
    user.login.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDetailsClick = (id: number) => {
    router.push(`/admin/users/${id}`);
  };

  const handleAddUserClick = () => {
    router.push('/admin/users/addUser');
  };

  return (
    <AdminLayout>
      <div className="flex justify-between p-4">
        <div className="flex items-center">
          <label className="mr-2">Search By Login:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            placeholder="Enter login name"
          />
        </div>
        <button
          onClick={handleAddUserClick}
          className="px-4 py-2 bg-accent text-white rounded hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-highlight"
        >
          Add New User
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-transparent border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Login</th>
              <th className="py-2 px-4 border-b">Role</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">LastLogin</th>
              <th className="py-2 px-4 border-b">Data</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="py-2 px-4 border-b font-medium text-center">{user.login}</td>
                <td className="py-2 px-4 border-b text-center">{user.role === 0 ? 'Administrator' : 'Client'}</td>
                <td className="py-2 px-4 border-b text-center">
                  {user.status === 0 ? 'Active' : user.status === 1 ? 'Locked' : 'Disabled'}
                </td>
                <td className="py-2 px-4 border-b text-center">{user.lastLogin}</td>
                <td className="py-2 px-4 border-b text-center">{JSON.stringify(user.data)}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    className="px-2 py-1 bg-blue-500 text-white rounded mr-2 hover:bg-blue-700"
                    onClick={() => handleDetailsClick(user.id)}
                  >
                    Details
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

export default Users;