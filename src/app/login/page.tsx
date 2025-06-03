// // 'use client';
// // import React, { useState } from 'react';
// // import {
// // 	Box,
// // 	Button,
// // 	Checkbox,
// // 	CircularProgress,
// // 	FormControlLabel,
// // 	Grid,
// // 	TextField,
// // 	Typography,
// // 	Paper,
// // 	Link,
// // } from '@mui/material';
// // import { useFormik } from 'formik';
// // import * as yup from 'yup';
// // import axios from 'axios';
// // import Swal from 'sweetalert2';
// // import { API_BASE_URL } from '@/utlis';

// // const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

// // const validationSchema = yup.object({
// // 	email: yup.string().email('Invalid email format').required('Email is required'),
// // 	password: yup
// // 		.string()
// // 		.min(5, 'Minimum 5 characters required')
// // 		.matches(passwordRules, 'Password must contain uppercase, lowercase, and a number')
// // 		.required('Password is required'),
// // });

// // const LoginPage: React.FC = () => {
// // 	const [loading, setLoading] = useState(false);

// // 	const handleLogin = async () => {
// // 		setLoading(true);
// // 		try {
// // 			const response = await axios.post(`${API_BASE_URL}/admin/login`, {
// // 				email: values.email,
// // 				password: values.password,
// // 			});

// // 			const { accessToken, refreshToken } = response.data.data;

// // 			localStorage.setItem('accessToken', accessToken);
// // 			localStorage.setItem('refreshToken', refreshToken);

// // 			Swal.fire({
// // 				title: 'Success!',
// // 				text: 'Login successful.',
// // 				icon: 'success',
// // 				confirmButtonText: 'OK',
// // 			});

// // 			window.location.href = '/dashboard';
// // 		} catch (error) {
// // 			Swal.fire({
// // 				title: 'Error!',
// // 				text: 'Login failed. Please check your credentials.',
// // 				icon: 'error',
// // 				confirmButtonText: 'OK',
// // 			});
// // 			console.error('Login failed', error);
// // 		} finally {
// // 			setLoading(false);
// // 		}
// // 	};

// // 	const { values, handleChange, handleSubmit, errors, touched } = useFormik({
// // 		initialValues: {
// // 			email: '',
// // 			password: '',
// // 			rememberMe: false,
// // 		},
// // 		validationSchema,
// // 		onSubmit: handleLogin,
// // 	});

// // 	return (
// // 		<Box
// // 			sx={{
// // 				minHeight: '100vh',
// // 				background: 'linear-gradient(to right, #2C3E50, #4CA1AF)',
// // 				display: 'flex',
// // 				alignItems: 'center',
// // 				justifyContent: 'center',
// // 				px: 2,
// // 			}}
// // 		>
// // 			<Paper
// // 				elevation={10}
// // 				sx={{
// // 					width: '100%',
// // 					maxWidth: 450,
// // 					p: 5,
// // 					borderRadius: 4,
// // 					backgroundColor: '#fff',
// // 				}}
// // 			>
// // 				<Box textAlign="center" mb={4}>
// // 					<Typography variant="h4" fontWeight="bold" color="primary">
// // 						FlexiCRM Admin
// // 					</Typography>
// // 					<Typography variant="subtitle1" color="textSecondary">
// // 						Super Admin Login
// // 					</Typography>
// // 				</Box>

// // 				<form onSubmit={handleSubmit} noValidate>
// // 					<TextField
// // 						fullWidth
// // 						id="email"
// // 						name="email"
// // 						label="Email Address"
// // 						variant="outlined"
// // 						value={values.email}
// // 						onChange={handleChange}
// // 						error={touched.email && Boolean(errors.email)}
// // 						helperText={touched.email && errors.email}
// // 						margin="normal"
// // 					/>

// // 					<TextField
// // 						fullWidth
// // 						id="password"
// // 						name="password"
// // 						label="Password"
// // 						type="password"
// // 						variant="outlined"
// // 						value={values.password}
// // 						onChange={handleChange}
// // 						error={touched.password && Boolean(errors.password)}
// // 						helperText={touched.password && errors.password}
// // 						margin="normal"
// // 					/>

