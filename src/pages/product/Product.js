// import { useState } from "react";
// import {
//     Box,
//     Card,
//     CardContent,
//     Typography,
//     TextField,
//     IconButton,
//     MenuItem,
//     Select,
//     InputLabel,
//     FormControl,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     Pagination,
//     Stack,
//     Button,
//     Drawer,
//     Checkbox,
//     FormControlLabel,
//     FormHelperText,
//     Grid,
// } from "@mui/material";
// import { BackPaper } from "../../components/Styles";
// // import { DeleteOutlined, EditOutlined, EyeOutlined, ProductOutlined, SearchOutlined } from "@ant-design/icons";

// export default function Product() {
//     const [search, setSearch] = useState("");
//     const [status, setStatus] = useState("");
//     const [openDrawer, setOpenDrawer] = useState(false);

// const [form, setForm] = useState({
//     fspCode: "",
//     fspName: "",
//     productCode: "",
//     productName: "",
//     minTenure: "",
//     maxTenure: "",
//     interestRate: "",
//     processingFee: "",
//     insurance: "",
//     minAmount: "",
//     maxAmount: "",
//     repaymentType: "",
//     insuranceType: "",
//     productDescription: "",
//     termsCondition: "",
//     forExecutive: false,
//     shariaFacility: false,
//     deductionCode: "",
// });

// const [errors, setErrors] = useState({});



// const products = [
//     {
//         id: 1,
//         productCode: "LA1001",
//         productName: "Mkopo wa Simu",
//         minTenure: 12,
//         maxTenure: 24,
//         interestRate: 10,
//         insurance: 0.75,
//         status: "Active",
//     },
//     {
//         id: 2,
//         productCode: "LA1002",
//         productName: "Mkopo Wa Fedha",
//         minTenure: 12,
//         maxTenure: 24,
//         interestRate: 5,
//         insurance: 7,
//         status: "Inactive",
//     },
// ];

// const handleFormChange = (field, value) => {
//     setForm((prev) => ({ ...prev, [field]: value }));

//     // Inline validation
//     let error = "";
//     switch (field) {
//         case "fspCode":
//             if (!value) error = "FSP Code is required";
//             else if (value.length > 10) error = "Max 10 characters";
//             break;
//         case "fspName":
//             if (!value) error = "FSP Name is required";
//             else if (value.length > 100) error = "Max 100 characters";
//             break;
//         case "productCode":
//             if (!value) error = "Product Code is required";
//             else if (value.length > 8) error = "Max 8 characters";
//             break;
//         case "productName":
//             if (!value) error = "Product Name is required";
//             else if (value.length > 255) error = "Max 255 characters";
//             break;
//         case "deductionCode":
//             if (!value) error = "Deduction Code is required";
//             else if (value.length > 10) error = "Max 10 characters";
//             break;
//         case "minTenure":
//         case "maxTenure":
//             if (!value) error = "This field is required";
//             else if (+value > 999) error = "Max 3 digits";
//             break;
//         case "interestRate":
//         case "processingFee":
//         case "insurance":
//             if (field !== "processingFee" && !value) error = "This field is required";
//             else if (+value > 999.99) error = "Max 3,2 digits";
//             break;
//         case "minAmount":
//         case "maxAmount":
//             if (!value) error = "This field is required";
//             else if (+value > 99999999999999999999999999999999999999)
//                 error = "Max 38,2 digits";
//             break;
//         case "insuranceType":
//             if (!value) error = "Insurance Type is required";
//             else if (value.length > 50) error = "Max 50 characters";
//             break;
//         case "termsCondition":
//             if (!value) error = "Terms & Conditions required";
//             else if (value.length > 255) error = "Max 255 characters";
//             break;
//     }
//     setErrors((prev) => ({ ...prev, [field]: error }));
// };

// const handleSaveProduct = () => {
//     // Check all required fields
//     const requiredFields = [
//         "fspCode",
//         "fspName",
//         "productCode",
//         "productName",
//         "minTenure",
//         "maxTenure",
//         "interestRate",
//         "insurance",
//         "minAmount",
//         "maxAmount",
//         "deductionCode",
//         "insuranceType",
//         "termsCondition",
//     ];
//     const newErrors = {};
//     requiredFields.forEach((field) => {
//         if (!form[field]) {
//             newErrors[field] = "This field is required";
//         }
//     });

