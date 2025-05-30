// "use client";
// import { Card } from "primereact/card";
// import { InputText } from "primereact/inputtext";
// import { FloatLabel } from "primereact/floatlabel";
// import { useEffect, useState } from "react";
// import { Button } from "primereact/button";
// import axios from "axios";
// import { API_BASE_URL } from "@/utlis";
// import Swal from 'sweetalert2';

// export default function Faq() {
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [data, setData] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentEditId, setCurrentEditId] = useState(null);
//   const [singleFaq, setSingleFaq] = useState(null);
//   const accessToken = localStorage.getItem("accessToken");

//   const fetchFaqs = async () => {
//     try {
//       const headers = {
//         Authorization: `Bearer ${accessToken}`,
//       };
//       const response = await axios.get(`${API_BASE_URL}/faq/getallfaq`, { headers });
//       setData(response.data.data);
//     } catch (error) {
//       console.error("Error fetching FAQs:", error);
//     }
//   };

//   const fetchSingleFaq = async (id) => {
//     try {
//       const headers = {
//         Authorization: `Bearer ${accessToken}`,
//       };
//       const response = await axios.get(`${API_BASE_URL}/faq/${id}`, { headers });
//       setSingleFaq(response.data); // Set the single FAQ data
//     } catch (error) {
//       console.error("Error fetching FAQ:", error);
//     }
//   };

//   useEffect(() => {
//     fetchFaqs();
//   }, []);

//   const handleSubmit = async () => {
//     try {
//       const headers = {
//         Authorization: `Bearer ${accessToken}`,
//       };
//       if (isEditing && currentEditId) {
//         // Update existing FAQ
//         await axios.put(
//           `${API_BASE_URL}/faq/${currentEditId}`,
//           {
//             question: question,
//             answer: answer,
//           },
//           { headers: headers }
//         );
//         setIsEditing(false);
//         setCurrentEditId(null);
//       } else {
//         // Create new FAQ
//         await axios.put(
//           `${API_BASE_URL}/faq/${id}`,
//           {
//             question: question,
//             answer: answer,
//           },
//           { headers: headers }
//         );
//       }
//       setQuestion("");
//       setAnswer("");
//       fetchFaqs(); // Refresh FAQ list
//     } catch (error) {
//       console.error("Error submitting FAQ:", error);
//     }
//   };

//   const handleEdit = (faq) => {
//     // useEffect(()=>{
//     //   axios.put(`${API_BASE_URL}`)
//     // },[])

//     setQuestion(faq.question);
//     setAnswer(faq.answer);
//     setCurrentEditId(faq._id);
//     setIsEditing(true);
//   };

//   const handleDelete = async (id) => {
//     if (!id) {
//       console.error("FAQ ID is missing for deletion.");
//       return;
//     }

//     try {
//       const result = await Swal.fire({
//         title: 'Are you sure?',
//         text: "This action cannot be undone!",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes, delete it!',
//         cancelButtonText: 'Cancel',
//       });

//       if (result.isConfirmed) {
//         const headers = {
//           Authorization: `Bearer ${accessToken}`,
//         };
//         await axios.delete(`${API_BASE_URL}/faq/${id}`, { headers });
//         Swal.fire(
//           'Deleted!',
//           'The FAQ has been deleted.',
//           'success'
//         );
//         fetchFaqs(); // Refresh FAQ list after deletion
//       }
//     } catch (error) {
//       console.error("Error deleting FAQ:", error);
//       Swal.fire(
//         'Error!',
//         'There was a problem deleting the FAQ.',
//         'error'
//       );
//     }
//   };

//   return (
//     <div>
//       <Card className="bg-none" title="FAQ" subTitle={isEditing ? "Edit FAQ" : "Add FAQ"}>
//         <div className="grid">
//           <div className="card col-12">
//             <FloatLabel>
//               <InputText
//                 id="question"
//                 className="border-1 w-full"
//                 value={question}
//                 onChange={(e) => setQuestion(e.target.value)}
//                 required
//               />
//               <label htmlFor="question">Question</label>
//             </FloatLabel>
//           </div>
//           <div className="card col-12">
//             <FloatLabel>
//               <InputText
//                 id="answer"
//                 className="border-1 w-full"
//                 value={answer}
//                 onChange={(e) => setAnswer(e.target.value)}
//                 required
//               />
//               <label htmlFor="answer">Answer</label>
//             </FloatLabel>
//           </div>
//         </div>
//         <div className="text-right">
//           <Button
//             label={isEditing ? "Update" : "Submit"}
//             icon="pi pi-check"
//             severity="primary"
//             onClick={handleSubmit}
//           />
//         </div>
//       </Card>
//       <Card className="mt-2 p-5 shadow-8 border-round">
//         {data.length > 0 ? (
//           data.map((item) => (

