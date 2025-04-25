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
      <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg border border-indigo-200 dark:border-indigo-800">
        <h2 className="text-lg font-semibold mb-2 text-indigo-600 dark:text-indigo-300">Tổng số bàn</h2>
        <p className="text-3xl font-bold text-indigo-700 dark:text-indigo-200">{totalTables}</p>
      </div>
      
      <div className="bg-emerald-50 dark:bg-emerald-900/30 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800">
        <h2 className="text-lg font-semibold mb-2 text-emerald-600 dark:text-emerald-300">Bàn trống</h2>
        <p className="text-3xl font-bold text-emerald-700 dark:text-emerald-200">{availableTables}</p>
      </div>
      
      <div className="bg-amber-50 dark:bg-amber-900/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
        <h2 className="text-lg font-semibold mb-2 text-amber-600 dark:text-amber-300">Bàn có khách</h2>
        <p className="text-3xl font-bold text-amber-700 dark:text-amber-200">{occupiedTables}</p>
      </div>
    </div>
  );
}