//     setErrors(newErrors);

//     if (Object.keys(newErrors).length === 0) {
//         console.log("Saved Product:", form);
//         setOpenDrawer(false);
//         setForm({
//             fspCode: "",
//             fspName: "",
//             productCode: "",
//             productName: "",
//             minTenure: "",
//             maxTenure: "",
//             interestRate: "",
//             processingFee: "",
//             insurance: "",
//             minAmount: "",
//             maxAmount: "",
//             repaymentType: "",
//             insuranceType: "",
//             productDescription: "",
//             termsCondition: "",
//             forExecutive: false,
//             shariaFacility: false,
//             deductionCode: "",
//         });
//         setErrors({});
//     }
// };

//     return (
//         <Box p={1}>
//             <Typography variant="h6" fontWeight={600} mb={0}>
//                 Product Management
//             </Typography>
//             <Typography variant="subtitle1" color="text.secondary" mb={3}>
//                 Manage product catalog, update product details, and control availability.
//             </Typography>

//             {/* Search + Filters */}
//             <BackPaper>
//                 <div className="d-flex gap-3 justify-content-start align-items-center">
//                     <button onClick={() => setOpenDrawer(true)} className="custom-button">
//                             Add Product
//                         </button>
//                     <TextField
//                             fullWidth
//                             variant="outlined"
//                             size="small"
//                             placeholder="Search by product code or name"
//                             value={search}
//                             onChange={(e) => setSearch(e.target.value)}
//                             InputProps={{
//                                 startAdornment: <IconButton></IconButton>,
//                             }}
//                         />
//                   <FormControl fullWidth size="small">
//                             <InputLabel>Status</InputLabel>
//                             <Select
//                                 value={status}
//                                 onChange={(e) => setStatus(e.target.value)}
//                                 label="Status"
//                             >
//                                 <MenuItem value="">All</MenuItem>
//                                 <MenuItem value="Active">Active</MenuItem>
//                                 <MenuItem value="Inactive">Inactive</MenuItem>
//                             </Select>
//                         </FormControl>
//                 </div>
//                 {/* <Grid container spacing={2}>
//                     <Grid size={{ xs: 6, md: 4 }}>
//                         <button onClick={() => setOpenDrawer(true)} className="custom-button">
//                             Add Product
//                         </button>
//                     </Grid>
//                     <Grid size={{ xs: 6, md: 3 }}></Grid>
//                     <Grid size={{ xs: 6, md: 3 }}>

//                         <TextField
//                             fullWidth
//                             variant="outlined"
//                             size="small"
//                             placeholder="Search by product code or name"
//                             value={search}
//                             onChange={(e) => setSearch(e.target.value)}
//                             InputProps={{
//                                 startAdornment: <IconButton></IconButton>,
//                             }}
//                         />
//                     </Grid>
//                     <Grid size={{ xs: 6, md: 2 }}>

//                         <FormControl fullWidth size="small">
//                             <InputLabel>Status</InputLabel>
//                             <Select
//                                 value={status}
//                                 onChange={(e) => setStatus(e.target.value)}
//                                 label="Status"
//                             >
//                                 <MenuItem value="">All</MenuItem>
//                                 <MenuItem value="Active">Active</MenuItem>
//                                 <MenuItem value="Inactive">Inactive</MenuItem>
//                             </Select>
//                         </FormControl>
//                     </Grid>
//                 </Grid> */}
//             </BackPaper>

