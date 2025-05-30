// "use client";
// import { Card } from "primereact/card";
// import { InputText } from "primereact/inputtext";
// import { Button } from "primereact/button";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { API_BASE_URL } from "@/utlis";
// import "primereact/resources/themes/lara-light-cyan/theme.css";
// import "./profile.scss";
// import Swal from "sweetalert2";

// export default function Profile() {
//   const [data, setData] = useState(null);
//   const [image, setImage] = useState(null);
//   const [show, setShow] = useState(false);
//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phoneNumber: "",
//   });
//   const [file, setFile] = useState(null);

//   const accessToken = localStorage.getItem("accessToken");

//   useEffect(() => {
//     if (accessToken) {
//       const headers = {
//         Authorization: `Bearer ${accessToken}`,
//       };

//       axios
//         .get(`${API_BASE_URL}/admin/me`, { headers })
//         .then((response) => {
//           setData(response.data.data);
//           setForm({
//             firstName: response.data.data.firstName || "",
//             lastName: response.data.data.lastName || "",
//             email: response.data.data.email || "",
//             phoneNumber: response.data.data.phoneNumber || "",
//           });
//           setImage(response.data.data.profileImage || null);
//         })
//         .catch((error) => {
//           console.error("Error fetching data:", error);
//         });
//     }
//   }, [accessToken]);

