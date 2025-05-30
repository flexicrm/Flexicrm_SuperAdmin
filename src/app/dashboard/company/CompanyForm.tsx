// import React from 'react';
// import { useFormik, FormikErrors, FormikTouched } from 'formik';
// import * as Yup from 'yup';
// import {
// 	Button,
// 	TextField,
// 	Select,
// 	MenuItem,
// 	FormControl,
// 	InputLabel,
// 	Grid,
// 	Typography,
// } from '@mui/material';

// // Define the types
// interface Address {
// 	street: string;
// 	city: string;
// 	state: string;
// 	country: string;
// 	zipCode: string;
// }

// interface Admin {
// 	firstname: string;
// 	lastname: string;
// 	mobile: string;
// 	email: string;
// 	userRole: string;
// 	address: Address;
// 	[key: string]: any;
// }

// interface FormValues {
// 	companyName: string;
// 	plan: string;
// 	industry: string;
// 	admin: Admin;
// }

// interface CompanyFormProps {
// 	onSubmit: (values: FormValues) => void;
// 	loading: boolean;
// 	error: string | null;
// 	industries: { label: string; value: string }[];
// 	options: { label: string; value: string }[];
// 	initialValues?: FormValues;
// }

// // Validation schema
// const validationSchema = Yup.object({
// 	companyName: Yup.string().required('Company name is required'),
// 	plan: Yup.string().required('Plan is required'),
// 	industry: Yup.string().required('Industry is required'),
// 	admin: Yup.object({
// 		firstname: Yup.string().required('First name is required'),
// 		lastname: Yup.string().required('Last name is required'),
// 		mobile: Yup.string()
// 			.required('Mobile number is required')
// 			.matches(/^\+91-\d{10}$/, 'Mobile number must be in the format +91-XXXXXXXXXX'),
// 		email: Yup.string().email('Invalid email').required('Email is required'),
// 		userRole: Yup.string().required('User role is required'),
// 		address: Yup.object({
// 			street: Yup.string().required('Street is required'),
// 			city: Yup.string().required('City is required'),
// 			state: Yup.string().required('State is required'),
// 			country: Yup.string().required('Country is required'),
// 			zipCode: Yup.string().required('Zip Code is required'),
// 		}),
// 	}),
// });

// const CompanyForm: React.FC<CompanyFormProps> = ({
// 	onSubmit,
// 	loading,
// 	error,
// 	industries,
// 	options,
// 	initialValues,
// }) => {
// 	console.log(initialValues, 'initialValues');
// 	const formik = useFormik<FormValues>({
// 		initialValues: initialValues || {
// 			companyName: '',
// 			plan: '',
// 			industry: '',
// 			admin: {
// 				firstname: '',
// 				lastname: '',
// 				mobile: '',
// 				email: '',
// 				userRole: 'Super Admin',
// 				address: {
// 					street: '',
// 					city: '',
// 					state: '',
// 					country: '',
// 					zipCode: '',
// 				},
// 			},
// 		},
// 		validationSchema,
// 		onSubmit: (values) => {
// 			const dataToSubmit = {
// 				...values,
// 				admin: {
// 					...values.admin,
// 					email: values.admin.email.toLowerCase(),
// 				},
// 			};
// 			onSubmit(dataToSubmit);
// 		},
// 	});

// 	const addressFields: (keyof Address)[] = ['street', 'city', 'state', 'country', 'zipCode'];

// 	return (
// 		<form onSubmit={formik.handleSubmit}>
// 			<Typography variant="h5" gutterBottom>
// 				{initialValues ? 'Edit Company' : 'Create Company'}
// 			</Typography>

// 			{error && (
// 				<Typography color="error" variant="body2">
// 					{error}
// 				</Typography>
// 			)}

// 			<Grid container spacing={2}>
// 				<Grid size={{ xs: 12, md: 6 }}>
// 					<TextField
// 						fullWidth
// 						size="small"
// 						margin="normal"
// 						name="companyName"
// 						label="Company Name"
// 						value={formik.values.companyName}
// 						onChange={formik.handleChange}
// 						onBlur={formik.handleBlur}
// 						error={formik.touched.companyName && Boolean(formik.errors.companyName)}
// 						helperText={formik.touched.companyName && formik.errors.companyName}
// 					/>
// 				</Grid>