//             {/* Product Table */}
//             <TableContainer component={Paper}>
//                 <Table>
//                     <TableHead sx={{ backgroundColor: "grey.100" }}>
//                         <TableRow>
//                             <TableCell><b>Product Code</b></TableCell>
//                             <TableCell><b>Product Name</b></TableCell>
//                             <TableCell><b>Min Tenure</b></TableCell>
//                             <TableCell><b>Max Tenure</b></TableCell>
//                             <TableCell><b>Interest Rate (%)</b></TableCell>
//                             <TableCell><b>Insurance (%)</b></TableCell>
//                             <TableCell><b>Status</b></TableCell>
//                             <TableCell align="right"><b>Actions</b></TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {products.map((product) => (
//                             <TableRow key={product.id} hover>
//                                 <TableCell>{product.productCode}</TableCell>
//                                 <TableCell>{product.productName}</TableCell>
//                                 <TableCell>{product.minTenure}</TableCell>
//                                 <TableCell>{product.maxTenure}</TableCell>
//                                 <TableCell>{product.interestRate}</TableCell>
//                                 <TableCell>{product.insurance}</TableCell>
//                                 <TableCell>{product.status}</TableCell>
//                                 <TableCell align="right">
//                                     {/* <IconButton color="primary"><EyeOutlined/></IconButton>
//                                     <IconButton color="warning"><EditOutlined /></IconButton>
//                                     <IconButton color="error"><DeleteOutlined /></IconButton> */}
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             <Box display="flex" justifyContent="center" mt={3}>
//                 <Pagination count={5} color="primary" />
//             </Box>

