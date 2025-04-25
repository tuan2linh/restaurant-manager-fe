import React, { useState } from 'react';
import { CreateTableDto } from '@/types/table';

interface AddTableModalProps {
  zoneId: number;
  onClose: () => void;
  onSubmit: (tableData: CreateTableDto) => Promise<void>;
}

const AddTableModal: React.FC<AddTableModalProps> = ({ zoneId, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<CreateTableDto>({
    name: '',
    capacity: 4,
    zoneId: zoneId
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
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Thêm bàn mới</h2>
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
              className="w-full px-3 py-2 border bg-gray-700 text-white border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-3 py-2 border bg-gray-700 text-white border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.capacity}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-700"
              disabled={isSubmitting}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Đang xử lý...' : 'Thêm bàn'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTableModal;