// // 					<Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
// // 						<FormControlLabel
// // 							control={
// // 								<Checkbox
// // 									id="rememberMe"
// // 									name="rememberMe"
// // 									checked={values.rememberMe}
// // 									onChange={handleChange}
// // 									color="primary"
// // 								/>
// // 							}
// // 							label="Remember me"
// // 						/>
// // 						<Link href="#" variant="body2" underline="hover" color="primary">
// // 							Forgot password?
// // 						</Link>
// // 					</Box>

// // 					<Button
// // 						fullWidth
// // 						type="submit"
// // 						variant="contained"
// // 						color="primary"
// // 						sx={{ mt: 4, py: 1.5, fontSize: '1rem', fontWeight: 600 }}
// // 						disabled={loading}
// // 						startIcon={loading && <CircularProgress size={20} color="inherit" />}
// // 					>
// // 						{loading ? 'Signing In...' : 'Sign In'}
// // 					</Button>
// // 				</form>
// // 			</Paper>
// // 		</Box>
// // 	);
// // };

// // export default LoginPage;
// 'use client';
// import React, { useState } from 'react';
// import {
// 	Box,
// 	Button,
// 	Checkbox,
// 	CircularProgress,
// 	FormControlLabel,
// 	Grid,
// 	TextField,
// 	Typography,
// 	Paper,
// 	Link,
// 	IconButton,
// 	InputAdornment,
// 	useTheme,
// } from '@mui/material';
// import { useFormik } from 'formik';
// import * as yup from 'yup';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { API_BASE_URL } from '@/utlis';
// import { Visibility, VisibilityOff } from '@mui/icons-material';

// const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

// const validationSchema = yup.object({
// 	email: yup.string().email('Invalid email format').required('Email is required'),
// 	password: yup
// 		.string()
// 		.min(5, 'Minimum 5 characters required')
// 		.matches(passwordRules, 'Password must contain uppercase, lowercase, and a number')
// 		.required('Password is required'),
// });

// const LoginPage: React.FC = () => {
// 	const [loading, setLoading] = useState(false);
// 	const [showPassword, setShowPassword] = useState(false);
// 	const theme = useTheme();

// 	const handleClickShowPassword = () => {
// 		setShowPassword(!showPassword);
// 	};

// 	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
// 		event.preventDefault();
// 	};

// 	const handleLogin = async () => {
// 		setLoading(true);
// 		try {
// 			const response = await axios.post(`${API_BASE_URL}/admin/login`, {
// 				email: values.email,
// 				password: values.password,
// 			});

// 			const { accessToken, refreshToken } = response.data.data;

// 			localStorage.setItem('accessToken', accessToken);
// 			localStorage.setItem('refreshToken', refreshToken);

// 			Swal.fire({
// 				title: 'Success!',
// 				text: 'Login successful.',
// 				icon: 'success',
// 				confirmButtonText: 'OK',
// 			});