//             <div key={item._id} className="flex-col">
//               <div className="flex justify-content-between">
//                 <p>
//                   <i className="pi pi-question-circle" /> {item.question}{console.log(item,"data")}
//                 </p>
//                 <p>
//                   <span className="m-3">
//                     <i className="pi pi-pencil" onClick={() => handleEdit(item)} />
//                   </span>
//                   <span className="text-color m-3">
//                     <i
//                       className="pi pi-times-circle"
//                       onClick={() => handleDelete(item._id)}
//                     />
//                   </span>
//                 </p>
//               </div>
//               <div>{item.answer}</div>
//               {/* <Button
//                 label="View Details"
//                 icon="pi pi-search"
//                 className="mt-2"
//                 onClick={() => fetchSingleFaq(item._id)}
//               /> */}
//               <hr />
//             </div>
//           ))
//         ) : (
//           <p>No FAQs available.</p>
//         )}
//       </Card>
//       {singleFaq && (
//         <Card className="mt-2 p-5 shadow-8 border-round">
//           <h4>FAQ Details</h4>
//           <p><strong>Question:</strong> {singleFaq.question}</p>
//           <p><strong>Answer:</strong> {singleFaq.answer}</p>
//         </Card>
//       )}
//     </div>
//   );
// }
'use client';
import React, { useState, useEffect } from 'react';
import {
	Box,
	Card,
	CardContent,
	TextField,
	Button,
	Typography,
	Divider,
	IconButton,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Snackbar,
	Alert,
	Paper,
	List,
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
	Chip,
} from '@mui/material';
import {
	Edit as EditIcon,
	Delete as DeleteIcon,
	Check as CheckIcon,
	Close as CloseIcon,
	HelpOutline as HelpIcon,
} from '@mui/icons-material';
import axios from 'axios';
import { API_BASE_URL } from '@/utlis';

interface FAQ {
	_id: string;
	question: string;
	answer: string;
	createdAt?: string;
	updatedAt?: string;
}

