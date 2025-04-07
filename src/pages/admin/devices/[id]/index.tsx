import React from 'react';
import { useRouter } from 'next/router';
import { PencilIcon, CogIcon, CommandLineIcon, BellIcon } from '@heroicons/react/24/solid';
import AdminLayout from '@/components/AdminLayout';

const DeviceDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const handleBoxClick = (route: string) => {
    router.push(`/admin/devices/${id}/${route}`);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col items-center justify-center space-y-10 mt-5 mb-10">
        <div className="flex flex-row w-full max-w-[90%] space-x-12">
          <div
            className="shadow-lg rounded-lg p-8 bg-transparent flex flex-col items-center justify-center transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer w-full"
            onClick={() => handleBoxClick('control')}
          >
            <CogIcon className="h-20 w-20 mr-4" />
            <p className="font-semibold text-3xl">Dashboard</p>
          </div>
          <div
            className="shadow-lg rounded-lg p-8 bg-transparent flex flex-col items-center justify-center transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer w-full"
            onClick={() => handleBoxClick('editDevice')}
          >
            <PencilIcon className="h-20 w-20 mr-4" />
            <p className="font-semibold text-3xl">Edit Device</p>
          </div>
        </div>
        <div className="flex flex-row w-full max-w-[90%] space-x-12">
          <div
            className="shadow-lg rounded-lg p-8 bg-transparent flex flex-col items-center justify-center transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer w-full"
            onClick={() => handleBoxClick('commands')}
          >
            <CommandLineIcon className="h-20 w-20 mr-4" />
            <p className="font-semibold text-3xl">Commands</p>
          </div>
          <div
            className="shadow-lg rounded-lg p-8 bg-transparent flex flex-col items-center justify-center transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer w-full"
            onClick={() => handleBoxClick('notifications')}
          >
            <BellIcon className="h-20 w-20 mr-4" />
            <p className="font-semibold text-3xl">Notifications</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DeviceDetails;
