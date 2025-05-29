// src/pages/admin/jwTokens/[id].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';

const TokenDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (id && typeof id === 'string') {
      setToken(id);
    }
  }, [id]);

  return (
    <AdminLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Token Details</h1>
        {token ? (
          <div className="bg-gray-100 p-4 rounded">
            <p className="break-all"><strong>Access Token:</strong> {token}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </AdminLayout>
  );
};

export default TokenDetails;
