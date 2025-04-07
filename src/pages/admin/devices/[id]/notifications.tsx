import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { deviceNotifications } from '@/data/placeholderData';
import AdminLayout from '@/components/AdminLayout';
import NotificationPopup from '@/components/NotificationPopup';

const Notifications = () => {
  const router = useRouter();
  const { id } = router.query;
  const [showPopup, setShowPopup] = useState(false);

  const handleSendNotification = () => {
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
            onClick={handleSendNotification}
            className="px-4 py-2 bg-accent text-white rounded hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-highlight"
          >
            Send Notification
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-transparent border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Timestamp</th>
                <th className="py-2 px-4 border-b">Parameters</th>
              </tr>
            </thead>
            <tbody>
              {deviceNotifications.map((notification) => (
                <tr key={notification.id}>
                  <td className="py-2 px-4 border-b text-center">{notification.notification}</td>
                  <td className="py-2 px-4 border-b text-center">{notification.timestamp}</td>
                  <td className="py-2 px-4 border-b text-center">{JSON.stringify(notification.parameters)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showPopup && <NotificationPopup isOpen={showPopup} onClose={handleClosePopup} />}
      </div>
    </AdminLayout>
  );
};

export default Notifications;