"use client";

import { useGetProductsQuery, useDeleteProductMutation } from "../state/api";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { useState } from "react";

// Define the columns type more explicitly
const columns: GridColDef[] = [
  { field: "productId", headerName: "ID", width: 90 },
  { field: "name", headerName: "Product Name", width: 200 },
  { field: "price", headerName: "Price", width: 110, type: "number" },
  { field: "rating", headerName: "Rating", width: 110, type: "number" },
  { field: "stockQuantity", headerName: "Stock Quantity", width: 150, type: "number" },
];

const Inventory = () => {
  const { data: products, isError, isLoading } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

  const handleDelete = async () => {
    if (selectedProductIds.length === 0) {
      alert("No products selected for deletion!");
      return;
    }

    // Confirm deletion
    const confirmDelete = confirm("Are you sure you want to delete the selected products?");
    if (!confirmDelete) return;

    try {
      await Promise.all(
        selectedProductIds.map((productId) => deleteProduct(productId))  // Pass only the productId
      );
      alert("Selected products deleted successfully.");
    } catch (error) {
      alert("Failed to delete selected products. Please try again.");
    }
  };

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <Header name="Inventory" />
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleDelete}
        >
          Delete Selected
        </button>
      </div>

      <DataGrid
        rows={products}
        columns={columns}
        getRowId={(row) => row.productId}
        checkboxSelection
        onRowSelectionModelChange={(newSelection: GridRowSelectionModel) => {
          setSelectedProductIds(newSelection as string[]); // Type casting here
        }}
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
      />
    </div>
  );
};

export default Inventory;
 