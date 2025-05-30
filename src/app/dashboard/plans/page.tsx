// 'use client';
// import { Button } from 'primereact/button';
// import { InputText } from 'primereact/inputtext';
// import React, { useEffect, useState } from 'react';
// import { Dialog } from 'primereact/dialog';
// import { API_BASE_URL } from '@/utlis';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { Card } from 'primereact/card';

// export default function Plan() {
// 	const accessToken = localStorage.getItem('accessToken');
// 	const [data, setData] = useState([]);
// 	const [formData, setFormData] = useState({
// 		PlanTitle: '',
// 		description: '',
// 		price: '',
// 		pricestrike: '',
// 		number_of_users: '',
// 		number_of_leads: '',
// 		storage: '',
// 		isTrialplan: false,
// 	});

// 	const [visible, setVisible] = useState(false);
// 	const [loading, setLoading] = useState(false);
// 	const [error, setError] = useState(null);

// 	const handleChange = (e) => {
// 		const { id, value, type, checked } = e.target;
// 		setFormData({
// 			...formData,
// 			[id]: type === 'checkbox' ? checked : value,
// 		});
// 	};

// 	const handleSubmit = async () => {
// 		setLoading(true);
// 		setError(null);
// 		try {
// 			const headers = {
// 				Authorization: `Bearer ${accessToken}`,
// 			};

// 			const preparedData = {
// 				...formData,
// 				price: parseInt(formData.price, 10), // Convert price to integer
// 			};

// 			await axios.post(`${API_BASE_URL}/plan`, preparedData, {
// 				headers: headers,
// 			});

// 			Swal.fire({
// 				title: 'Success!',
// 				text: 'Plan added successfully.',
// 				icon: 'success',
// 				confirmButtonText: 'OK',
// 			});

