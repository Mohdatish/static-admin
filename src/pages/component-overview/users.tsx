"use client";

import { useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    IconButton,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Pagination,
    Grid,
    Drawer,
    Button,
    Stack,
    FormHelperText,
} from "@mui/material";
import { DeleteOutlined, EditOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";

export default function Users() {
    const [search, setSearch] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("");
    const [drawerOpen, setDrawerOpen] = useState(false);

    // User form state
    const [form, setForm] = useState({
        name: "",
        email: "",
        role: "",
        status: "Active",
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        role: "",
    });

    const users = [
        { id: 1, name: "John Doe", email: "john@example.com", role: "Manager", status: "Active" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Employee", status: "Inactive" },
        { id: 3, name: "Michael Brown", email: "mike@example.com", role: "Admin", status: "Active" },
    ];

    const handleFormChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: "" }));
    };

    const validateForm = () => {
        let valid = true;
        let newErrors: any = { name: "", email: "", role: "" };

        if (!form.name) {
            newErrors.name = "Name is required";
            valid = false;
        } else if (form.name.length > 100) {
            newErrors.name = "Name cannot exceed 100 characters";
            valid = false;
        }

        if (!form.email) {
            newErrors.email = "Email is required";
            valid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
            newErrors.email = "Invalid email format";
            valid = false;
        }

        if (!form.role) {
            newErrors.role = "Role is required";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSaveUser = () => {
        if (!validateForm()) return;
        console.log("User created:", form);
        setDrawerOpen(false);
        setForm({ name: "", email: "", role: "", status: "Active" });
    };

    return (
        <Box p={1}>
            {/* Heading */}
            <Typography variant="h6" fontWeight={600} mb={0}>
                User Management
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" mb={3}>
                Manage all users, update roles, and control account access.
            </Typography>

            {/* Search + Filters */}
            <Card sx={{ mb: 3, boxShadow: 'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px', }}>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <button className="custom-button" onClick={() => setDrawerOpen(true)}>Add User</button>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                placeholder="Search by name or email"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <IconButton>
                                            <SearchOutlined />
                                        </IconButton>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 2 }}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Role</InputLabel>
                                <Select value={role} onChange={(e) => setRole(e.target.value)} label="Role">
                                    <MenuItem value="">All</MenuItem>
                                    <MenuItem value="Admin">Admin</MenuItem>
                                    <MenuItem value="Manager">Manager</MenuItem>
                                    <MenuItem value="Employee">Employee</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12, md: 2 }}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Status</InputLabel>
                                <Select value={status} onChange={(e) => setStatus(e.target.value)} label="Status">
                                    <MenuItem value="">All</MenuItem>
                                    <MenuItem value="Active">Active</MenuItem>
                                    <MenuItem value="Inactive">Inactive</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* User Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ backgroundColor: "grey.100" }}>
                        <TableRow>
                            <TableCell><b>Name</b></TableCell>
                            <TableCell><b>Email</b></TableCell>
                            <TableCell><b>Role</b></TableCell>
                            <TableCell><b>Status</b></TableCell>
                            <TableCell align="right"><b>Actions</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id} hover>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>{user.status}</TableCell>
                                <TableCell align="right">
                                    <IconButton color="primary"><EyeOutlined /></IconButton>
                                    <IconButton color="warning"><EditOutlined /></IconButton>
                                    <IconButton color="error"><DeleteOutlined /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <Box display="flex" justifyContent="center" mt={3}>
                <Pagination count={5} color="primary" />
            </Box>

            {/* Drawer for Add User */}
            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box sx={{ width: 400, p: 3 }}>
                    <Typography variant="h6" mb={2}>Create User</Typography>
                    <Stack spacing={2}>
                        <TextField
                            label="Name"
                            fullWidth
                            size="small"
                            value={form.name}
                            onChange={(e) => handleFormChange("name", e.target.value)}
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                        <TextField
                            label="Email"
                            fullWidth
                            size="small"
                            value={form.email}
                            onChange={(e) => handleFormChange("email", e.target.value)}
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                        <FormControl fullWidth error={!!errors.role} size="small">
                            <InputLabel>Role</InputLabel>
                            <Select value={form.role} onChange={(e) => handleFormChange("role", e.target.value)} label="Role">
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value="Admin">Admin</MenuItem>
                                <MenuItem value="Manager">Manager</MenuItem>
                                <MenuItem value="Employee">Employee</MenuItem>
                            </Select>
                            {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
                        </FormControl>
                        <FormControl fullWidth size="small">
                            <InputLabel>Status</InputLabel>
                            <Select value={form.status} onChange={(e) => handleFormChange("status", e.target.value)} label="Status">
                                <MenuItem value="Active">Active</MenuItem>
                                <MenuItem value="Inactive">Inactive</MenuItem>
                            </Select>
                        </FormControl>
                        <button className="custom-button" onClick={handleSaveUser}>Save User</button>
                    </Stack>
                </Box>
            </Drawer>
        </Box>
    );
}
