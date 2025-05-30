// "use client";
// import "../leads/leads.scss"; // Ensure to import your CSS
// import { API_BASE_URL } from "@/utlis";
// import axios from "axios";
// import { Button } from "primereact/button";
// import { Card } from "primereact/card";
// import { InputText } from "primereact/inputtext";
// import { Password } from "primereact/password";
// import React, { useEffect, useState } from "react";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import Select from "react-select";
// import { Dropdown } from "primereact/dropdown";
// import { useUserContext } from "@/app/ui/context/usecontext";
// import { Sidebar } from "primereact/sidebar";
// import { InputTextarea } from "primereact/inputtextarea";
// import { FloatLabel } from "primereact/floatlabel";
// import { Col, Row, Tooltip } from "react-bootstrap";
// import { InputSwitch } from "primereact/inputswitch";
// import * as xlsx from "xlsx";
// import { jsPDF } from "jspdf";

// export default function Page() {
//   const [name, setName] = useState("");
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [selectedStatus, setSelectedStatus] = useState(null);
//   const [selectedSource, setSelectedSource] = useState(null);
//   const [selectedAssigned, setSelectedAssigned] = useState(null);
//   const [industry, setIndustry] = useState("");
//   const [show, setShow] = useState(false);
//   const [nodes, setNodes] = useState([]);
//   const [assignedList, setAssignedList] = useState([]);
//   const [description, setDescription] = useState("");
//   const [isActive, setIsActive] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const accessToken = localStorage.getItem("accessToken");

//   const { backgroundColor, textColor, fontFamily } = useUserContext();

//   const statuses = [
//     { label: "New", value: "new" },
//     { label: "In Progress", value: "in-progress" },
//     { label: "Closed", value: "closed" },
//     { label: "Converted", value: "converted" },
//   ];

//   const sources = [
//     { label: "Website", value: "website" },
//     { label: "Facebook", value: "facebook" },
//     { label: "Instagram", value: "instagram" },
//     { label: "Offline", value: "offline" },
//   ];

//   const industries = [
//     { label: "Healthcare", value: "healthcare" },
//     { label: "Financial Services", value: "financial-services" },
//     { label: "E-commerce", value: "ecommerce" },
//     { label: "Manufacturing", value: "manufacturing" },
//     { label: "Real Estate", value: "real-estate" },
//     { label: "Education", value: "education" },
//     { label: "Hospitality", value: "hospitality" },
//     { label: "Technology & IT Services", value: "technology-it" },
//     { label: "Automotive", value: "automotive" },
//   ];

//   const handleShow = () => {
//     setShow((prev) => !prev);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       await axios.post(
//         `${API_BASE_URL}/lead/admin`,
//         {
//           name,
//           mobileNumber,
//           email,
//           password,
//           status: selectedStatus,
//           source: selectedSource,
//           assigned: selectedAssigned,
//           description,
//           industry,
//           isActive,
//         },
//         { headers: { Authorization: `Bearer ${accessToken}` } }
//       );

//       // Reset form fields
//       setName("");
//       setMobileNumber("");
//       setEmail("");
//       setPassword("");
//       setSelectedStatus(null);
//       setSelectedSource(null);
//       setSelectedAssigned(null);
//       setIndustry("");
//       setDescription("");
//       setShow(false);
//     } catch (error) {
//       setError("Error submitting the form. Please try again.");
//       console.error("Error submitting the form", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const fetchAssignedList = async () => {
//       try {
//         const response = await axios.get(`${API_BASE_URL}/admin/asignedlist`, {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         });
//         setAssignedList(response.data.data.admins);
//       } catch (error) {
//         console.error("Error fetching assigned list", error);
//       }
//     };

//     fetchAssignedList();
//   }, [accessToken]);

//   useEffect(() => {
//     const fetchLeads = async () => {
//       try {
//         const response = await axios.get(`${API_BASE_URL}/lead`, {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         });
//         setNodes(response.data.leads.data);
//       } catch (error) {
//         console.error("Error fetching leads", error);
//       }
//     };

//     fetchLeads();
//   }, [accessToken]);