// 			setFormData({
// 				PlanTitle: '',
// 				description: '',
// 				price: '',
// 				pricestrike: '',
// 				number_of_users: '',
// 				number_of_leads: '',
// 				storage: '',
// 				isTrialplan: false,
// 			});
// 			setVisible(false);
// 		} catch (error) {
// 			console.error('Error submitting plan:', error);
// 			setError('There was an issue adding the plan. Please try again.');
// 			Swal.fire({
// 				title: 'Error!',
// 				text: 'There was an issue adding the plan. Please try again.',
// 				icon: 'error',
// 				confirmButtonText: 'OK',
// 			});
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	const dialogContent = (
// 		<div
// 			className="grid flex flex-column px-8 py-2"
// 			style={{
// 				borderRadius: '12px',
// 				backgroundImage:
// 					'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))',
// 			}}
// 		>
// 			<h3 className="text-primary-50 font-semibold">Add a new plan here..😎</h3>
// 			{Object.keys(formData).map((key) => (
// 				<div key={key} className="inline-flex flex-column gap-1">
// 					<label htmlFor={key} className="text-primary-50 font-semibold">
// 						{key}
// 					</label>
// 					<InputText
// 						id={key}
// 						value={formData[key]}
// 						onChange={handleChange}
// 						className="bg-white-alpha-20 border-none text-primary-50"
// 						type={key === 'isTrialplan' ? 'checkbox' : 'text'}
// 					/>
// 				</div>
// 			))}
// 			<div className="flex align-items-center gap-2">
// 				<Button
// 					label="Submit"
// 					onClick={handleSubmit}
// 					text
// 					className="w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
// 					disabled={loading}
// 				/>
// 				<Button
// 					label="Cancel"
// 					onClick={() => setVisible(false)}
// 					text
// 					className="w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
// 				/>
// 			</div>
// 			{error && <p className="text-red-500">{error}</p>}
// 		</div>
// 	);

// 	useEffect(() => {
// 		const headers = {
// 			Authorization: `Bearer ${accessToken}`,
// 		};
// 		axios.get(`${API_BASE_URL}/plan/getallplan`, { headers: headers }).then((res) => {
// 			setData(res.data.data.plans);
// 		});
// 	}, [accessToken]);

// 	const handleDelete = async (_id) => {
// 		if (!_id) {
// 			console.error('Plan ID is missing for deletion.');
// 			return;
// 		}

// 		try {
// 			const result = await Swal.fire({
// 				title: 'Are you sure?',
// 				text: 'This action cannot be undone!',
// 				icon: 'warning',
// 				showCancelButton: true,
// 				confirmButtonColor: '#3085d6',
// 				cancelButtonColor: '#d33',
// 				confirmButtonText: 'Yes, delete it!',
// 				cancelButtonText: 'Cancel',
// 			});

// 			if (result.isConfirmed) {
// 				const headers = {
// 					Authorization: `Bearer ${accessToken}`,
// 				};
// 				await axios.delete(`${API_BASE_URL}/plan/${_id}`, { headers });
// 				Swal.fire('Deleted!', 'The plan has been deleted.', 'success');

// 				// Refresh plan list after deletion
// 				const res = await axios.get(`${API_BASE_URL}/plan/getallplan`, { headers });
// 				setData(res.data.data.plans);
// 			}
// 		} catch (error) {
// 			console.error('Error deleting plan:', error);
// 			Swal.fire('Error!', 'There was a problem deleting the plan.', 'error');
// 		}
// 	};

// 	return (
// 		<>
// 			<div className="flex justify-content-between">
// 				<div>
// 					<h3>Manage</h3>
// 					<p>Add or delete a plan</p>
// 				</div>
// 				<div>
// 					<Button onClick={() => setVisible(true)}>
// 						<i className="pi pi-plus-circle mr-2"></i>
// 						Add New
// 					</Button>
// 				</div>
// 			</div>
// 			<div className="flex justify-content-center flex-wrap">
// 				{data.length > 0 ? (
// 					data.map((item, i) => (
// 						<Card key={i} className="col-3 m-2">
// 							<div className="m-2 text-center">
// 								<div
// 									style={{
// 										boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
// 										borderRadius: '50% 20% / 10% 40%',
// 										background:
// 											'linear-gradient(160deg, #0d89ec 10%, rgba(33, 150, 243, 0) 30%)',
// 									}}
// 									className="p-1"
// 								>
// 									<h2>{item?.PlanTitle}</h2>
// 									<p>{item?.description}</p>
// 								</div>

// 								<div className="text-center">
// 									<p>
// 										<span className="line-through">Rs{item?.pricestrike}</span>{' '}
// 										<span className="font-bold">Rs{item?.price}</span>
// 									</p>
// 									<p>Number of Users {item?.number_of_users}</p>
// 									<p>Number of Leads {item?.number_of_leads}</p>
// 									<p>Storage {item?.storage}</p>
// 								</div>
// 								<div className="text-center">
// 									<Button onClick={() => handleDelete(item._id)}>
// 										Delete <i className="pi pi-trash m-2"></i>
// 									</Button>
// 								</div>
// 							</div>
// 						</Card>
// 					))
// 				) : (
// 					<p>No plans available.</p>
// 				)}
// 			</div>

// 			<Dialog
// 				visible={visible}
// 				modal
// 				onHide={() => setVisible(false)}
// 				content={() => dialogContent}
// 			/>
// 		</>
// 	);
// }
// 'use client';
// import React, { useEffect, useState } from 'react';
// import {
// 	Button,
// 	TextField,
// 	Dialog,
// 	DialogActions,
// 	DialogContent,
// 	DialogTitle,
// 	Card,
// 	CardContent,
// 	Typography,
// 	Checkbox,
// 	FormControlLabel,
// 	Grid,
// 	Box,
// 	Paper,
// 	Divider,
// 	IconButton,
// 	CircularProgress,
// 	Tooltip,
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import AddIcon from '@mui/icons-material/Add';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { styled } from '@mui/material/styles';
// import { API_BASE_URL } from '@/utlis';

// export default function Plan() {
// 	const accessToken = localStorage.getItem('accessToken');
// 	const [data, setData] = useState<any>([]);
// 	const [formData, setFormData] = useState<any>({
// 		PlanTitle: '',
// 		description: '',
// 		price: '',
// 		pricestrike: '',
// 		number_of_users: '',
// 		number_of_leads: '',
// 		storage: '',
// 		isTrialplan: false,
// 	});
// 	const [currentPlanId, setCurrentPlanId] = useState(null);
// 	const [openDialog, setOpenDialog] = useState(false);
// 	const [loading, setLoading] = useState(false);
// 	const [error, setError] = useState(null);
// 	const [isEditMode, setIsEditMode] = useState(false);

// 	const handleChange = (e: any) => {
// 		const { id, value, type, checked } = e.target;
// 		setFormData({
// 			...formData,
// 			[id]: type === 'checkbox' ? checked : value,
// 		});
// 	};

// 	const resetForm = () => {
// 		setFormData({
// 			PlanTitle: '',
// 			description: '',
// 			price: '',
// 			pricestrike: '',
// 			number_of_users: '',
// 			number_of_leads: '',
// 			storage: '',
// 			isTrialplan: false,
// 		});
// 		setCurrentPlanId(null);
// 		setIsEditMode(false);
// 	};

// 	const handleOpenCreateDialog = () => {
// 		resetForm();
// 		setOpenDialog(true);
// 	};

// 	const handleOpenEditDialog = (plan: any) => {
// 		setFormData({
// 			PlanTitle: plan.PlanTitle,
// 			description: plan.description,
// 			price: plan.price,
// 			pricestrike: plan.pricestrike,
// 			number_of_users: plan.number_of_users,
// 			number_of_leads: plan.number_of_leads,
// 			storage: plan.storage,
// 			isTrialplan: plan.isTrialplan,
// 		});
// 		setCurrentPlanId(plan._id);
// 		setIsEditMode(true);
// 		setOpenDialog(true);
// 	};

// 	const handleSubmit = async () => {
// 		setLoading(true);
// 		setError(null);
// 		try {
// 			const headers = {
// 				Authorization: `Bearer ${accessToken}`,
// 			};

// 			const preparedData = {
// 				...formData,
// 				price: parseInt(formData.price, 10),
// 				pricestrike: parseInt(formData.pricestrike, 10),
// 				number_of_users: parseInt(formData.number_of_users, 10),
// 				number_of_leads: parseInt(formData.number_of_leads, 10),
// 			};

// 			if (isEditMode) {
// 				await axios.put(`${API_BASE_URL}/plan/${currentPlanId}`, preparedData, {
// 					headers: headers,
// 				});
// 				Swal.fire({
// 					title: 'Success!',
// 					text: 'Plan updated successfully.',
// 					icon: 'success',
// 					confirmButtonText: 'OK',
// 				});
// 			} else {
// 				await axios.post(`${API_BASE_URL}/plan`, preparedData, {
// 					headers: headers,
// 				});
// 				Swal.fire({
// 					title: 'Success!',
// 					text: 'Plan added successfully.',
// 					icon: 'success',
// 					confirmButtonText: 'OK',
// 				});
// 			}

// 			resetForm();
// 			setOpenDialog(false);
// 			fetchPlans();
// 		} catch (error: any) {
// 			console.error('Error submitting plan:', error);
// 			setError(
// 				error.response?.data?.message ||
// 					'There was an issue processing your request. Please try again.'
// 			);
// 			Swal.fire({
// 				title: 'Error!',
// 				text:
// 					error.response?.data?.message ||
// 					'There was an issue processing your request. Please try again.',
// 				icon: 'error',
// 				confirmButtonText: 'OK',
// 			});
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	const fetchPlans = async () => {
// 		try {
// 			const headers = {
// 				Authorization: `Bearer ${accessToken}`,
// 			};
// 			const response = await axios.get(`${API_BASE_URL}/plan/getallplan`, { headers });
// 			setData(response.data.data.plans);
// 		} catch (error) {
// 			console.error('Error fetching plans:', error);
// 		}
// 	};

// 	useEffect(() => {
// 		fetchPlans();
// 	}, [accessToken]);

// 	const handleDelete = async (planId: any) => {
// 		try {
// 			const result = await Swal.fire({
// 				title: 'Are you sure?',
// 				text: "You won't be able to revert this!",
// 				icon: 'warning',
// 				showCancelButton: true,
// 				confirmButtonColor: '#d32f2f',
// 				cancelButtonColor: '#757575',
// 				confirmButtonText: 'Yes, delete it!',
// 				cancelButtonText: 'Cancel',
// 				reverseButtons: true,
// 			});

// 			if (result.isConfirmed) {
// 				const headers = {
// 					Authorization: `Bearer ${accessToken}`,
// 				};
// 				await axios.delete(`${API_BASE_URL}/plan/${planId}`, { headers });

// 				await Swal.fire({
// 					title: 'Deleted!',
// 					text: 'The plan has been deleted.',
// 					icon: 'success',
// 					confirmButtonColor: '#1976d2',
// 				});

// 				fetchPlans();
// 			}
// 		} catch (error) {
// 			console.error('Error deleting plan:', error);
// 			Swal.fire({
// 				title: 'Error!',
// 				text: 'There was a problem deleting the plan.',
// 				icon: 'error',
// 				confirmButtonColor: '#1976d2',
// 			});
// 		}
// 	};

// 	const PlanCard = styled(Card)(({ theme }) => ({
// 		minWidth: 275,
// 		margin: theme.spacing(2),
// 		transition: 'transform 0.3s, box-shadow 0.3s',
// 		'&:hover': {
// 			transform: 'translateY(-5px)',
// 			boxShadow: theme.shadows[6],
// 		},
// 	}));

// 	const PriceTypography = styled(Typography)(({ theme }) => ({
// 		margin: theme.spacing(1, 0),
// 		'& .strike': {
// 			textDecoration: 'line-through',
// 			color: theme.palette.text.secondary,
// 			marginRight: theme.spacing(1),
// 		},
// 		'& .current': {
// 			fontWeight: 'bold',
// 			color: theme.palette.primary.main,
// 		},
// 	}));

// 	return (
// 		<Box sx={{ p: 3 }}>
// 			<Box
// 				sx={{
// 					display: 'flex',
// 					justifyContent: 'space-between',
// 					alignItems: 'center',
// 					mb: 4,
// 					p: 2,
// 					backgroundColor: 'background.paper',
// 					borderRadius: 1,
// 					boxShadow: 1,
// 				}}
// 			>
// 				<Box>
// 					<Typography variant="h5" component="h2" gutterBottom>
// 						Manage Plans
// 					</Typography>
// 				</Box>
// 				<Button
// 					variant="contained"
// 					startIcon={<AddIcon />}
// 					onClick={handleOpenCreateDialog}
// 				>
// 					Add New Plan
// 				</Button>
// 			</Box>

// 			<Grid container spacing={3}>
// 				{data.length > 0 ? (
// 					data.map((item: any, i: any) => (
// 						<Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
// 							<PlanCard>
// 								<CardContent>
// 									<Box
// 										sx={{
// 											p: 2,
// 											mb: 2,
// 											textAlign: 'center',
// 											background:
// 												'linear-gradient(160deg, #0d89ec 10%, rgba(33, 150, 243, 0) 30%)',
// 											borderRadius: '12px',
// 										}}
// 									>
// 										<Typography variant="h5" component="div" gutterBottom>
// 											{item?.PlanTitle}
// 										</Typography>
// 										<Typography variant="body2" color="text.secondary">
// 											{item?.description}
// 										</Typography>
// 									</Box>

// 									<PriceTypography variant="body1">
// 										<span className="strike">Rs{item?.pricestrike}</span>
// 										<span className="current">Rs{item?.price}</span>
// 									</PriceTypography>

// 									<Divider sx={{ my: 2 }} />

// 									<Box sx={{ mb: 2 }}>
// 										<Typography variant="body2" color="text.secondary">
// 											<strong>Users:</strong> {item?.number_of_users}
// 										</Typography>
// 										<Typography variant="body2" color="text.secondary">
// 											<strong>Leads:</strong> {item?.number_of_leads}
// 										</Typography>
// 										<Typography variant="body2" color="text.secondary">
// 											<strong>Storage:</strong> {item?.storage}
// 										</Typography>
// 										<Typography variant="body2" color="text.secondary">
// 											<strong>Trial:</strong>{' '}
// 											{item?.isTrialplan ? 'Yes' : 'No'}
// 										</Typography>
// 									</Box>

// 									<Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
// 										<Tooltip title="Edit plan">
// 											<IconButton
// 												aria-label="edit"
// 												color="primary"
// 												onClick={() => handleOpenEditDialog(item)}
// 											>
// 												<EditIcon />
// 											</IconButton>
// 										</Tooltip>
// 										<Tooltip title="Delete plan">
// 											<IconButton
// 												aria-label="delete"
// 												color="error"
// 												onClick={() => handleDelete(item._id)}
// 											>
// 												<DeleteIcon />
// 											</IconButton>
// 										</Tooltip>
// 									</Box>
// 								</CardContent>
// 							</PlanCard>
// 						</Grid>
// 					))
// 				) : (
// 					<Grid size={{ sm: 12 }}>
// 						<Paper sx={{ p: 3, textAlign: 'center' }}>
// 							<Typography variant="body1">No plans available</Typography>
// 						</Paper>
// 					</Grid>
// 				)}
// 			</Grid>

// 			<Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
// 				<DialogTitle
// 					sx={{
// 						// background: 'linear-gradient(45deg, #1976d2, #2196f3)',
// 						// color: 'black',
// 						py: 2,
// 					}}
// 				>
// 					{isEditMode ? 'Edit Plan' : 'Add New Plan'}
// 				</DialogTitle>
// 				<DialogContent sx={{ pt: 3 }}>
// 					<Grid container spacing={2}>
// 						{Object.keys(formData).map((key) => (
// 							<Grid size={{ sm: key === 'isTrialplan' ? 12 : 6 }} key={key}>
// 								{key === 'isTrialplan' ? (
// 									<FormControlLabel
// 										control={
// 											<Checkbox
// 												id={key}
// 												checked={formData[key]}
// 												onChange={handleChange}
// 												color="primary"
// 											/>
// 										}
// 										label="Is Trial Plan"
// 									/>
// 								) : (
// 									<TextField
// 										fullWidth
// 										id={key}
// 										label={key.replace(/_/g, ' ')}
// 										variant="outlined"
// 										value={formData[key]}
// 										onChange={handleChange}
// 										margin="normal"
// 										type={
// 											key.includes('price') || key.includes('number')
// 												? 'number'
// 												: 'text'
// 										}
// 									/>
// 								)}
// 							</Grid>
// 						))}
// 					</Grid>
// 					{error && (
// 						<Typography color="error" variant="body2" sx={{ mt: 2 }}>
// 							{error}
// 						</Typography>
// 					)}
// 				</DialogContent>
// 				<DialogActions sx={{ p: 2 }}>
// 					<Button
// 						onClick={() => setOpenDialog(false)}
// 						color="secondary"
// 						disabled={loading}
// 					>
// 						Cancel
// 					</Button>
// 					<Button
// 						onClick={handleSubmit}
// 						color="primary"
// 						variant="contained"
// 						disabled={loading}
// 						startIcon={loading ? <CircularProgress size={20} /> : null}
// 					>
// 						{loading ? 'Processing...' : isEditMode ? 'Update Plan' : 'Create Plan'}
// 					</Button>
// 				</DialogActions>
// 			</Dialog>
// 		</Box>
// 	);
// }
'use client';
import React, { useEffect, useState } from 'react';
import {
	Button,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Card,
	CardContent,
	Typography,
	Checkbox,
	FormControlLabel,
	Grid,
	Box,
	Paper,
	Divider,
	IconButton,
	CircularProgress,
	Tooltip,
	Menu,
	MenuItem,
	Chip,
	Snackbar,
	Alert,
} from '@mui/material';
import {
	DeleteOutline,
	EditOutlined,
	Add,
	MoreVert,
	CheckCircle,
	People,
	Storage,
	Leaderboard,
	Close,
} from '@mui/icons-material';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { API_BASE_URL } from '@/utlis';

export default function Plan() {
	const [data, setData] = useState<any[]>([]);
	const [formData, setFormData] = useState<any>({
		PlanTitle: '',
		description: '',
		price: '',
		pricestrike: '',
		number_of_users: '',
		number_of_leads: '',
		storage: '',
		isTrialplan: false,
		duration: '',
		durationUnit: 'days',
		customerSupport: false,
		additionalFeatures: [],
	});
	const [currentPlanId, setCurrentPlanId] = useState(null);
	const [openDialog, setOpenDialog] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [isEditMode, setIsEditMode] = useState(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [currentMenuPlan, setCurrentMenuPlan] = useState<any>(null);
	const [snackbar, setSnackbar] = useState({
		open: false,
		message: '',
		severity: 'success' as 'success' | 'error' | 'info' | 'warning',
	});

	const showSnackbar = (message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
		setSnackbar({ open: true, message, severity });
	};

	const handleCloseSnackbar = () => {
		setSnackbar({ ...snackbar, open: false });
	};

	const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, plan: any) => {
		setAnchorEl(event.currentTarget);
		setCurrentMenuPlan(plan);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		setCurrentMenuPlan(null);
	};

	const handleChange = (e: any) => {
		const { id, value, type, checked } = e.target;
		setFormData({
			...formData,
			[id]: type === 'checkbox' ? checked : value,
		});
	};

	const resetForm = () => {
		setFormData({
			PlanTitle: '',
			description: '',
			price: '',
			pricestrike: '',
			number_of_users: '',
			number_of_leads: '',
			storage: '',
			isTrialplan: false,
			duration: '',
			durationUnit: 'days',
			customerSupport: false,
			additionalFeatures: [],
		});
		setCurrentPlanId(null);
		setIsEditMode(false);
	};

	const handleOpenCreateDialog = () => {
		resetForm();
		setOpenDialog(true);
	};

	const handleOpenEditDialog = (plan: any) => {
		setFormData({
			PlanTitle: plan.PlanTitle,
			description: plan.description,
			price: plan.price,
			pricestrike: plan.pricestrike,
			number_of_users: plan.number_of_users,
			number_of_leads: plan.number_of_leads,
			storage: plan.storage,
			isTrialplan: plan.isTrialplan,
			duration: plan.duration || '',
			durationUnit: plan.durationUnit || 'days',
			customerSupport: plan.customerSupport || false,
			additionalFeatures: plan.additionalFeatures || [],
		});
		setCurrentPlanId(plan._id);
		setIsEditMode(true);
		setOpenDialog(true);
		handleMenuClose();
	};

	const handleSubmit = async () => {
		setLoading(true);
		setError(null);
		try {
			const headers = {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			};

			const preparedData = {
				...formData,
				price: parseInt(formData.price, 10),
				pricestrike: parseInt(formData.pricestrike, 10),
				number_of_users: parseInt(formData.number_of_users, 10),
				number_of_leads: parseInt(formData.number_of_leads, 10),
				duration: formData.duration ? parseInt(formData.duration, 10) : undefined,
			};

			if (isEditMode) {
				await axios.put(`${API_BASE_URL}/plan/${currentPlanId}`, preparedData, {
					headers: headers,
				});
				showSnackbar('Plan updated successfully', 'success');
			} else {
				await axios.post(`${API_BASE_URL}/plan`, preparedData, {
					headers: headers,
				});
				showSnackbar('Plan added successfully', 'success');
			}

			resetForm();
			setOpenDialog(false);
			fetchPlans();
		} catch (error: any) {
			console.error('Error submitting plan:', error);
			const errorMessage =
				error.response?.data?.message ||
				'There was an issue processing your request. Please try again.';
			setError(errorMessage);
			showSnackbar(errorMessage, 'error');
		} finally {
			setLoading(false);
		}
	};

	const fetchPlans = async () => {
		try {
			const headers = {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			};
			const response = await axios.get(`${API_BASE_URL}/plan/getallplan`, { headers });
			setData(response.data.data.plans);
		} catch (error) {
			console.error('Error fetching plans:', error);
			showSnackbar('Failed to fetch plans', 'error');
		}
	};

	useEffect(() => {
		fetchPlans();
	}, []);

	const handleDelete = async (planId: any) => {
		try {
			setAnchorEl(null);
			const headers = {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			};
			await axios.delete(`${API_BASE_URL}/plan/${planId}`, { headers });
			showSnackbar('The plan has been deleted', 'success');
			fetchPlans();
		} catch (error) {
			console.error('Error deleting plan:', error);
			showSnackbar('There was a problem deleting the plan', 'error');
		}
	};

	const PlanCard = styled(Card)(({ theme }) => ({
		minWidth: 275,
		margin: theme.spacing(0),
		transition: 'transform 0.3s, box-shadow 0.3s',
		border: `1px solid ${theme.palette.divider}`,
		borderRadius: '12px',
		overflow: 'hidden',
		'&:hover': {
			transform: 'translateY(-5px)',
			boxShadow: theme.shadows[6],
		},
	}));

	const PriceTypography = styled(Typography)(({ theme }) => ({
		margin: theme.spacing(1, 0),
		display: 'flex',
		alignItems: 'center',
		gap: theme.spacing(1),
		'& .strike': {
			textDecoration: 'line-through',
			color: theme.palette.text.secondary,
			fontSize: '0.9rem',
		},
		'& .current': {
			fontWeight: 'bold',
			color: theme.palette.primary.main,
			fontSize: '1.5rem',
		},
	}));

	const FeatureItem = styled(Box)(({ theme }) => ({
		display: 'flex',
		alignItems: 'center',
		gap: theme.spacing(1),
		marginBottom: theme.spacing(1),
		'& svg': {
			color: theme.palette.primary.main,
		},
	}));

	return (
		<Box sx={{ p: 3 }}>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					mb: 4,
					p: 2,
					backgroundColor: 'background.paper',
					borderRadius: '12px',
					boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
				}}
			>
				<Box>
					<Typography variant="h5" component="h2" fontWeight="bold">
						Subscription Plans
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Manage and customize your subscription plans
					</Typography>
				</Box>
				<Button
					variant="contained"
					startIcon={<Add />}
					onClick={handleOpenCreateDialog}
					sx={{
						borderRadius: '8px',
						textTransform: 'none',
						padding: '8px 16px',
					}}
				>
					  Plan
				</Button>
			</Box>

			<Grid container spacing={3}>
				{data.length > 0 ? (
					data.map((item: any) => (
						<Grid size={{ xs: 12, sm: 6, md: 4 }} key={item._id}>
							<PlanCard>
								<Box
									sx={{
										p: 3,
										background: (theme) => theme.palette.primary.light,
										color: (theme) => theme.palette.primary.contrastText,
										position: 'relative',
									}}
								>
									<Box
										sx={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
										}}
									>
										<Typography
											variant="h6"
											fontWeight="bold"
											sx={{ textTransform: 'capitalize', color: 'white' }}
										>
											{item.PlanTitle}
										</Typography>
										<IconButton
											size="small"
											onClick={(e) => handleMenuOpen(e, item)}
											sx={{ color: 'inherit', position: 'relative' }}
										>
											<MoreVert />
										</IconButton>
									</Box>
									{item.isTrialplan && (
										<Chip
											label="Trial"
											size="small"
											sx={{
												position: 'absolute',
												top: 8,
												right: 8,
												bgcolor: 'white',
												color: (theme) => theme.palette.primary.main,
												fontWeight: 'bold',
											}}
										/>
									)}
								</Box>
								<CardContent>
									<Typography
										variant="body2"
										color="text.secondary"
										sx={{ mb: 2 }}
									>
										{item.description}
									</Typography>

									<PriceTypography variant="body1">
										{item.pricestrike && (
											<span className="strike">${item.pricestrike}</span>
										)}
										<span className="current">${item.price}</span>
										{item.duration && (
											<span
												style={{
													fontSize: '0.9rem',
													color: 'text.secondary',
												}}
											>
												/{item.duration} {item.durationUnit}
											</span>
										)}
									</PriceTypography>

									<Divider sx={{ my: 2 }} />

									<Box sx={{ mb: 2 }}>
										<FeatureItem>
											<People fontSize="small" />
											<Typography variant="body2">
												<strong>{item.number_of_users}</strong> Users
											</Typography>
										</FeatureItem>
										<FeatureItem>
											<Leaderboard fontSize="small" />
											<Typography variant="body2">
												<strong>{item.number_of_leads}</strong> Leads
											</Typography>
										</FeatureItem>
										<FeatureItem>
											<Storage fontSize="small" />
											<Typography variant="body2">
												<strong>{item.storage}</strong> Storage
											</Typography>
										</FeatureItem>
										{item.customerSupport && (
											<FeatureItem>
												<CheckCircle fontSize="small" color="success" />
												<Typography variant="body2">
													Priority Support
												</Typography>
											</FeatureItem>
										)}
										{item.additionalFeatures?.length > 0 && (
											<>
												<Divider sx={{ my: 1 }} />
												<Typography variant="subtitle2" sx={{ mb: 1 }}>
													Additional Features:
												</Typography>
												{item.additionalFeatures.map(
													(feature: string, index: number) => (
														<FeatureItem key={index}>
															<CheckCircle
																fontSize="small"
																color="success"
															/>
															<Typography variant="body2">
																{feature}
															</Typography>
														</FeatureItem>
													)
												)}
											</>
										)}
									</Box>
								</CardContent>
							</PlanCard>
						</Grid>
					))
				) : (
					<Grid size={{ xs: 12, sm: 12 }}>
						<Paper
							sx={{
								p: 4,
								textAlign: 'center',
								borderRadius: '12px',
								backgroundColor: 'background.paper',
							}}
						>
							<Typography variant="h6" gutterBottom>
								No Plans Available
							</Typography>
							<Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
								Create your first subscription plan to get started
							</Typography>
							<Button
								variant="contained"
								startIcon={<Add />}
								onClick={handleOpenCreateDialog}
								sx={{ borderRadius: '8px' }}
							>
								Create Plan
							</Button>
						</Paper>
					</Grid>
				)}
			</Grid>

			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleMenuClose}
				elevation={3}
				// sx={{ position: 'absolute' }}
			>
				<MenuItem onClick={() => handleOpenEditDialog(currentMenuPlan)}>
					<EditOutlined fontSize="small" sx={{ mr: 1 }} />
					Edit Plan
				</MenuItem>
				<MenuItem
					onClick={() => {
						if (currentMenuPlan) {
							handleDelete(currentMenuPlan._id);
						}
					}}
					sx={{ color: 'error.main' }}
				>
					<DeleteOutline fontSize="small" sx={{ mr: 1 }} />
					Delete Plan
				</MenuItem>
			</Menu>

			<Dialog
				open={openDialog}
				onClose={() => setOpenDialog(false)}
				maxWidth="sm"
				fullWidth
				PaperProps={{ sx: { borderRadius: '12px' } }}
			>
				<DialogTitle
					sx={{
						backgroundColor: (theme) => theme.palette.primary.main,
						color: (theme) => theme.palette.primary.contrastText,
						py: 2,
					}}
				>
					{isEditMode ? 'Edit Plan' : 'Create New Plan'}
				</DialogTitle>
				<DialogContent sx={{ py: 3 }}>
					<Grid container spacing={2}>
						<Grid size={{ xs: 12, sm: 6 }}>
							<TextField
								fullWidth
								id="PlanTitle"
								label="Plan Title"
								variant="outlined"
								value={formData.PlanTitle}
								onChange={handleChange}
								margin="normal"
								size="small"
							/>
						</Grid>
						<Grid size={{ xs: 12, sm: 6 }}>
							<TextField
								fullWidth
								id="description"
								label="Description"
								variant="outlined"
								value={formData.description}
								onChange={handleChange}
								margin="normal"
								size="small"
							/>
						</Grid>
						<Grid size={{ xs: 12, sm: 6 }}>
							<TextField
								fullWidth
								id="price"
								label="Price"
								variant="outlined"
								value={formData.price}
								onChange={handleChange}
								margin="normal"
								type="number"
								size="small"
								InputProps={{
									startAdornment: (
										<Typography color="text.secondary" sx={{ mr: 1 }}>
											$
										</Typography>
									),
								}}
							/>
						</Grid>
						<Grid size={{ xs: 12, sm: 6 }}>
							<TextField
								fullWidth
								id="pricestrike"
								label="Strike Price"
								variant="outlined"
								value={formData.pricestrike}
								onChange={handleChange}
								margin="normal"
								type="number"
								size="small"
								InputProps={{
									startAdornment: (
										<Typography color="text.secondary" sx={{ mr: 1 }}>
											$
										</Typography>
									),
								}}
							/>
						</Grid>
						<Grid size={{ xs: 12, sm: 6 }}>
							<TextField
								fullWidth
								id="number_of_users"
								label="Number of Users"
								variant="outlined"
								value={formData.number_of_users}
								onChange={handleChange}
								margin="normal"
								type="number"
								size="small"
							/>
						</Grid>
						<Grid size={{ xs: 12, sm: 6 }}>
							<TextField
								fullWidth
								id="number_of_leads"
								label="Number of Leads"
								variant="outlined"
								value={formData.number_of_leads}
								onChange={handleChange}
								margin="normal"
								type="number"
								size="small"
							/>
						</Grid>
						<Grid size={{ xs: 12, sm: 6 }}>
							<TextField
								fullWidth
								id="storage"
								label="Storage"
								variant="outlined"
								value={formData.storage}
								onChange={handleChange}
								margin="normal"
								size="small"
							/>
						</Grid>
						<Grid size={{ xs: 12, sm: 6 }}>
							<TextField
								fullWidth
								id="duration"
								label="Duration"
								variant="outlined"
								value={formData.duration}
								onChange={handleChange}
								margin="normal"
								type="number"
								size="small"
							/>
						</Grid>
						<Grid size={{ xs: 12, sm: 6 }}>
							<TextField
								fullWidth
								id="durationUnit"
								label="Duration Unit"
								variant="outlined"
								value={formData.durationUnit}
								onChange={handleChange}
								margin="normal"
								size="small"
								select
								SelectProps={{
									native: true,
								}}
							>
								<option value="days">Days</option>
								<option value="months">Months</option>
								<option value="years">Years</option>
							</TextField>
						</Grid>
						<Grid size={{ xs: 12, sm: 6 }}>
							<FormControlLabel
								control={
									<Checkbox
										id="isTrialplan"
										checked={formData.isTrialplan}
										onChange={handleChange}
										color="primary"
									/>
								}
								label="Is Trial Plan"
							/>
						</Grid>
						<Grid size={{ xs: 12, sm: 6 }}>
							<FormControlLabel
								control={
									<Checkbox
										id="customerSupport"
										checked={formData.customerSupport}
										onChange={handleChange}
										color="primary"
									/>
								}
								label="Customer Support"
							/>
						</Grid>
					</Grid>
					{error && (
						<Typography color="error" variant="body2" sx={{ mt: 2 }}>
							{error}
						</Typography>
					)}
				</DialogContent>
				<DialogActions sx={{ p: 2 }}>
					<Button
						onClick={() => setOpenDialog(false)}
						color="secondary"
						disabled={loading}
						sx={{ borderRadius: '8px' }}
					>
						Cancel
					</Button>
					<Button
						onClick={handleSubmit}
						color="primary"
						variant="contained"
						disabled={loading}
						startIcon={loading ? <CircularProgress size={20} /> : null}
						sx={{ borderRadius: '8px' }}
					>
						{loading ? 'Processing...' : isEditMode ? 'Update Plan' : 'Create Plan'}
					</Button>
				</DialogActions>
			</Dialog>

			<Snackbar
				open={snackbar.open}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			>
				<Alert
					onClose={handleCloseSnackbar}
					severity={snackbar.severity}
					sx={{ width: '100%' }}
					variant="filled"
				>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</Box>
	);
}
