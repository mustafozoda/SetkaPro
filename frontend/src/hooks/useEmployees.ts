import { useQuery } from "@tanstack/react-query";
import { Employee } from "@/types/Employee";
import api from "../lib/axios";

const fetchEmployees = async (): Promise<Employee[]> => {
  const { data } = await api.get("/employees");
  return data;
};

export const useEmployees = () => {
  return useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });
};