//   const options = assignedList.map((item) => ({
//     value: item.id,
//     label: (
//       <div className="flex items-center">
//         <img
//           src={item.profileImage}
//           alt=""
//           width="30"
//           style={{ borderRadius: "50%", marginRight: "8px" }}
//         />
//         {item.firstName} {item.lastName}
//       </div>
//     ),
//   }));
//   const saveAsExcelFile = (buffer, fileName) => {
//     const data = new Blob([buffer], { type: EXCEL_TYPE });
//     const url = window.URL.createObjectURL(data);
//     const link = document.createElement("a");
//     link.href = url;
//     link.setAttribute("download", `${fileName}.xlsx`);
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const EXCEL_TYPE =
//     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

//   const exportExcel = async () => {
//     try {
//       const xlsx = await import("xlsx");
//       const worksheet = xlsx.utils.json_to_sheet(nodes);
//       const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
//       const excelBuffer = xlsx.write(workbook, {
//         bookType: "xlsx",
//         type: "array",
//       });

//       saveAsExcelFile(excelBuffer, "Leads Data");
//     } catch (error) {
//       console.error("Error exporting Excel:", error);
//       alert("Failed to export Excel file.");
//     }
//   };

//   // const exportExcel = async () => {
//   //   try {
//   //     const xlsx = await import("xlsx");
//   //     const worksheet = xlsx.utils.json_to_sheet(nodes);
//   //     const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
//   //     const excelBuffer = xlsx.write(workbook, { bookType: "xlsx", type: "array" });

//   //     saveAsExcelFile(excelBuffer, "Leads Data");
//   //   } catch (error) {
//   //     console.error("Error exporting Excel:", error);
//   //     alert("Failed to export Excel file.");
//   //   }
//   // };

//   // Export PDF function (with sample output object)
//   const exportPdf = async () => {
//     try {
//       const jsPDF = await import("jspdf");
//       await import("jspdf-autotable");

//       const doc = new jsPDF.default();

//       if (nodes && nodes.length) {
//         const columns = Object.keys(nodes[0]).map((key) => ({
//           header: key,
//           dataKey: key,
//         }));

//         doc.autoTable({
//           head: [columns],
//           body: nodes,
//         });

//         doc.save("Leads Data.pdf");
//       } else {
//         alert("No data available to export.");
//       }
//     } catch (error) {
//       console.error("Error exporting PDF:", error);
//       alert("Failed to export PDF file.");
//     }
//   };

//   const header = (
//     <div className="flex align-items-center justify-content-end gap-2">
//       <Button
//         type="button"
//         icon="pi pi-file-excel"
//         severity="success"
//         rounded
//         onClick={exportExcel}
//         data-pr-tooltip="XLS"
//         aria-label="Export to Excel"
//       />
//       <Button
//         type="button"
//         icon="pi pi-file-pdf"
//         severity="warning"
//         rounded
//         onClick={exportPdf}
//         data-pr-tooltip="PDF"
//         aria-label="Export to PDF"
//       />
//     </div>
//   );

//   return (
//     <>
//       <div className="container">
//         <div style={{ textAlign: "end" }}>
//           <Button onClick={handleShow}  style={{ color: textColor, fontFamily, background: backgroundColor }}>Add a Leads</Button>
//         </div>
//       </div>

//       <Sidebar
//         style={{ color: textColor, fontFamily, background: backgroundColor }}
//         visible={show}
//         position="right"
//         onHide={() => setShow(false)}
//         className="w-full md:w-20rem lg:w-5 lg:h-1"
//       >
//         <h2 className="text-center">Add a Leads</h2>
//         {error && <div className="error-message">{error}</div>}
//         <div className="lay-solute">
//           <form
//             onSubmit={handleSubmit}
//             style={{
//               color: textColor,
//               fontFamily,
//               background: backgroundColor,
//             }}
//           >
//             <div className="leads-layout">
//               <Row
//                 className="flex form-layout-leads"
//                 style={{
//                   color: textColor,
//                   fontFamily,
//                   background: backgroundColor,
//                 }}
//               >
//                 <Col md={6} className="m-2">
//                   <label htmlFor="name" style={{ fontWeight: 600 }}>
//                     Name:
//                   </label>
//                   <InputText
//                     id="name"
//                     type="text"
//                     placeholder="Name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     required
//                   />
//                 </Col>
//                 <Col md={6} className="m-2">
//                   <label htmlFor="email" style={{ fontWeight: 600 }}>
//                     Email:
//                   </label>
//                   <InputText
//                     id="email"
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </Col>
//               </Row>

