import React from 'react';
import Link from 'next/link';
import {
  UsersIcon,
  CpuChipIcon,
  BuildingOfficeIcon,
  DeviceTabletIcon,
  PuzzlePieceIcon,
  CreditCardIcon,
  BookOpenIcon,
} from "@heroicons/react/24/solid";

const Sidebar = () => {
  return (
    <div className="h-[calc(100vh-2rem)] w-full max-w-[15rem] p-4 bg-transparent text-secondary mt-5">
      <ul className="space-y-2">
        <li className="flex items-center font-medium p-2 hover:bg-highlight rounded-md">
          <BookOpenIcon className="h-5 w-5 mr-2" />
          <Link href="/admin">Overview</Link>
        </li>
        <li className="flex items-center font-medium p-2 hover:bg-highlight rounded-md">
          <UsersIcon className="h-5 w-5 mr-2" />
          <Link href="/admin/users">Users</Link>
        </li>
        <li className="flex items-center font-medium p-2 hover:bg-highlight rounded-md">
          <BuildingOfficeIcon className="h-5 w-5 mr-2" />
          <Link href="/admin/networks">Networks</Link>
        </li>
        <li className="flex items-center font-medium p-2 hover:bg-highlight rounded-md">
          <DeviceTabletIcon className="h-5 w-5 mr-2" />
          <Link href="/admin/deviceTypes">Device Types</Link>
        </li>
        <li className="flex items-center font-medium p-2 hover:bg-highlight rounded-md">
          <CpuChipIcon className="h-5 w-5 mr-2" />
          <Link href="/admin/devices">Devices</Link>
        </li>
        <li className="flex items-center font-medium p-2 hover:bg-highlight rounded-md">
          <CreditCardIcon className="h-5 w-5 mr-2" />
          <Link href="/admin/jwtTokens">JWT Tokens</Link>
        </li>
        <li className="flex items-center font-medium p-2 hover:bg-highlight rounded-md">
          <PuzzlePieceIcon className="h-5 w-5 mr-2" />
          <Link href="/admin/plugins">Plugins</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
