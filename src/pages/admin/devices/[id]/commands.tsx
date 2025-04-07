import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { deviceCommands } from '@/data/placeholderData';
import AdminLayout from '@/components/AdminLayout';
import CommandPopup from '@/components/CommandPopup';

const Commands = () => {
  const router = useRouter();
  const { id } = router.query;
  const [showPopup, setShowPopup] = useState(false);

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
              {deviceCommands.map((command) => (
                <tr key={command.id}>
                  <td className="py-2 px-4 border-b text-center">{command.command}</td>
                  <td className="py-2 px-4 border-b text-center">{command.timestamp}</td>
                  <td className="py-2 px-4 border-b text-center">{JSON.stringify(command.parameters)}</td>
                  <td className="py-2 px-4 border-b text-center">{command.status}</td>
                  <td className="py-2 px-4 border-b text-center">{JSON.stringify(command.result)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showPopup && <CommandPopup isOpen={showPopup} onClose={handleClosePopup} />}
      </div>
    </AdminLayout>
  );
};

export default Commands;