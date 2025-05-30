// // "use client";
// // import "../leads/leads.scss"; // Ensure to import your CSS
// // import { API_BASE_URL } from "@/utlis";
// // import axios from "axios";
// // import { Button } from "primereact/button";
// // import { InputText } from "primereact/inputtext";
// // import React, { useEffect, useState } from "react";
// // import { Dropdown } from "primereact/dropdown";
// // import { useUserContext } from "@/app/ui/context/usecontext";
// // import { Sidebar } from "primereact/sidebar";
// // import { Card, Col, Row } from "react-bootstrap";
// // import UserDatatable from "./userDatatable";
// // import Swal from "sweetalert2"; // Import SweetAlert2
// // import { useFormik } from "formik";
// // import * as Yup from "yup";
// // import { InputMask } from "primereact/inputmask";

// // // Validation schema using Yup
// // const validationSchema = Yup.object({
// //   companyName: Yup.string().required("Company name is required"),
// //   plan: Yup.string().required("Plan is required"),
// //   industry: Yup.string().required("Industry is required"),
// //   admin: Yup.object({
// //     firstname: Yup.string().required("First name is required"),
// //     lastname: Yup.string().required("Last name is required"),
// //     mobile: Yup.string()
// //       .required("Mobile number is required")
// //       .matches(/^\+91-\d{10}$/, "Mobile number must be in the format +91-XXXXXXXXXX"),
// //     email: Yup.string().email("Invalid email").required("Email is required"),
// //     userRole: Yup.string().required("User role is required"),
// //     address: Yup.object({
// //       street: Yup.string().required("Street is required"),
// //       city: Yup.string().required("City is required"),
// //       state: Yup.string().required("State is required"),
// //       country: Yup.string().required("Country is required"),
// //       zipCode: Yup.string().required("Zip Code is required"),
// //     }),
// //   }),
// // });

// // // Reusable Input Field Component
// // const TextField = ({ name, label, formik }) => (
// //   <div>
// //     <label>{label}</label>
// //     <InputText
// //       name={name}
// //       value={formik.values[name]}
// //       onChange={formik.handleChange}
// //       onBlur={formik.handleBlur}
// //     />
// //     {formik.errors[name] && formik.touched[name] && (
// //       <div style={{ color: "red", fontSize: "small" }}>
// //         {formik.errors[name]}
// //       </div>
// //     )}
// //   </div>
// // );

// // // Company Form Component
// // const CompanyForm = ({ onSubmit, loading, error, industries, options }) => {
// //   const formik = useFormik({
// //     initialValues: {
// //       companyName: "",
// //       plan: null,
// //       industry: null,
// //       admin: {
// //         firstname: "",
// //         lastname: "",
// //         mobile: "",
// //         email: "",
// //         userRole: "Super Admin",
// //         address: {
// //           street: "",
// //           city: "",
// //           state: "",
// //           country: "",
// //           zipCode: "",
// //         },
// //       },
// //     },
// //     validationSchema,
// //     onSubmit: (values) => {
// //       const dataToSubmit = {
// //         ...values,
// //         admin: {
// //           ...values.admin,
// //           email: values.admin.email.toLowerCase(),
// //         },
// //       };
// //       onSubmit(dataToSubmit);
// //     },
// //   });

// //   return (
// //     <form onSubmit={formik.handleSubmit}>
// //       <h2>Create Company</h2>
// //       {error && <div style={{ color: "red", fontSize: "small" }}>{error}</div>}

// //       <Row>
// //         <Col>
// //           <TextField name="companyName" label="Company Name" formik={formik} />
// //         </Col>
// //       </Row>

// //       <h3>Admin Details</h3>
// //       <Row>
// //         {["firstname", "lastname", "email"].map((field) => (
// //           <Col lg={6} key={field}>
// //             <Card>
// //               <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
// //               <br />
// //               <InputText
// //                 name={`admin.${field}`}
// //                 value={formik.values.admin[field]}
// //                 onChange={formik.handleChange}
// //                 onBlur={formik.handleBlur}
// //               />
// //               {formik.errors.admin && formik.errors.admin[field] && formik.touched.admin?.[field] && (
// //                 <div style={{ color: "red", fontSize: "small" }}>
// //                   {formik.errors.admin[field]}
// //                 </div>
// //               )}
// //             </Card>
// //           </Col>
// //         ))}
// //       </Row>

