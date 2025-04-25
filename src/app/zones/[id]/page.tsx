'use client';

import { useCallback, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import zoneService from '@/services/zoneService';
import tableService from '@/services/tableService';
import { Zone } from '@/types/zone';
import { Table, CreateTableDto, UpdateTableDto } from '@/types/table';
import AddTableModal from '@/components/modals/AddTableModal';
import TableCard from '@/components/card/TableCard';
import ZoneStatisticsChart from '@/components/ZoneStatisticsChart';
import TableDetailModal from '@/components/modals/TableDetailModal';

export default function ZoneDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const zoneId = parseInt(params.id as string, 10);
  
  // State management
  const [zone, setZone] = useState<Zone | null>(null);
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);

  useEffect(() => {
    fetchZoneDetails();
  }, [params.id]);

  const fetchZoneDetails = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      if (!params.id) {
        throw new Error('Zone ID is missing');
      }
      
      if (isNaN(zoneId)) {
        throw new Error('Invalid zone ID');
      }
      
      const zoneData = await zoneService.getZoneById(zoneId);
      setZone(zoneData);
      const tablesData = await tableService.getAllTables();
      setTables(tablesData.filter(table => table.zone.id === zoneId));
    } catch (err) {
      console.error('Error fetching zone details:', err);
      setError('Không thể tải thông tin khu vực. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  }, [zoneId]);

  const handleBackToHome = () => {
    router.push('/');
  };
  
  // Table action handlers
  const handleAddTable = async (tableData: CreateTableDto) => {
    try {
      const newTable = await tableService.createTable(tableData);
      setTables([...tables, newTable]);
      return Promise.resolve();
    } catch (err) {
      console.error('Error adding table:', err);
      return Promise.reject(err);
    }
  };

  const handleUpdateTable = async (tableId: number, tableData: UpdateTableDto) => {
    try {
      const updatedTable = await tableService.updateTable(tableId, tableData);
      setTables(tables.map(t => t.id === tableId ? updatedTable : t));
      return Promise.resolve();
    } catch (err) {
      console.error('Error updating table:', err);
      return Promise.reject(err);
    }
  };

  const handleDeleteTable = async (tableId: number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa bàn này không?')) return;
    
    try {
      await tableService.deleteTable(tableId);
      setTables(tables.filter(t => t.id !== tableId));
    } catch (err) {
      console.error('Error deleting table:', err);
      alert('Không thể xóa bàn. Vui lòng thử lại sau.');
    }
  };

  const handleViewTableDetails = (table: Table) => {
    setSelectedTable(table);
    console.log('Selected table:', table);
    setShowDetailModal(true);
  };

  // Sort tables by availability
  const availableTables = tables.filter(table => table.isAvailable);
  const occupiedTables = tables.filter(table => !table.isAvailable);

  if (loading) {
    return (
      <div className="container mx-auto p-6 text-white">
        <div className="flex items-center space-x-2 mb-6">
          <button 
            onClick={handleBackToHome}
            className="px-3 py-1 border border-gray-600 rounded hover:bg-gray-800"
          >
            ← Quay lại
          </button>
          <h1 className="text-2xl font-bold">Đang tải...</h1>
        </div>
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 text-white">
        <div className="flex items-center space-x-2 mb-6">
          <button 
            onClick={handleBackToHome}
            className="px-3 py-1 border border-gray-600 rounded hover:bg-gray-800"
          >
            ← Quay lại
          </button>
          <h1 className="text-2xl font-bold">Lỗi</h1>
        </div>
        <div className="bg-red-900 bg-opacity-30 border border-red-800 rounded-md p-4">
          <p className="text-red-400">{error}</p>
          <button 
            onClick={handleBackToHome}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    );
  }

  if (!zone) {
    return (
      <div className="container mx-auto p-6 text-white">
        <div className="flex items-center space-x-2 mb-6">
          <button 
            onClick={handleBackToHome}
            className="px-3 py-1 border border-gray-600 rounded hover:bg-gray-800"
          >
            ← Quay lại
          </button>
          <h1 className="text-2xl font-bold">Không tìm thấy khu vực</h1>
        </div>
        <p>Không tìm thấy thông tin khu vực này.</p>
        <button 
          onClick={handleBackToHome}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Về trang chủ
        </button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-6 text-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleBackToHome}
            className="px-3 py-1 border border-gray-600 rounded hover:bg-gray-800"
          >
            ← Quay lại
          </button>
          <h1 className="text-2xl font-bold">{zone.name}</h1>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Thêm bàn mới
        </button>
      </div>

      {/* Zone statistics */}
      <div className="mb-8">
        <ZoneStatisticsChart
          totalTables={tables.length}
          availableTables={availableTables.length}
          occupiedTables={occupiedTables.length}
        />
      </div>
      
      {/* Tables list */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Danh sách bàn</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...availableTables, ...occupiedTables].map((table) => (
            <TableCard
              key={table.id}
              table={table}
              onEdit={handleUpdateTable}
              onDelete={handleDeleteTable}
              onView={handleViewTableDetails}
            />
          ))}
          
          {tables.length === 0 && (
            <div className="col-span-full text-center py-8 bg-gray-800 bg-opacity-50 rounded-lg">
              <p className="text-gray-400">Không có bàn nào trong khu vực này</p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showAddModal && (
        <AddTableModal
          zoneId={zoneId}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddTable}
        />
      )}

      {showDetailModal && selectedTable && (
          <TableDetailModal
            table={selectedTable}
            onClose={() => {
              setShowDetailModal(false);
              setSelectedTable(null);
            }}
          />
      )}
    </div>
  );
}
