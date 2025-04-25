import { Table } from './table';

export interface Customer {
  id: number;
  name: string;
  phone: string;
  table?: Table | null;
}

export interface CreateCustomerDto {
  name: string;
  phone: string;
  tableId?: number;
}

export interface UpdateCustomerDto {
  name?: string;
  phone?: string;
  tableId?: number;
}

export interface AssignTableDto {
  tableId: number;
}
