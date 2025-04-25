import api from './api';
import { Customer, CreateCustomerDto, UpdateCustomerDto, AssignTableDto } from '../types/customer';

const customerService = {
  // Get all customers
  getAllCustomers: async (): Promise<Customer[]> => {
    const response = await api.get('/customer');
    return response.data;
  },

  // Get customer by ID
  getCustomerById: async (customerId: number): Promise<Customer> => {
    const response = await api.get(`/customer/${customerId}`);
    return response.data;
  },

  // Create new customer
  createCustomer: async (customerData: CreateCustomerDto): Promise<Customer> => {
    const response = await api.post('/customer', customerData);
    return response.data;
  },

  // Update customer information
  updateCustomer: async (customerId: number, customerData: UpdateCustomerDto): Promise<Customer> => {
    const response = await api.patch(`/customer/${customerId}`, customerData);
    return response.data;
  },

  // Assign table to customer
  assignTable: async (customerId: number, assignData: AssignTableDto): Promise<Customer> => {
    const response = await api.patch(`/customer/${customerId}/assign-table`, assignData);
    return response.data;
  },

  // Customer leaves the table/restaurant
  customerLeave: async (customerId: number): Promise<void> => {
    await api.patch(`/customer/${customerId}/leave`);
  },

  // Delete customer
  deleteCustomer: async (customerId: number): Promise<void> => {
    await api.delete(`/customer/${customerId}`);
  }
};

export default customerService;
