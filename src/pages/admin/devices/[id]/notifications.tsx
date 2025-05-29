import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/AdminLayout';
import NotificationPopup from '@/components/NotificationPopup';
import { refreshAccessToken } from '@/api/auth';
import { getDeviceNotifications } from '@/api/notifications';

const Notifications = () => {
  const router = useRouter();
  const { id } = router.query;
  const [notifications, setNotifications] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      const refreshToken = sessionStorage.getItem('refreshToken');
      if (!refreshToken || !id) return;

      try {
        const accessToken = await refreshAccessToken(refreshToken);
        const data = await getDeviceNotifications(id as string, accessToken);
        setNotifications(data);
      } catch (err) {
        console.error('Failed to fetch notifications:', err);
      }
    };

    fetchNotifications();
  }, [id, showPopup]);

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
              {notifications.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center text-gray-500 py-4">
                    No notifications available.
                  </td>
                </tr>
              ) : (
                notifications.map((notification: any) => (
                  <tr key={notification.id}>
                    <td className="py-2 px-4 border-b text-center">{notification.notification}</td>
                    <td className="py-2 px-4 border-b text-center">
                      {new Date(notification.timestamp).toLocaleString()}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {JSON.stringify(notification.parameters)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {showPopup && id && (
          <NotificationPopup
            isOpen={showPopup}
            onClose={handleClosePopup}
            deviceId={id as string}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default Notifications;