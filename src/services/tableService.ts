import api from './api';
import { Table, CreateTableDto, UpdateTableDto } from '../types/table';

class TableService {
  /**
   * GET /table - Get all tables
   */
  async getAllTables(): Promise<Table[]> {
    const response = await api.get('/table');
    return response.data;
  }

  /**
   * GET /table/{id} - Get table by ID
   */
  async getTableById(id: number): Promise<Table> {
    const response = await api.get(`/table/${id}`);
    return response.data;
  }

  /**
   * POST /table - Create a new table
   */
  async createTable(tableData: CreateTableDto): Promise<Table> {
    const response = await api.post('/table', tableData);
    return response.data;
  }

  /**
   * PATCH /table/{id} - Update table information
   */
  async updateTable(id: number, tableData: UpdateTableDto): Promise<Table> {
    const response = await api.patch(`/table/${id}`, tableData);
    return response.data;
  }

  /**
   * DELETE /table/{id} - Delete a table
   */
  async deleteTable(id: number): Promise<void> {
    await api.delete(`/table/${id}`);
  }

  /**
   * GET /table/available - Get all available tables
   */
  async getAvailableTables(): Promise<Table[]> {
    const response = await api.get('/table/available');
    return response.data;
  }
}

const tableService = new TableService();
export default tableService;
