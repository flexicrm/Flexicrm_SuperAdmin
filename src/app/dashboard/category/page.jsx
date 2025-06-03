// "use client"
// import { API_BASE_URL } from '@/utlis'
// import axios from 'axios'
// import React, { useState } from 'react'

// export default function page() {
//     const [categoryname, setCategoryname] = useState(null);
//     const accessToken = localStorage.getItem("accessToken")

//     const handleSubmit = async () => {
//         const headers = {
//             Authorization: `Bearer ${accessToken}`
//         }
//         const Response = axios.post(`${API_BASE_URL}/category`, { categoryname: categoryname }, { headers })
//         console.log(Response)
//     }
//     return (
//         <div>

//         <form action="" >

//             <input value={categoryname} onChange={(e) => setCategoryname(e.target.value)} />
//         <button onClick={handleSubmit}> sumbit</button>
//         </form>
//         </div>
//     )
// }
"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
  Box,
  Typography,
} from "@mui/material";
import axios from "axios";
import { API_BASE_URL } from "@/utlis";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const accessToken = localStorage.getItem("accessToken");

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/category`, { headers });
      console.log(response, "response");
      setCategories(response.data.data);
    } catch (error) {
      showSnackbar("Error fetching categories", "error");
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Create or Update category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await axios.put(
          `${API_BASE_URL}/category/${editingCategory._id}`,
          { categoryname: categoryName },
          { headers }
        );
        showSnackbar("Category updated successfully", "success");
      } else {
        await axios.post(
          `${API_BASE_URL}/category`,
          { categoryname: categoryName },
          { headers }
        );
        showSnackbar("Category created successfully", "success");
      }
      setCategoryName("");
      setEditingCategory(null);
      setOpenDialog(false);
      fetchCategories();
    } catch (error) {
      showSnackbar("Error saving category", "error");
      console.error("Error saving category:", error);
    }
  };

  // Delete category with confirmation
  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/category/${categoryToDelete._id}`, {
        headers,
      });
      showSnackbar("Category deleted successfully", "success");
      fetchCategories();
    } catch (error) {
      showSnackbar("Error deleting category", "error");
      console.error("Error deleting category:", error);
    } finally {
      setOpenDeleteDialog(false);
      setCategoryToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
    setCategoryToDelete(null);
  };

  // Edit category - open dialog with existing data
  const handleEdit = (category) => {
    setCategoryName(category.categoryname);
    setEditingCategory(category);
    setOpenDialog(true);
  };

  // Open dialog for new category
  const handleNewCategory = () => {
    setCategoryName("");
    setEditingCategory(null);
    setOpenDialog(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Show snackbar notification
  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  // Close snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Category Management
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNewCategory}
          sx={{ mb: 3 }}
        >
          Add Category
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category Name</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category._id}>
                <TableCell>{category.categoryname}</TableCell>
                <TableCell align="right">
                  <Button
                    color="primary"
                    onClick={() => handleEdit(category)}
                    sx={{ mr: 1, all: "unset" }}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    color="error"
                    sx={{ mr: 1, all: "unset" }}
                    onClick={() => handleDeleteClick(category)}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Typography variant="h6">
              {editingCategory ? "Edit Category" : "Add New Category"}
            </Typography>
            <TextField
              autoFocus
              margin="dense"
              label="Category Name"
              fullWidth
              variant="standard"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" color="primary">
              {editingCategory ? "Update" : "Save"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          {`Are you sure you want to delete "${categoryToDelete?.categoryname}"?`}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Notification */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
