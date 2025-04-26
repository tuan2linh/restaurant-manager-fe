'use client';

import { useState } from 'react';
import { Zone } from '@/types/zone';
import zoneService from '@/services/zoneService';

interface ZoneCardProps {
  zone: Zone;
  onZoneUpdated: () => void;
}

export default function ZoneCard({ zone, onZoneUpdated }: ZoneCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [zoneName, setZoneName] = useState(zone.name);
  const [isDeleting, setIsDeleting] = useState(false);

  // Calculate zone statistics
  const getZoneStats = () => {
    if (!zone.tables || zone.tables.length === 0) {
      return { totalTables: 0, tablesInUse: 0 };
    }
    
    const totalTables = zone.tables.length;
    const tablesInUse = zone.tables.filter(table => !table.isAvailable).length;
    
    return { totalTables, tablesInUse };
  };

  const { totalTables, tablesInUse } = getZoneStats();
  
  const handleSave = async () => {
    if (zoneName.trim() === '') return;
    
    try {
      await zoneService.updateZoneName(zone.id, zoneName);
      setIsEditing(false);
      onZoneUpdated();
    } catch (error) {
      console.error('Error updating zone:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await zoneService.deleteZone(zone.id);
      onZoneUpdated();
      setIsDeleting(false);
    } catch (error) {
      console.error('Error deleting zone:', error);
    }
  };

  const handleCancel = () => {
    setZoneName(zone.name);
    setIsEditing(false);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Only navigate if we're not clicking buttons or input
    if (!(e.target as HTMLElement).closest('button, input')) {
      window.location.href = `/zones/${zone.id}`;
    }
  };

  return (
    <div className="relative">
      <div 
        onClick={handleCardClick}
        className="card p-6 rounded-lg shadow transition-all hover:shadow-xl hover:scale-102 cursor-pointer bg-gradient-to-br from-gray-800 to-gray-900"
      >
        {/* Zone Header with Edit/Delete */}
        <div className="flex justify-between items-center mb-6">
          {isEditing ? (
            <input
              type="text"
              value={zoneName}
              onChange={(e) => setZoneName(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="text-xl font-semibold border-b border-gray-600 focus:outline-none focus:border-blue-500 bg-transparent text-white"
              autoFocus
            />
          ) : (
            <div>
              <h2 className="text-xl font-semibold text-white">{zone.name}</h2>
              <p className="text-sm text-gray-400">ID: {zone.id}</p>
            </div>
          )}
          
          <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
            {isEditing ? (
              <>
                <button 
                  onClick={handleSave}
                  className="p-1 text-green-400 hover:text-green-300"
                >
                  <span className="sr-only">Save</span>
                  ✓
                </button>
                <button 
                  onClick={handleCancel}
                  className="p-1 text-red-400 hover:text-red-300"
                >
                  <span className="sr-only">Cancel</span>
                  ✕
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => setIsEditing(true)}
                  className="p-1 text-blue-400 hover:text-blue-300"
                >
                  <span className="sr-only">Edit</span>
                  ✎
                </button>
                <button 
                  onClick={() => setIsDeleting(true)}
                  className="p-1 text-red-400 hover:text-red-300"
                >
                  <span className="sr-only">Delete</span>
                  🗑️
                </button>
              </>
            )}
          </div>
        </div>

        {/* Zone Stats in Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="stat-card p-3 rounded-lg bg-indigo-900/30 flex-1">
            <div className="text-sm text-indigo-300">Tổng số bàn</div>
            <div className="text-2xl font-bold text-indigo-200">{totalTables}</div>
          </div>

          <div className="stat-card p-3 rounded-lg bg-emerald-900/30 flex-1">
            <div className="text-sm text-emerald-300">Bàn trống</div>
            <div className="text-2xl font-bold text-emerald-200">
              {totalTables - tablesInUse}
            </div>
          </div>
          
          <div className={`stat-card p-3 rounded-lg flex-1 ${
            tablesInUse > totalTables/2 
              ? 'bg-red-900/30' 
              : 'bg-amber-900/30'
          }`}>
            <div className={`text-sm ${
              tablesInUse > totalTables/2 
                ? 'text-red-300' 
                : 'text-amber-300'
            }`}>Bàn có khách</div>
            <div className={`text-2xl font-bold ${
              tablesInUse > totalTables/2 
                ? 'text-red-200' 
                : 'text-amber-200'
            }`}>{tablesInUse}</div>
          </div>
        </div>

        {/* Usage Indicator */}
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="text-sm text-gray-400 mb-2">
            Tình trạng sử dụng
          </div>
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${
                tablesInUse > totalTables/2 ? 'bg-red-500' : 'bg-green-500'
              }`}
              style={{ width: `${(tablesInUse / totalTables) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-3 text-white">Xác nhận xóa</h3>
            <p className="mb-4 text-gray-300">Bạn có chắc chắn muốn xóa khu vực &quot;{zone.name}&quot;?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsDeleting(false)}
                className="px-4 py-2 border border-gray-600 rounded hover:bg-gray-700 text-gray-300"
              >
                Huỷ
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
