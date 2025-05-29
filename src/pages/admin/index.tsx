import React, { useEffect, useState } from 'react';
import withAuth from '../../components/withAuth';
import AdminLayout from '../../components/AdminLayout';
import {
  UsersIcon,
  CpuChipIcon,
  BuildingOfficeIcon,
  DeviceTabletIcon,
  PuzzlePieceIcon,
} from "@heroicons/react/24/solid";
import { refreshAccessToken } from '../../api/auth';
import { getUserCount } from '../../api/users';
import { getNetworkCount } from '../../api/networks';
import { getDeviceCount } from '../../api/devices';
import { getDeviceTypeCount } from '../../api/deviceTypes';
import { getPluginCount } from '../../api/plugins';

const AdminDashboard = () => {
  const [counts, setCounts] = useState({
    users: null,
    networks: null,
    devices: null,
    deviceTypes: null,
    plugins: null,
  });

  const handleBoxClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const route = e.currentTarget.getAttribute('data-route');
    if (route) window.location.href = route;
  };

  useEffect(() => {
    const fetchAllCounts = async () => {
      const refreshToken = sessionStorage.getItem('refreshToken');
      if (!refreshToken) return;

      try {
        const accessToken = await refreshAccessToken(refreshToken);

        const [
          users,
          networks,
          devices,
          deviceTypes,
          plugins,
        ] = await Promise.all([
          getUserCount(accessToken),
          getNetworkCount(accessToken),
          getDeviceCount(accessToken),
          getDeviceTypeCount(accessToken),
          getPluginCount(accessToken),
        ]);

        setCounts({ users, networks, devices, deviceTypes, plugins });
      } catch (err) {
        console.error('Error fetching dashboard counts:', err);
      }
    };

    fetchAllCounts();
  }, []);

  return (
    <AdminLayout>
      <div className="flex flex-col items-center justify-center space-y-10 mt-5 mb-10">
        <div className="flex flex-row w-full max-w-[90%] space-x-12">
          <Card label="Users" icon={<UsersIcon className="h-16 w-16 mb-4" />} count={counts.users} route="/admin/users" onClick={handleBoxClick} />
          <Card label="Networks" icon={<BuildingOfficeIcon className="h-16 w-16 mb-4" />} count={counts.networks} route="/admin/networks" onClick={handleBoxClick} />
        </div>
        <div className="flex flex-row w-full max-w-[90%] space-x-12">
          <Card label="Devices" icon={<CpuChipIcon className="h-16 w-16 mb-4" />} count={counts.devices} route="/admin/devices" onClick={handleBoxClick} />
          <Card label="Device Types" icon={<DeviceTabletIcon className="h-16 w-16 mb-4" />} count={counts.deviceTypes} route="/admin/device-types" onClick={handleBoxClick} />
        </div>
        <div className="flex flex-row w-full max-w-[90%] space-x-12">
          <Card label="Plugins" icon={<PuzzlePieceIcon className="h-16 w-16 mb-4" />} count={counts.plugins} route="/admin/plugins" onClick={handleBoxClick} />
        </div>
      </div>
    </AdminLayout>
  );
};

const Card = ({ label, icon, count, route, onClick }: any) => (
  <div
    className="shadow-lg rounded-lg p-8 bg-transparent flex flex-col items-center justify-center transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer w-full"
    onClick={onClick}
    data-route={route}
  >
    {icon}
    <p className="font-sm text-2xl">{label}</p>
    <p className="font-semibold text-2xl">{count !== null ? count : '...'}</p>
  </div>
);

export default withAuth(AdminDashboard);
