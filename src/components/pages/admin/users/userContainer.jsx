import React, { useEffect, useState } from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import {
//   getAllUsers,
//   createUser,
//   updateUser,
//   deleteUser,
// } from '../../../../store/users/usersActions';
import UsersView from './userView';

const UsersContainer = (/*{
  users,
  loading,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
}*/) => {
  const [search, setSearch] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Dummy data
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "admin", bio: "System administrator" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user", bio: "Regular user" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "editor", bio: "Content creator" },
  ]);
  const loading = false; // Static for now since no async actions

  // Fetch users on mount (commented out since using dummy data)
  /*useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);*/

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
    setSelectedUser({ ...user }); // Create a copy to avoid mutating original
    setIsEditOpen(true);
  };
  const closeEditModal = () => {
    setSelectedUser(null);
    setIsEditOpen(false);
  };

  // Handle form submissions with dummy data
  const handleAddUser = (data) => {
    const newUser = {
      id: users.length + 1, // Simple ID generation for demo
      name: data.name,
      email: data.email,
      role: data.role || 'user', // Default role if not provided
      bio: data.bio || '',
    };
    setUsers([...users, newUser]);
    closeAddModal();
  };

  const handleEditUser = (data) => {
    if (!selectedUser) return;
    const updatedUser = {
      id: selectedUser.id,
      name: data.name,
      email: data.email,
      role: data.role,
      bio: data.bio || '',
    };
    setUsers(users.map(user => user.id === selectedUser.id ? updatedUser : user));
    closeEditModal();
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
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
      isLoading={loading}
      search={search}
      onSearchChange={handleSearchChange}
      onAddClick={openAddModal}
      onEditClick={openEditModal}
      onDeleteClick={handleDeleteUser}
      isAddOpen={isAddOpen}
      isEditOpen={isEditOpen}
      onAddSubmit={handleAddUser}
      onEditSubmit={handleEditUser}
      onAddClose={closeAddModal}
      onEditClose={closeEditModal}
      selectedUser={selectedUser}
    />
  );
};

/*
const mapStateToProps = (state) => ({
  users: state.users?.users || [],
  loading: state.users?.loading || false,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllUsers,
      createUser,
      updateUser,
      deleteUser,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
*/
export default UsersContainer;