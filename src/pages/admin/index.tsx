import React from 'react';
import withAuth from '../../components/withAuth';
import AdminLayout from '../../components/AdminLayout';
import {
  UsersIcon,
  CpuChipIcon,
  BuildingOfficeIcon,
  DeviceTabletIcon,
  PuzzlePieceIcon,
} from "@heroicons/react/24/solid";

const AdminDashboard = () => {
  const handleBoxClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const route = e.currentTarget.getAttribute('data-route');
    if (route) {
      window.location.href = route;
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col items-center justify-center space-y-10 mt-5 mb-10">
        <div className="flex flex-row w-full max-w-[90%] space-x-12">
          <div
            className="shadow-lg rounded-lg p-8 bg-transparent flex flex-col items-center justify-center transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer w-full"
            onClick={handleBoxClick}
            data-route="/admin/users"
          >
            <UsersIcon className="h-16 w-16 mb-4" />
            <p className="font-sm text-2xl">Users</p>
            <p className="font-semibold text-2xl">10</p>
          </div>
          <div
            className="shadow-lg rounded-lg p-8 bg-transparent flex flex-col items-center justify-center transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer w-full"
            onClick={handleBoxClick}
            data-route="/admin/networks"
          >
            <BuildingOfficeIcon className="h-16 w-16 mb-4" />
            <p className="font-sm text-2xl">Networks</p>
            <p className="font-semibold text-2xl">10</p>
          </div>
        </div>
        <div className="flex flex-row w-full max-w-[90%] space-x-12">
          <div
            className="shadow-lg rounded-lg p-8 bg-transparent flex flex-col items-center justify-center transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer w-full"
            onClick={handleBoxClick}
            data-route="/admin/devices"
          >
            <CpuChipIcon className="h-16 w-16 mb-4" />
            <p className="font-sm text-2xl">Devices</p>
            <p className="font-semibold text-2xl">10</p>
          </div>
          <div
            className="shadow-lg rounded-lg p-8 bg-transparent flex flex-col items-center justify-center transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer w-full"
            onClick={handleBoxClick}
            data-route="/admin/device-types"
          >
            <DeviceTabletIcon className="h-16 w-16 mb-4" />
            <p className="font-sm text-2xl">Device Types</p>
            <p className="font-semibold text-2xl">10</p>
          </div>
        </div>
        <div className="flex flex-row w-full max-w-[90%] space-x-12">
          <div
            className="shadow-lg rounded-lg p-8 bg-transparent flex flex-col items-center justify-center transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer w-full"
            onClick={handleBoxClick}
            data-route="/admin/plugins"
          >
            <PuzzlePieceIcon className="h-16 w-16 mb-4" />
            <p className="font-sm text-2xl">Plugins</p>
            <p className="font-semibold text-2xl">10</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default withAuth(AdminDashboard);