//             {/* Right-side Drawer for Product Form */}
//             <Drawer
//                 anchor="right"
//                 open={openDrawer}
//                 onClose={() => setOpenDrawer(false)}
//             >
//                 <Box sx={{ width: 500, p: 3 }}>
//                     <Typography variant="h6" sx={{ display: "flex", alignItems: 'center', gap: '10px' }} mb={1}> Add Product</Typography>
//                     <Stack spacing={2}>
//                         {/* FSP Code */}
//                         <TextField
//                             label="FSP Code"
//                             fullWidth
//                             size="small"
//                             value={form.fspCode}
//                             onChange={(e) => handleFormChange("fspCode", e.target.value)}
//                             error={!!errors.fspCode}
//                             helperText={errors.fspCode}
//                         />
//                         {/* FSP Name */}
//                         <TextField
//                             label="FSP Name"
//                             fullWidth
//                             size="small"
//                             value={form.fspName}
//                             onChange={(e) => handleFormChange("fspName", e.target.value)}
//                             error={!!errors.fspName}
//                             helperText={errors.fspName}
//                         />
//                         {/* Product Code */}
//                         <TextField
//                             label="Product Code"
//                             fullWidth
//                             size="small"
//                             value={form.productCode}
//                             onChange={(e) => handleFormChange("productCode", e.target.value)}
//                             error={!!errors.productCode}
//                             helperText={errors.productCode}
//                         />
//                         {/* Product Name */}
//                         <TextField
//                             label="Product Name"
//                             fullWidth
//                             size="small"
//                             value={form.productName}
//                             onChange={(e) => handleFormChange("productName", e.target.value)}
//                             error={!!errors.productName}
//                             helperText={errors.productName}
//                         />
//                         {/* Deduction Code */}
//                         <TextField
//                             label="Deduction Code"
//                             fullWidth
//                             size="small"
//                             value={form.deductionCode}
//                             onChange={(e) => handleFormChange("deductionCode", e.target.value)}
//                             error={!!errors.deductionCode}
//                             helperText={errors.deductionCode}
//                         />
//                         {/* Product Description */}
//                         <TextField
//                             label="Product Description"
//                             fullWidth
//                             size="small"
//                             value={form.productDescription}
//                             onChange={(e) => handleFormChange("productDescription", e.target.value)}
//                         />
//                         {/* Tenure */}
//                         <TextField
//                             label="Min Tenure"
//                             type="number"
//                             fullWidth
//                             size="small"
//                             value={form.minTenure}
//                             onChange={(e) => handleFormChange("minTenure", e.target.value)}
//                             error={!!errors.minTenure}
//                             helperText={errors.minTenure}
//                         />
//                         <TextField
//                             label="Max Tenure"
//                             type="number"
//                             fullWidth
//                             size="small"
//                             value={form.maxTenure}
//                             onChange={(e) => handleFormChange("maxTenure", e.target.value)}
//                             error={!!errors.maxTenure}
//                             helperText={errors.maxTenure}
//                         />
//                         {/* Interest, Processing, Insurance */}
//                         <Stack direction="row" spacing={2}>
//                             <TextField
//                                 label="Interest Rate (%)"
//                                 type="number"
//                                 fullWidth
//                                 size="small"
//                                 value={form.interestRate}
//                                 onChange={(e) => handleFormChange("interestRate", e.target.value)}
//                                 error={!!errors.interestRate}
//                                 helperText={errors.interestRate}
//                             />
//                             <TextField
//                                 label="Processing Fee (%)"
//                                 type="number"
//                                 fullWidth
//                                 size="small"
//                                 value={form.processingFee}
//                                 onChange={(e) => handleFormChange("processingFee", e.target.value)}
//                                 error={!!errors.processingFee}
//                                 helperText={errors.processingFee}
//                             />
//                             <TextField
//                                 label="Insurance (%)"
//                                 type="number"
//                                 fullWidth
//                                 size="small"
//                                 value={form.insurance}
//                                 onChange={(e) => handleFormChange("insurance", e.target.value)}
//                                 error={!!errors.insurance}
//                                 helperText={errors.insurance}
//                             />
//                         </Stack>
//                         {/* Min/Max Amount */}
//                         <Stack direction="row" spacing={2}>
//                             <TextField
//                                 label="Min Amount"
//                                 type="number"
//                                 fullWidth
//                                 size="small"
//                                 value={form.minAmount}
//                                 onChange={(e) => handleFormChange("minAmount", e.target.value)}
//                                 error={!!errors.minAmount}
//                                 helperText={errors.minAmount}
//                             />
//                             <TextField
//                                 label="Max Amount"
//                                 type="number"
//                                 fullWidth
//                                 size="small"
//                                 value={form.maxAmount}
//                                 onChange={(e) => handleFormChange("maxAmount", e.target.value)}
//                                 error={!!errors.maxAmount}
//                                 helperText={errors.maxAmount}
//                             />
//                         </Stack>
//                         {/* Repayment Type */}
//                         <FormControl fullWidth size="small">
//                             <InputLabel>Repayment Type</InputLabel>
//                             <Select
//                                 value={form.repaymentType}
//                                 onChange={(e) => handleFormChange("repaymentType", e.target.value)}
//                             >
//                                 <MenuItem value="Flat">Flat</MenuItem>
//                                 <MenuItem value="Reducing">Reducing</MenuItem>
//                             </Select>
//                         </FormControl>
//                         {/* Insurance Type */}
//                         <FormControl fullWidth error={!!errors.insuranceType} size="small">
//                             <InputLabel>Insurance Type</InputLabel>
//                             <Select
//                                 value={form.insuranceType}
//                                 onChange={(e) => handleFormChange("insuranceType", e.target.value)}
//                             >
//                                 <MenuItem value="UP_FRONT">Up Front</MenuItem>
//                                 <MenuItem value="DISTRIBUTED">Distributed</MenuItem>
//                             </Select>
//                             {errors.insuranceType && <FormHelperText>{errors.insuranceType}</FormHelperText>}
//                         </FormControl>
//                         {/* Terms & Conditions */}
//                         <TextField
//                             label="Terms & Conditions"
//                             multiline
//                             rows={3}
//                             size="small"
//                             fullWidth
//                             value={form.termsCondition}
//                             onChange={(e) => handleFormChange("termsCondition", e.target.value)}
//                             error={!!errors.termsCondition}
//                             helperText={errors.termsCondition}
//                         />
//                         {/* Checkboxes */}
//                         <Stack direction="row" spacing={2}>
//                             <FormControlLabel
//                                 control={<Checkbox checked={form.forExecutive} onChange={(e) => handleFormChange("forExecutive", e.target.checked)} />}
//                                 label="For Executive"
//                             />
//                             <FormControlLabel
//                                 control={<Checkbox checked={form.shariaFacility} onChange={(e) => handleFormChange("shariaFacility", e.target.checked)} />}
//                                 label="Sharia Facility"
//                             />
//                         </Stack>
//                         <Stack direction="row" spacing={2}>
//                             <button className="custom-button" onClick={() => setOpenDrawer(false)}>Cancel</button>
//                             <button className="custom-button" onClick={handleSaveProduct} disabled={Object.keys(errors).length > 0}>Save</button>
//                         </Stack>
//                     </Stack>
//                 </Box>
//             </Drawer>
//         </Box>
//     );
// }


