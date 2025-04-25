import { Table } from '@/types/table';

interface TableDetailModalProps {
  table: Table;
  onClose: () => void;
}

export default function TableDetailModal({ table, onClose }: TableDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Chi tiết bàn</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 text-white">
          <div>
            <p className="text-gray-400">Tên bàn</p>
            <p className="font-medium">{table.name}</p>
          </div>

          <div>
            <p className="text-gray-400">Khu vực</p>
            <p className="font-medium">{table.customer?.name}</p>
          </div>

          <div>
            <p className="text-gray-400">Sức chứa</p>
            <p className="font-medium">{table.capacity} ghế</p>
          </div>

          <div>
            <p className="text-gray-400">Trạng thái</p>
            <p className={`font-medium ${table.isAvailable ? 'text-green-500' : 'text-red-500'}`}>
              {table.isAvailable ? 'Trống' : 'Có khách'}
            </p>
          </div>

          {table.customer && !table.isAvailable && (
            <div className="border-t border-gray-700 pt-4">
              <h3 className="text-lg font-semibold mb-3">Thông tin khách hàng</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-gray-400">Tên khách hàng</p>
                  <p className="font-medium">{table.customer.name}</p>
                </div>
                <div>
                  <p className="text-gray-400">Số điện thoại</p>
                  <p className="font-medium">{table.customer.phone}</p>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={onClose}
            className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