// 				<Grid size={{ xs: 12, md: 6 }}>
// 					<FormControl fullWidth margin="normal" size="small">
// 						<InputLabel>Plan</InputLabel>
// 						<Select
// 							name="plan"
// 							value={formik.values.plan}
// 							onChange={(e) => formik.setFieldValue('plan', e.target.value)}
// 							onBlur={formik.handleBlur}
// 							error={formik.touched.plan && Boolean(formik.errors.plan)}
// 						>
// 							{options.map((option) => (
// 								<MenuItem key={option.value} value={option.value}>
// 									{option.label}
// 								</MenuItem>
// 							))}
// 						</Select>
// 						{formik.touched.plan && formik.errors.plan && (
// 							<Typography color="error" variant="body2">
// 								{formik.errors.plan}
// 							</Typography>
// 						)}
// 					</FormControl>
// 				</Grid>

// 				<Grid size={{ xs: 12, md: 6 }}>
// 					<FormControl fullWidth margin="normal" size="small">
// 						<InputLabel>Industry</InputLabel>
// 						<Select
// 							name="industry"
// 							value={formik.values.industry}
// 							onChange={(e) => formik.setFieldValue('industry', e.target.value)}
// 							onBlur={formik.handleBlur}
// 							error={formik.touched.industry && Boolean(formik.errors.industry)}
// 						>
// 							{industries.map((industry) => (
// 								<MenuItem key={industry.value} value={industry.value}>
// 									{industry.label}
// 								</MenuItem>
// 							))}
// 						</Select>
// 						{formik.touched.industry && formik.errors.industry && (
// 							<Typography color="error" variant="body2">
// 								{formik.errors.industry}
// 							</Typography>
// 						)}
// 					</FormControl>
// 				</Grid>

// 				<Grid size={{ xs: 12, md: 12 }}>
// 					<Typography variant="h6" gutterBottom>
// 						Admin Details
// 					</Typography>
// 				</Grid>

// 				{(['firstname', 'lastname', 'email'] as (keyof Admin)[]).map((field) => (
// 					<Grid size={{ xs: 12, md: 6 }} key={field}>
// 						<TextField
// 							fullWidth
// 							size="small"
// 							margin="normal"
// 							name={`admin.${field}`}
// 							label={field?.charAt(0).toUpperCase() + field.slice(1)}
// 							value={formik.values?.admin[field]}
// 							onChange={formik.handleChange}
// 							onBlur={formik.handleBlur}
// 							error={
// 								Boolean(formik.touched.admin?.[field]) &&
// 								Boolean(formik.errors.admin?.[field])
// 							}
// 							// helperText={
// 							// 	formik.touched.admin?.[field] && formik.errors.admin?.[field]
// 							// }
// 						/>
// 					</Grid>
// 				))}

// 				<Grid size={{ xs: 12, md: 6 }}>
// 					<TextField
// 						fullWidth
// 						size="small"
// 						margin="normal"
// 						name="admin.userRole"
// 						label="User Role"
// 						value={formik.values.admin.userRole}
// 						onChange={formik.handleChange}
// 						onBlur={formik.handleBlur}
// 						error={
// 							Boolean(formik.touched.admin?.userRole) &&
// 							Boolean(formik.errors.admin?.userRole)
// 						}
// 						helperText={formik.touched.admin?.userRole && formik.errors.admin?.userRole}
// 						select
// 					>
// 						{['Super Admin', 'Admin', 'User'].map((role) => (
// 							<MenuItem key={role} value={role}>
// 								{role}
// 							</MenuItem>
// 						))}
// 					</TextField>
// 				</Grid>

// 				<Grid size={{ xs: 12, md: 6 }}>
// 					<TextField
// 						fullWidth
// 						size="small"
// 						margin="normal"
// 						name="admin.mobile"
// 						label="Mobile"
// 						value={formik.values.admin.mobile}
// 						onChange={formik.handleChange}
// 						onBlur={formik.handleBlur}
// 						error={
// 							Boolean(formik.touched.admin?.mobile) &&
// 							Boolean(formik.errors.admin?.mobile)
// 						}
// 						helperText={formik.touched.admin?.mobile && formik.errors.admin?.mobile}
// 					/>
// 				</Grid>

// 				<Grid size={{ xs: 12, md: 12 }}>
// 					<Typography variant="h6" gutterBottom>
// 						Address
// 					</Typography>
// 				</Grid>