//               <Row
//                 className="flex form-layout-leads"
//                 style={{
//                   color: textColor,
//                   fontFamily,
//                   background: backgroundColor,
//                 }}
//               >
//                 <Col>
//                   <label htmlFor="mobile" style={{ fontWeight: 600 }}>
//                     Mobile Number:
//                   </label>
//                   <InputText
//                     id="mobile"
//                     type="text"
//                     placeholder="Mobile Number"
//                     value={mobileNumber}
//                     onChange={(e) => setMobileNumber(e.target.value)}
//                     required
//                   />
//                 </Col>
//                 <Col>
//                   <label htmlFor="password" style={{ fontWeight: 600 }}>
//                     Password:
//                   </label>
//                   <Password
//                     id="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                     toggleMask
//                   />
//                 </Col>
//               </Row>

//               <Row
//                 className="flex form-layout-leads"
//                 style={{
//                   color: textColor,
//                   fontFamily,
//                   background: backgroundColor,
//                 }}
//               >
//                 <Col>
//                   <label htmlFor="source" style={{ fontWeight: 600 }}>
//                     Source:
//                   </label>
//                   <Dropdown
//                     id="source"
//                     value={selectedSource}
//                     options={sources}
//                     onChange={(e) => setSelectedSource(e.value)}
//                     placeholder="Select Source"
//                     className="w-full md:w-14rem"
//                   />
//                 </Col>
//                 <Col>
//                   <label htmlFor="status" style={{ fontWeight: 600 }}>
//                     Status:
//                   </label>
//                   <Dropdown
//                     id="status"
//                     value={selectedStatus}
//                     options={statuses}
//                     onChange={(e) => setSelectedStatus(e.value)}
//                     placeholder="Select Status"
//                     className="w-full md:w-14rem"
//                   />
//                 </Col>
//               </Row>

//               <Row
//                 className="flex form-layout-leads"
//                 style={{
//                   color: textColor,
//                   fontFamily,
//                   background: backgroundColor,
//                 }}
//               >
//                 <Col>
//                   <label htmlFor="industry" style={{ fontWeight: 600 }}>
//                     Industry:
//                   </label>
//                   <Dropdown
//                     id="industry"
//                     value={industry}
//                     options={industries}
//                     onChange={(e) => setIndustry(e.value)}
//                     placeholder="Select Industry"
//                     className="w-full md:w-14rem"
//                   />
//                 </Col>
//                 <Col>
//                   <label htmlFor="assigned" style={{ fontWeight: 600 }}>
//                     Assigned To:
//                   </label>
//                   <Select
//                     options={options}
//                     value={selectedAssigned}
//                     onChange={(selected) => setSelectedAssigned(selected.value)}
//                     className="w-full md:w-14rem p-2 input-dropdown text-black"
//                     placeholder="Assign to"
//                   />
//                 </Col>
//               </Row>

//               <div
//                 className="form-layout-leads flex"
//                 style={{
//                   color: textColor,
//                   fontFamily,
//                   background: backgroundColor,
//                 }}
//               >
//                 <div>
//                   <FloatLabel>
//                     <InputTextarea
//                       id="description"
//                       value={description}
//                       onChange={(e) => setDescription(e.target.value)}
//                       rows={5}
//                       cols={30}
//                     />
//                     <label htmlFor="description">Description</label>
//                   </FloatLabel>
//                 </div>

//                 <div className="form-layouts-lead ml-5">
//                   <label style={{ fontWeight: 600 }}>isActive:</label>
//                   <div className="card flex justify-content-center">
//                     <InputSwitch
//                       checked={isActive}
//                       onChange={(e) => setIsActive(e.value)}
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div
//                 className="form-layout-leads"
//                 style={{
//                   color: textColor,
//                   fontFamily,
//                   background: backgroundColor,
//                 }}
//               >
//                 <div className="flex justify-content-between my-auto">
//                   <Button
//                     style={{
//                       color: textColor,
//                       fontFamily,
//                       background: backgroundColor,
//                     }}
//                     type="submit"
//                     severity="warning"
//                     className="me-2"
//                     disabled={loading}
//                   >
//                     {loading ? "Submitting..." : "Submit"}
//                   </Button>
//                   <Button
//                     type="button"
//                     severity="warning"
//                     onClick={handleShow}
//                     style={{
//                       color: textColor,
//                       fontFamily,
//                       background: backgroundColor,
//                     }}
//                   >
//                     Close
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </form>
//         </div>
//       </Sidebar>

