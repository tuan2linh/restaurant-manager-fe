export interface Customer {
  id: number;
  name: string;
  phone: string;
}

export interface Table {
  id: number;
  name: string;
  capacity: number;
  isAvailable: boolean;
  customer:{
      id: number;
      name: string;
      phone: string;
  }
  zone: {
    id: number;
    name: string;
  };
}

export interface CreateTableDto {
  name: string;
  capacity: number;
  zoneId: number;
}

export interface UpdateTableDto {
  name?: string;
  capacity?: number;
  zoneId?: number;
  isAvailable?: boolean;
}