// //       <Row>
// //         <Col md={6}>
// //           <Card>
// //             <label>User Role</label>
// //             <br />
// //             <InputText
// //               name={`admin.userRole`}
// //               value={formik.values.admin.userRole}
// //               onChange={formik.handleChange}
// //               onBlur={formik.handleBlur}
// //             />
// //             {formik.errors.admin?.userRole && formik.touched.admin?.userRole && (
// //               <div style={{ color: "red", fontSize: "small" }}>
// //                 {formik.errors.admin.userRole}
// //               </div>
// //             )}
// //           </Card>
// //         </Col>
// //         <Col md={6}>
// //           <Card>
// //             <label>Mobile</label>
// //             <br />
// //             <InputMask
// //               mask="+91-9999999999"
// //               name="admin.mobile"
// //               type="tel"
// //               value={formik.values.admin.mobile}
// //               onChange={formik.handleChange}
// //               onBlur={formik.handleBlur}
// //             />
// //             {formik.errors.admin?.mobile && formik.touched.admin?.mobile && (
// //               <div style={{ color: "red", fontSize: "small" }}>
// //                 {formik.errors.admin.mobile}
// //               </div>
// //             )}
// //           </Card>
// //         </Col>
// //         <Col md={6}>
// //           <Card>
// //             <label>Plan</label>
// //             <br />
// //             <Dropdown
// //               name="plan"
// //               value={formik.values.plan}
// //               options={options}
// //               onChange={(e) => formik.setFieldValue("plan", e.value)}
// //               onBlur={formik.handleBlur}
// //             />
// //             {formik.errors.plan && formik.touched.plan && (
// //               <div style={{ color: "red", fontSize: "small" }}>
// //                 {formik.errors.plan}
// //               </div>
// //             )}
// //           </Card>
// //         </Col>
// //         <Col md={6}>
// //           <Card>
// //             <label>Industry</label>
// //             <br />
// //             <Dropdown
// //               name="industry"
// //               value={formik.values.industry}
// //               options={industries}
// //               onChange={(e) => formik.setFieldValue("industry", e.value)}
// //               onBlur={formik.handleBlur}
// //             />
// //             {formik.errors.industry && formik.touched.industry && (
// //               <div style={{ color: "red", fontSize: "small" }}>
// //                 {formik.errors.industry}
// //               </div>
// //             )}
// //           </Card>
// //         </Col>
// //       </Row>

// //       <Row>
// //         <Col>
// //           <Card>
// //             <label>Address</label>
// //             {["street", "city", "state", "country", "zipCode"].map((field) => (
// //               <Col lg={6} key={field}>
// //                 <Card>
// //                   <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
// //                   <br />
// //                   <InputText
// //                     name={`admin.address.${field}`}
// //                     value={formik.values.admin.address[field]}
// //                     onChange={formik.handleChange}
// //                     onBlur={formik.handleBlur}
// //                   />
// //                   {formik.errors.admin?.address && formik.errors.admin.address[field] && formik.touched.admin?.address?.[field] && (
// //                     <div style={{ color: "red", fontSize: "small" }}>
// //                       {formik.errors.admin.address[field]}
// //                     </div>
// //                   )}
// //                 </Card>
// //               </Col>
// //             ))}
// //           </Card>
// //         </Col>
// //       </Row>

// //       <Button
// //         type="submit"
// //         label={loading ? "Submitting..." : "Submit"}
// //         loading={loading}
// //       />
// //     </form>
// //   );
// // };

// // // Main Page Component
// // export default function Page() {
// //   const { backgroundColor, textColor, fontFamily } = useUserContext();
// //   const accessToken = localStorage.getItem("accessToken");

// //   const [show, setShow] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [industries, setIndustries] = useState([{
// //     name: "medical", value: "medical"
// //   },{

