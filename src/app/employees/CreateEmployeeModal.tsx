import React, { ChangeEvent, FormEvent, useState } from "react";
import { v4 } from "uuid";
import Header from "@/app/(components)/Header";

type EmployeeFormData = {
  name: string;
  email: string;
  contactNo: string;
  salary: number;
};

type CreateEmployeeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: EmployeeFormData) => void;
};

const CreateEmployeeModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateEmployeeModalProps) => {
  const [formData, setFormData] = useState({
    eId: v4(),
    name: "",
    email: "",
    contactNo: "",
    salary: 0,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "salary" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(formData);
    onClose();
  };

  if (!isOpen) return null;

  const labelCssStyles = "block text-sm font-medium text-gray-700";
  const inputCssStyles =
    "block w-full mb-2 p-2 border-gray-500 border-2 rounded-md";

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <Header name="Add New Employee" />
        <form onSubmit={handleSubmit} className="mt-5">
          {/* NAME */}
          <label htmlFor="name" className={labelCssStyles}>
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
            className={inputCssStyles}
            required
          />

          {/* EMAIL */}
          <label htmlFor="email" className={labelCssStyles}>
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            className={inputCssStyles}
            required
          />

          {/* CONTACT NUMBER */}
          <label htmlFor="contactNo" className={labelCssStyles}>
            Contact Number
          </label>
          <input
            type="text"
            name="contactNo"
            placeholder="Contact Number"
            onChange={handleChange}
            value={formData.contactNo}
            className={inputCssStyles}
            required
          />

          {/* SALARY */}
          <label htmlFor="salary" className={labelCssStyles}>
            Salary
          </label>
          <input
            type="number"
            name="salary"
            placeholder="Salary"
            onChange={handleChange}
            value={formData.salary}
            className={inputCssStyles}
            required
          />

          {/* ACTIONS */}
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Add
          </button>
          <button
            onClick={onClose}
            type="button"
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployeeModal;