// 			window.location.href = '/dashboard';
// 		} catch (error) {
// 			Swal.fire({
// 				title: 'Error!',
// 				text: 'Login failed. Please check your credentials.',
// 				icon: 'error',
// 				confirmButtonText: 'OK',
// 			});
// 			console.error('Login failed', error);
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	const { values, handleChange, handleSubmit, errors, touched } = useFormik({
// 		initialValues: {
// 			email: '',
// 			password: '',
// 			rememberMe: false,
// 		},
// 		validationSchema,
// 		onSubmit: handleLogin,
// 	});

// 	return (
// 		<Box
// 			sx={{
// 				minHeight: '100vh',
// 				background: `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.secondary.main})`,
// 				display: 'flex',
// 				alignItems: 'center',
// 				justifyContent: 'center',
// 				px: 2,
// 			}}
// 		>
// 			<Paper
// 				elevation={10}
// 				sx={{
// 					width: '100%',
// 					maxWidth: 450,
// 					p: 5,
// 					borderRadius: 4,
// 					backgroundColor: theme.palette.background.paper,
// 				}}
// 			>
// 				<Box textAlign="center" mb={4}>
// 					<Typography variant="h4" fontWeight="bold" color="primary">
// 						FlexiCRM Admin
// 					</Typography>
// 					<Typography variant="subtitle1" color="textSecondary">
// 						Super Admin Login
// 					</Typography>
// 				</Box>

// 				<form onSubmit={handleSubmit} noValidate>
// 					<TextField
// 						fullWidth
// 						id="email"
// 						name="email"
// 						label="Email Address"
// 						variant="outlined"
// 						value={values.email}
// 						onChange={handleChange}
// 						error={touched.email && Boolean(errors.email)}
// 						helperText={touched.email && errors.email}
// 						margin="normal"
// 						sx={{ mb: 2 }}
// 						InputProps={{
// 							sx: {
// 								borderRadius: 2,
// 							},
// 						}}
// 					/>

// 					<TextField
// 						fullWidth
// 						id="password"
// 						name="password"
// 						label="Password"
// 						type={showPassword ? 'text' : 'password'}
// 						variant="outlined"
// 						value={values.password}
// 						onChange={handleChange}
// 						error={touched.password && Boolean(errors.password)}
// 						helperText={touched.password && errors.password}
// 						margin="normal"
// 						sx={{ mb: 1 }}
// 						InputProps={{
// 							sx: {
// 								borderRadius: 2,
// 							},
// 							endAdornment: (
// 								<InputAdornment position="end">
// 									<IconButton
// 										aria-label="toggle password visibility"
// 										onClick={handleClickShowPassword}
// 										onMouseDown={handleMouseDownPassword}
// 										edge="end"
// 										sx={{ color: theme.palette.action.active }}
// 									>
// 										{showPassword ? <VisibilityOff /> : <Visibility />}
// 									</IconButton>
// 								</InputAdornment>
// 							),
// 						}}
// 					/>

// 					<Box
// 						display="flex"
// 						justifyContent="space-between"
// 						alignItems="center"
// 						mt={1}
// 						mb={2}
// 					>
// 						<FormControlLabel
// 							control={
// 								<Checkbox
// 									id="rememberMe"
// 									name="rememberMe"
// 									checked={values.rememberMe}
// 									onChange={handleChange}
// 									color="primary"
// 								/>
// 							}
// 							label="Remember me"
// 							sx={{ color: theme.palette.text.secondary }}
// 						/>
// 						<Link href="#" variant="body2" underline="hover" color="secondary">
// 							Forgot password?
// 						</Link>
// 					</Box>

// 					<Button
// 						fullWidth
// 						type="submit"
// 						variant="contained"
// 						color="primary"
// 						sx={{
// 							mt: 3,
// 							py: 1.5,
// 							fontSize: '1rem',
// 							fontWeight: 600,
// 							borderRadius: 2,
// 							textTransform: 'none',
// 							'&:hover': {
// 								backgroundColor: theme.palette.primary.dark,
// 							},
// 						}}
// 						disabled={loading}
// 						startIcon={loading && <CircularProgress size={20} color="inherit" />}
// 					>
// 						{loading ? 'Signing In...' : 'Sign In'}
// 					</Button>
// 				</form>
// 			</Paper>
// 		</Box>
// 	);
// };

// export default LoginPage;
'use client';
import React, { useState } from 'react';
import {
	Box,
	Button,
	Checkbox,
	CircularProgress,
	FormControlLabel,
	Grid,
	TextField,
	Typography,
	Paper,
	Link,
	IconButton,
	InputAdornment,
	useTheme,
	Snackbar,
	Alert,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { API_BASE_URL } from '@/utlis';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

const validationSchema = yup.object({
	email: yup.string().email('Invalid email format').required('Email is required'),
	password: yup
		.string()
		.min(5, 'Minimum 5 characters required')
		.matches(passwordRules, 'Password must contain uppercase, lowercase, and a number')
		.required('Password is required'),
});

const LoginPage: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [snackbar, setSnackbar] = useState({
		open: false,
		message: '',
		severity: 'success' as 'success' | 'error',
	});
	const theme = useTheme();

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const handleCloseSnackbar = () => {
		setSnackbar((prev) => ({ ...prev, open: false }));
	};

	const handleLogin = async () => {
		setLoading(true);
		try {
			const response = await axios.post(`${API_BASE_URL}/admin/login`, {
				email: values.email,
				password: values.password,
			});

			const { accessToken, refreshToken } = response.data.data;

			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem('refreshToken', refreshToken);

			setSnackbar({
				open: true,
				message: 'Login successful.',
				severity: 'success',
			});

			setTimeout(() => {
				window.location.href = '/dashboard';
			}, 1000);
		} catch (error) {
			console.error('Login failed', error);
			setSnackbar({
				open: true,
				message: 'Login failed. Please check your credentials.',
				severity: 'error',
			});
		} finally {
			setLoading(false);
		}
	};

	const { values, handleChange, handleSubmit, errors, touched } = useFormik({
		initialValues: {
			email: '',
			password: '',
			rememberMe: false,
		},
		validationSchema,
		onSubmit: handleLogin,
	});

	return (
		<Box
			sx={{
				minHeight: '100vh',
				// background: `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.secondary.main})`,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				px: 2,
			}}
		>
			<Paper
				elevation={10}
				sx={{
					width: '100%',
					maxWidth: 450,
					p: 5,
					borderRadius: 4,
					backgroundColor: theme.palette.background.paper,
				}}
			>
				<Box textAlign="center" mb={4}>
					<Typography variant="h4" fontWeight="bold">
						FlexiCRM Admin
					</Typography>
					<Typography variant="subtitle1" color="textSecondary">
						Super Admin Login
					</Typography>
				</Box>

				<form onSubmit={handleSubmit} noValidate>
					<TextField
						fullWidth
						id="email"
						name="email"
						label="Email Address"
						variant="outlined"
						value={values.email}
						onChange={handleChange}
						error={touched.email && Boolean(errors.email)}
						helperText={touched.email && errors.email}
						margin="normal"
						sx={{ mb: 2 }}
						InputProps={{
							sx: {
								borderRadius: 2,
							},
						}}
					/>

					<TextField
						fullWidth
						id="password"
						name="password"
						label="Password"
						type={showPassword ? 'text' : 'password'}
						variant="outlined"
						value={values.password}
						onChange={handleChange}
						error={touched.password && Boolean(errors.password)}
						helperText={touched.password && errors.password}
						margin="normal"
						sx={{ mb: 1 }}
						InputProps={{
							sx: {
								borderRadius: 2,
							},
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
										sx={{ color: theme.palette.action.active }}
									>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>

					<Box
						display="flex"
						justifyContent="space-between"
						alignItems="center"
						mt={1}
						mb={2}
					>
						<FormControlLabel
							control={
								<Checkbox
									id="rememberMe"
									name="rememberMe"
									checked={values.rememberMe}
									onChange={handleChange}
									color="primary"
								/>
							}
							label="Remember me"
							sx={{ color: theme.palette.text.secondary }}
						/>
						{/* <Link href="#" variant="body2" underline="hover" color="secondary">
							Forgot password?
						</Link> */}
					</Box>

					<Button
						fullWidth
						type="submit"
						variant="contained"
						sx={{
							mt: 3,
							py: 1.5,
							fontSize: '1rem',
							background: '#000000',
							fontWeight: 600,
							borderRadius: 2,
							textTransform: 'none',
							'&:hover': {
								backgroundColor: '#000000',
							},
						}}
						disabled={loading}
						startIcon={loading && <CircularProgress size={20} color="inherit" />}
					>
						{loading ? 'Signing In...' : 'Sign In'}
					</Button>
				</form>
			</Paper>

			<Snackbar
				open={snackbar.open}
				autoHideDuration={4000}
				onClose={handleCloseSnackbar}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			>
				<Alert
					onClose={handleCloseSnackbar}
					severity={snackbar.severity}
					sx={{ width: '100%' }}
				>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</Box>
	);
};

export default LoginPage;
