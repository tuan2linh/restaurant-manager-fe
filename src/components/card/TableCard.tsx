import { useState } from 'react';
import { Table } from '@/types/table';
import customerService from '@/services/customerService';
import AddCustomerForm from '../modals/AddCustomerForm';

interface TableCardProps {
  table: Table;
  onEdit: (tableId: number, data: { name: string; capacity: number }) => Promise<void>;
  onDelete: (tableId: number) => Promise<void>;
  onView: (table: Table) => void;
}

export default function TableCard({ table, onEdit, onDelete, onView }: TableCardProps) {
  const [editingMode, setEditingMode] = useState(false);
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [editForm, setEditForm] = useState({
    name: table.name,
    capacity: table.capacity
  });

  const handleStartEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingMode(true);
    setEditForm({ name: table.name, capacity: table.capacity });
  };

  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await onEdit(table.id, editForm);
      setEditingMode(false);
    } catch (err) {
      console.error('Error saving table:', err);
    }
  };

  const handleReturnTable = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!table.customer) return;

    if (confirm('Bạn có chắc chắn muốn trả bàn này?')) {
      try {
        await customerService.customerLeave(table.customer.id);
        window.location.reload(); // Refresh page to update table status
      } catch (err) {
        console.error('Error returning table:', err);
        alert('Không thể trả bàn. Vui lòng thử lại sau.');
      }
    }
  };

  return (
    <>
      <div 
        className={`p-4 rounded-lg shadow-md cursor-pointer ${
          table.isAvailable ? 'table-available' : 'table-occupied'
        }`}
        onClick={() => onView(table)}
      >
        <div className="flex justify-between items-center mb-3">
          {editingMode ? (
            <input
              type="text"
              value={editForm.name}
              onChange={(e) => setEditForm({...editForm, name: e.target.value})}
              className="bg-gray-700 text-white px-2 py-1 rounded"
              onClick={e => e.stopPropagation()}
            />
          ) : (
            <h3 className="text-lg font-semibold">{table.name}</h3>
          )}
          <div className="flex gap-1" onClick={e => e.stopPropagation()}>
            {editingMode ? (
              <>
                <button
                  onClick={handleSave}
                  className="p-1.5 rounded bg-green-600 hover:bg-green-700 transition-colors"
                  title="Lưu"
                >
                  ✓
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingMode(false);
                  }}
                  className="p-1.5 rounded bg-red-600 hover:bg-red-700 transition-colors"
                  title="Hủy"
                >
                  ✕
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleStartEdit}
                  className="p-1 text-blue-600 hover:text-blue-800"
                  title="Sửa"
                >
                  <span className="sr-only">Edit</span>
                  ✎
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(table.id);
                  }}
                  className="p-1 text-red-600 hover:text-red-800"
                  title="Xóa"
                >
                  <span className="sr-only">Delete</span>
                  🗑️
                </button>
              </>
            )}
          </div>
        </div>

        <div className="space-y-2">
          {editingMode ? (
            <div className="flex justify-between items-center" onClick={e => e.stopPropagation()}>
              <div className="flex items-center gap-2">
                <span>Sức chứa:</span>
                <input
                  type="number"
                  value={editForm.capacity}
                  onChange={(e) => setEditForm({...editForm, capacity: parseInt(e.target.value, 10)})}
                  className="bg-gray-700 text-white w-16 px-2 py-1 rounded"
                  min="1"
                />
                <span>ghế</span>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <p>Sức chứa: <span className="font-medium">{table.capacity} ghế</span></p>
              <span 
                className={`px-2 py-1 text-xs rounded-full ${
                  table.isAvailable ? 'table-badge-available' : 'table-badge-occupied'
                }`}
              >
                {table.isAvailable ? 'Trống' : 'Có khách'}
              </span>
            </div>
          )}
          
          {table.customer && !table.isAvailable && (
            <div className="p-2 bg-black bg-opacity-30 rounded">
              <p className="text-sm font-medium">Khách: {table.customer.name}</p>
            </div>
          )}
          
          <div onClick={e => e.stopPropagation()}>
            <button
              onClick={table.isAvailable ? 
                (e) => {
                  e.stopPropagation();
                  setShowAddCustomer(true);
                } : 
                handleReturnTable
              }
              className={`px-3 py-1 ${
                table.isAvailable ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'
              } text-white rounded`}
            >
              {table.isAvailable ? 'Đặt bàn' : 'Trả bàn'}
            </button>
          </div>
        </div>
      </div>

      <AddCustomerForm
        isOpen={showAddCustomer}
        onClose={() => setShowAddCustomer(false)}
        tableId={table.id}
      />
    </>
  );
}