export default function FAQPage() {
	const [question, setQuestion] = useState('');
	const [answer, setAnswer] = useState('');
	const [faqs, setFaqs] = useState<FAQ[]>([]);
	const [isEditing, setIsEditing] = useState(false);
	const [currentEditId, setCurrentEditId] = useState<string | null>(null);
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [faqToDelete, setFaqToDelete] = useState<string | null>(null);
	const [snackbar, setSnackbar] = useState({
		open: false,
		message: '',
		severity: 'success' as 'success' | 'error',
	});
	const accessToken = localStorage.getItem('accessToken');

	const fetchFaqs = async () => {
		try {
			const headers = {
				Authorization: `Bearer ${accessToken}`,
			};
			const response = await axios.get(`${API_BASE_URL}/faq/getallfaq`, { headers });
			setFaqs(response.data.data);
		} catch (error) {
			console.error('Error fetching FAQs:', error);
			showSnackbar('Error fetching FAQs', 'error');
		}
	};

	useEffect(() => {
		fetchFaqs();
	}, []);

	const handleSubmit = async () => {
		try {
			const headers = {
				Authorization: `Bearer ${accessToken}`,
			};

			if (isEditing && currentEditId) {
				// Update existing FAQ
				await axios.put(
					`${API_BASE_URL}/faq/${currentEditId}`,
					{ question, answer },
					{ headers }
				);
				showSnackbar('FAQ updated successfully', 'success');
			} else {
				// Create new FAQ
				await axios.post(`${API_BASE_URL}/faq`, { question, answer }, { headers });
				showSnackbar('FAQ created successfully', 'success');
			}

			resetForm();
			fetchFaqs();
		} catch (error) {
			console.error('Error submitting FAQ:', error);
			showSnackbar('Error submitting FAQ', 'error');
		}
	};

	const handleEdit = (faq: FAQ) => {
		setQuestion(faq.question);
		setAnswer(faq.answer);
		setCurrentEditId(faq._id);
		setIsEditing(true);
	};

	const handleDeleteClick = (id: string) => {
		setFaqToDelete(id);
		setOpenDeleteDialog(true);
	};

	const handleConfirmDelete = async () => {
		if (!faqToDelete) return;

		try {
			const headers = {
				Authorization: `Bearer ${accessToken}`,
			};
			await axios.delete(`${API_BASE_URL}/faq/${faqToDelete}`, { headers });
			showSnackbar('FAQ deleted successfully', 'success');
			fetchFaqs();
		} catch (error) {
			console.error('Error deleting FAQ:', error);
			showSnackbar('Error deleting FAQ', 'error');
		} finally {
			setOpenDeleteDialog(false);
			setFaqToDelete(null);
		}
	};

	const resetForm = () => {
		setQuestion('');
		setAnswer('');
		setIsEditing(false);
		setCurrentEditId(null);
	};

	const showSnackbar = (message: string, severity: 'success' | 'error') => {
		setSnackbar({ open: true, message, severity });
	};

	const handleCloseSnackbar = () => {
		setSnackbar((prev) => ({ ...prev, open: false }));
	};

	return (
		<Box sx={{ p: 3 }}>
			<Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
				Frequently Asked Questions
			</Typography>

			<Card sx={{ mb: 3 }}>
				<CardContent>
					<Typography variant="h6" gutterBottom>
						{isEditing ? 'Edit FAQ' : 'Add New FAQ'}
					</Typography>

					<TextField
						fullWidth
						label="Question"
						variant="outlined"
						size="small"
						value={question}
						onChange={(e) => setQuestion(e.target.value)}
						sx={{ mb: 2 }}
						InputProps={{
							startAdornment: <HelpIcon color="action" sx={{ mr: 1 }} />,
						}}
					/>

					<TextField
						fullWidth
						label="Answer"
						variant="outlined"
						multiline
						rows={4}
						value={answer}
						onChange={(e) => setAnswer(e.target.value)}
						sx={{ mb: 2 }}
					/>

					<Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
						{isEditing && (
							<Button
								variant="outlined"
								color="secondary"
								startIcon={<CloseIcon />}
								onClick={resetForm}
							>
								Cancel
							</Button>
						)}
						<Button
							variant="contained"
							color="primary"
							startIcon={<CheckIcon />}
							onClick={handleSubmit}
						>
							{isEditing ? 'Update' : 'Submit'}
						</Button>
					</Box>
				</CardContent>
			</Card>

			<Card>
				<CardContent>
					<Typography variant="h6" gutterBottom>
						Existing FAQs
					</Typography>

					{faqs.length > 0 ? (
						<List component={Paper} variant="outlined">
							{faqs.map((faq) => (
								<React.Fragment key={faq._id}>
									<ListItem>
										<ListItemText
											primary={
												<Box sx={{ display: 'flex', alignItems: 'center' }}>
													<HelpIcon color="primary" sx={{ mr: 1 }} />
													<Typography variant="body1" fontWeight="medium">
														{faq.question}
													</Typography>
												</Box>
											}
											secondary={
												<Typography variant="body2" sx={{ ml: 4 }}>
													{faq.answer}
												</Typography>
											}
										/>
										<ListItemSecondaryAction>
											<IconButton
												edge="end"
												aria-label="edit"
												onClick={() => handleEdit(faq)}
												color="primary"
												sx={{ mr: 1 }}
											>
												<EditIcon />
											</IconButton>
											<IconButton
												edge="end"
												aria-label="delete"
												onClick={() => handleDeleteClick(faq._id)}
												color="error"
											>
												<DeleteIcon />
											</IconButton>
										</ListItemSecondaryAction>
									</ListItem>
									<Divider component="li" />
								</React.Fragment>
							))}
						</List>
					) : (
						<Typography
							variant="body1"
							color="textSecondary"
							sx={{ textAlign: 'center', py: 4 }}
						>
							No FAQs available. Add your first FAQ above.
						</Typography>
					)}
				</CardContent>
			</Card>

			{/* Delete Confirmation Dialog */}
			<Dialog
				open={openDeleteDialog}
				onClose={() => setOpenDeleteDialog(false)}
				maxWidth="sm"
				fullWidth
			>
				<DialogTitle>Confirm Delete</DialogTitle>
				<DialogContent>
					<Typography>
						Are you sure you want to delete this FAQ? This action cannot be undone.
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
					<Button
						onClick={handleConfirmDelete}
						variant="contained"
						color="error"
						startIcon={<DeleteIcon />}
					>
						Delete
					</Button>
				</DialogActions>
			</Dialog>

			{/* Snackbar */}
			<Snackbar
				open={snackbar.open}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
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
}
