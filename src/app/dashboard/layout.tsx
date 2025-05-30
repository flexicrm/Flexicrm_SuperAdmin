// // "use client"
// // import React, { useState } from 'react';

// // import Navbar from '../ui/dashboard/Navbar/navbar';
// // import Sidebar from '../ui/dashboard/sidebar/sidebar';

// // import '../ui/dashboard/dashboard.scss';
// // import {useUserContext} from "../ui/context/usecontext"
// // import AppConfig from '../ui/dashboard/AppConfig';
// // // import AppConfig from '../ui/dashboard/AppConfig';
// // export default function Layout({ children }) {
// //     const [isSidebarVisible, setSidebarVisible] = useState(true);
// //     const { backgroundColor, textColor, fontFamily } = useUserContext();
// //     const accessToken =  localStorage.setItem('refreshToken');
// //     const toggleSidebar = () => {
// //         setSidebarVisible(prevState => !prevState);
// //     };

// //     return (
// //         {
// //           if(!accessToken){
// //             <>

// //             <div className="layout-container" style={{ backgroundColor }}>
// //             <Navbar toggleSidebar={toggleSidebar}   backgroundColor={backgroundColor} />
// //             <div className={`layout-sidebar ${isSidebarVisible ? '' : 'hidden'}`}>
// //                 <Sidebar backgroundColor={backgroundColor}  />
// //             </div>
// //             <div className={`layout-main-container ${isSidebarVisible ? '' : 'sidebar-hidden'}`}>
// //                 <div className="layout-main" style={{ color: textColor, fontFamily:fontFamily ,background:backgroundColor }}>
// //                     {children}

// //                 </div>
// //             </div>
// //             <AppConfig  />
// //         </div>

// //             </>
// //           }

// //         }

// //     );
// // };

// // 'use client';
// // import React, { useState } from 'react';
// // import Navbar from '../ui/dashboard/Navbar/navbar';
// // import Sidebar from '../ui/dashboard/sidebar/sidebar';

// // import NotFound from '../ui/dashboard/notfound/page';

// // import '../ui/dashboard/dashboard.scss';
// // import { useUserContext } from '../ui/context/usecontext';
// // import AppConfig from '../ui/dashboard/AppConfig';
// // import { ThemeProvider } from '@mui/material';

// // export default function Layout({ children }) {
// // 	const [isSidebarVisible, setSidebarVisible] = useState(true);
// // 	const { backgroundColor, textColor, fontFamily } = useUserContext();
// // 	const accessToken = localStorage.getItem('accessToken');

// // 	const toggleSidebar = () => {
// // 		setSidebarVisible((prevState) => !prevState);
// // 	};

// // 	if (!accessToken) {
// // 		return <NotFound />; // Render NotFound component if no access token
// // 	}

// // 	return (
// // 		<div className="layout-container" style={{ backgroundColor }}>
// // 			<Navbar toggleSidebar={toggleSidebar} backgroundColor={backgroundColor} />
// // 			<div
// // 				className={`layout-sidebar ${isSidebarVisible ? '' : 'hidden'}`}
// // 				style={{ color: textColor, fontFamily }}
// // 			>
// // 				<Sidebar backgroundColor={backgroundColor} />
// // 			</div>
// // 			<div
// // 				className={`layout-main-container ${isSidebarVisible ? '' : 'sidebar-hidden'}`}
// // 				style={{ color: textColor, fontFamily, background: backgroundColor }}
// // 			>
// // 				<div className="layout-main">
// // 					<ThemeProvider theme={theme}>{children}</ThemeProvider>
// // 				</div>
// // 			</div>
// // 			<AppConfig />
// // 		</div>
// // 	);
// // }
// 'use client';

// import React, { useEffect, useState } from 'react';
// import Navbar from '../ui/dashboard/Navbar/navbar';
// import Sidebar from '../ui/dashboard/sidebar/sidebar';
// import NotFound from '../ui/dashboard/notfound/page';
// import '../ui/dashboard/dashboard.scss';

// import { useUserContext } from '../ui/context/usecontext';
// import AppConfig from '../ui/dashboard/AppConfig';

// import { ThemeProvider, CssBaseline, Box } from '@mui/material';
// import theme from '@/themes/theme';

// interface LayoutProps {
// 	children: React.ReactNode;
// }

// const Layout: React.FC<LayoutProps> = ({ children }) => {
// 	const [isSidebarVisible, setSidebarVisible] = useState(true);
// 	const [accessToken, setAccessToken] = useState<string | null>(null);
// 	// const { backgroundColor, textColor, fontFamily } = useUserContext();

// 	useEffect(() => {
// 		if (typeof window !== 'undefined') {
// 			const token = localStorage.getItem('accessToken');
// 			setAccessToken(token);
// 		}
// 	}, []);

// 	const toggleSidebar = () => {
// 		setSidebarVisible((prev) => !prev);
// 	};

// 	if (!accessToken) {
// 		return <NotFound />;
// 	}

// 	return (
// 		<ThemeProvider theme={theme}>
// 			<CssBaseline />
// 			<Box className="layout-container">
// 				<Navbar toggleSidebar={toggleSidebar} />
// 				<Box display="flex">
// 					{isSidebarVisible && (
// 						<Box className="layout-sidebar">
// 							<Sidebar />
// 						</Box>
// 					)}
// 					<Box
// 						className={`layout-main-container ${isSidebarVisible ? '' : 'sidebar-hidden'}`}
// 					>
// 						<Box className="layout-main">{children}</Box>
// 					</Box>
// 				</Box>
// 				<AppConfig />
// 			</Box>
// 		</ThemeProvider>
// 	);
// };

// export default Layout;
'use client';

import React, { useEffect, useState } from 'react';

import Sidebar from '../ui/dashboard/sidebar/sidebar';
import NotFound from '../ui/dashboard/notfound/page';

import { useUserContext } from '../ui/context/usecontext';
import AppConfig from '../ui/dashboard/AppConfig';

import { ThemeProvider, CssBaseline, Box, styled } from '@mui/material';
import theme from '@/themes/theme';
import Navbar from '../ui/dashboard/navbar/navbar';

interface LayoutProps {
	children: React.ReactNode;
}

const MainContent = styled(Box, {
	shouldForwardProp: (prop) => prop !== 'sidebarOpen',
})<{ sidebarOpen: boolean }>(({ theme, sidebarOpen }) => ({
	flexGrow: 1,
	transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	marginLeft: `-${theme.spacing(30)}`,
	width: `calc(100% + ${theme.spacing(30)})`,
	...(sidebarOpen && {
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
		width: '100%',
	}),
}));

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		if (typeof window !== 'undefined') {
			setAccessToken(localStorage.getItem('accessToken'));
		}
	}, []);

	const toggleSidebar = () => {
		setSidebarOpen((prev) => !prev);
	};

	if (!mounted) return null;

	if (!accessToken) {
		return <NotFound />;
	}

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					minHeight: '100vh',
					bgcolor: 'background.default',
				}}
			>
				<Navbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

				<Box sx={{ display: 'flex', flexGrow: 1,  }}>
					<Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

					<MainContent
						// component="main"
						sidebarOpen={sidebarOpen}
						sx={{
							mt: 10,
							// pt: 3,
							// height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
							overflow: 'auto',
						}}
					>
						{children}
					</MainContent>
				</Box>

				{/* <AppConfig /> */}
			</Box>
		</ThemeProvider>
	);
};

export default Layout;