//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//       setImage(URL.createObjectURL(selectedFile));
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const headers = {
//       Authorization: `Bearer ${accessToken}`,
//       "Content-Type": "multipart/form-data",
//     };

//     const formData = new FormData();
//     formData.append("firstName", form.firstName);
//     formData.append("lastName", form.lastName);
//     formData.append("email", form.email);
//     formData.append("phoneNumber", form.phoneNumber);
//     if (file) {
//       formData.append("profileImage", file);
//     }

//     axios
//       .put(`${API_BASE_URL}/admin/me`, formData, { headers })
//       .then((res) => {
//         console.log(res);

//         Swal.fire({
//           position: "center",
//           icon: "success",
//           title: "Your work has been saved",
//           showConfirmButton: false,
//           timer: 1500,
//         });
//       })
//       .catch((error) => {
//         console.error("Error updating profile:", error);
//       });
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setForm((prevForm) => ({
//       ...prevForm,
//       [name]: value,
//     }));
//   };

//   const handleShow = () => {
//     setShow(!show);
//   };

//   return (
//     <div>
//       {data ? (
//         <div>
//           <Card className="card">
//             <ul className="flex">
//               <li className="relative">
//                 <img
//                   src={image || "default-image-url"}
//                   alt={`${data.firstName} ${data.lastName}'s profile picture`}
//                   width="120px"
//                   className="border-circle w-6rem h-6rem m-2 bg-primary font-bold flex align-items-center justify-content-center"
//                 />
//                 <i
//                   className="pi pi-pen-to-square absolute bottom-0 right-0 m-3 bg-white "style={{ fontSize: '1.2rem',borderRadius:"50%" }}
//                   onClick={handleShow}
//                 ></i>
//               </li>
//               <li className="font-semibold my-auto  uppercase text-lg list-inline-item ">
//                 <p>
//                   {data.firstName || "Name"}{" "}
//                   <span className="ms-2">{data.lastName}</span>
//                 </p>
//                 <p className="font-normal text-base p-2">
//                   <span className="ms-5">
// <i className="pi pi-envelope m-2 "  />
//                     {data.email || "N/A"}</span>
//                     <i className="pi pi-address-book ms-5 m-2"/>
//                   <span>{data.phoneNumber || "N/A"}</span>
//                 </p>
//               </li>
//             </ul>
//           </Card>
//           {show && (
//             <Card className="mt-3 ">
//               <div className="p-5 ">
//                 <form onSubmit={handleSubmit} className="">
//                   <div>
//                     <ul className="flex">
//                       <li className="relative">
//                         {image && (
//                           <img
//                             src={image}
//                             alt="Preview"
//                             className="border-circle w-6rem h-6rem m-2 bg-primary font-bold flex align-items-center justify-content-center"
//                             style={{ maxWidth: "100%", maxHeight: "400px" }}
//                           />
//                         )}
//                       </li>
//                       <li className="my-auto">
//                         <input
//                           type="file"
//                           id="profileImage"
//                           accept="image/*"
//                           onChange={handleFileChange}
//                         />
//                       </li>
//                     </ul>
//                   </div>
//                   <div>
//                     <label htmlFor="firstName">First name: </label><br />
//                     <InputText
//                       type="text"
//                       id="firstName"
//                       name="firstName"
//                       className="border-1 p-1"
//                       value={form.firstName}
//                       onChange={handleInputChange}
//                     />

//                   </div>
//                   <div>
//                   <label htmlFor="lastName" className="ms-2">
//                       Last name:{" "} <br/>
//                     </label>
//                     <InputText
//                       type="text"
//                       id="lastName"
//                       name="lastName"
//                       className="border-1 p-1"
//                       value={form.lastName}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="email">Email: </label><br />
//                     <InputText
//                       type="email"
//                       id="email"
//                       name="email"
//                       className="border-1 p-1 mt-2 "
//                       value={form.email}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="phoneNumber">Phone Number: </label><br />
//                     <InputText
//                       type="text"
//                       id="phoneNumber"
//                       name="phoneNumber"
//                       className="border-1 p-1 mt-2 "
//                       value={form.phoneNumber}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="mt-3">
//                     <Button
//                       type="submit"
//                       className="border-round text-lg p-2 w-5rem h-2rem  bg-primary font-bold flex align-items-center justify-content-center"
//                     >
//                       <i className="pi pi-check me-1"></i> Save
//                     </Button>
//                   </div>
//                 </form>
//               </div>
//             </Card>

//           )}
//         </div>
//       ) : (
//         <p>No data available</p>
//       )}
//     </div>
//   );
// }
'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
	Card,
	CardContent,
	CardHeader,
	Avatar,
	IconButton,
	TextField,
	Button,
	Box,
	Typography,
	Divider,
	InputAdornment,
	CircularProgress,
} from '@mui/material';
import {
	Edit as EditIcon,
	Save as SaveIcon,
	Email as EmailIcon,
	Phone as PhoneIcon,
	Person as PersonIcon,
	CameraAlt as CameraIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { API_BASE_URL } from '@/utlis';
import './profile.scss';

interface ProfileData {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	profileImage?: string;
}

interface FormData {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
}

const StyledAvatar = styled(Avatar)(({ theme }) => ({
	width: theme.spacing(12),
	height: theme.spacing(12),
	fontSize: '2.5rem',
	marginRight: theme.spacing(2),
}));

const EditAvatar = styled(Avatar)(({ theme }) => ({
	width: theme.spacing(12),
	height: theme.spacing(12),
	fontSize: '2.5rem',
	marginRight: theme.spacing(2),
	cursor: 'pointer',
	'&:hover': {
		opacity: 0.8,
	},
}));

const Input = styled('input')({
	display: 'none',
});

export default function Profile() {
	const [data, setData] = useState<ProfileData | null>(null);
	const [image, setImage] = useState<string | null>(null);
	const [showEdit, setShowEdit] = useState(false);
	const [form, setForm] = useState<FormData>({
		firstName: '',
		lastName: '',
		email: '',
		phoneNumber: '',
	});
	const [file, setFile] = useState<File | null>(null);
	const [loading, setLoading] = useState(true);

	const accessToken = localStorage.getItem('accessToken');

	useEffect(() => {
		if (accessToken) {
			const headers = {
				Authorization: `Bearer ${accessToken}`,
			};

			axios
				.get<{ data: ProfileData }>(`${API_BASE_URL}/admin/me`, { headers })
				.then((response) => {
					setData(response.data.data);
					setForm({
						firstName: response.data.data.firstName || '',
						lastName: response.data.data.lastName || '',
						email: response.data.data.email || '',
						phoneNumber: response.data.data.phoneNumber || '',
					});
					setImage(response.data.data.profileImage || null);
					setLoading(false);
				})
				.catch((error) => {
					console.error('Error fetching data:', error);
					setLoading(false);
				});
		}
	}, [accessToken]);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			const selectedFile = event.target.files[0];
			setFile(selectedFile);
			setImage(URL.createObjectURL(selectedFile));
		}
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		setLoading(true);

		const headers = {
			Authorization: `Bearer ${accessToken}`,
			'Content-Type': 'multipart/form-data',
		};

		const formData = new FormData();
		formData.append('firstName', form.firstName);
		formData.append('lastName', form.lastName);
		formData.append('email', form.email);
		formData.append('phoneNumber', form.phoneNumber);
		if (file) {
			formData.append('profileImage', file);
		}

		axios
			.put(`${API_BASE_URL}/admin/me`, formData, { headers })
			.then((res) => {
				Swal.fire({
					position: 'center',
					icon: 'success',
					title: 'Profile updated successfully',
					showConfirmButton: false,
					timer: 1500,
				});
				setData({
					...(data as ProfileData),
					...form,
					profileImage: image || data?.profileImage,
				});
				setShowEdit(false);
			})
			.catch((error) => {
				console.error('Error updating profile:', error);
				Swal.fire({
					position: 'center',
					icon: 'error',
					title: 'Failed to update profile',
					showConfirmButton: false,
					timer: 1500,
				});
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setForm((prevForm) => ({
			...prevForm,
			[name]: value,
		}));
	};

	const getInitials = (firstName?: string, lastName?: string) => {
		if (!firstName && !lastName) return 'U';
		return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`;
	};

	if (loading && !data) {
		return (
			<Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
				<CircularProgress />
			</Box>
		);
	}

	if (!data) {
		return (
			<Typography variant="h6" color="textSecondary" align="center">
				No profile data available
			</Typography>
		);
	}

	return (
		<Box sx={{ maxWidth: 800, margin: '0 auto', padding: 2 }}>
			<Card>
				<CardHeader
					title="Profile Information"
					action={
						<IconButton
							aria-label="edit profile"
							onClick={() => setShowEdit(!showEdit)}
						>
							<EditIcon />
						</IconButton>
					}
				/>
				<CardContent>
					{!showEdit ? (
						<Box display="flex" alignItems="center" mb={3}>
							<StyledAvatar
								src={image || undefined}
								alt={`${data.firstName} ${data.lastName}`}
							>
								{!image && getInitials(data.firstName, data.lastName)}
							</StyledAvatar>
							<Box>
								<Typography variant="h5" component="h2">
									{data.firstName} {data.lastName}
								</Typography>
								<Box display="flex" alignItems="center" mt={1}>
									<EmailIcon color="action" sx={{ mr: 1 }} />
									<Typography variant="body1" color="textSecondary">
										{data.email}
									</Typography>
								</Box>
								<Box display="flex" alignItems="center" mt={1}>
									<PhoneIcon color="action" sx={{ mr: 1 }} />
									<Typography variant="body1" color="textSecondary">
										{data.phoneNumber || 'Not provided'}
									</Typography>
								</Box>
							</Box>
						</Box>
					) : (
						<form onSubmit={handleSubmit}>
							<Box display="flex" alignItems="center" mb={3}>
								<label htmlFor="profileImage">
									<Input
										id="profileImage"
										type="file"
										accept="image/*"
										onChange={handleFileChange}
									/>
									<EditAvatar
										src={image || undefined}
										alt={`${form.firstName} ${form.lastName}`}
										// component="  span"
									>
										{!image && getInitials(form.firstName, form.lastName)}
									</EditAvatar>
								</label>
								<Box>
									<IconButton
										color="primary"
										component="span"
										onClick={() =>
											document.getElementById('profileImage')?.click()
										}
									>
										<CameraIcon />
									</IconButton>
									<Typography variant="caption" display="block">
										Click to change photo
									</Typography>
								</Box>
							</Box>

							<Box mb={2}>
								<TextField
									fullWidth
									label="First Name"
									name="firstName"
									value={form.firstName}
									onChange={handleInputChange}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<PersonIcon />
											</InputAdornment>
										),
									}}
									variant="outlined"
									margin="normal"
								/>
							</Box>

							<Box mb={2}>
								<TextField
									fullWidth
									label="Last Name"
									name="lastName"
									value={form.lastName}
									onChange={handleInputChange}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<PersonIcon />
											</InputAdornment>
										),
									}}
									variant="outlined"
									margin="normal"
								/>
							</Box>

							<Box mb={2}>
								<TextField
									fullWidth
									label="Email"
									name="email"
									type="email"
									value={form.email}
									onChange={handleInputChange}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<EmailIcon />
											</InputAdornment>
										),
									}}
									variant="outlined"
									margin="normal"
								/>
							</Box>

							<Box mb={3}>
								<TextField
									fullWidth
									label="Phone Number"
									name="phoneNumber"
									value={form.phoneNumber}
									onChange={handleInputChange}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<PhoneIcon />
											</InputAdornment>
										),
									}}
									variant="outlined"
									margin="normal"
								/>
							</Box>

							<Divider sx={{ my: 2 }} />

							<Box display="flex" justifyContent="flex-end">
								<Button
									variant="outlined"
									color="secondary"
									onClick={() => setShowEdit(false)}
									sx={{ mr: 2 }}
									disabled={loading}
								>
									Cancel
								</Button>
								<Button
									type="submit"
									variant="contained"
									color="primary"
									startIcon={<SaveIcon />}
									disabled={loading}
								>
									{loading ? <CircularProgress size={24} /> : 'Save Changes'}
								</Button>
							</Box>
						</form>
					)}
				</CardContent>
			</Card>
		</Box>
	);
}
