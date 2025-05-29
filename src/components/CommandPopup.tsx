import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { refreshAccessToken } from '@/api/auth';
import { sendCommandToDevice } from '@/api/commands';

interface CommandPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onCommandSent?: () => void;
}

const CommandPopup: React.FC<CommandPopupProps> = ({ isOpen, onClose, onCommandSent }) => {
  const [name, setName] = useState('');
  const [parameters, setParameters] = useState('');
  const router = useRouter();
  const { id } = router.query;

  const handleOutsideClick = useCallback((e: MouseEvent) => {
    if ((e.target as HTMLElement).className.includes('popup-overlay')) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen, handleOutsideClick]);

  const handleCancel = () => {
    onClose();
  };

  const handleSave = async () => {
    const refreshToken = sessionStorage.getItem('refreshToken');
    if (!refreshToken || typeof id !== 'string') {
      alert('Device ID is missing!');
      return;
    }

    let parsedParams = {};
    if (parameters.trim()) {
      try {
        parsedParams = JSON.parse(parameters);
      } catch {
        alert('Invalid JSON format for parameters');
        return;
      }
    }

    try {
      const accessToken = await refreshAccessToken(refreshToken);
      const timestamp = new Date().toISOString();
      await sendCommandToDevice(id, accessToken, {
        command: name,
        timestamp,
        parameters: parsedParams,
        lifetime: 0,
        status: 'NEW',
        result: {},
      });

      alert('Command sent!');
      onClose();
      onCommandSent?.();
    } catch (err: any) {
      alert(`Failed to send command: ${err.message}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center popup-overlay">
      <div className="bg-white p-6 rounded shadow-lg relative">
        <h2 className="text-xl font-bold mb-4">Create New Command</h2>
        <div className="mb-4">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
            placeholder="Enter command name"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Parameters (JSON)</label>
          <textarea
            value={parameters}
            onChange={(e) => setParameters(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
            placeholder='e.g., {"key": "value"}'
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-accent text-white rounded hover:bg-highlight"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommandPopup;