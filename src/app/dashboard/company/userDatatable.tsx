// 'use client';
// import React, { useEffect, useState } from 'react';
// import * as XLSX from 'xlsx';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import {
// 	Box,
// 	Button,
// 	Card,
// 	CardContent,
// 	Grid,
// 	Typography,
// 	Table,
// 	TableBody,
// 	TableCell,
// 	TableContainer,
// 	TableHead,
// 	TableRow,
// 	Paper,
// 	IconButton,
// 	Avatar,
// 	TablePagination,
// } from '@mui/material';
// import {
// 	Delete as DeleteIcon,
// 	Edit as EditIcon,
// 	GridView as GridViewIcon,
// 	TableView as TableViewIcon,
// 	PictureAsPdf as PictureAsPdfIcon,
// 	GridOn as GridOnIcon,
// } from '@mui/icons-material';

// // Define interfaces for better type safety
// interface Admin {
// 	firstname: string;
// 	lastname: string;
// 	email: string;
// 	mobile: string;
// 	userRole: string;
// }

// interface Plan {
// 	PlanTitle: string;
// }

// interface Company {
// 	_id: string;
// 	Admin: Admin;
// 	companyName: string;
// 	createdAt: string;
// 	address: string;
// 	logo?: string;
// 	plan?: Plan;
// }

// interface UserDatatableProps {
// 	datas: any;
// 	onEdit: (row: any) => void;
// 	onDelete: (id: string) => void;
// }

// const UserDatatable: React.FC<UserDatatableProps> = ({ datas, onEdit, onDelete }) => {
// 	const [data, setData] = useState<Company[]>([]);
// 	const [view, setView] = useState<'table' | 'grid'>('table');
// 	const [page, setPage] = useState(0);
// 	const [rowsPerPage, setRowsPerPage] = useState(10);

// 	useEffect(() => {
// 		setData(datas);
// 	}, [datas]);

// 	const handleChangePage = (
// 		event: React.MouseEvent<HTMLButtonElement> | null,
// 		newPage: number
// 	) => {
// 		setPage(newPage);
// 	};

// 	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
// 		setRowsPerPage(parseInt(event.target.value, 10));
// 		setPage(0);
// 	};

// 	const exportToExcel = () => {
// 		const worksheet = XLSX.utils.json_to_sheet(
// 			data.map(({ Admin, companyName, createdAt, address }) => ({
// 				name: `${Admin.firstname} ${Admin.lastname}`,
// 				companyName,
// 				createdAt: new Date(createdAt).toLocaleDateString(),
// 				address,
// 				email: Admin.email,
// 				mobile: Admin.mobile,
// 				userRole: Admin.userRole,
// 			}))
// 		);
// 		const workbook = XLSX.utils.book_new();
// 		XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
// 		XLSX.writeFile(workbook, 'UserData.xlsx');
// 	};

// 	const exportToPDF = () => {
// 		const doc = new jsPDF() as any;
// 		doc.text('User Data', 20, 20);
// 		const tableColumn = [
// 			'Date',
// 			'Company Name',
// 			'Plan Title',
// 			'Name',
// 			'Email',
// 			'Mobile',
// 			'User Role',
// 			'Address',
// 		];
// 		const tableRows = data.map((item) => [
// 			new Date(item.createdAt).toLocaleDateString(),
// 			item.companyName,
// 			item.plan?.PlanTitle || 'N/A',
// 			`${item.Admin.firstname} ${item.Admin.lastname}`,
// 			item.Admin.email,
// 			item.Admin.mobile,
// 			item.Admin.userRole,
// 			item.address,
// 		]);

// 		doc.autoTable({ head: [tableColumn], body: tableRows, startY: 30 });
// 		doc.save('UserData.pdf');
// 	};

// 	const renderTableView = () => (
// 		<>
// 			<TableContainer component={Paper}>
// 				<Table>
// 					<TableHead>
// 						<TableRow>
// 							<TableCell>Date</TableCell>
// 							<TableCell>Name</TableCell>
// 							<TableCell>Company Name</TableCell>
// 							<TableCell>Email</TableCell>
// 							<TableCell>Mobile</TableCell>
// 							<TableCell>Plan Title</TableCell>
// 							<TableCell>User Role</TableCell>
// 							<TableCell>Address</TableCell>
// 							<TableCell>Actions</TableCell>
// 						</TableRow>
// 					</TableHead>
// 					<TableBody>
// 						{data
// 							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
// 							.map((row) => (
// 								<TableRow key={row._id}>
// 									<TableCell>
// 										{new Date(row.createdAt).toLocaleDateString()}
// 									</TableCell>
// 									<TableCell>
// 										<Box sx={{ display: 'flex', alignItems: 'center' }}>
// 											<Avatar
// 												src={row.logo}
// 												sx={{ width: 38, height: 38, mr: 2 }}
// 											/>
// 											{`${row.Admin.firstname} ${row.Admin.lastname}`}
// 										</Box>
// 									</TableCell>
// 									<TableCell>{row.companyName}</TableCell>
// 									<TableCell>{row.Admin.email}</TableCell>
// 									<TableCell>{row.Admin.mobile}</TableCell>
// 									<TableCell>{row.plan?.PlanTitle || 'N/A'}</TableCell>
// 									<TableCell>{row.Admin.userRole}</TableCell>
// 									<TableCell>{row.address}</TableCell>
// 									<TableCell>
// 										<IconButton color="primary" onClick={() => onEdit(row)}>
// 											<EditIcon />
// 										</IconButton>
// 										<IconButton color="error" onClick={() => onDelete(row._id)}>
// 											<DeleteIcon />
// 										</IconButton>
// 									</TableCell>
// 								</TableRow>
// 							))}
// 					</TableBody>
// 				</Table>
// 			</TableContainer>
// 			<TablePagination
// 				rowsPerPageOptions={[5, 10, 25]}
// 				component="div"
// 				count={data.length}
// 				rowsPerPage={rowsPerPage}
// 				page={page}
// 				onPageChange={handleChangePage}
// 				onRowsPerPageChange={handleChangeRowsPerPage}
// 			/>
// 		</>
// 	);

// 	const renderGridView = () => (
// 		<Grid container spacing={2}>
// 			{data.map((row) => (
// 				<Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={row._id}>
// 					<Card>
// 						<CardContent>
// 							<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
// 								<Avatar src={row.logo} sx={{ width: 56, height: 56, mr: 2 }} />
// 								<Box>
// 									<Typography variant="h6">{`${row.Admin.firstname} ${row.Admin.lastname}`}</Typography>
// 									<Typography variant="body2" color="text.secondary">
// 										{row.Admin.userRole}
// 									</Typography>
// 								</Box>
// 							</Box>
// 							<Typography variant="body2" sx={{ mb: 1 }}>
// 								<strong>Company:</strong> {row.companyName}
// 							</Typography>
// 							<Typography variant="body2" sx={{ mb: 1 }}>
// 								<strong>Email:</strong> {row.Admin.email}
// 							</Typography>
// 							<Typography variant="body2" sx={{ mb: 1 }}>
// 								<strong>Mobile:</strong> {row.Admin.mobile}
// 							</Typography>
// 							<Typography variant="body2" sx={{ mb: 1 }}>
// 								<strong>Plan:</strong> {row.plan?.PlanTitle || 'N/A'}
// 							</Typography>
// 							<Typography variant="body2" sx={{ mb: 1 }}>
// 								<strong>Address:</strong> {row.address}
// 							</Typography>
// 							<Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
// 								<IconButton
// 									color="primary"
// 									onClick={() => onEdit(row)}
// 									size="small"
// 								>
// 									<EditIcon />
// 								</IconButton>
// 								<IconButton
// 									color="error"
// 									onClick={() => onDelete(row._id)}
// 									size="small"
// 								>
// 									<DeleteIcon />
// 								</IconButton>
// 							</Box>
// 						</CardContent>
// 					</Card>
// 				</Grid>
// 			))}
// 		</Grid>
// 	);

// 	return (
// 		<Box sx={{ p: 2 }}>
// 			<Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
// 				<Button
// 					variant={view === 'table' ? 'contained' : 'outlined'}
// 					startIcon={<TableViewIcon />}
// 					onClick={() => setView('table')}
// 				>
// 					Table View
// 				</Button>
// 				<Button
// 					variant={view === 'grid' ? 'contained' : 'outlined'}
// 					startIcon={<GridViewIcon />}
// 					onClick={() => setView('grid')}
// 				>
// 					Grid View
// 				</Button>
// 				<Button variant="outlined" startIcon={<GridOnIcon />} onClick={exportToExcel}>
// 					Export to Excel
// 				</Button>
// 				<Button variant="outlined" startIcon={<PictureAsPdfIcon />} onClick={exportToPDF}>
// 					Export to PDF
// 				</Button>
// 			</Box>
// 			{data.length > 0 ? (
// 				view === 'table' ? (
// 					renderTableView()
// 				) : (
// 					renderGridView()
// 				)
// 			) : (
// 				<Typography variant="h6" textAlign="center" sx={{ mt: 4 }}>
// 					No data available
// 				</Typography>
// 			)}
// 		</Box>
// 	);
// };

