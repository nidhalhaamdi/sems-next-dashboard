import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/AdminLayout';
import CommandPopup from '@/components/CommandPopup';
import { refreshAccessToken } from '@/api/auth';
import { getDeviceCommands } from '@/api/commands';

const Commands = () => {
  const router = useRouter();
  const { id } = router.query;
  const [commands, setCommands] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const fetchCommands = async () => {
    const refreshToken = sessionStorage.getItem('refreshToken');
    if (!refreshToken || !id) return;

    try {
      const accessToken = await refreshAccessToken(refreshToken);
      const data = await getDeviceCommands(id as string, accessToken);
      setCommands(data);
    } catch (err) {
      console.error('Failed to fetch commands:', err);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCommands();
    }
  }, [id]);

  const handleSendCommand = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <AdminLayout>
      <div className="p-4">
        <div className="flex justify-end mb-4">
          <button
            onClick={handleSendCommand}
            className="px-4 py-2 bg-accent text-white rounded hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-highlight"
          >
            Send Command
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-transparent border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Timestamp</th>
                <th className="py-2 px-4 border-b">Parameters</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Result</th>
              </tr>
            </thead>
            <tbody>
              {commands.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    No commands available.
                  </td>
                </tr>
              ) : (
                commands.map((cmd: any) => (
                  <tr key={cmd.id}>
                    <td className="py-2 px-4 border-b text-center">{cmd.command}</td>
                    <td className="py-2 px-4 border-b text-center">{new Date(cmd.timestamp).toLocaleString()}</td>
                    <td className="py-2 px-4 border-b text-center">{JSON.stringify(cmd.parameters)}</td>
                    <td className="py-2 px-4 border-b text-center">{cmd.status}</td>
                    <td className="py-2 px-4 border-b text-center">{JSON.stringify(cmd.result)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {showPopup && (
          <CommandPopup
            isOpen={showPopup}
            onClose={handleClosePopup}
            onCommandSent={fetchCommands}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default Commands;