import React, { useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import {  Delete, Edit, LockOpen, Trash2 } from "lucide-react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Stack,
    Checkbox,
    FormControlLabel,
    FormHelperText,
} from "@mui/material";

const Product = () => {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [form, setForm] = useState({
        fspCode: "",
        fspName: "",
        productCode: "",
        productName: "",
        minTenure: "",
        maxTenure: "",
        interestRate: "",
        processingFee: "",
        insurance: "",
        minAmount: "",
        maxAmount: "",
        repaymentType: "",
        insuranceType: "",
        productDescription: "",
        termsCondition: [],
        forExecutive: false,
        shariaFacility: false,
        deductionCode: "",
    });

    const [errors, setErrors] = useState({});



    const handleFormChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));

        // Inline validation
        let error = "";
        switch (field) {
            case "fspCode":
                if (!value) error = "FSP Code is required";
                else if (value.length > 10) error = "Max 10 characters";
                break;
            case "fspName":
                if (!value) error = "FSP Name is required";
                else if (value.length > 100) error = "Max 100 characters";
                break;
            case "productCode":
                if (!value) error = "Product Code is required";
                else if (value.length > 8) error = "Max 8 characters";
                break;
            case "productName":
                if (!value) error = "Product Name is required";
                else if (value.length > 255) error = "Max 255 characters";
                break;
            case "deductionCode":
                if (!value) error = "Deduction Code is required";
                else if (value.length > 10) error = "Max 10 characters";
                break;
            case "minTenure":
            case "maxTenure":
                if (!value) error = "This field is required";
                else if (+value > 999) error = "Max 3 digits";
                break;
            case "interestRate":
            case "processingFee":
            case "insurance":
                if (field !== "processingFee" && !value) error = "This field is required";
                else if (+value > 999.99) error = "Max 3,2 digits";
                break;
            case "minAmount":
            case "maxAmount":
                if (!value) error = "This field is required";
                else if (+value > 99999999999999999999999999999999999999)
                    error = "Max 38,2 digits";
                break;
            case "insuranceType":
                if (!value) error = "Insurance Type is required";
                else if (value.length > 50) error = "Max 50 characters";
                break;
            case "termsCondition":
                if (!form.termsCondition.length) error = "At least one term is required";
                else {
                    form.termsCondition.forEach((t, i) => {
                        if (!t.termNumber || !t.description || !t.effectiveDate) {
                            error = `Term ${i + 1} is incomplete`;
                        }
                    });
                }
                break;
            default:
            return
        }
        setErrors((prev) => ({ ...prev, [field]: error }));
    };

    const handleSaveProduct = () => {
        // Check all required fields
        const requiredFields = [
            "fspCode",
            "fspName",
            "productCode",
            "productName",
            "minTenure",
            "maxTenure",
            "interestRate",
            "insurance",
            "minAmount",
            "maxAmount",
            "deductionCode",
            "insuranceType",
            "termsCondition",
        ];
        const newErrors = {};
        requiredFields.forEach((field) => {
            if (!form[field]) {
                newErrors[field] = "This field is required";
            }
        });
        if (!form.termsCondition || form.termsCondition.length === 0) {
            newErrors["termsCondition"] = "At least one term is required";
        } else {
            form.termsCondition.forEach((term, index) => {
                if (!term || term.trim() === "") {
                    newErrors[`termsCondition.${index}`] = "This term cannot be empty";
                }
            });
        }
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log("Saved Product:", form);
            setForm({
                fspCode: "",
                fspName: "",
                productCode: "",
                productName: "",
                minTenure: "",
                maxTenure: "",
                interestRate: "",
                processingFee: "",
                insurance: "",
                minAmount: "",
                maxAmount: "",
                repaymentType: "",
                insuranceType: "",
                productDescription: "",
                termsCondition: "",
                forExecutive: false,
                shariaFacility: false,
                deductionCode: "",
            });
            setErrors({});
        }
    };

    const handleAddTerm = () => {
        setForm((prev) => ({
            ...prev,
            termsCondition: [
                ...prev.termsCondition,
                { termNumber: "", description: "", effectiveDate: "" },
            ],
        }));
    };

    const handleRemoveTerm = (index) => {
        setForm((prev) => ({
            ...prev,
            termsCondition: prev.termsCondition.filter((_, i) => i !== index),
        }));
    };

    const handleTermChange = (index, field, value) => {
        const updatedTerms = [...form.termsCondition];
        updatedTerms[index][field] = value;
        setForm((prev) => ({ ...prev, termsCondition: updatedTerms }));
    };



    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "name", headerName: "Product Name", width: 180 },
        { field: "interestRate", headerName: "Interest Rate (%)", width: 160 },
        { field: "tenureMonths", headerName: "Tenure (Months)", width: 160 },
        { field: "maxAmount", headerName: "Max Amount", width: 160 },
        {
            field: "createdAt",
            headerName: "Created At",
            width: 180,
            valueGetter: (params) =>
                new Date(params.row.createdAt).toLocaleString(),
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            sortable: false,
            renderCell: (params) => (
                <div className="d-flex justify-content-center gap-2 align-items-center">
                    <LockOpen
                        size={20}
                        style={{ cursor: "pointer", color: "green" }}
                        onClick={() => console.log("Unlock product:", params.row.id)}
                    />
                    <Edit
                        size={20}
                        style={{ cursor: "pointer", color: "blue" }}
                        onClick={() => console.log("Edit product:", params.row.id)}
                    />
                    <Delete
                        size={20}
                        style={{ cursor: "pointer", color: "red" }}
                        onClick={() => console.log("Delete product:", params.row.id)}
                    />
                </div>
            ),
        },
    ];


    const loanProducts = [
        {
            id: 1,
            name: "Personal Loan",
            description: "Unsecured loan for personal needs",
            interestRate: 12.5,
            tenureMonths: 36,
            maxAmount: 500000,
            createdAt: "2025-07-01T09:00:00Z",
            updatedAt: "2025-09-10T10:30:00Z",
        },
        {
            id: 2,
            name: "Home Loan",
            description: "Loan for purchasing residential property",
            interestRate: 8.2,
            tenureMonths: 240,
            maxAmount: 5000000,
            createdAt: "2025-06-12T14:20:00Z",
            updatedAt: "2025-09-12T12:15:00Z",
        },
        {
            id: 3,
            name: "Car Loan",
            description: "Loan for buying a new or used car",
            interestRate: 9.5,
            tenureMonths: 60,
            maxAmount: 2000000,
            createdAt: "2025-05-20T11:15:00Z",
            updatedAt: "2025-09-11T08:50:00Z",
        },
        {
            id: 4,
            name: "Education Loan",
            description: "Loan to finance higher education",
            interestRate: 10.0,
            tenureMonths: 84,
            maxAmount: 1500000,
            createdAt: "2025-07-15T10:00:00Z",
            updatedAt: "2025-09-08T13:45:00Z",
        },
        {
            id: 5,
            name: "Business Loan",
            description: "Loan for SMEs and startups",
            interestRate: 14.0,
            tenureMonths: 120,
            maxAmount: 10000000,
            createdAt: "2025-08-01T09:30:00Z",
            updatedAt: "2025-09-13T17:20:00Z",
        },
    ];

    const paginationModel = { page: 0, pageSize: 5 };




    return (
        <div className="container">
            <div className="row">
                <div className="col-xs-12">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h5 className="mb-1">Product Management</h5>
                            <p className="text-muted mb-4">
                                Manage product catalog, update product details, and control availability.
                            </p>
                        </div>
                        <button className="custom-button" onClick={handleClickOpen('paper')}>Add Product</button>
                    </div>
                    <Paper className="custom-paper">
                        <DataGrid
                            rows={loanProducts}
                            columns={columns}
                            initialState={{ pagination: { paginationModel } }}
                            pageSizeOptions={[5, 10]}
                            // checkboxSelection
                            sx={{ border: 0 }}
                        />
                    </Paper>
                </div>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="lg"
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Add Product</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <Stack spacing={2}>
                            {/* FSP Code */}
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    label="FSP Code"
                                    fullWidth
                                    size="small"
                                    value={form.fspCode}
                                    onChange={(e) => handleFormChange("fspCode", e.target.value)}
                                    error={!!errors.fspCode}
                                    helperText={errors.fspCode}
                                />
                                {/* FSP Name */}
                                <TextField
                                    label="FSP Name"
                                    fullWidth
                                    size="small"
                                    value={form.fspName}
                                    onChange={(e) => handleFormChange("fspName", e.target.value)}
                                    error={!!errors.fspName}
                                    helperText={errors.fspName}
                                />
                            </Stack>
                            {/* Product Code */}
                            <TextField
                                label="Product Code"
                                fullWidth
                                size="small"
                                value={form.productCode}
                                onChange={(e) => handleFormChange("productCode", e.target.value)}
                                error={!!errors.productCode}
                                helperText={errors.productCode}
                            />
                            {/* Product Name */}
                            <TextField
                                label="Product Name"
                                fullWidth
                                size="small"
                                value={form.productName}
                                onChange={(e) => handleFormChange("productName", e.target.value)}
                                error={!!errors.productName}
                                helperText={errors.productName}
                            />
                            {/* Deduction Code */}
                            <TextField
                                label="Deduction Code"
                                fullWidth
                                size="small"
                                value={form.deductionCode}
                                onChange={(e) => handleFormChange("deductionCode", e.target.value)}
                                error={!!errors.deductionCode}
                                helperText={errors.deductionCode}
                            />
                            {/* Product Description */}
                            <TextField
                                label="Product Description"
                                fullWidth
                                multiline
                                rows={3}
                                size="small"
                                value={form.productDescription}
                                onChange={(e) => handleFormChange("productDescription", e.target.value)}
                            />
                            {/* Tenure */}
                            <TextField
                                label="Min Tenure"
                                type="number"
                                fullWidth
                                size="small"
                                value={form.minTenure}
                                onChange={(e) => handleFormChange("minTenure", e.target.value)}
                                error={!!errors.minTenure}
                                helperText={errors.minTenure}
                            />
                            <TextField
                                label="Max Tenure"
                                type="number"
                                fullWidth
                                size="small"
                                value={form.maxTenure}
                                onChange={(e) => handleFormChange("maxTenure", e.target.value)}
                                error={!!errors.maxTenure}
                                helperText={errors.maxTenure}
                            />
                            {/* Interest, Processing, Insurance */}
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    label="Interest Rate (%)"
                                    type="number"
                                    fullWidth
                                    size="small"
                                    value={form.interestRate}
                                    onChange={(e) => handleFormChange("interestRate", e.target.value)}
                                    error={!!errors.interestRate}
                                    helperText={errors.interestRate}
                                />
                                <TextField
                                    label="Processing Fee (%)"
                                    type="number"
                                    fullWidth
                                    size="small"
                                    value={form.processingFee}
                                    onChange={(e) => handleFormChange("processingFee", e.target.value)}
                                    error={!!errors.processingFee}
                                    helperText={errors.processingFee}
                                />
                                <TextField
                                    label="Insurance (%)"
                                    type="number"
                                    fullWidth
                                    size="small"
                                    value={form.insurance}
                                    onChange={(e) => handleFormChange("insurance", e.target.value)}
                                    error={!!errors.insurance}
                                    helperText={errors.insurance}
                                />
                            </Stack>
                            {/* Min/Max Amount */}
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    label="Min Amount"
                                    type="number"
                                    fullWidth
                                    size="small"
                                    value={form.minAmount}
                                    onChange={(e) => handleFormChange("minAmount", e.target.value)}
                                    error={!!errors.minAmount}
                                    helperText={errors.minAmount}
                                />
                                <TextField
                                    label="Max Amount"
                                    type="number"
                                    fullWidth
                                    size="small"
                                    value={form.maxAmount}
                                    onChange={(e) => handleFormChange("maxAmount", e.target.value)}
                                    error={!!errors.maxAmount}
                                    helperText={errors.maxAmount}
                                />
                            </Stack>
                            {/* Repayment Type */}
                            <FormControl fullWidth size="small">
                                <InputLabel>Repayment Type</InputLabel>
                                <Select
                                    value={form.repaymentType}
                                    onChange={(e) => handleFormChange("repaymentType", e.target.value)}
                                >
                                    <MenuItem value="Flat">Flat</MenuItem>
                                    <MenuItem value="Reducing">Reducing</MenuItem>
                                </Select>
                            </FormControl>
                            {/* Insurance Type */}
                            <FormControl fullWidth error={!!errors.insuranceType} size="small">
                                <InputLabel>Insurance Type</InputLabel>
                                <Select
                                    value={form.insuranceType}
                                    onChange={(e) => handleFormChange("insuranceType", e.target.value)}
                                >
                                    <MenuItem value="UP_FRONT">Up Front</MenuItem>
                                    <MenuItem value="DISTRIBUTED">Distributed</MenuItem>
                                </Select>
                                {errors.insuranceType && <FormHelperText>{errors.insuranceType}</FormHelperText>}
                            </FormControl>
                            {/* Terms & Conditions */}
                            <Stack spacing={2}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <h6>Terms & Conditions</h6>
                                    {form?.termsCondition?.length === 0 &&
                                        <button className="custom-button" onClick={handleAddTerm}>+ Add Term</button>
                                    }
                                </Stack>

                                {form.termsCondition.map((term, index) => (
                                    <>
                                        <Stack direction="row" spacing={2}>
                                            <TextField
                                                label="Term Number"
                                                fullWidth
                                                size="small"
                                                value={term.termNumber}
                                                error={!!errors?.termsCondition?.[index]?.termNumber}
                                                helperText={errors?.termsCondition?.[index]?.termNumber}
                                                onChange={(e) => handleTermChange(index, "termNumber", e.target.value)}
                                            />
                                            <TextField
                                                label="Effective Date"
                                                type="date"
                                                fullWidth
                                                size="small"
                                                InputLabelProps={{ shrink: true }}
                                                value={term.effectiveDate}
                                                error={!!errors?.termsCondition?.[index]?.effectiveDate}
                                                helperText={errors?.termsCondition?.[index]?.effectiveDate}
                                                onChange={(e) => handleTermChange(index, "effectiveDate", e.target.value)}
                                            />
                                        </Stack>

                                        <TextField
                                            label="Description"
                                            fullWidth
                                            multiline
                                            rows={2}
                                            size="small"
                                            sx={{ mt: 1 }}
                                            error={!!errors?.termsCondition?.[index]?.description}
                                            helperText={errors?.termsCondition?.[index]?.description}
                                            value={term.description}
                                            onChange={(e) => handleTermChange(index, "description", e.target.value)}
                                        />

                                        <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
                                            <Trash2 className="icon" size={20} onClick={() => handleRemoveTerm(index)} />
                                            {form?.termsCondition.length === index + 1 && (
                                                <button className="custom-button" onClick={handleAddTerm}>+ Add Term</button>
                                            )}
                                        </Stack>
                                    </>
                                ))}
                                {errors.termsCondition && (
                                    <FormHelperText error>{errors.termsCondition}</FormHelperText>
                                )}
                            </Stack>
                            {/* Checkboxes */}
                            <Stack direction="row" spacing={2}>
                                <FormControlLabel
                                    control={<Checkbox checked={form.forExecutive} onChange={(e) => handleFormChange("forExecutive", e.target.checked)} />}
                                    label="For Executive"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={form.shariaFacility} onChange={(e) => handleFormChange("shariaFacility", e.target.checked)} />}
                                    label="Sharia Facility"
                                />
                            </Stack>
                        </Stack>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button className="custom-button" onClick={handleClose}>Cancel</button>
                    <button className="custom-button" onClick={handleSaveProduct}>Create</button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Product;
