import api from "../lib/axios";
import { Employee } from "@/types/Employee";

// ✅ Create
export const createEmployee = (payload: {
  name: string;
  role: string;
  salary: number;
}) => api.post<Employee>("/employees", payload);

// ✅ Read
export const getEmployees = () =>
  api.get<Employee[]>("/employees").then((res) => res.data);

// ✅ Update
export const updateEmployee = (
  id: number,
  payload: {
    name: string;
    role: string;
    salary: number;
  }
) => api.put<Employee>(`/employees/${id}`, payload);

// ✅ Delete
export const deleteEmployee = (id: number) => api.delete(`/employees/${id}`);

export const getEmployee = (id: number) =>
  api.get<Employee>(`/employees/${id}`).then((res) => res.data);
