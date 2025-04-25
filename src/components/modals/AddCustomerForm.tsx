import { useState, useEffect } from 'react';
import customerService from '@/services/customerService';
import { Customer } from '@/types/customer';

interface AddCustomerFormProps {
  isOpen: boolean;
  onClose: () => void;
  tableId: number;
}

export default function AddCustomerForm({ isOpen, onClose, tableId }: AddCustomerFormProps) {
  const [mode, setMode] = useState<'new' | 'existing'>('new');
  const [availableCustomers, setAvailableCustomers] = useState<Customer[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number>(0);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    phone: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredCustomers = availableCustomers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  useEffect(() => {
    if (isOpen) {
      loadAvailableCustomers();
    }
  }, [isOpen]);

  const loadAvailableCustomers = async () => {
    const customers = await customerService.getAllCustomers();
    const availableCustomers = customers.filter(customer => customer.table == null);
    setAvailableCustomers(availableCustomers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === 'new') {
        await customerService.createCustomer({
          ...newCustomer,
          tableId
        });
      } else {
        await customerService.assignTable(selectedCustomerId, { tableId });
      }
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Đặt bàn</h2>
        
        <div className="flex gap-4 mb-4">
          <button
            className={`flex-1 py-2 rounded ${mode === 'new' ? 'bg-blue-600' : 'bg-gray-700'}`}
            onClick={() => setMode('new')}
          >
            Khách mới
          </button>
          <button
            className={`flex-1 py-2 rounded ${mode === 'existing' ? 'bg-blue-600' : 'bg-gray-700'}`}
            onClick={() => setMode('existing')}
          >
            Khách có sẵn
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === 'new' ? (
            <>
              <div className="mb-4">
                <label className="block mb-2">Tên khách hàng</label>
                <input
                  type="text"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                  className="w-full p-2 bg-gray-700 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Số điện thoại</label>
                <input
                  type="text"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                  className="w-full p-2 bg-gray-700 rounded"
                  required
                />
              </div>
            </>
          ) : (
            <div className="mb-4 relative">
              <label className="block mb-2">Chọn khách hàng</label>
              <div 
                className="w-full p-2 bg-gray-700 rounded cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {selectedCustomerId ? 
                  availableCustomers.find(c => c.id === selectedCustomerId)?.name :
                  'Chọn khách hàng'
                }
              </div>
              
              {isDropdownOpen && (
                <div className="absolute w-full mt-1 bg-gray-700 rounded shadow-lg z-10">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 bg-gray-700 border-b border-gray-600"
                    placeholder="Search..."
                    onClick={(e) => e.stopPropagation()}
                  />
                  <div className="max-h-48 overflow-y-auto">
                    {filteredCustomers.map(customer => (
                      <div
                        key={customer.id}
                        className="p-2 hover:bg-gray-600 cursor-pointer"
                        onClick={() => {
                          setSelectedCustomerId(customer.id);
                          setIsDropdownOpen(false);
                          setSearchTerm('');
                        }}
                      >
                        {customer.name} - {customer.phone}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 rounded"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 rounded"
            >
              Xác nhận
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
