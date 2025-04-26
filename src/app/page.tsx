'use client';

import { useEffect, useState } from 'react';
import zoneService from '@/services/zoneService';
import { Zone } from '@/types/zone';
import ZoneCard from '@/components/card/ZoneCard';

export default function HomePage() {
  const [zones, setZones] = useState<Zone[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newZoneName, setNewZoneName] = useState('');

  const loadZones = async () => {
    setLoading(true);
    try {
      const data = await zoneService.getAllZones();
      setZones(data);
    } catch (error) {
      console.error('Error loading zones:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadZones();
  }, []);

  const handleCreateZone = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newZoneName.trim()) return;
    
    try {
      await zoneService.createZone({ name: newZoneName });
      setNewZoneName('');
      setShowCreateModal(false);
      loadZones(); // Reload zones after creating a new one
    } catch (error) {
      console.error('Error creating zone:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý khu vực</h1>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Tạo khu vực mới
        </button>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-color"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {zones.map((zone) => (
            <ZoneCard 
              key={zone.id} 
              zone={zone} 
              onZoneUpdated={loadZones} 
            />
          ))}
        </div>
      )}

      {/* Create Zone Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-white">Tạo khu vực mới</h2>
            <form onSubmit={handleCreateZone}>
              <div className="mb-4">
                <label htmlFor="zoneName" className="block text-sm font-medium mb-1 text-gray-300">Tên khu vực</label>
                <input
                  type="text"
                  id="zoneName"
                  value={newZoneName}
                  onChange={(e) => setNewZoneName(e.target.value)}
                  className="w-full p-2 bg-gray-700 border-gray-600 text-white rounded focus:ring focus:ring-blue-500"
                  placeholder="Nhập tên khu vực"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-gray-600 rounded hover:bg-gray-700 text-gray-300"
                >
                  Huỷ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Tạo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
