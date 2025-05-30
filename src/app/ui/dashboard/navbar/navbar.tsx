// Add this at the top of your file
'use client';
import Link from 'next/link';
import { classNames } from 'primereact/utils';
import React, { useEffect, useState } from 'react';
import { Chip } from 'primereact/chip';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import { API_BASE_URL } from '@/utlis';
import axios from 'axios';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { IconButton, Paper } from '@mui/material';

const Navbar = ({ toggleSidebar, sidebarOpen }: any) => {
	const [image, setImage] = useState();
	const toggle = () => toggleSidebar();
	// const { backgroundColor, textColor, fontFamily } = useUserContext();
	const accessToken = localStorage.getItem('accessToken');
	useEffect(() => {
		if (accessToken) {
			const headers = {
				Authorization: `Bearer ${accessToken}`,
			};

			axios
				.get(`${API_BASE_URL}/admin/me`, { headers })
				.then((response) => {
					setImage(response.data.data.profileImage || null);
				})
				.catch((error) => {
					console.error('Error fetching data:', error);
				});
		}
	}, [accessToken]);

	return (
		<Paper className="layout-topbar" sx={{ borderRadius: 0 }}>
			<Link href="/" className="layout-topbar-logo">
				{/* <img src={`/layout/images/logo-${layoutConfig.colorScheme !== 'light' ? 'white' : 'dark'}.svg`} width="47.22px" height={'35px'} alt="logo" /> */}
				<span
					className="bg-warning"
					//  style={{ color: textColor, fontFamily }}
				>
					Logo{' '}
				</span>
			</Link>

			{/* <button
				type="button"
				className="p-link layout-menu-button layout-topbar-button"
				onClick={toggle}
				// style={{ color: textColor, fontFamily, background: backgroundColor }}
			>
				<i className="pi pi-bars" />
			</button> */}
			{/* {console.log(sidebarOpen, 'sidebarOpen')} */}
			{!sidebarOpen && (
				<IconButton onClick={toggle}>
					<ChevronRightIcon />
				</IconButton>
			)}

			{/* <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button"  >
                <i className="pi pi-ellipsis-v" onClick={toggle}/>
            </button> */}

			<div
				className={classNames('layout-topbar-menu')}
				// style={{ color: textColor, fontFamily }}
			>
				{/* <button type="button" className="p-link layout-topbar-button" style={{ color: textColor, fontFamily, background: backgroundColor }}>
                    <i className="pi pi-calendar"></i>
                    <span>Calendar</span>
                </button> */}
				<Link href="/dashboard/profile">
					<button type="button" className="p-link layout-topbar-button">
						{/* <i className="pi pi-user"></i> */}
						<Chip label="Amy Elsner" image={image} />
						<span>Profile</span>
					</button>
				</Link>
				{/* <Link href="/documentation">
                    <button type="button" className="p-link layout-topbar-button" style={{ color: textColor, fontFamily, background: backgroundColor }}>
                    <i className="pi pi-spin pi-cog" style={{ fontSize: '2rem' }}></i>
                        <span>Settings</span>
                    </button>
                </Link> */}
			</div>
		</Paper>
	);
};

// Navbar.displayName = 'AppTopbar';

export default Navbar;
