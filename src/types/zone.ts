export interface Zone {
  id: number;
  name: string;
  tables?: Table[];
}

export interface ZoneStatistics {
  zone: string;
  availableTables: number;
}

export interface Table {
  id: number;
  name: string;
  capacity: number;
  isAvailable: boolean;
  customer?: {
    id: number;
    name: string;
    phone: string;
  } | null;
}
