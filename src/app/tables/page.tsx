// src/app/tables/page.tsx

'use client';

import { useEffect, useState } from 'react';
import api from '@/services/api';

interface Table {
  id: number;
  name: string;
  capacity: number;
  isAvailable: boolean;
}

export default function TablePage() {
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const res = await api.get('/table');
        setTables(res.data);
      } catch (error) {
        console.error('Lỗi khi fetch tables:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTables();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Danh sách bàn ăn</h1>
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {tables.map((table) => (
            <div
              key={table.id}
              className={`border p-4 rounded-lg shadow ${
                table.isAvailable ? 'bg-green-100' : 'bg-red-100'
              }`}
            >
              <h2 className="text-lg font-semibold">{table.name}</h2>
              <p>Sức chứa: {table.capacity}</p>
              <p>
                Trạng thái:{' '}
                <span className="font-bold">
                  {table.isAvailable ? 'Còn trống' : 'Đã có khách'}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
