import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Tooltip } from "@mui/material";
import {
  Trash2,
  PlusCircle,
  RefreshCw,
  Eye,
} from "lucide-react";

const LoanListing = () => {
  const columns = [
    { field: "id", headerName: "Loan ID", width: 120 },
    { field: "product", headerName: "Product", width: 180 },
    { field: "amount", headerName: "Amount", width: 140 },
    { field: "tenure", headerName: "Tenure (Months)", width: 160 },
    { field: "emi", headerName: "EMI", width: 140 },
    {
      field: "status",
      headerName: "Status",
      width: 220,
      renderCell: (params) => {
        const statusColors = {
          "Pending Employer Approval": "orange",
          "Pending FSP Approval": "goldenrod",
          Active: "green",
          Cancelled: "red",
          Rejected: "darkred",
          "Closed (fully repaid)": "gray",
        };
        return (
          <span
            style={{
              color: statusColors[params.value] || "black",
              fontWeight: 600,
            }}
          >
            {params.value}
          </span>
        );
      },
    },
    {
      field: "action",
      headerName: "Actions",
      width: 250,
      sortable: false,
      renderCell: (params) => (
        <div className="d-flex gap-2">
          <Tooltip title="View Loan">
            <Eye
              size={20}
              style={{ cursor: "pointer", color: "black" }}
              onClick={() => console.log("View Loan:", params.row.id)}
            />
          </Tooltip>
          <Tooltip title="Top-Up">
            <PlusCircle
              size={20}
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => console.log("Top-Up Loan:", params.row.id)}
            />
          </Tooltip>
          <Tooltip title="Takeover">
            <RefreshCw
              size={20}
              style={{ cursor: "pointer", color: "purple" }}
              onClick={() => console.log("Takeover Loan:", params.row.id)}
            />
          </Tooltip>
          <Tooltip title="Cancel">
            <Trash2
              size={20}
              style={{ cursor: "pointer", color: "red" }}
              onClick={() => console.log("Cancel Loan:", params.row.id)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  const rows = [
    {
      id: "LN001",
      product: "Personal Loan",
      amount: "₹50,000",
      tenure: 12,
      emi: "₹4,500",
      status: "Pending Employer Approval",
    },
    {
      id: "LN002",
      product: "Car Loan",
      amount: "₹75,000",
      tenure: 24,
      emi: "₹3,800",
      status: "Pending FSP Approval",
    },
    {
      id: "LN003",
      product: "Home Loan",
      amount: "₹2,00,000",
      tenure: 60,
      emi: "₹5,200",
      status: "Active",
    },
    {
      id: "LN004",
      product: "Education Loan",
      amount: "₹30,000",
      tenure: 18,
      emi: "₹2,100",
      status: "Cancelled",
    },
    {
      id: "LN005",
      product: "Business Loan",
      amount: "₹1,50,000",
      tenure: 36,
      emi: "₹4,800",
      status: "Rejected",
    },
    {
      id: "LN006",
      product: "Mortgage Loan",
      amount: "₹5,00,000",
      tenure: 120,
      emi: "₹7,200",
      status: "Closed (fully repaid)",
    },
  ];

  return (
    <div className="container">
      <h5 className="mb-1">Loan Management</h5>
      <p className="text-muted mb-4">
        Review all employee loans, their current status, and available actions.
      </p>
      <Paper>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          autoHeight
          sx={{ border: 0 }}
        />
      </Paper>
    </div>
  );
};

export default LoanListing;
