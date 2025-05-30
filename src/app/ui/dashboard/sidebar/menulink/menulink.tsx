
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

interface MenuItemProps {
	item: {
		label: string;
		icon: React.ReactNode;
		to: string;
	};
}

const Menulink: React.FC<MenuItemProps> = ({ item }) => {
	// const { textColor, fontFamily } = useUserContext();
	const router = useRouter();

	return (
		<ListItemButton onClick={() => router.push(item.to)}>
			<ListItemIcon>{item.icon}</ListItemIcon>
			<ListItemText primary={item.label} />
		</ListItemButton>
	);
};

export default Menulink;
