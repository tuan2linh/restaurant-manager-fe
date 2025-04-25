import api from './api';
import { Zone, ZoneStatistics, Table } from '../types/zone';

class ZoneService {
  /**
   * GET /zone/statistics - Get statistics about available tables in each zone
   */
  async getZoneStatistics(): Promise<ZoneStatistics[]> {
    const response = await api.get('/zone/statistics');
    return response.data;
  }

  /**
   * POST /zone - Create a new zone
   */
  async createZone(zone: Omit<Zone, 'id' | 'tables'>): Promise<Zone> {
    const response = await api.post('/zone', zone);
    return response.data;
  }

  /**
   * GET /zone - Get all zones with their tables
   */
  async getAllZones(): Promise<Zone[]> {
    const response = await api.get('/zone');
    return response.data;
  }

  /**
   * GET /zone/{id} - Get zone details by ID, including its tables
   */
  async getZoneById(id: number): Promise<Zone> {
    const response = await api.get(`/zone/${id}`);
    return response.data;
  }

  /**
   * PATCH /zone/{id} - Update zone name
   */
  async updateZoneName(id: number, name: string): Promise<Zone> {
    const response = await api.patch(`/zone/${id}`, { name });
    return response.data;
  }

  /**
   * DELETE /zone/{id} - Delete a zone
   */
  async deleteZone(id: number): Promise<void> {
    await api.delete(`/zone/${id}`);
  }

  /**
   * GET /zone/{id}/tables - Get tables in a zone
   */
  async getTablesByZoneId(id: number): Promise<Table[]> {
    const response = await api.get(`/zone/${id}/tables`);
    return response.data;
  }
}

const zoneService = new ZoneService();
export default zoneService;
