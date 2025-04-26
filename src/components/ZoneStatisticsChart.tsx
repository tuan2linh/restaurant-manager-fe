interface ZoneStatisticsChartProps {
  totalTables: number;
  availableTables: number;
  occupiedTables: number;
}

export default function ZoneStatisticsChart({
  totalTables,
  availableTables,
  occupiedTables,
}: ZoneStatisticsChartProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-indigo-900/30 p-4 rounded-lg border border-indigo-800">
        <h2 className="text-lg font-semibold mb-2 text-indigo-300">Tổng số bàn</h2>
        <p className="text-3xl font-bold text-indigo-200">{totalTables}</p>
      </div>
      
      <div className="bg-emerald-900/30 p-4 rounded-lg border border-emerald-800">
        <h2 className="text-lg font-semibold mb-2 text-emerald-300">Bàn trống</h2>
        <p className="text-3xl font-bold text-emerald-200">{availableTables}</p>
      </div>
      
      <div className="bg-amber-900/30 p-4 rounded-lg border border-amber-800">
        <h2 className="text-lg font-semibold mb-2 text-amber-300">Bàn có khách</h2>
        <p className="text-3xl font-bold text-amber-200">{occupiedTables}</p>
      </div>
    </div>
  );
}
