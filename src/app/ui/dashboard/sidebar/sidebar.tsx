// 'use client';
// import React from 'react';
// import { useRouter } from 'next/navigation';
// import {
// 	Box,
// 	List,
// 	ListItemButton,
// 	ListItemIcon,
// 	ListItemText,
// 	Typography,
// 	Divider,
// } from '@mui/material';
// import {
// 	Dashboard as DashboardIcon,
// 	Business as CompanyIcon,
// 	ListAlt as PlanIcon,
// 	Category as CategoryIcon,
// 	Leaderboard as LeadsIcon,
// 	HelpOutline as FaqIcon,
// 	People as StaffIcon,
// 	PersonAdd as AgentsIcon,
// 	Logout as LogoutIcon,
// } from '@mui/icons-material';
// import Menulink from './menulink/menulink';

// interface MenuItem {
// 	label: string;
// 	icon: React.ReactNode;
// 	to: string;
// }

// interface MenuSection {
// 	label: string;
// 	items: MenuItem[];
// }

// const Sidebar: React.FC = () => {
// 	const router = useRouter();

// 	const model: MenuSection[] = [
// 		{
// 			label: 'Home',
// 			items: [{ label: 'Dashboard', icon: <DashboardIcon />, to: '/dashboard' }],
// 		},
// 		{
// 			label: 'Components',
// 			items: [
// 				{ label: 'Company', icon: <CompanyIcon />, to: '/dashboard/company' },
// 				{ label: 'Plan', icon: <PlanIcon />, to: '/dashboard/plans' },
// 				{ label: 'Category', icon: <CategoryIcon />, to: '/dashboard/category' },
// 				{ label: 'Leads', icon: <LeadsIcon />, to: '/dashboard/leads' },
// 				{ label: 'FAQ', icon: <FaqIcon />, to: '/dashboard/faq' },
// 				{ label: 'Manage Staff', icon: <StaffIcon />, to: '/dashboard/staff' },
// 				{
// 					label: 'Manage Agents',
// 					icon: <AgentsIcon />,
// 					to: '/dashboard/createadmin',
// 				},
// 			],
// 		},
// 	];

// 	const handleLogout = () => {
// 		localStorage.removeItem('accessToken');
// 		localStorage.removeItem('refreshToken');
// 		router.push('/login');
// 	};

// 	return (
// 		<Box
// 			sx={{
// 				width: 260,
// 				height: '100vh',
// 				p: 2,
// 				boxSizing: 'border-box',
// 			}}
// 		>
// 			<List disablePadding>
// 				{model.map((section, index) => (
// 					<Box key={index}>
// 						<Typography variant="subtitle2" sx={{ mb: 1, mt: index === 0 ? 0 : 2 }}>
// 							{section.label}
// 						</Typography>
// 						{section.items.map((item, subIndex) => (
// 							<Menulink key={subIndex} item={item} />
// 						))}
// 						<Divider sx={{ my: 1 }} />
// 					</Box>
// 				))}
// 				<ListItemButton onClick={handleLogout}>
// 					<ListItemIcon>
// 						<LogoutIcon />
// 					</ListItemIcon>
// 					<ListItemText primary="Log out" />
// 				</ListItemButton>
// 			</List>
// 		</Box>
// 	);
// };

// export default Sidebar;
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import {
	Drawer,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
	Divider,
	IconButton,
	useMediaQuery,
	Theme,
	Box,
} from '@mui/material';
import {
	Dashboard as DashboardIcon,
	Business as CompanyIcon,
	ListAlt as PlanIcon,
	Category as CategoryIcon,
	Leaderboard as LeadsIcon,
	HelpOutline as FaqIcon,
	People as StaffIcon,
	PersonAdd as AgentsIcon,
	Logout as LogoutIcon,
	ChevronLeft as ChevronLeftIcon,
} from '@mui/icons-material';
import Menulink from './menulink/menulink';

type MenuItem = {
	label: string;
	icon: React.ReactNode;
	to: string;
};

type MenuSection = {
	label: string;
	items: MenuItem[];
};

interface SidebarProps {
	open: boolean;
	onClose: () => void;
}

const drawerWidth = 260;

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
	const router = useRouter();
	const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

	const model: MenuSection[] = [
		{
			label: 'Home',
			items: [{ label: 'Dashboard', icon: <DashboardIcon />, to: '/dashboard' }],
		},
		{
			label: 'Components',
			items: [
				{ label: 'Company', icon: <CompanyIcon />, to: '/dashboard/company' },
				{ label: 'Plan', icon: <PlanIcon />, to: '/dashboard/plans' },
				{ label: 'Category', icon: <CategoryIcon />, to: '/dashboard/category' },
				// { label: 'Leads', icon: <LeadsIcon />, to: '/dashboard/leads' },
				{ label: 'FAQ', icon: <FaqIcon />, to: '/dashboard/faq' },
				// { label: 'Manage Staff', icon: <StaffIcon />, to: '/dashboard/staff' },
				// { label: 'Manage Agents', icon: <AgentsIcon />, to: '/dashboard/createadmin' },
			],
		},
	];

	const handleLogout = () => {
		if (typeof window !== 'undefined') {
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
		}
		router.push('/login');
	};

	return (
		<Drawer
			variant={isMobile ? 'temporary' : 'persistent'}
			open={open}
			onClose={onClose}
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				background:"primary",
				'& .MuiDrawer-paper': {
					width: drawerWidth,
					boxSizing: 'border-box',
					marginTop: '81px',
					border: 0,
					borderRadius: 0,
				},
			}}
		>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'flex-end',
					p: 1,
					...(isMobile && { justifyContent: 'space-between' }),
				}}
			>
				{isMobile && (
					<Typography variant="h6" sx={{ ml: 2 }}>
						Menu
					</Typography>
				)}
				<IconButton onClick={onClose}>
					<ChevronLeftIcon />
				</IconButton>
			</Box>
			<Divider />
			<List disablePadding>
				{model.map((section, index) => (
					<React.Fragment key={`section-${index}`}>
						{/* <Typography
							variant="subtitle2"
							sx={{
								mb: 1,
								mt: index === 0 ? 2 : 3,
								px: 1,
								color: 'text.secondary',
								fontWeight: 'medium',
							}}
						>
							{section.label}
						</Typography> */}
						{section.items.map((item, itemIndex) => (
							<Menulink key={`item-${index}-${itemIndex}`} item={item} />
						))}
						<Divider sx={{ my: 1 }} />
					</React.Fragment>
				))}
				<ListItemButton
					onClick={handleLogout}
					sx={{
						'&:hover': {
							backgroundColor: 'error.light',
						},
					}}
				>
					<ListItemIcon sx={{ color: 'error.main' }}>
						<LogoutIcon />
					</ListItemIcon>
					<ListItemText
						primary="Log out"
						primaryTypographyProps={{ color: 'error.main' }}
					/>
				</ListItemButton>
			</List>
		</Drawer>
	);
};

export default Sidebar;
