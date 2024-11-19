"use client";

import { useGetEmployeesQuery, useCreateEmployeeMutation, useDeleteEmployeeMutation } from "../state/api";
import Header from "@/app/(components)/Header";
import CreateEmployeeModal from "./CreateEmployeeModal";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { useState } from "react";

type EmployeeFormData = { 
  name: string;
  email: string;
  contactNo: string;
  salary: number;
}

const columns: GridColDef[] = [
  { field: "name", headerName: "Employee Name", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "contactNo", headerName: "Contact No.", width: 150 },
  { field: "salary", headerName: "Salary", width: 150, type: "number" },
];

const Employees = () => {
  const { data: employees, isError, isLoading, refetch } = useGetEmployeesQuery();
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const [createEmployee] = useCreateEmployeeMutation();
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateEmployee = async (employeeData: EmployeeFormData) => {
    await createEmployee(employeeData);
  }
  const handleDelete = async () => {
    if (selectedEmployeeIds.length === 0) {
      alert("No employees selected for deletion!");
      return;
    }

    const confirmDelete = confirm("Are you sure you want to delete the selected employees?");
    if (!confirmDelete) return;

    try {
      await Promise.all(
        selectedEmployeeIds.map((employeeId) => deleteEmployee(employeeId).unwrap())
      );
      alert("Selected employees deleted successfully.");
      refetch();
    } catch (error) {
      console.error("Error deleting employees:", error);
      alert("Failed to delete selected employees. Please try again.");
    }
  };

  if (isLoading) return <div className="py-4">Loading...</div>;
  if (isError || !employees) return <div className="text-center text-red-500 py-4">Failed to fetch employees.</div>;

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <Header name="Employees" />
        <div className="flex space-x-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsModalOpen(true)}
          >
            Add Employee
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleDelete}
          >
            Delete Selected
          </button>
        </div>
      </div>

      {/* Create Employee Modal */}
      <CreateEmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateEmployee}
      />

      {/* DataGrid for Employees */}
      <DataGrid
        rows={employees.map((employee) => ({ ...employee, id: employee.eId }))}
        columns={columns}
        getRowId={(row) => row.id}
        checkboxSelection
        onRowSelectionModelChange={(newSelection: GridRowSelectionModel) => {
          setSelectedEmployeeIds(newSelection as string[]);
        }}
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
      />
    </div>
  );
};

export default Employees;