// 				{addressFields.map((field) => (
// 					<Grid size={{ xs: 12, md: 6 }} key={field}>
// 						<TextField
// 							fullWidth
// 							size="small"
// 							margin="normal"
// 							name={`admin.address.${field}`}
// 							label={field.charAt(0).toUpperCase() + field.slice(1)}
// 							value={formik.values.admin.address[field]}
// 							onChange={formik.handleChange}
// 							onBlur={formik.handleBlur}
// 							error={
// 								Boolean(formik.touched.admin?.address?.[field]) &&
// 								Boolean(formik.errors.admin?.address?.[field])
// 							}
// 							helperText={
// 								formik.touched.admin?.address?.[field] &&
// 								formik.errors.admin?.address?.[field]
// 							}
// 						/>
// 					</Grid>
// 				))}

// 				<Grid size={{ xs: 12 }}>
// 					<Button
// 						type="submit"
// 						variant="contained"
// 						color="primary"
// 						disabled={loading}
// 						fullWidth
// 						sx={{ mt: 2 }}
// 					>
// 						{loading ? 'Submitting...' : 'Submit'}
// 					</Button>
// 				</Grid>
// 			</Grid>
// 		</form>
// 	);
// };

// export default CompanyForm;
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
	Button,
	TextField,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Grid,
	Typography,
} from '@mui/material';

// Define the types
interface Address {
	street: string;
	city: string;
	state: string;
	country: string;
	zipCode: string;
}

interface Admin {
	firstname: string;
	lastname: string;
	mobile: string;
	email: string;
	userRole: string;
	address: Address;
}

interface FormValues {
	companyName: string;
	plan: string;
	industry: string;
	admin: Admin;
}

interface CompanyFormProps {
	onSubmit: (values: FormValues) => void;
	loading: boolean;
	error: string | null;
	industries: { label: string; value: string }[];
	options: { label: string; value: string }[];
	initialValues?: any;
}

// Validation schema
const validationSchema = Yup.object({
	companyName: Yup.string().required('Company name is required'),
	plan: Yup.string().required('Plan is required'),
	industry: Yup.string().required('Industry is required'),
	admin: Yup.object({
		firstname: Yup.string().required('First name is required'),
		lastname: Yup.string().required('Last name is required'),
		mobile: Yup.string()
			.required('Mobile number is required')
			.matches(/^\+91-\d{10}$/, 'Mobile number must be in the format +91-XXXXXXXXXX'),
		email: Yup.string().email('Invalid email').required('Email is required'),
		userRole: Yup.string().required('User role is required'),
		address: Yup.object({
			street: Yup.string().required('Street is required'),
			city: Yup.string().required('City is required'),
			state: Yup.string().required('State is required'),
			country: Yup.string().required('Country is required'),
			zipCode: Yup.string().required('Zip Code is required'),
		}),
	}),
});