// export default UserDatatable;
'use client';
import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {
	Box,
	Button,
	Card,
	CardContent,
	Grid,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	IconButton,
	Avatar,
	TablePagination,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Tooltip,
} from '@mui/material';
import {
	Delete as DeleteIcon,
	Edit as EditIcon,
	GridView as GridViewIcon,
	TableView as TableViewIcon,
	PictureAsPdf as PictureAsPdfIcon,
	GridOn as GridOnIcon,
} from '@mui/icons-material';

interface Admin {
	firstname: string;
	lastname: string;
	email: string;
	mobile: string;
	userRole: string;
}

interface Plan {
	PlanTitle: string;
}

interface Company {
	_id: string;
	Admin: Admin;
	companyName: string;
	createdAt: string;
	address: string;
	logo?: string;
	plan?: Plan;
}

interface UserDatatableProps {
	datas: any;
	onEdit: (row: any) => void;
	onDelete: (id: string) => void;
}

const UserDatatable: React.FC<UserDatatableProps> = ({ datas, onEdit, onDelete }) => {
	const [data, setData] = useState<Company[]>([]);
	const [view, setView] = useState<'table' | 'grid'>('table');
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [selectedId, setSelectedId] = useState<string | null>(null);

	useEffect(() => {
		setData(datas);
	}, [datas]);

	const handleChangePage = (
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleDeleteClick = (id: string) => {
		setSelectedId(id);
		setOpenDeleteDialog(true);
	};

	const handleConfirmDelete = () => {
		if (selectedId) {
			onDelete(selectedId);
			setOpenDeleteDialog(false);
			setSelectedId(null);
		}
	};

	const handleCancelDelete = () => {
		setOpenDeleteDialog(false);
		setSelectedId(null);
	};

	const exportToExcel = () => {
		const worksheet = XLSX.utils.json_to_sheet(
			data.map(({ Admin, companyName, createdAt, address }) => ({
				name: `${Admin.firstname} ${Admin.lastname}`,
				companyName,
				createdAt: new Date(createdAt).toLocaleDateString(),
				address,
				email: Admin.email,
				mobile: Admin.mobile,
				userRole: Admin.userRole,
			}))
		);
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
		XLSX.writeFile(workbook, 'UserData.xlsx');
	};

	const exportToPDF = () => {
		const doc = new jsPDF() as any;
		doc.text('User Data', 20, 20);
		const tableColumn = [
			'Date',
			'Company Name',
			'Plan Title',
			'Name',
			'Email',
			'Mobile',
			'User Role',
			'Address',
		];
		const tableRows = data.map((item) => [
			new Date(item.createdAt).toLocaleDateString(),
			item.companyName,
			item.plan?.PlanTitle || 'N/A',
			`${item.Admin.firstname} ${item.Admin.lastname}`,
			item.Admin.email,
			item.Admin.mobile,
			item.Admin.userRole,
			item.address,
		]);

		doc.autoTable({ head: [tableColumn], body: tableRows, startY: 30 });
		doc.save('UserData.pdf');
	};

	const renderTableView = () => (
		<>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Date</TableCell>
							<TableCell>Name</TableCell>
							<TableCell>Company Name</TableCell>
							<TableCell>Email</TableCell>
							<TableCell>Mobile</TableCell>
							<TableCell>Plan Title</TableCell>
							<TableCell>User Role</TableCell>
							<TableCell>Address</TableCell>
							<TableCell>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row) => (
								<TableRow key={row._id}>
									<TableCell>
										{new Date(row.createdAt).toLocaleDateString()}
									</TableCell>
									<TableCell>
										<Box sx={{ display: 'flex', alignItems: 'center' }}>
											<Avatar
												src={row.logo}
												sx={{ width: 38, height: 38, mr: 2 }}
											/>
											{`${row.Admin.firstname} ${row.Admin.lastname}`}
										</Box>
									</TableCell>
									<TableCell>{row.companyName}</TableCell>
									<TableCell>{row.Admin.email}</TableCell>
									<TableCell>{row.Admin.mobile}</TableCell>
									<TableCell>{row.plan?.PlanTitle || 'N/A'}</TableCell>
									<TableCell>{row.Admin.userRole}</TableCell>
									<TableCell>{row.address}</TableCell>
									<TableCell>
										<Box
											sx={{
												display: 'flex',
												justifyContent: 'space-between',
											}}
										>
											<Box>
												<IconButton
													color="primary"
													onClick={() => onEdit(row)}
												>
													<EditIcon />
												</IconButton>
											</Box>
											<Box>
												<IconButton
													color="error"
													onClick={() => handleDeleteClick(row._id)}
												>
													<DeleteIcon />
												</IconButton>
											</Box>
										</Box>
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={data.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</>
	);

	const renderGridView = () => (
		<Grid container spacing={2}>
			{data.map((row) => (
				<Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} key={row._id}>
					<Card>
						<CardContent>
							<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
								<Avatar src={row.logo} sx={{ width: 56, height: 56, mr: 2 }} />
								<Box>
									<Typography variant="h6">{`${row.Admin.firstname} ${row.Admin.lastname}`}</Typography>
									<Typography variant="body2" color="text.secondary">
										{row.Admin.userRole}
									</Typography>
								</Box>
							</Box>
							<Typography variant="body2" sx={{ mb: 1 }}>
								<strong>Company:</strong> {row.companyName}
							</Typography>
							<Typography variant="body2" sx={{ mb: 1 }}>
								<strong>Email:</strong> {row.Admin.email}
							</Typography>
							<Typography variant="body2" sx={{ mb: 1 }}>
								<strong>Mobile:</strong> {row.Admin.mobile}
							</Typography>
							<Typography variant="body2" sx={{ mb: 1 }}>
								<strong>Plan:</strong> {row.plan?.PlanTitle || 'N/A'}
							</Typography>
							<Typography variant="body2" sx={{ mb: 1 }}>
								<Tooltip title={row?.address}>
									<Typography>
										<strong>Address:</strong> {row.address.slice(0, 20)}
										{row.address.length > 20 ? '...' : ''}
									</Typography>
								</Tooltip>
							</Typography>
							<Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
								<Typography>
									<IconButton
										color="primary"
										onClick={() => onEdit(row)}
										size="small"
									>
										<EditIcon />
									</IconButton>
								</Typography>
								<Typography>
									<IconButton
										color="error"
										onClick={() => handleDeleteClick(row._id)}
										size="small"
									>
										<DeleteIcon />
									</IconButton>
								</Typography>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			))}
		</Grid>
	);

	return (
		<Box sx={{ p: 2 }}>
			{/* Delete Confirmation Dialog */}
			<Dialog
				open={openDeleteDialog}
				onClose={handleCancelDelete}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{'Confirm Delete'}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Are you sure you want to delete this item? This action cannot be undone.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCancelDelete}>Cancel</Button>
					<Button onClick={handleConfirmDelete} color="error" autoFocus>
						Delete
					</Button>
				</DialogActions>
			</Dialog>

			<Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
				<Tooltip title="Table">
					<Button
						// variant={view === 'table' ? 'contained' : 'outlined'}
						startIcon={<TableViewIcon />}
						onClick={() => setView('table')}
						sx={{ all: 'unset' }}
					></Button>
				</Tooltip>
				<Tooltip title="Grid">
					<Button
						// variant={view === 'grid' ? 'contained' : 'outlined'}
						startIcon={<GridViewIcon />}
						onClick={() => setView('grid')}
						sx={{ all: 'unset' }}
					></Button>
				</Tooltip>
				<Tooltip title="Xcl">
					<Button
						// variant="outlined"
						startIcon={<GridOnIcon />}
						onClick={exportToExcel}
						sx={{ all: 'unset' }}
					></Button>
				</Tooltip>
				<Tooltip title="Pdf">
					<Button
						// variant="outlined"
						startIcon={<PictureAsPdfIcon />}
						onClick={exportToPDF}
						sx={{ all: 'unset' }}
					></Button>
				</Tooltip>
			</Box>
			{data.length > 0 ? (
				view === 'table' ? (
					renderTableView()
				) : (
					renderGridView()
				)
			) : (
				<Typography variant="h6" textAlign="center" sx={{ mt: 4 }}>
					No data available
				</Typography>
			)}
		</Box>
	);
};

export default UserDatatable;
