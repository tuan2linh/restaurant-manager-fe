import React, { useState } from 'react';
import { Table, UpdateTableDto } from '@/types/table';

interface EditTableModalProps {
  table: Table;
  onClose: () => void;
  onSubmit: (tableId: number, tableData: UpdateTableDto) => Promise<void>;
}

const EditTableModal: React.FC<EditTableModalProps> = ({ table, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<UpdateTableDto>({
    name: table.name,
    capacity: table.capacity
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'capacity' ? parseInt(value) : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(table.id, formData);
      onClose();
    } catch (error) {
      console.error('Error updating table:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Chỉnh sửa bàn {table.name}</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Tên bàn
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full px-3 py-2 border rounded-md bg-gray-700 text-white"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="capacity" className="block text-sm font-medium text-gray-300 mb-1">
              Sức chứa (số ghế)
            </label>
            <input
              id="capacity"
              name="capacity"
              type="number"
              min="1"
              className="w-full px-3 py-2 border rounded-md bg-gray-700 text-white"
              value={formData.capacity}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md hover:bg-gray-600 text-white"
              disabled={isSubmitting}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Đang xử lý...' : 'Cập nhật'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTableModal;