const CompanyForm: React.FC<CompanyFormProps> = ({
	onSubmit,
	loading,
	error,
	industries,
	options,
	initialValues,
}) => {
	console.log(initialValues, 'initialValues');
	const formik = useFormik<FormValues>({
		initialValues: {
			companyName: initialValues?.companyName || '',
			plan: initialValues?.plan?._id || '',
			industry: initialValues?.industry?._id || '',
			admin: {
				firstname: initialValues?.Admin?.firstname || '',
				lastname: initialValues?.Admin?.lastname || '',
				mobile: initialValues?.Admin?.mobile || '',
				email: initialValues?.Admin?.email || '',
				userRole: initialValues?.Admin?.userRole || 'Super Admin',
				address: {
					street: initialValues?.Admin?.address?.street || '',
					city: initialValues?.Admin?.address?.city || '',
					state: initialValues?.Admin?.address?.state || '',
					country: initialValues?.Admin?.address?.country || '',
					zipCode: initialValues?.Admin?.address?.zipCode || '',
				},
			},
			// ...initialValues,
		},
		validationSchema,
		onSubmit: (values) => {
			const dataToSubmit = {
				...values,
				admin: {
					...values.admin,
					email: values.admin.email.toLowerCase(),
				},
			};
			onSubmit(dataToSubmit);
		},
	});

	const addressFields: (keyof Address)[] = ['street', 'city', 'state', 'country', 'zipCode'];

	return (
		<form onSubmit={formik.handleSubmit}>
			{/* <Typography variant="h5" gutterBottom>
				{initialValues ? 'Edit Company' : 'Create Company'}
			</Typography> */}

			{error && (
				<Typography color="error" variant="body2">
					{error}
				</Typography>
			)}

			<Grid container spacing={2}>
				<Grid size={{ xs: 12, sm: 6 }}>
					<TextField
						fullWidth
						size="small"
						margin="normal"
						name="companyName"
						label="Company Name"
						value={formik.values.companyName}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.companyName && Boolean(formik.errors.companyName)}
						helperText={formik.touched.companyName && formik.errors.companyName}
					/>
				</Grid>

				<Grid size={{ xs: 12, sm: 6 }}>
					<FormControl fullWidth margin="normal" size="small">
						<InputLabel>Plan</InputLabel>
						<Select
							name="plan"
							value={formik.values.plan}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.plan && Boolean(formik.errors.plan)}
						>
							{options.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</Select>
						{formik.touched.plan && formik.errors.plan && (
							<Typography color="error" variant="body2">
								{formik.errors.plan}
							</Typography>
						)}
					</FormControl>
				</Grid>

				<Grid size={{ xs: 12, sm: 6 }}>
					<FormControl fullWidth margin="normal" size="small">
						<InputLabel>Industry</InputLabel>
						<Select
							name="industry"
							value={formik.values.industry}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.industry && Boolean(formik.errors.industry)}
						>
							{industries.map((industry) => (
								<MenuItem key={industry.value} value={industry.value}>
									{industry.label}
								</MenuItem>
							))}
						</Select>
						{formik.touched.industry && formik.errors.industry && (
							<Typography color="error" variant="body2">
								{formik.errors.industry}
							</Typography>
						)}
					</FormControl>
				</Grid>

				<Grid size={{ xs: 12, sm: 12 }}>
					<Typography variant="h6" gutterBottom>
						Admin Details
					</Typography>
				</Grid>

				{(['firstname', 'lastname', 'email'] as const).map((field) => (
					<Grid size={{ xs: 12, sm: 6 }} key={field}>
						<TextField
							fullWidth
							size="small"
							margin="normal"
							name={`admin.${field}`}
							label={field.charAt(0).toUpperCase() + field.slice(1)}
							value={formik.values.admin[field]}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={
								Boolean(formik.touched.admin?.[field]) &&
								Boolean(formik.errors.admin?.[field])
							}
							helperText={
								formik.touched.admin?.[field] && formik.errors.admin?.[field]
							}
						/>
					</Grid>
				))}

				<Grid size={{ xs: 12, sm: 6 }}>
					<TextField
						fullWidth
						size="small"
						margin="normal"
						name="admin.userRole"
						label="User Role"
						value={formik.values.admin.userRole}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							Boolean(formik.touched.admin?.userRole) &&
							Boolean(formik.errors.admin?.userRole)
						}
						helperText={formik.touched.admin?.userRole && formik.errors.admin?.userRole}
						select
					>
						{['Super Admin', 'Admin', 'User'].map((role) => (
							<MenuItem key={role} value={role}>
								{role}
							</MenuItem>
						))}
					</TextField>
				</Grid>

				<Grid size={{ xs: 12, sm: 6 }}>
					<TextField
						fullWidth
						size="small"
						margin="normal"
						name="admin.mobile"
						label="Mobile"
						value={formik.values.admin.mobile}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							Boolean(formik.touched.admin?.mobile) &&
							Boolean(formik.errors.admin?.mobile)
						}
						helperText={formik.touched.admin?.mobile && formik.errors.admin?.mobile}
					/>
				</Grid>

				<Grid size={{ xs: 12, sm: 12 }}>
					<Typography variant="h6" gutterBottom>
						Address
					</Typography>
				</Grid>

				{addressFields.map((field) => (
					<Grid size={{ xs: 12, sm: 6 }} key={field}>
						<TextField
							fullWidth
							size="small"
							margin="normal"
							name={`admin.address.${field}`}
							label={field.charAt(0).toUpperCase() + field.slice(1)}
							value={formik.values.admin.address[field]}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={
								Boolean(formik.touched.admin?.address?.[field]) &&
								Boolean(formik.errors.admin?.address?.[field])
							}
							helperText={
								formik.touched.admin?.address?.[field] &&
								formik.errors.admin?.address?.[field]
							}
						/>
					</Grid>
				))}

				<Grid size={{ xs: 12, sm: 12 }}>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						disabled={loading}
						fullWidth
						sx={{ mt: 2 }}
					>
						{loading ? 'Submitting...' : 'Submit'}
					</Button>
				</Grid>
			</Grid>
		</form>
	);
};

export default CompanyForm;