//       <div className="mt-4">
//         <Card
//           style={{ color: textColor, fontFamily, background: backgroundColor }}
//         >
//           <Tooltip
//             target=".export-buttons>button"
//             position="bottom"
//             // className="bg-primary"
//             style={{
//               color: textColor,
//               fontFamily,
//               background: backgroundColor,
//             }}
//           />
//           <DataTable
//             value={nodes}
//             tableStyle={{ minWidth: "50rem" }}
//             header={header}
//             className="
//             bg-surface-800"
//             style={{}}
//           >
//             <Column
//               field="name"
//               header="Name"
//               sortable
//               style={{
//                 color: textColor,
//                 fontFamily,
//                 background: backgroundColor,
//               }}
//             />
//             <Column
//               field="email"
//               header="Email"
//               sortable
//               style={{
//                 color: textColor,
//                 fontFamily,
//                 background: backgroundColor,
//               }}
//             />
//             <Column
//               field="mobileNumber"
//               header="Mobile Number"
//               sortable
//               style={{
//                 color: textColor,
//                 fontFamily,
//                 background: backgroundColor,
//               }}
//             />
//             <Column
//               field="status"
//               header="Status"
//               sortable
//               style={{
//                 color: textColor,
//                 fontFamily,
//                 background: backgroundColor,
//               }}
//             />
//           </DataTable>
//         </Card>
//       </div>
//     </>
//   );
// }
'use client';
import React, { useState, useEffect } from 'react';
import {
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	FormControl,
	Grid,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Snackbar,
	TextField,
	Typography,
	Switch,
	FormControlLabel,
	Tooltip,
} from '@mui/material';
import {
	Add as AddIcon,
	Close as CloseIcon,
	Delete as DeleteIcon,
	Edit as EditIcon,
	Description as DescriptionIcon,
	PictureAsPdf as PdfIcon,
	GridOn as ExcelIcon,
	Save as SaveIcon,
	Cancel as CancelIcon,
} from '@mui/icons-material';
import { DataGrid, GridColDef, GridActionsCellItem, GridRowId } from '@mui/x-data-grid';
import axios from 'axios';
import { API_BASE_URL } from '@/utlis';
import { useUserContext } from '@/app/ui/context/usecontext';
import { GridToolbar } from '@mui/x-data-grid/internals';

interface Lead {
	id: string;
	name: string;
	email: string;
	mobileNumber: string;
	status: string;
	source: string;
	assigned: string;
	assignedName?: string;
	industry: string;
	description: string;
	isActive: boolean;
}

interface Admin {
	id: string;
	firstName: string;
	lastName: string;
	profileImage: string;
}

const statusOptions = [
	{ value: 'new', label: 'New' },
	{ value: 'in-progress', label: 'In Progress' },
	{ value: 'closed', label: 'Closed' },
	{ value: 'converted', label: 'Converted' },
];

const sourceOptions = [
	{ value: 'website', label: 'Website' },
	{ value: 'facebook', label: 'Facebook' },
	{ value: 'instagram', label: 'Instagram' },
	{ value: 'offline', label: 'Offline' },
];

const industryOptions = [
	{ value: 'healthcare', label: 'Healthcare' },
	{ value: 'financial-services', label: 'Financial Services' },
	{ value: 'ecommerce', label: 'E-commerce' },
	{ value: 'manufacturing', label: 'Manufacturing' },
	{ value: 'real-estate', label: 'Real Estate' },
	{ value: 'education', label: 'Education' },
	{ value: 'hospitality', label: 'Hospitality' },
	{ value: 'technology-it', label: 'Technology & IT Services' },
	{ value: 'automotive', label: 'Automotive' },
];

