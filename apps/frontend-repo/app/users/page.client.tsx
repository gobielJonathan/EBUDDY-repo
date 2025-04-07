"use client";

import { User } from "@ebuddy/core/entities/user";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { editUsersRequest, getUsersRequest } from "@/store/actions";
import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Tooltip,
  Rating,
  Stack,
  TableFooter,
  TablePagination,
} from "@mui/material";
import {
  Search as SearchIcon,
  Edit as EditIcon,
  ArrowRight as ArrowRightIcon,
  ArrowLeft as ArrowLeftIcon,
} from "@mui/icons-material";
import formatDate from "@/utils/format-date";
import dayjs from "dayjs";
import { useToast } from "@/components/toaster";
import { useRouter, useSearchParams } from "next/navigation";

export default function Client() {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") ?? 0;

  const router = useRouter();

  const { showToast } = useToast();

  const users = useAppSelector((state) => state.user.users);
  const hasNextPage = useAppSelector((state) => state.user.hasNextPage);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Form state
  const [formData, setFormData] = useState<Omit<User, "id">>({
    numberOfRents: 0,
    totalAverageWeightRatings: 0,
    recentlyActive: new Date().toISOString().split("T")[0],
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsersRequest());
  }, []);

  // Handle opening the modal
  const handleOpenModal = (user?: User) => {
    setSelectedUser(user);
    setFormData({
      numberOfRents: user.numberOfRents,
      totalAverageWeightRatings: user.totalAverageWeightRatings,
      recentlyActive: user.recentlyActive,
    });

    setModalOpen(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  const handleChangePage = (type: "next" | "prev") => {
    if (type === "next" && hasNextPage) {
      router.push(`/users?page=${Number(currentPage) + 1}`);
    }
    if (type === "prev" && Number(currentPage) > 0) {
      router.push(`/users?page=${Number(currentPage) - 1}`);
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    // Update the existing user
    const updatedUsers = users.map((user) =>
      user.id === selectedUser.id ? { ...user, ...formData } : user
    );

    dispatch(
      editUsersRequest({
        ...selectedUser,
        ...formData,
      })
    )
      .unwrap()
      .then(() => {
        // Close the modal
        handleCloseModal();
      })
      .catch((err) => {
        showToast(err, "error");
      });
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "totalAverageWeightRatings"
          ? Number.parseFloat(value)
          : name === "numberOfRents"
            ? Number.parseInt(value, 10)
            : value,
    });
  };

  // Handle rating change
  const handleRatingChange = (
    _event: React.SyntheticEvent,
    newValue: number | null
  ) => {
    setFormData({
      ...formData,
      totalAverageWeightRatings: newValue || 0,
    });
  };

  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    user.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        User Management
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 3,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexGrow: 1,
            maxWidth: { xs: "100%", sm: "50%" },
          }}
        >
          <TextField
            placeholder="Search by ID"
            variant="outlined"
            size="small"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <SearchIcon
                  fontSize="small"
                  style={{ marginRight: 8, opacity: 0.7 }}
                />
              ),
            }}
          />
        </Box>
      </Box>

      <TableContainer
        component={Paper}
        elevation={2}
        sx={{ borderRadius: 2, overflow: "hidden" }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "primary.main" }}>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                ID
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                Number of Rents
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                Average Weight Rating
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                Recently Active
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                    transition: "background-color 0.2s",
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ fontWeight: "medium" }}
                  >
                    {user.id}
                  </TableCell>
                  <TableCell>{user.numberOfRents}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Rating
                        value={user.totalAverageWeightRatings}
                        precision={0.1}
                        readOnly
                        size="small"
                      />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        ({user.totalAverageWeightRatings.toFixed(1)})
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{formatDate(user.recentlyActive)}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleOpenModal(user)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    No users found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          {filteredUsers.length > 0 && (
            <TableFooter style={{ justifyContent: "end" }}>
              <Button
                onClick={() => handleChangePage("prev")}
                disabled={currentPage === 0}
                startIcon={<ArrowLeftIcon />}
              >
                Prev
              </Button>
              <Button
                onClick={() => handleChangePage("next")}
                disabled={!hasNextPage}
                endIcon={<ArrowRightIcon />}
              >
                Next
              </Button>
            </TableFooter>
          )}
        </Table>
      </TableContainer>

      {/* Add/Edit User Modal */}
      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Update User</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 3 }}
          >
            <TextField
              label="Number of Rents"
              name="numberOfRents"
              type="number"
              fullWidth
              value={formData.numberOfRents}
              onChange={handleInputChange}
              InputProps={{ inputProps: { min: 0 } }}
            />

            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Total Average Weight Rating
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Rating
                  name="totalAverageWeightRatings"
                  value={formData.totalAverageWeightRatings}
                  precision={0.1}
                  onChange={handleRatingChange}
                />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  ({formData.totalAverageWeightRatings.toFixed(1)})
                </Typography>
              </Box>
            </Box>

            <TextField
              label="Recently Active"
              name="recentlyActive"
              type="date"
              fullWidth
              defaultValue={dayjs(formData.recentlyActive).format("YYYY-MM-DD")}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleCloseModal} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={formData.numberOfRents < 0}
          >
            Update User
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
