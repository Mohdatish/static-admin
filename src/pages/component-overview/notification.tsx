"use client";

import { useState } from "react";
import { Box, Typography, Table, TableHead, TableBody, TableCell, TableRow, TableContainer, Paper, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

// Sample notification types
const notificationTypes = [
  "Loan Offer Approval",
  "Top Up Verification",
  "Disbursement Notification",
  "Disbursement Failure",
  "Top Up Cancellation",
  "Employee Cancellation",
  "Loan Restructuring Initiated",
  "Restructuring Approval",
  "Restructuring Rejection",
  "Loan Restructured",
  "Loan Restructured Failure",
  "Loan Liquidation",
  "Loan Status Request",
  "Loan Status Response",
  "Defaulter Details",
  "Deduction Stop",
  "General Response",
];

export default function NotificationManagement() {
  const [filterType, setFilterType] = useState("");

  // Mock data
  const notifications = [
    { id: 1, type: "Loan Offer Approval", status: "Pending", message: "Loan offer sent from FSP to ESS" },
    { id: 2, type: "Disbursement Failure", status: "Failed", message: "Disbursement failed for LA1001" },
    { id: 3, type: "Loan Liquidation", status: "Completed", message: "Loan liquidation completed for employee 1234" },
  ];

  const filtered = filterType ? notifications.filter(n => n.type === filterType) : notifications;

  return (
    <Box p={1}>
      <Typography variant="h5" fontWeight={600} mb={3}>Notification Management</Typography>

      <FormControl  sx={{minWidth:"200px", mb: 2 }} size="small">
        <InputLabel>Filter by Type</InputLabel>
        <Select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <MenuItem value="">All</MenuItem>
          {notificationTypes.map((type) => <MenuItem key={type} value={type}>{type}</MenuItem>)}
        </Select>
      </FormControl>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Message</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map(n => (
              <TableRow key={n.id}>
                <TableCell>{n.id}</TableCell>
                <TableCell>{n.type}</TableCell>
                <TableCell>{n.status}</TableCell>
                <TableCell>{n.message}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
