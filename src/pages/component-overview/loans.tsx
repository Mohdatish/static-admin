"use client";

import { useState } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

// Sample loan statuses
const loanStatuses = ["Active", "Closed", "Pending", "Defaulted", "Restructured"];

export default function LoanManagement() {
  const [statusFilter, setStatusFilter] = useState("");

  const loans = [
    { id: 1, product: "Mkopo wa Simu", employee: "John Doe", amount: 500000, status: "Active" },
    { id: 2, product: "Mkopo Wa Fedha", employee: "Jane Smith", amount: 1000000, status: "Pending" },
  ];

  const filtered = statusFilter ? loans.filter(l => l.status === statusFilter) : loans;

  return (
    <Box p={1}>
      <Typography variant="h5" fontWeight={600} mb={3}>Loan Management</Typography>

      <FormControl fullWidth sx={{ mb: 2 }} size="small">
        <InputLabel>Filter by Status</InputLabel>
        <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <MenuItem value="">All</MenuItem>
          {loanStatuses.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
        </Select>
      </FormControl>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Employee</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map(l => (
              <TableRow key={l.id}>
                <TableCell>{l.id}</TableCell>
                <TableCell>{l.employee}</TableCell>
                <TableCell>{l.product}</TableCell>
                <TableCell>{l.amount}</TableCell>
                <TableCell>{l.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