export default function LeadsPage() {
	const [leads, setLeads] = useState<Lead[]>([]);
	const [admins, setAdmins] = useState<Admin[]>([]);
	const [openDialog, setOpenDialog] = useState(false);
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [leadToDelete, setLeadToDelete] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [currentLeadId, setCurrentLeadId] = useState<string | null>(null);
	const [snackbar, setSnackbar] = useState({
		open: false,
		message: '',
		severity: 'success' as 'success' | 'error',
	});

	const [formData, setFormData] = useState<Omit<Lead, 'id'>>({
		name: '',
		email: '',
		mobileNumber: '',
		status: '',
		source: '',
		assigned: '',
		industry: '',
		description: '',
		isActive: false,
	});

	// const { backgroundColor, textColor, fontFamily } = useUserContext();
	const accessToken = localStorage.getItem('accessToken');

	const columns: GridColDef[] = [
		{ field: 'name', headerName: 'Name', width: 200, editable: true },
		{ field: 'email', headerName: 'Email', width: 250, editable: true },
		{ field: 'mobileNumber', headerName: 'Mobile', width: 150, editable: true },
		{
			field: 'status',
			headerName: 'Status',
			width: 150,
			editable: true,
			type: 'singleSelect',
			valueOptions: statusOptions.map((option) => option.value),
			renderCell: (params: any) => (
				<Chip
					label={params.value}
					color={
						params.value === 'new'
							? 'primary'
							: params.value === 'in-progress'
								? 'warning'
								: params.value === 'converted'
									? 'success'
									: 'error'
					}
				/>
			),
		},
		{
			field: 'source',
			headerName: 'Source',
			width: 150,
			editable: true,
			type: 'singleSelect',
			valueOptions: sourceOptions.map((option) => option.value),
		},
		{
			field: 'industry',
			headerName: 'Industry',
			width: 180,
			editable: true,
			type: 'singleSelect',
			valueOptions: industryOptions.map((option) => option.value),
		},
		{
			field: 'assignedName',
			headerName: 'Assigned To',
			width: 200,
		},
		{
			field: 'isActive',
			headerName: 'Active',
			width: 100,
			type: 'boolean',
			editable: true,
			renderCell: (params) => <Switch checked={params.value as boolean} disabled />,
		},
		{
			field: 'actions',
			type: 'actions',
			headerName: 'Actions',
			width: 100,
			cellClassName: 'actions',
			getActions: ({ id }) => {
				return [
					<GridActionsCellItem
						icon={<EditIcon />}
						label="Edit"
						className="textPrimary"
						onClick={() => handleEditClick(id)}
						color="inherit"
					/>,
					<GridActionsCellItem
						icon={<DeleteIcon />}
						label="Delete"
						onClick={() => handleDeleteClick(id)}
						color="inherit"
					/>,
				];
			},
		},
	];

	useEffect(() => {
		fetchLeads();
		fetchAdmins();
	}, []);

	const fetchLeads = async () => {
		try {
			const response = await axios.get(`${API_BASE_URL}/lead`, {
				headers: { Authorization: `Bearer ${accessToken}` },
			});
			const leadsWithAssignedNames = response.data.leads.data.map((lead: Lead) => {
				const assignedAdmin = admins.find((admin) => admin.id === lead.assigned);
				return {
					...lead,
					assignedName: assignedAdmin
						? `${assignedAdmin.firstName} ${assignedAdmin.lastName}`
						: '',
				};
			});
			setLeads(leadsWithAssignedNames);
		} catch (error) {
			console.error('Error fetching leads', error);
			showSnackbar('Error fetching leads', 'error');
		}
	};

	const fetchAdmins = async () => {
		try {
			const response = await axios.get(`${API_BASE_URL}/admin/asignedlist`, {
				headers: { Authorization: `Bearer ${accessToken}` },
			});
			setAdmins(response.data.data.admins);
		} catch (error) {
			console.error('Error fetching admins', error);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSelectChange = (e: SelectChangeEvent<string>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = e.target;
		setFormData((prev) => ({ ...prev, [name]: checked }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			if (isEditing && currentLeadId) {
				await axios.put(`${API_BASE_URL}/lead/${currentLeadId}`, formData, {
					headers: { Authorization: `Bearer ${accessToken}` },
				});
				showSnackbar('Lead updated successfully', 'success');
			} else {
				await axios.post(`${API_BASE_URL}/lead/admin`, formData, {
					headers: { Authorization: `Bearer ${accessToken}` },
				});
				showSnackbar('Lead created successfully', 'success');
			}

			setOpenDialog(false);
			resetForm();
			fetchLeads();
		} catch (error) {
			console.error('Error submitting form', error);
			showSnackbar('Error saving lead', 'error');
		} finally {
			setLoading(false);
		}
	};

	const handleEditClick = (id: GridRowId) => {
		const leadToEdit = leads.find((lead) => lead.id === id);
		if (leadToEdit) {
			setFormData({
				name: leadToEdit.name,
				email: leadToEdit.email,
				mobileNumber: leadToEdit.mobileNumber,
				status: leadToEdit.status,
				source: leadToEdit.source,
				assigned: leadToEdit.assigned,
				industry: leadToEdit.industry,
				description: leadToEdit.description,
				isActive: leadToEdit.isActive,
			});
			setIsEditing(true);
			setCurrentLeadId(id.toString());
			setOpenDialog(true);
		}
	};

	const handleDeleteClick = (id: GridRowId) => {
		setLeadToDelete(id.toString());
		setOpenDeleteDialog(true);
	};

	const handleConfirmDelete = async () => {
		if (!leadToDelete) return;

		try {
			await axios.delete(`${API_BASE_URL}/lead/${leadToDelete}`, {
				headers: { Authorization: `Bearer ${accessToken}` },
			});
			showSnackbar('Lead deleted successfully', 'success');
			fetchLeads();
		} catch (error) {
			console.error('Error deleting lead', error);
			showSnackbar('Error deleting lead', 'error');
		} finally {
			setOpenDeleteDialog(false);
			setLeadToDelete(null);
		}
	};

	const handleProcessRowUpdate = async (newRow: Lead) => {
		try {
			await axios.put(`${API_BASE_URL}/lead/${newRow.id}`, newRow, {
				headers: { Authorization: `Bearer ${accessToken}` },
			});
			showSnackbar('Lead updated successfully', 'success');
			return newRow;
		} catch (error) {
			console.error('Error updating lead', error);
			showSnackbar('Error updating lead', 'error');
			return leads.find((lead) => lead.id === newRow.id) || newRow;
		}
	};

	const resetForm = () => {
		setFormData({
			name: '',
			email: '',
			mobileNumber: '',
			status: '',
			source: '',
			assigned: '',
			industry: '',
			description: '',
			isActive: false,
		});
		setIsEditing(false);
		setCurrentLeadId(null);
	};

	const showSnackbar = (message: string, severity: 'success' | 'error') => {
		setSnackbar({ open: true, message, severity });
	};

	const handleCloseSnackbar = () => {
		setSnackbar((prev) => ({ ...prev, open: false }));
	};

	const exportToExcel = () => {
		// Implement Excel export logic
		showSnackbar('Export to Excel functionality coming soon', 'success');
	};

	const exportToPdf = () => {
		// Implement PDF export logic
		showSnackbar('Export to PDF functionality coming soon', 'success');
	};

	return (
		<Box sx={{ p: 3 }}>
			<Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
				Leads Management
			</Typography>

			<Card sx={{ mb: 3 }}>
				<CardContent>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							mb: 2,
						}}
					>
						<Typography variant="h6">All Leads</Typography>
						<Box>
							<Tooltip title="Export to Excel">
								<IconButton onClick={exportToExcel} sx={{ mr: 1 }}>
									<ExcelIcon />
								</IconButton>
							</Tooltip>
							<Tooltip title="Export to PDF">
								<IconButton onClick={exportToPdf} sx={{ mr: 1 }}>
									<PdfIcon />
								</IconButton>
							</Tooltip>
							<Button
								variant="contained"
								startIcon={<AddIcon />}
								onClick={() => {
									resetForm();
									setOpenDialog(true);
								}}
							>
								Add Lead
							</Button>
						</Box>
					</Box>

					<Divider sx={{ my: 2 }} />

					<Box sx={{ height: 600, width: '100%' }}>
						<DataGrid
							rows={leads}
							columns={columns}
							pageSizeOptions={[5, 10, 25]}
							slots={{ toolbar: GridToolbar }}
							slotProps={{
								toolbar: {
									showQuickFilter: true,
								},
							}}
							processRowUpdate={handleProcessRowUpdate}
							onProcessRowUpdateError={(error) => {
								console.error('Row update error:', error);
								showSnackbar('Error updating lead', 'error');
							}}
						/>
					</Box>
				</CardContent>
			</Card>

			{/* Add/Edit Lead Dialog */}
			<Dialog
				open={openDialog}
				onClose={() => {
					setOpenDialog(false);
					resetForm();
				}}
				maxWidth="md"
				fullWidth
			>
				<DialogTitle>{isEditing ? 'Edit Lead' : 'Add New Lead'}</DialogTitle>
				<DialogContent dividers>
					<form onSubmit={handleSubmit}>
						<Grid container spacing={3}>
							<Grid size={{ xs: 12, md: 6 }}>
								<TextField
									fullWidth
									label="Name"
									name="name"
									value={formData.name}
									onChange={handleInputChange}
									required
								/>
							</Grid>
							<Grid size={{ xs: 12, md: 6 }}>
								<TextField
									fullWidth
									label="Email"
									name="email"
									type="email"
									value={formData.email}
									onChange={handleInputChange}
									required
								/>
							</Grid>
							<Grid size={{ xs: 12, md: 6 }}>
								<TextField
									fullWidth
									label="Mobile Number"
									name="mobileNumber"
									value={formData.mobileNumber}
									onChange={handleInputChange}
									required
								/>
							</Grid>
							<Grid size={{ xs: 12, md: 6 }}>
								<FormControl fullWidth>
									<InputLabel>Status</InputLabel>
									<Select
										label="Status"
										name="status"
										value={formData.status}
										onChange={handleSelectChange}
										required
									>
										{statusOptions.map((option) => (
											<MenuItem key={option.value} value={option.value}>
												{option.label}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
							<Grid size={{ xs: 12, md: 6 }}>
								<FormControl fullWidth>
									<InputLabel>Source</InputLabel>
									<Select
										label="Source"
										name="source"
										value={formData.source}
										onChange={handleSelectChange}
										required
									>
										{sourceOptions.map((option) => (
											<MenuItem key={option.value} value={option.value}>
												{option.label}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
							<Grid size={{ xs: 12, md: 6 }}>
								<FormControl fullWidth>
									<InputLabel>Assigned To</InputLabel>
									<Select
										label="Assigned To"
										name="assigned"
										value={formData.assigned}
										onChange={handleSelectChange}
									>
										{admins.map((admin) => (
											<MenuItem key={admin.id} value={admin.id}>
												{admin.firstName} {admin.lastName}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
							<Grid size={{ xs: 12, md: 6 }}>
								<FormControl fullWidth>
									<InputLabel>Industry</InputLabel>
									<Select
										label="Industry"
										name="industry"
										value={formData.industry}
										onChange={handleSelectChange}
									>
										{industryOptions.map((option) => (
											<MenuItem key={option.value} value={option.value}>
												{option.label}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
							<Grid size={{ xs: 12, md: 6 }}>
								<FormControlLabel
									control={
										<Switch
											name="isActive"
											checked={formData.isActive}
											onChange={handleSwitchChange}
										/>
									}
									label="Active"
								/>
							</Grid>
							<Grid size={{ xs: 12, md: 12 }}>
								<TextField
									fullWidth
									label="Description"
									name="description"
									value={formData.description}
									onChange={handleInputChange}
									multiline
									rows={4}
								/>
							</Grid>
						</Grid>
					</form>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => {
							setOpenDialog(false);
							resetForm();
						}}
						startIcon={<CancelIcon />}
					>
						Cancel
					</Button>
					<Button
						onClick={handleSubmit}
						variant="contained"
						disabled={loading}
						startIcon={<SaveIcon />}
					>
						{loading ? 'Saving...' : 'Save'}
					</Button>
				</DialogActions>
			</Dialog>

			{/* Delete Confirmation Dialog */}
			<Dialog
				open={openDeleteDialog}
				onClose={() => setOpenDeleteDialog(false)}
				maxWidth="sm"
				fullWidth
			>
				<DialogTitle>Confirm Delete</DialogTitle>
				<DialogContent>
					<Typography>
						Are you sure you want to delete this lead? This action cannot be undone.
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
					<Button
						onClick={handleConfirmDelete}
						variant="contained"
						color="error"
						startIcon={<DeleteIcon />}
					>
						Delete
					</Button>
				</DialogActions>
			</Dialog>

			{/* Snackbar */}
			<Snackbar
				open={snackbar.open}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			>
				<Box
					sx={{
						backgroundColor: snackbar.severity === 'success' ? '#4caf50' : '#f44336',
						color: '#fff',
						p: 2,
						borderRadius: 1,
						display: 'flex',
						alignItems: 'center',
					}}
				>
					<Typography sx={{ mr: 2 }}>{snackbar.message}</Typography>
					<IconButton size="small" color="inherit" onClick={handleCloseSnackbar}>
						<CloseIcon fontSize="small" />
					</IconButton>
				</Box>
			</Snackbar>
		</Box>
	);
}
