// src/theme/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#000000', // Black as primary color
			contrastText: '#ffffff', // White text for better contrast
		},
		secondary: {
			main: '#555555', // Dark gray as secondary
			contrastText: '#ffffff',
		},
		background: {
			default: '#ffffff', // White background
			paper: '#f5f5f5', // Slightly off-white for paper components
		},
		text: {
			primary: '#000000', // Black text
			secondary: '#333333', // Dark gray for secondary text
			disabled: '#999999', // Light gray for disabled elements
		},
		divider: '#e0e0e0', // Light gray divider
		grey: {
			50: '#fafafa',
			100: '#f5f5f5',
			200: '#eeeeee',
			300: '#e0e0e0',
			400: '#bdbdbd',
			500: '#9e9e9e',
			600: '#757575',
			700: '#616161',
			800: '#424242',
			900: '#212121',
			A100: '#d5d5d5',
			A200: '#aaaaaa',
			A400: '#303030',
			A700: '#616161',
		},
	},
	typography: {
		fontFamily: 'Poppins',
		h4: {
			fontWeight: 700,
			color: '#000000', // Explicit black for headings
		},
		button: {
			textTransform: 'none',
			fontWeight: 600,
		},
		allVariants: {
			color: '#000000', // Default text color for all typography variants
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 8,
					border: '1px solid #000000', // Black border for buttons
					'&:hover': {
						backgroundColor: '#f5f5f5', // Light gray on hover
					},
				},
				contained: {
					backgroundColor: '#000000', // Black background for contained buttons
					color: '#ffffff', // White text
					'&:hover': {
						backgroundColor: '#333333', // Darker black on hover
					},
				},
				outlined: {
					color: '#000000', // Black text for outlined buttons
					border: '1px solid #000000', // Black border
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					borderRadius: 12,
					border: '1px solid #e0e0e0', // Light gray border
					boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow
				},
			},
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					backgroundColor: '#ffffff', // White app bar
					color: '#000000', // Black text
					borderBottom: '1px solid #e0e0e0', // Light gray border
				},
			},
		},
		MuiDivider: {
			styleOverrides: {
				root: {
					backgroundColor: '#e0e0e0', // Light gray divider
				},
			},
		},
		MuiInputBase: {
			styleOverrides: {
				root: {
					'& .MuiOutlinedInput-notchedOutline': {
						borderColor: '#e0e0e0', // Light gray border for inputs
					},
					'&:hover .MuiOutlinedInput-notchedOutline': {
						borderColor: '#bdbdbd', // Slightly darker on hover
					},
				},
			},
		},
		MuiCheckbox: {
			styleOverrides: {
				root: {
					color: '#000000', // Black checkbox
				},
			},
		},
		MuiSwitch: {
			styleOverrides: {
				track: {
					backgroundColor: '#bdbdbd', // Gray track
				},
				switchBase: {
					color: '#ffffff', // White thumb
					'&.Mui-checked': {
						color: '#000000', // Black when checked
					},
					'&.Mui-checked + .MuiSwitch-track': {
						backgroundColor: '#000000', // Black track when checked
					},
				},
			},
		},
	},
});

export default theme;