// //     name:"IT",value:"IT"
// //   }]);
// //   const [options, setOptions] = useState([]);
// //   const [nodes, setNodes] = useState([]);

// //   const fetchIndustries = async () => {
// //     setLoading(true);
// //     try {
// //       const response = await axios.get(`${API_BASE_URL}/category`);
// //       const industryData = response.data.data.map((industry) => ({
// //         label: industry.categoryname,
// //         value: industry._id,
// //       }));
// //       setIndustries(industryData);
// //     } catch (error) {
// //       setError(
// //         error.response?.data?.message || "An unexpected error occurred."
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchAssignedList = async () => {
// //     setLoading(true);
// //     try {
// //       const response = await axios.get(`${API_BASE_URL}/plan/getallplan`, {
// //         headers: { Authorization: `Bearer ${accessToken}` },
// //       });
// //       setOptions(
// //         response.data.data.plans.map((item) => ({
// //           value: item._id,
// //           label: item.PlanTitle,
// //         }))
// //       );
// //     } catch (error) {
// //       setError(
// //         error.response?.data?.message || "An unexpected error occurred."
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchLeads = async () => {
// //     setLoading(true);
// //     try {
// //       const response = await axios.get(`${API_BASE_URL}/company`, {
// //         headers: { Authorization: `Bearer ${accessToken}` },
// //       });
// //       setNodes(response.data.data.company);
// //     } catch (error) {
// //       setError(
// //         error.response?.data?.message || "An unexpected error occurred."
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleSubmit = async (values) => {
// //     setLoading(true);
// //     setError(null);

// //     try {
// //       await axios.post(
// //         `${API_BASE_URL}/company`,
// //         {
// //           companyName: values.companyName,
// //           Admin: values.admin,
// //           plan: values.plan,
// //           // address: values.admin.address,
// //           industry: values.industry,
// //         },
// //         { headers: { Authorization: `Bearer ${accessToken}` } }
// //       );

// //       Swal.fire({
// //         icon: "success",
// //         title: "Success!",
// //         text: "Company created successfully.",
// //       });
// //       setShow(false);
// //       await fetchLeads();
// //     } catch (error) {
// //       console.error(error?.response.data.errors);
// //       setError("An error occurred while submitting the form.");
// //       Swal.fire({
// //         icon: "error",
// //         title: "Submission Error",
// //         text: error?.response?.data?.errors || "An unexpected error occurred.",
// //       });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchIndustries();
// //     fetchAssignedList();
// //     fetchLeads();
// //   }, [accessToken]);

// //   return (
// //     <>
// //       <div className="container">
// //         <div style={{ textAlign: "end" }}>
// //           <Button
// //             onClick={() => setShow((prev) => !prev)}
// //             style={{
// //               color: textColor,
// //               fontFamily,
// //               background: backgroundColor,
// //             }}
// //           >
// //             Add Company
// //           </Button>
// //         </div>
// //       </div>

// //       <Sidebar
// //         style={{ color: textColor, fontFamily, background: backgroundColor }}
// //         visible={show}
// //         position="right"
// //         onHide={() => setShow(false)}
// //       >
// //         <CompanyForm
// //           onSubmit={handleSubmit}
// //           loading={loading}
// //           error={error}
// //           industries={industries}
// //           options={options}
// //         />
// //       </Sidebar>
// //       <UserDatatable nodes={nodes} />
// //     </>
// //   );
// // }
// // CompanyPage.tsx
// // 'use client';
// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { Box, Button, Drawer, Snackbar, Alert } from '@mui/material';
// // import { Add as AddIcon } from '@mui/icons-material';
// // import CompanyForm from './CompanyForm';
// // import UserDatatable from './UserDatatable';
// // import { useUserContext } from '@/app/ui/context/usecontext';
// // import { API_BASE_URL } from '@/utlis';

// // const CompanyPage = () => {
// // 	const { backgroundColor, textColor, fontFamily } = useUserContext();
// // 	const accessToken = localStorage.getItem('accessToken');

// // 	const [show, setShow] = useState(false);
// // 	const [loading, setLoading] = useState(false);
// // 	const [error, setError] = useState<string | null>(null);
// // 	const [industries, setIndustries] = useState([]);
// // 	const [options, setOptions] = useState([]);
// // 	const [nodes, setNodes] = useState([]);
// // 	const [snackbarOpen, setSnackbarOpen] = useState(false);
// // 	const [snackbarMessage, setSnackbarMessage] = useState('');
// // 	const [snackbarSeverity, setSnackbarSeverity] = useState('success' | 'error');
// // 	const [editData, setEditData] = useState(null);

// // 	const handleSnackbarClose = () => {
// // 		setSnackbarOpen(false);
// // 	};

// // 	const showSnackbar = ({ message, severity = 'success' }: any) => {
// // 		setSnackbarMessage(message);
// // 		setSnackbarSeverity(severity);
// // 		setSnackbarOpen(true);
// // 	};

// // 	const fetchIndustries = async () => {
// // 		setLoading(true);
// // 		try {
// // 			const response = await axios.get(`${API_BASE_URL}/category`);
// // 			const industryData = response.data.data.map((industry: any) => ({
// // 				label: industry.categoryname,
// // 				value: industry._id,
// // 			}));
// // 			setIndustries(industryData);
// // 		} catch (error) {
// // 			setError(error.response?.data?.message || 'An unexpected error occurred.');
// // 		} finally {
// // 			setLoading(false);
// // 		}
// // 	};

// // 	const fetchAssignedList = async () => {
// // 		setLoading(true);
// // 		try {
// // 			const response = await axios.get(`${API_BASE_URL}/plan/getallplan`, {
// // 				headers: { Authorization: `Bearer ${accessToken}` },
// // 			});
// // 			setOptions(
// // 				response.data.data.plans.map((item: any) => ({
// // 					value: item._id,
// // 					label: item.PlanTitle,
// // 				}))
// // 			);
// // 		} catch (error) {
// // 			setError(error.response?.data?.message || 'An unexpected error occurred.');
// // 		} finally {
// // 			setLoading(false);
// // 		}
// // 	};

// // 	const fetchLeads = async () => {
// // 		setLoading(true);
// // 		try {
// // 			const response = await axios.get(`${API_BASE_URL}/company`, {
// // 				headers: { Authorization: `Bearer ${accessToken}` },
// // 			});
// // 			console.log(response, 'response>>>>>>>>');

// // 			setNodes(response.data.data.company);
// // 		} catch (error) {
// // 			setError(error.response?.data?.message || 'An unexpected error occurred.');
// // 		} finally {
// // 			setLoading(false);
// // 		}
// // 	};

// // 	const handleSubmit = async (values: any) => {
// // 		setLoading(true);
// // 		setError(null);

// // 		try {
// // 			await axios.post(
// // 				`${API_BASE_URL}/company`,
// // 				{
// // 					companyName: values.companyName,
// // 					Admin: values.admin,
// // 					plan: values.plan,
// // 					industry: values.industry,
// // 				},
// // 				{ headers: { Authorization: `Bearer ${accessToken}` } }
// // 			);

// // 			showSnackbar('Company created successfully.', 'success');
// // 			setShow(false);
// // 			await fetchLeads();
// // 		} catch (error) {
// // 			console.error(error?.response.data.errors);
// // 			setError('An error occurred while submitting the form.');
// // 			showSnackbar(error?.response?.data?.errors || 'An unexpected error occurred.', 'error');
// // 		} finally {
// // 			setLoading(false);
// // 		}
// // 	};

// // 	const handleEditSubmit = async (values: any) => {
// // 		setLoading(true);
// // 		setError(null);

// // 		try {
// // 			await axios.patch(`${API_BASE_URL}/company/${editData._id}`, values, {
// // 				headers: { Authorization: `Bearer ${accessToken}` },
// // 			});

// // 			showSnackbar('Company updated successfully.', 'success');
// // 			setEditData(null);
// // 			await fetchLeads();
// // 		} catch (error) {
// // 			console.error(error?.response.data.errors);
// // 			setError('An error occurred while updating the company.');
// // 			showSnackbar(error?.response?.data?.errors || 'An unexpected error occurred.', 'error');
// // 		} finally {
// // 			setLoading(false);
// // 		}
// // 	};

// // 	const handleEdit = (rowData: any) => {
// // 		setEditData(rowData);
// // 		setShow(true);
// // 	};

// // 	const handleDelete = async (userId: any) => {
// // 		const result = window.confirm('Are you sure you want to delete this user?');

// // 		if (result) {
// // 			setLoading(true);
// // 			try {
// // 				await axios.delete(`${API_BASE_URL}/company/${userId}`, {
// // 					headers: { Authorization: `Bearer ${accessToken}` },
// // 				});
// // 				showSnackbar('The user has been deleted.', 'success');
// // 				setNodes((prev) => prev.filter((user) => user._id !== userId));
// // 			} catch (error) {
// // 				showSnackbar(error.message || 'There was a problem deleting the user.', 'error');
// // 			} finally {
// // 				setLoading(false);
// // 			}
// // 		}
// // 	};

// // 	useEffect(() => {
// // 		fetchIndustries();
// // 		fetchAssignedList();
// // 		fetchLeads();
// // 	}, [accessToken]);

// // 	return (
// // 		<Box sx={{ p: 2 }}>
// // 			<Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
// // 				<Button
// // 					onClick={() => {
// // 						setEditData(null);
// // 						setShow(true);
// // 					}}
// // 					variant="contained"
// // 					startIcon={<AddIcon />}
// // 					sx={{
// // 						color: textColor,
// // 						fontFamily,
// // 						backgroundColor: backgroundColor,
// // 						'&:hover': {
// // 							backgroundColor: backgroundColor,
// // 							opacity: 0.9,
// // 						},
// // 					}}
// // 				>
// // 					Add Company
// // 				</Button>
// // 			</Box>

// // 			<Drawer
// // 				anchor="right"
// // 				open={show}
// // 				onClose={() => setShow(false)}
// // 				PaperProps={{
// // 					sx: {
// // 						color: textColor,
// // 						fontFamily,
// // 						backgroundColor: backgroundColor,
// // 						p: 2,
// // 						width: { xs: '100%', sm: '60%', md: '50%' },
// // 					},
// // 				}}
// // 			>
// // 				<CompanyForm
// // 					onSubmit={editData ? handleEditSubmit : handleSubmit}
// // 					loading={loading}
// // 					error={error}
// // 					industries={industries}
// // 					options={options}
// // 					initialValues={editData}
// // 				/>
// // 			</Drawer>

// // 			<UserDatatable datas={nodes} onEdit={handleEdit} onDelete={handleDelete} />

// // 			<Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
// // 				<Alert
// // 					onClose={handleSnackbarClose}
// // 					severity={snackbarSeverity}
// // 					sx={{ width: '100%' }}
// // 				>
// // 					{snackbarMessage}
// // 				</Alert>
// // 			</Snackbar>
// // 		</Box>
// // 	);
// // };

// // export default CompanyPage;
// 'use client';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Box, Button, Drawer, Snackbar, Alert } from '@mui/material';
// import { Add as AddIcon } from '@mui/icons-material';
// import CompanyForm from './CompanyForm';
// import { useUserContext } from '@/app/ui/context/usecontext';
// import { API_BASE_URL } from '@/utlis';
// import UserDatatable from './userDatatable';

// // Define interfaces for better type safety
// interface Industry {
// 	label: string;
// 	value: string;
// }

// interface Plan {
// 	value: string;
// 	label: string;
// }

// interface Company {
// 	_id: string;
// 	companyName: string;
// 	Admin: string;
// 	plan: string;
// 	industry: string;
// }

// interface SnackbarState {
// 	open: boolean;
// 	message: string;
// 	severity: 'success' | 'error';
// }

// const CompanyPage = () => {
// 	// const { backgroundColor, textColor, fontFamily } = useUserContext();
// 	const accessToken = localStorage.getItem('accessToken');

// 	const [show, setShow] = useState(false);
// 	const [loading, setLoading] = useState(false);
// 	const [error, setError] = useState<string | null>(null);
// 	const [industries, setIndustries] = useState<Industry[]>([]);
// 	const [options, setOptions] = useState<Plan[]>([]);
// 	const [nodes, setNodes] = useState<Company[]>([]);
// 	const [snackbar, setSnackbar] = useState<SnackbarState>({
// 		open: false,
// 		message: '',
// 		severity: 'success',
// 	});
// 	const [editData, setEditData] = useState<Company | null>(null);

// 	// Handle snackbar close
// 	const handleSnackbarClose = () => {
// 		setSnackbar({ ...snackbar, open: false });
// 	};

// 	// Show snackbar with message and severity
// 	const showSnackbar = (message: any, severity: 'success' | 'error' = 'success') => {
// 		setSnackbar({ open: true, message, severity });
// 	};

// 	// Fetch industries data
// 	const fetchIndustries = async () => {
// 		setLoading(true);
// 		try {
// 			const response = await axios.get(`${API_BASE_URL}/category`);
// 			const industryData = response.data.data.map((industry: any) => ({
// 				label: industry.categoryname,
// 				value: industry._id,
// 			}));
// 			setIndustries(industryData);
// 		} catch (error: any) {
// 			setError(error.response?.data?.message || 'An unexpected error occurred.');
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	// Fetch assigned list data
// 	const fetchAssignedList = async () => {
// 		setLoading(true);
// 		try {
// 			const response = await axios.get(`${API_BASE_URL}/plan/getallplan`, {
// 				headers: { Authorization: `Bearer ${accessToken}` },
// 			});
// 			setOptions(
// 				response.data.data.plans.map((item: any) => ({
// 					value: item._id,
// 					label: item.PlanTitle,
// 				}))
// 			);
// 		} catch (error: any) {
// 			setError(error.response?.data?.message || 'An unexpected error occurred.');
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	// Fetch leads data
// 	const fetchLeads = async () => {
// 		setLoading(true);
// 		try {
// 			const response = await axios.get(`${API_BASE_URL}/company`, {
// 				headers: { Authorization: `Bearer ${accessToken}` },
// 			});
// 			setNodes(response.data.data.company);
// 		} catch (error: any) {
// 			setError(error.response?.data?.message || 'An unexpected error occurred.');
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	// Handle form submission for creating a company
// 	const handleSubmit = async (values: any) => {
// 		setLoading(true);
// 		setError(null);

// 		try {
// 			await axios.post(
// 				`${API_BASE_URL}/company`,
// 				{
// 					companyName: values.companyName,
// 					Admin: values.admin,
// 					plan: values.plan,
// 					industry: values.industry,
// 				},
// 				{ headers: { Authorization: `Bearer ${accessToken}` } }
// 			);

// 			showSnackbar('Company created successfully.', 'success');
// 			setShow(false);
// 			await fetchLeads();
// 		} catch (error: any) {
// 			console.error(error?.response.data.errors);
// 			setError('An error occurred while submitting the form.');
// 			showSnackbar(error?.response?.data?.errors || 'An unexpected error occurred.', 'error');
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	// Handle form submission for editing a company
// 	const handleEditSubmit = async (values: any) => {
// 		setLoading(true);
// 		setError(null);

// 		try {
// 			await axios.patch(`${API_BASE_URL}/company/${editData?._id}`, values, {
// 				headers: { Authorization: `Bearer ${accessToken}` },
// 			});

// 			showSnackbar('Company updated successfully.', 'success');
// 			setEditData(null);
// 			await fetchLeads();
// 		} catch (error: any) {
// 			console.error(error?.response.data.errors);
// 			setError('An error occurred while updating the company.');
// 			showSnackbar(error?.response?.data?.errors || 'An unexpected error occurred.', 'error');
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	// Handle edit action
// 	const handleEdit = (rowData: Company) => {
// 		setEditData(rowData);
// 		setShow(true);
// 	};

// 	// Handle delete action
// 	const handleDelete = async (userId: string) => {
// 		const result = window.confirm('Are you sure you want to delete this user?');

// 		if (result) {
// 			setLoading(true);
// 			try {
// 				await axios.delete(`${API_BASE_URL}/company/${userId}`, {
// 					headers: { Authorization: `Bearer ${accessToken}` },
// 				});
// 				showSnackbar('The user has been deleted.', 'success');
// 				setNodes((prev) => prev.filter((user) => user._id !== userId));
// 			} catch (error: any) {
// 				showSnackbar(error.message || 'There was a problem deleting the user.', 'error');
// 			} finally {
// 				setLoading(false);
// 			}
// 		}
// 	};

// 	// Fetch data on component mount
// 	useEffect(() => {
// 		fetchIndustries();
// 		fetchAssignedList();
// 		fetchLeads();
// 	}, [accessToken]);

// 	return (
// 		<Box sx={{ p: 2 }}>
// 			<Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
// 				<Button
// 					onClick={() => {
// 						setEditData(null);
// 						setShow(true);
// 					}}
// 					variant="contained"
// 					startIcon={<AddIcon />}
// 					sx={{
// 						// color: textColor,
// 						// fontFamily,
// 						// backgroundColor: backgroundColor,
// 						'&:hover': {
// 							// backgroundColor: backgroundColor,
// 							opacity: 0.9,
// 						},
// 					}}
// 				>
// 					Add Company
// 				</Button>
// 			</Box>

// 			<Drawer
// 				anchor="right"
// 				open={show}
// 				onClose={() => setShow(false)}
// 				PaperProps={{
// 					sx: {
// 						// color: textColor,
// 						// fontFamily,
// 						// backgroundColor: backgroundColor,
// 						p: 2,
// 						width: { xs: '100%', sm: '60%', md: '50%' },
// 					},
// 				}}
// 			>
// 				<CompanyForm
// 					onSubmit={editData ? handleEditSubmit : handleSubmit}
// 					loading={loading}
// 					error={error}
// 					industries={industries}
// 					options={options}
// 					initialValues={editData}
// 				/>
// 			</Drawer>

// 			<UserDatatable datas={nodes} onEdit={handleEdit} onDelete={handleDelete} />

// 			<Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
// 				<Alert
// 					onClose={handleSnackbarClose}
// 					severity={snackbar.severity}
// 					sx={{ width: '100%' }}
// 				>
// 					{snackbar.message}
// 				</Alert>
// 			</Snackbar>
// 		</Box>
// 	);
// };

// export default CompanyPage;
'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Dialog, DialogTitle, DialogContent, Snackbar, Alert } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import CompanyForm from './CompanyForm';
import { useUserContext } from '@/app/ui/context/usecontext';
import { API_BASE_URL } from '@/utlis';
import UserDatatable from './userDatatable';

// Define interfaces for better type safety
interface Industry {
	label: string;
	value: string;
}

interface Plan {
	value: string;
	label: string;
}

interface Company {
	_id: string;
	companyName: string;
	Admin: string;
	plan: string;
	industry: string;
}

interface SnackbarState {
	open: boolean;
	message: string;
	severity: 'success' | 'error';
}

const CompanyPage = () => {
	const accessToken = localStorage.getItem('accessToken');

	const [show, setShow] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [industries, setIndustries] = useState<Industry[]>([]);
	const [options, setOptions] = useState<Plan[]>([]);
	const [nodes, setNodes] = useState<Company[]>([]);
	const [snackbar, setSnackbar] = useState<SnackbarState>({
		open: false,
		message: '',
		severity: 'success',
	});
	const [editData, setEditData] = useState<Company | null>(null);

	const handleSnackbarClose = () => {
		setSnackbar({ ...snackbar, open: false });
	};

	const showSnackbar = (message: any, severity: 'success' | 'error' = 'success') => {
		setSnackbar({ open: true, message, severity });
	};

	const fetchIndustries = async () => {
		setLoading(true);
		try {
			const response = await axios.get(`${API_BASE_URL}/category`);
			const industryData = response.data.data.map((industry: any) => ({
				label: industry.categoryname,
				value: industry._id,
			}));
			setIndustries(industryData);
		} catch (error: any) {
			setError(error.response?.data?.message || 'An unexpected error occurred.');
		} finally {
			setLoading(false);
		}
	};

	const fetchAssignedList = async () => {
		setLoading(true);
		try {
			const response = await axios.get(`${API_BASE_URL}/plan/getallplan`, {
				headers: { Authorization: `Bearer ${accessToken}` },
			});
			setOptions(
				response.data.data.plans.map((item: any) => ({
					value: item._id,
					label: item.PlanTitle,
				}))
			);
		} catch (error: any) {
			setError(error.response?.data?.message || 'An unexpected error occurred.');
		} finally {
			setLoading(false);
		}
	};

	const fetchLeads = async () => {
		setLoading(true);
		try {
			const response = await axios.get(`${API_BASE_URL}/company`, {
				headers: { Authorization: `Bearer ${accessToken}` },
			});
			setNodes(response.data.data.company);
		} catch (error: any) {
			setError(error.response?.data?.message || 'An unexpected error occurred.');
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async (values: any) => {
		setLoading(true);
		setError(null);

		try {
			await axios.post(
				`${API_BASE_URL}/company`,
				{
					companyName: values.companyName,
					Admin: values.admin,
					plan: values.plan,
					industry: values.industry,
				},
				{ headers: { Authorization: `Bearer ${accessToken}` } }
			);

			showSnackbar('Company created successfully.', 'success');
			setShow(false);
			await fetchLeads();
		} catch (error: any) {
			console.error(error?.response.data.errors);
			setError('An error occurred while submitting the form.');
			showSnackbar(error?.response?.data?.errors || 'An unexpected error occurred.', 'error');
		} finally {
			setLoading(false);
		}
	};

	const handleEditSubmit = async (values: any) => {
		setLoading(true);
		setError(null);

		try {
			await axios.patch(`${API_BASE_URL}/company/${editData?._id}`, values, {
				headers: { Authorization: `Bearer ${accessToken}` },
			});

			showSnackbar('Company updated successfully.', 'success');
			setEditData(null);
			setShow(false);
			await fetchLeads();
		} catch (error: any) {
			console.error(error?.response.data.errors);
			setError('An error occurred while updating the company.');
			showSnackbar(error?.response?.data?.errors || 'An unexpected error occurred.', 'error');
		} finally {
			setLoading(false);
		}
	};

	const handleEdit = (rowData: Company) => {
		setEditData(rowData);
		setShow(true);
	};

	const handleDelete = async (userId: string) => {
		const result = window.confirm('Are you sure you want to delete this user?');

		if (result) {
			setLoading(true);
			try {
				await axios.delete(`${API_BASE_URL}/company/${userId}`, {
					headers: { Authorization: `Bearer ${accessToken}` },
				});
				showSnackbar('The user has been deleted.', 'success');
				setNodes((prev) => prev.filter((user) => user._id !== userId));
			} catch (error: any) {
				showSnackbar(error.message || 'There was a problem deleting the user.', 'error');
			} finally {
				setLoading(false);
			}
		}
	};

	useEffect(() => {
		fetchIndustries();
		fetchAssignedList();
		fetchLeads();
	}, [accessToken]);

	return (
		<Box sx={{ p: 2 }}>
			<Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
				<Button
					onClick={() => {
						setEditData(null);
						setShow(true);
					}}
					variant="contained"
					startIcon={<AddIcon />}
				>
					 Company
				</Button>
			</Box>

			<Dialog open={show} onClose={() => setShow(false)} fullWidth maxWidth="md">
				<DialogTitle>{editData ? 'Edit Company' : 'Add New Company'}</DialogTitle>
				<DialogContent>
					<CompanyForm
						onSubmit={editData ? handleEditSubmit : handleSubmit}
						loading={loading}
						error={error}
						industries={industries}
						options={options}
						initialValues={editData}
					/>
				</DialogContent>
			</Dialog>

			<UserDatatable datas={nodes} onEdit={handleEdit} onDelete={handleDelete} />

			<Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
				<Alert
					onClose={handleSnackbarClose}
					severity={snackbar.severity}
					sx={{ width: '100%' }}
				>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</Box>
	);
};

export default CompanyPage;
