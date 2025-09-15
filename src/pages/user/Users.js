import React from "react";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Delete, Edit, LockOpen, LockOpenIcon } from "lucide-react";
import { Tooltip } from "chart.js";

const Users = () => {

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "username", headerName: "Username", width: 150 },
    { field: "email", headerName: "Email", width: 220 },
    { field: "role", headerName: "Role", width: 120 },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 180,
      valueGetter: (params) =>
        new Date(params.row.createdAt).toLocaleString(),
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 180,
      valueGetter: (params) =>
        new Date(params.row.updatedAt).toLocaleString(),
    },
    {
      field: "action",
      headerName: "Action",
      width: 180,
      sortable: false,
      renderCell: (params) => (
        <div className="d-flex justify-content-center gap-2 align-items-center">
          <LockOpenIcon
            className="icon"
            size={22}
            style={{ cursor: "pointer", color: "green" }}
            onClick={() => console.log("Unlock user:", params.row.id)}
          />
        </div>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      username: "adminMaster",
      email: "admin@fintech.com",
      password: "hashed_password_1",
      role: "admin",
      createdAt: "2025-09-01T10:15:00Z",
      updatedAt: "2025-09-10T14:20:00Z",
    },
    {
      id: 2,
      username: "johnDoe",
      email: "john.doe@gmail.com",
      password: "hashed_password_2",
      role: "user",
      createdAt: "2025-08-20T09:45:00Z",
      updatedAt: "2025-09-09T11:30:00Z",
    },
    {
      id: 3,
      username: "sarahInvestor",
      email: "sarah.investor@finmail.com",
      password: "hashed_password_3",
      role: "user",
      createdAt: "2025-07-12T13:05:00Z",
      updatedAt: "2025-09-05T16:45:00Z",
    },
    {
      id: 4,
      username: "fintechAdmin",
      email: "admin.support@fintech.com",
      password: "hashed_password_4",
      role: "admin",
      createdAt: "2025-06-15T08:00:00Z",
      updatedAt: "2025-09-01T18:10:00Z",
    },
    {
      id: 5,
      username: "mikeUser",
      email: "mike123@yahoo.com",
      password: "hashed_password_5",
      role: "user",
      createdAt: "2025-09-05T12:25:00Z",
      updatedAt: "2025-09-11T09:50:00Z",
    },
    {
      id: 1,
      username: "adminMaster",
      email: "admin@fintech.com",
      password: "hashed_password_1",
      role: "admin",
      createdAt: "2025-09-01T10:15:00Z",
      updatedAt: "2025-09-10T14:20:00Z",
    },
    {
      id: 2,
      username: "johnDoe",
      email: "john.doe@gmail.com",
      password: "hashed_password_2",
      role: "user",
      createdAt: "2025-08-20T09:45:00Z",
      updatedAt: "2025-09-09T11:30:00Z",
    },
    {
      id: 3,
      username: "sarahInvestor",
      email: "sarah.investor@finmail.com",
      password: "hashed_password_3",
      role: "user",
      createdAt: "2025-07-12T13:05:00Z",
      updatedAt: "2025-09-05T16:45:00Z",
    },
    {
      id: 4,
      username: "fintechAdmin",
      email: "admin.support@fintech.com",
      password: "hashed_password_4",
      role: "admin",
      createdAt: "2025-06-15T08:00:00Z",
      updatedAt: "2025-09-01T18:10:00Z",
    },
    {
      id: 5,
      username: "mikeUser",
      email: "mike123@yahoo.com",
      password: "hashed_password_5",
      role: "user",
      createdAt: "2025-09-05T12:25:00Z",
      updatedAt: "2025-09-11T09:50:00Z",
    },
    {
      id: 1,
      username: "adminMaster",
      email: "admin@fintech.com",
      password: "hashed_password_1",
      role: "admin",
      createdAt: "2025-09-01T10:15:00Z",
      updatedAt: "2025-09-10T14:20:00Z",
    },
    {
      id: 2,
      username: "johnDoe",
      email: "john.doe@gmail.com",
      password: "hashed_password_2",
      role: "user",
      createdAt: "2025-08-20T09:45:00Z",
      updatedAt: "2025-09-09T11:30:00Z",
    },
    {
      id: 3,
      username: "sarahInvestor",
      email: "sarah.investor@finmail.com",
      password: "hashed_password_3",
      role: "user",
      createdAt: "2025-07-12T13:05:00Z",
      updatedAt: "2025-09-05T16:45:00Z",
    },
    {
      id: 4,
      username: "fintechAdmin",
      email: "admin.support@fintech.com",
      password: "hashed_password_4",
      role: "admin",
      createdAt: "2025-06-15T08:00:00Z",
      updatedAt: "2025-09-01T18:10:00Z",
    },
    {
      id: 5,
      username: "mikeUser",
      email: "mike123@yahoo.com",
      password: "hashed_password_5",
      role: "user",
      createdAt: "2025-09-05T12:25:00Z",
      updatedAt: "2025-09-11T09:50:00Z",
    },
    {
      id: 1,
      username: "adminMaster",
      email: "admin@fintech.com",
      password: "hashed_password_1",
      role: "admin",
      createdAt: "2025-09-01T10:15:00Z",
      updatedAt: "2025-09-10T14:20:00Z",
    },
    {
      id: 2,
      username: "johnDoe",
      email: "john.doe@gmail.com",
      password: "hashed_password_2",
      role: "user",
      createdAt: "2025-08-20T09:45:00Z",
      updatedAt: "2025-09-09T11:30:00Z",
    },
    {
      id: 3,
      username: "sarahInvestor",
      email: "sarah.investor@finmail.com",
      password: "hashed_password_3",
      role: "user",
      createdAt: "2025-07-12T13:05:00Z",
      updatedAt: "2025-09-05T16:45:00Z",
    },
    {
      id: 4,
      username: "fintechAdmin",
      email: "admin.support@fintech.com",
      password: "hashed_password_4",
      role: "admin",
      createdAt: "2025-06-15T08:00:00Z",
      updatedAt: "2025-09-01T18:10:00Z",
    },
    {
      id: 5,
      username: "mikeUser",
      email: "mike123@yahoo.com",
      password: "hashed_password_5",
      role: "user",
      createdAt: "2025-09-05T12:25:00Z",
      updatedAt: "2025-09-11T09:50:00Z",
    },
  ];


  const paginationModel = { page: 0, pageSize: 5 };


  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12">
          <h5 className="mb-1">User Management</h5>
          <p className="text-muted mb-4">
            List of all users, their roles, status, and available actions.
          </p>
          <Paper className="custom-paper">
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              // checkboxSelection
              sx={{ border: 0 }}
            />
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default Users;
