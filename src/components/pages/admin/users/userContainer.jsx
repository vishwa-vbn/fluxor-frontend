import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { 
  fetchAllUsers, 
  updateUser, 
  deleteUser, 
  bulkDeleteUsers 
} from "../../../../store/auth/authActions"; // Adjust path as needed
import UsersView from "./userView";

const UsersContainer = ({
  users,
  fetchUsersPending,
  fetchUsersError,
  fetchAllUsers,
  updateUser,
  deleteUser,
  bulkDeleteUsers,
}) => {
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserIds, setSelectedUserIds] = useState([]); // For bulk delete

  // Fetch users on mount
  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  // Log selectedUser changes for debugging
  useEffect(() => {
    console.log("selected user", selectedUser);
  }, [selectedUser]);

  // Handle search input
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Modal controls
  const openAddModal = () => setIsAddOpen(true);
  const closeAddModal = () => setIsAddOpen(false);

  const openEditModal = (user) => {
    setSelectedUser({ ...user });
    setIsEditOpen(true);
  };
  const closeEditModal = () => {
    setSelectedUser(null);
    setIsEditOpen(false);
  };

  // Handler for adding a user (placeholder, assuming API exists elsewhere)
  const handleAddUser = (data) => {
    console.log("Add user:", data);
    closeAddModal();
  };

  // Handler for editing a user
  const handleEditUser = (data) => {
    if (!selectedUser) return;
    updateUser(selectedUser.id, {
      username: data.name,
      email: data.email,
      // Note: If your API expects 'role' instead of 'password', adjust accordingly
      // password: "newSecurePassword123", // Uncomment and adjust if needed
    }).then(() => {
      fetchAllUsers(); // Refresh user list after update
      closeEditModal();
    });
  };

  // Handler for deleting a single user
  const handleDeleteUser = (id) => {
    deleteUser(id).then(() => {
      fetchAllUsers(); // Refresh user list after deletion
    });
  };

  // Handler for bulk deleting users
  const handleBulkDeleteUsers = () => {
    if (selectedUserIds.length > 0) {
      bulkDeleteUsers(selectedUserIds).then(() => {
        fetchAllUsers(); // Refresh user list after bulk deletion
        setSelectedUserIds([]); // Clear selection
      });
    }
  };

  // Filter users based on search
  const getFilteredUsers = () => {
    if (!users || !Array.isArray(users)) return [];
    if (!search) return users;
    return users.filter(
      (user) =>
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase()) ||
        user.role?.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <UsersView
      users={getFilteredUsers()}
      allUsers={users}
      isLoading={fetchUsersPending}
      search={search}
      onSearchChange={handleSearchChange}
      onAddClick={openAddModal}
      onEditClick={openEditModal}
      onDeleteClick={handleDeleteUser}
      onBulkDeleteClick={handleBulkDeleteUsers} // Pass bulk delete handler
      isAddOpen={isAddOpen}
      isEditOpen={isEditOpen}
      onAddSubmit={handleAddUser}
      onEditSubmit={handleEditUser}
      onAddClose={closeAddModal}
      onEditClose={closeEditModal}
      selectedUser={selectedUser}
      selectedUserIds={selectedUserIds}
      setSelectedUserIds={setSelectedUserIds} // Pass selection state and setter
    />
  );
};

const mapStateToProps = (state) => ({
  users: state.auth.users || [],
  fetchUsersPending: state.auth.fetchUsersPending || false,
  fetchUsersError: state.auth.fetchUsersError || null,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchAllUsers,
      updateUser,
      deleteUser,
      bulkDeleteUsers,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);