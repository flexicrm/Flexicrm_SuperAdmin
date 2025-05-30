'use client';
import React from 'react';
import {
	Box,
	Grid,
	Paper,
	Typography,
	Stack,
	Divider,
	IconButton,
	useTheme,
	Card,
	CardContent,
	Avatar,
	LinearProgress,
} from '@mui/material';
import {
	Person as PersonIcon,
	AttachMoney as RevenueIcon,
	ShoppingCart as OrdersIcon,
	Email as EmailIcon,
	ArrowUpward as ArrowUpIcon,
	ArrowDownward as ArrowDownIcon,
	MoreVert as MoreIcon,
} from '@mui/icons-material';
import {
	BarChart,
	Bar,
	LineChart,
	Line,
	PieChart,
	Pie,
	Cell,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	AreaChart,
	Area,
} from 'recharts';

const Dashboard = () => {
	const theme = useTheme();

	// Sample data for charts
	const revenueData = [
		{ name: 'Jan', value: 4000 },
		{ name: 'Feb', value: 3000 },
		{ name: 'Mar', value: 5000 },
		{ name: 'Apr', value: 2780 },
		{ name: 'May', value: 1890 },
		{ name: 'Jun', value: 2390 },
		{ name: 'Jul', value: 3490 },
	];

	const userActivityData = [
		{ name: 'Mon', active: 4000, new: 2400 },
		{ name: 'Tue', active: 3000, new: 1398 },
		{ name: 'Wed', active: 2000, new: 9800 },
		{ name: 'Thu', active: 2780, new: 3908 },
		{ name: 'Fri', active: 1890, new: 4800 },
		{ name: 'Sat', active: 2390, new: 3800 },
		{ name: 'Sun', active: 3490, new: 4300 },
	];

	const leadSourceData = [
		{ name: 'Organic', value: 400 },
		{ name: 'Social', value: 300 },
		{ name: 'Referral', value: 200 },
		{ name: 'Paid', value: 100 },
	];

	const COLORS = [
		theme.palette.primary.main,
		theme.palette.secondary.main,
		theme.palette.success.main,
		theme.palette.warning.main,
	];

	// Key metrics data
	const metrics = [
		{
			title: 'Total Users',
			value: '12,345',
			change: 12.5,
			icon: <PersonIcon fontSize="large" />,
			color: theme.palette.primary.main,
		},
		{
			title: 'Total Revenue',
			value: '$48,234',
			change: 8.2,
			icon: <RevenueIcon fontSize="large" />,
			color: theme.palette.success.main,
		},
		{
			title: 'New Orders',
			value: '1,234',
			change: -2.4,
			icon: <OrdersIcon fontSize="large" />,
			color: theme.palette.warning.main,
		},
		{
			title: 'Unread Messages',
			value: '56',
			change: 3.9,
			icon: <EmailIcon fontSize="large" />,
			color: theme.palette.error.main,
		},
	];

	// Recent activities data
	const activities = [
		{ id: 1, user: 'John Doe', action: 'created a new order', time: '5 mins ago' },
		{ id: 2, user: 'Jane Smith', action: 'updated profile', time: '12 mins ago' },
		{ id: 3, user: 'Robert Johnson', action: 'deleted account', time: '18 mins ago' },
		{ id: 4, user: 'Emily Davis', action: 'placed an order', time: '25 mins ago' },
		{ id: 5, user: 'Michael Brown', action: 'requested support', time: '42 mins ago' },
	];

	return (
		<Box sx={{ p: 3 }}>
			<Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
				CRM Dashboard
			</Typography>

			{/* Key Metrics */}
			<Grid container spacing={3} sx={{ mb: 3 }}>
				{metrics.map((metric, index) => (
					<Grid size={{ sm: 12, md: 3 }} key={index}>
						<Card sx={{ height: '100%', borderRadius: '12px' }}>
							<CardContent>
								<Stack
									direction="row"
									justifyContent="space-between"
									alignItems="center"
								>
									<Avatar
										sx={{ bgcolor: metric.color + '20', color: metric.color }}
									>
										{metric.icon}
									</Avatar>
									<IconButton size="small">
										<MoreIcon />
									</IconButton>
								</Stack>
								<Typography variant="h6" sx={{ mt: 1 }}>
									{metric.title}
								</Typography>
								<Typography variant="h4" sx={{ fontWeight: 'bold' }}>
									{metric.value}
								</Typography>
								<Stack direction="row" alignItems="center" spacing={0.5}>
									{metric.change > 0 ? (
										<ArrowUpIcon color="success" fontSize="small" />
									) : (
										<ArrowDownIcon color="error" fontSize="small" />
									)}
									<Typography
										variant="body2"
										color={metric.change > 0 ? 'success.main' : 'error.main'}
									>
										{metric.change > 0 ? '+' : ''}
										{metric.change}% from last month
									</Typography>
								</Stack>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>

			{/* Main Charts Row */}
			<Grid container spacing={3} sx={{ mb: 3 }}>
				{/* Revenue Chart */}
				<Grid size={{ sm: 12, md: 4 }}>
					<Paper sx={{ p: 2, borderRadius: '12px', height: '100%' }}>
						<Stack
							direction="row"
							justifyContent="space-between"
							alignItems="center"
							sx={{ mb: 2 }}
						>
							<Typography variant="h6" fontWeight="bold">
								Revenue Overview
							</Typography>
							<IconButton size="small">
								<MoreIcon />
							</IconButton>
						</Stack>
						<Divider sx={{ mb: 2 }} />
						<Box sx={{ height: 300 }}>
							<ResponsiveContainer width="100%" height="100%">
								<AreaChart data={revenueData}>
									<CartesianGrid
										strokeDasharray="3 3"
										stroke={theme.palette.divider}
									/>
									<XAxis dataKey="name" />
									<YAxis />
									<Tooltip />
									<Area
										type="monotone"
										dataKey="value"
										stroke={theme.palette.primary.main}
										fill={theme.palette.primary.light}
										fillOpacity={0.5}
									/>
								</AreaChart>
							</ResponsiveContainer>
						</Box>
					</Paper>
				</Grid>

				{/* Lead Sources Chart */}
				<Grid size={{ sm: 12, md: 4 }}>
					<Paper sx={{ p: 2, borderRadius: '12px', height: '100%' }}>
						<Stack
							direction="row"
							justifyContent="space-between"
							alignItems="center"
							sx={{ mb: 2 }}
						>
							<Typography variant="h6" fontWeight="bold">
								Lead Sources
							</Typography>
							<IconButton size="small">
								<MoreIcon />
							</IconButton>
						</Stack>
						<Divider sx={{ mb: 2 }} />
						<Box sx={{ height: 300 }}>
							<ResponsiveContainer width="100%" height="100%">
								<PieChart>
									<Pie
										data={leadSourceData}
										cx="50%"
										cy="50%"
										labelLine={false}
										outerRadius={80}
										fill="#8884d8"
										dataKey="value"
										label={({ name, percent }) =>
											`${name}: ${(percent * 100).toFixed(0)}%`
										}
									>
										{leadSourceData.map((entry, index) => (
											<Cell
												key={`cell-${index}`}
												fill={COLORS[index % COLORS.length]}
											/>
										))}
									</Pie>
									<Tooltip />
								</PieChart>
							</ResponsiveContainer>
						</Box>
					</Paper>
				</Grid>
				<Grid size={{ sm: 12, md: 4 }}>
					<Paper sx={{ p: 2, borderRadius: '12px' }}>
						<Stack
							direction="row"
							justifyContent="space-between"
							alignItems="center"
							sx={{ mb: 2 }}
						>
							<Typography variant="h6" fontWeight="bold">
								User Activity
							</Typography>
							<IconButton size="small">
								<MoreIcon />
							</IconButton>
						</Stack>
						<Divider sx={{ mb: 2 }} />
						<Box sx={{ height: 300 }}>
							<ResponsiveContainer width="100%" height="100%">
								<BarChart data={userActivityData}>
									<CartesianGrid
										strokeDasharray="3 3"
										stroke={theme.palette.divider}
									/>
									<XAxis dataKey="name" />
									<YAxis />
									<Tooltip />
									<Legend />
									<Bar
										dataKey="active"
										fill={theme.palette.primary.main}
										name="Active Users"
									/>
									<Bar
										dataKey="new"
										fill={theme.palette.secondary.main}
										name="New Users"
									/>
								</BarChart>
							</ResponsiveContainer>
						</Box>
					</Paper>
				</Grid>
			</Grid>

			{/* Second Charts Row */}
			<Grid container spacing={3} sx={{ mb: 3 }}>
				{/* User Activity Chart */}

				{/* Conversion Rate Chart */}
				<Grid size={{ sm: 12, md: 4 }}>
					<Paper sx={{ p: 2, borderRadius: '12px' }}>
						<Stack
							direction="row"
							justifyContent="space-between"
							alignItems="center"
							sx={{ mb: 2 }}
						>
							<Typography variant="h6" fontWeight="bold">
								Conversion Rate
							</Typography>
							<IconButton size="small">
								<MoreIcon />
							</IconButton>
						</Stack>
						<Divider sx={{ mb: 2 }} />
						<Box sx={{ height: 300 }}>
							<ResponsiveContainer width="100%" height="100%">
								<LineChart
									data={[
										{ name: 'Jan', rate: 2.5 },
										{ name: 'Feb', rate: 3.2 },
										{ name: 'Mar', rate: 3.8 },
										{ name: 'Apr', rate: 4.1 },
										{ name: 'May', rate: 4.5 },
										{ name: 'Jun', rate: 5.0 },
										{ name: 'Jul', rate: 5.3 },
									]}
								>
									<CartesianGrid
										strokeDasharray="3 3"
										stroke={theme.palette.divider}
									/>
									<XAxis dataKey="name" />
									<YAxis />
									<Tooltip />
									<Line
										type="monotone"
										dataKey="rate"
										stroke={theme.palette.success.main}
										activeDot={{ r: 8 }}
										name="Conversion Rate (%)"
									/>
								</LineChart>
							</ResponsiveContainer>
						</Box>
					</Paper>
				</Grid>
				<Grid size={{ sm: 12, md: 4 }}>
					<Paper sx={{ p: 2, borderRadius: '12px' }}>
						<Stack
							direction="row"
							justifyContent="space-between"
							alignItems="center"
							sx={{ mb: 2 }}
						>
							<Typography variant="h6" fontWeight="bold">
								Recent Activities
							</Typography>
							<IconButton size="small">
								<MoreIcon />
							</IconButton>
						</Stack>
						<Divider sx={{ mb: 2 }} />
						<Stack spacing={2}>
							{activities.map((activity) => (
								<Stack
									key={activity.id}
									direction="row"
									spacing={2}
									alignItems="center"
								>
									<Avatar sx={{ width: 40, height: 40 }}>
										{activity.user.charAt(0).toUpperCase()}
									</Avatar>
									<Box sx={{ flexGrow: 1 }}>
										<Typography variant="body1">
											<strong>{activity.user}</strong> {activity.action}
										</Typography>
										<Typography variant="body2" color="text.secondary">
											{activity.time}
										</Typography>
									</Box>
								</Stack>
							))}
						</Stack>
					</Paper>
				</Grid>
				<Grid size={{ sm: 12, md: 4 }}>
					<Paper sx={{ p: 2, borderRadius: '12px' }}>
						<Stack
							direction="row"
							justifyContent="space-between"
							alignItems="center"
							sx={{ mb: 2 }}
						>
							<Typography variant="h6" fontWeight="bold">
								Task Progress
							</Typography>
							<IconButton size="small">
								<MoreIcon />
							</IconButton>
						</Stack>
						<Divider sx={{ mb: 2 }} />
						<Stack spacing={3}>
							<Box>
								<Stack
									direction="row"
									justifyContent="space-between"
									sx={{ mb: 1 }}
								>
									<Typography>Complete Dashboard Design</Typography>
									<Typography>75%</Typography>
								</Stack>
								<LinearProgress variant="determinate" value={75} color="primary" />
							</Box>
							<Box>
								<Stack
									direction="row"
									justifyContent="space-between"
									sx={{ mb: 1 }}
								>
									<Typography>Implement API Endpoints</Typography>
									<Typography>45%</Typography>
								</Stack>
								<LinearProgress
									variant="determinate"
									value={45}
									color="secondary"
								/>
							</Box>
							<Box>
								<Stack
									direction="row"
									justifyContent="space-between"
									sx={{ mb: 1 }}
								>
									<Typography>Write Documentation</Typography>
									<Typography>15%</Typography>
								</Stack>
								<LinearProgress variant="determinate" value={15} color="warning" />
							</Box>
							<Box>
								<Stack
									direction="row"
									justifyContent="space-between"
									sx={{ mb: 1 }}
								>
									<Typography>Test Application</Typography>
									<Typography>5%</Typography>
								</Stack>
								<LinearProgress variant="determinate" value={5} color="error" />
							</Box>
						</Stack>
					</Paper>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Dashboard;
