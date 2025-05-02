// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import {
//   fetchAllUsers,
//   updateUser,
//   deleteUser,
//   bulkDeleteUsers,
//   registerNormalAdminUser,
//   registerNormalUser,
//   initializeUserSocket, // Add this
//   cleanupUserSocket, // Add this
// } from "../../../../store/auth/authActions";

// import { initializePostCategorySocket  , cleanupPostCategorySocket} from "../../../../store/postCategories/postCategoriesActions";
// import { initializePostTagSocket,cleanupPostTagSocket } from "../../../../store/postTags/postTagsActions";
// import UsersView from "./userView";

// class UsersContainer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       search: "",
//       isAddOpen: false,
//       isEditOpen: false,
//       selectedUser: null,
//       selectedUserIds: [],
//     };
//   }

//   componentDidMount() {
//     this.props.fetchAllUsers();
//     this.props.initializeUserSocket(); // Initialize Socket.IO
//     this.props.initializePostCategorySocket()
//     this.props.initializePostTagSocket()
//   }

//   componentWillUnmount() {
//     this.props.cleanupUserSocket(); // Cleanup Socket.IO
//     this.props.cleanupPostCategorySocket()
//     this.props.cleanupPostTagSocket()
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.selectedUser !== this.state.selectedUser) {
//     }
//   }

//   handleSearchChange = (e) => {
//     this.setState({ search: e.target.value });
//   };

//   openAddModal = () => this.setState({ isAddOpen: true });
//   closeAddModal = () => this.setState({ isAddOpen: false });

//   openEditModal = (user) => {
//     this.setState({ selectedUser: { ...user }, isEditOpen: true });
//   };

//   closeEditModal = () => {
//     this.setState({ selectedUser: null, isEditOpen: false });
//   };

//   getRoleId = (role) => {
//     return role === "admin" ? 1 : 4;
//   };

//   handleAddUser = (data) => {
//     const userData = {
//       username: data.username,
//       email: data.email,
//       password: data.password,
//       name: data.name,
//       bio: data.bio,
//       avatar: data.avatar || "",
//       role: data.role,
//       roleid: this.getRoleId(data.role),
//     };

//     const registerPromise =
//       userData.role === "admin"
//         ? this.props.registerNormalAdminUser(
//             userData.username,
//             userData.email,
//             userData.password,
//             userData.name,
//             userData.bio,
//             userData.avatar,
//             userData.role
//           )
//         : this.props.registerNormalUser(
//             userData.username,
//             userData.email,
//             userData.password,
//             userData.name,
//             userData.bio,
//             userData.avatar,
//             userData.role
//           );

//     registerPromise
//       .then(() => {
//         this.props.fetchAllUsers();
//         this.closeAddModal();
//       })
//       .catch((error) => {
//         console.error("Error adding user:", error);
//       });
//   };

//   handleEditUser = (data) => {
//     if (!this.state.selectedUser) return;
//     const updateData = {
//       username: data.username,
//       email: data.email,
//       name: data.name,
//       bio: data.bio,
//       avatar: data.avatar,
//       role: data.role,
//       roleid: this.getRoleId(data.role),
//     };
//     if (data.password) {
//       updateData.password = data.password;
//     }

//     this.props
//       .updateUser(this.state.selectedUser.id, updateData)
//       .then(() => {
//         this.props.fetchAllUsers();
//         this.closeEditModal();
//       })
//       .catch((error) => {
//         console.error("Error updating user:", error);
//       });
//   };

//   handleDeleteUser = (id) => {
//     this.props.deleteUser(id).then(() => {
//       this.props.fetchAllUsers();
//     });
//   };

//   handleBulkDeleteUsers = () => {
//     if (this.state.selectedUserIds.length > 0) {
//       this.props.bulkDeleteUsers(this.state.selectedUserIds).then(() => {
//         this.props.fetchAllUsers();
//         this.setState({ selectedUserIds: [] });
//       });
//     }
//   };

//   getFilteredUsers = () => {
//     const { users } = this.props;
//     if (!users || !Array.isArray(users)) return [];
//     if (!this.state.search) return users;
//     return users?.filter(
//       (user) =>
//         user.username?.toLowerCase().includes(this.state.search.toLowerCase()) ||
//         user.email?.toLowerCase().includes(this.state.search.toLowerCase()) ||
//         user.name?.toLowerCase().includes(this.state.search.toLowerCase()) ||
//         user.bio?.toLowerCase().includes(this.state.search.toLowerCase()) ||
//         user.role?.toLowerCase().includes(this.state.search.toLowerCase())
//     );
//   };

//   render() {
//     return (
//       <UsersView
//         users={this.getFilteredUsers()}
//         allUsers={this.props.users}
//         isLoading={this.props.fetchUsersPending}
//         search={this.state.search}
//         onSearchChange={this.handleSearchChange}
//         onAddClick={this.openAddModal}
//         onEditClick={this.openEditModal}
//         onDeleteClick={this.handleDeleteUser}
//         onBulkDeleteClick={this.handleBulkDeleteUsers}
//         isAddOpen={this.state.isAddOpen}
//         isEditOpen={this.state.isEditOpen}
//         onAddSubmit={this.handleAddUser}
//         onEditSubmit={this.handleEditUser}
//         onAddClose={this.closeAddModal}
//         onEditClose={this.closeEditModal}
//         selectedUser={this.state.selectedUser}
//         selectedUserIds={this.state.selectedUserIds}
//         setSelectedUserIds={(ids) => this.setState({ selectedUserIds: ids })}
//       />
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   users: state.auth.users || [],
//   fetchUsersPending: state.auth.fetchUsersPending || false,
//   fetchUsersError: state.auth.fetchUsersError || null,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       fetchAllUsers,
//       updateUser,
//       deleteUser,
//       bulkDeleteUsers,
//       registerNormalAdminUser,
//       registerNormalUser,
//       initializeUserSocket, // Add this
//       cleanupUserSocket, // Add this
//       initializePostCategorySocket  , 
//       cleanupPostCategorySocket,
//       initializePostTagSocket,
//       cleanupPostTagSocket
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);


import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchAllUsers,
  updateUser,
  deleteUser,
  bulkDeleteUsers,
  registerNormalAdminUser,
  registerNormalUser,
  initializeUserSocket,
  cleanupUserSocket,
} from "../../../../store/auth/authActions";

import { initializePostCategorySocket, cleanupPostCategorySocket } from "../../../../store/postCategories/postCategoriesActions";
import { initializePostTagSocket, cleanupPostTagSocket } from "../../../../store/postTags/postTagsActions";
import UsersView from "./userView";

class UsersContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      isAddOpen: false,
      isEditOpen: false,
      selectedUser: null,
      selectedUserIds: [],
    };
  }

  componentDidMount() {
    this.props.fetchAllUsers();
    this.props.initializeUserSocket();
    this.props.initializePostCategorySocket();
    this.props.initializePostTagSocket();
  }

  componentWillUnmount() {
    this.props.cleanupUserSocket();
    this.props.cleanupPostCategorySocket();
    this.props.cleanupPostTagSocket();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedUser !== this.state.selectedUser) {
    }
  }

  handleSearchChange = (e) => {
    this.setState({ search: e.target.value });
  };

  openAddModal = () => this.setState({ isAddOpen: true });
  closeAddModal = () => this.setState({ isAddOpen: false });

  openEditModal = (user) => {
    this.setState({ selectedUser: { ...user }, isEditOpen: true });
  };

  closeEditModal = () => {
    this.setState({ selectedUser: null, isEditOpen: false });
  };

  getRoleId = (role) => {
    return role === "admin" ? 1 : 4;
  };

  handleAddUser = (data) => {
    const userData = {
      username: data.username,
      email: data.email,
      password: data.password,
      name: data.name,
      bio: data.bio,
      avatar: data.avatar, // File object from FileUpload
      role: data.role,
      roleid: this.getRoleId(data.role),
    };

    const registerAction =
      userData.role === "admin"
        ? this.props.registerNormalAdminUser(
            userData.username,
            userData.email,
            userData.password,
            userData.name,
            userData.bio,
            userData.avatar,
            userData.role
          )
        : this.props.registerNormalUser(
            userData.username,
            userData.email,
            userData.password,
            userData.name,
            userData.bio,
            userData.avatar,
            userData.role
          );

    registerAction
      .then(() => {
        this.props.fetchAllUsers();
        this.closeAddModal();
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
  };

  handleEditUser = (data) => {
    if (!this.state.selectedUser) return;
    const updateData = {
      username: data.username,
      email: data.email,
      name: data.name,
      bio: data.bio,
      avatar: data.avatar, // File object from FileUpload
      role: data.role,
      roleid: this.getRoleId(data.role),
    };
    if (data.password) {
      updateData.password = data.password;
    }

    this.props
      .updateUser(this.state.selectedUser.id, updateData)
      .then(() => {
        this.props.fetchAllUsers();
        this.closeEditModal();
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  handleDeleteUser = (id) => {
    this.props.deleteUser(id).then(() => {
      this.props.fetchAllUsers();
    });
  };

  handleBulkDeleteUsers = () => {
    if (this.state.selectedUserIds.length > 0) {
      this.props.bulkDeleteUsers(this.state.selectedUserIds).then(() => {
        this.props.fetchAllUsers();
        this.setState({ selectedUserIds: [] });
      });
    }
  };

  getFilteredUsers = () => {
    const { users } = this.props;
    if (!users || !Array.isArray(users)) return [];
    if (!this.state.search) return users;
    return users?.filter(
      (user) =>
        user.username?.toLowerCase().includes(this.state.search.toLowerCase()) ||
        user.email?.toLowerCase().includes(this.state.search.toLowerCase()) ||
        user.name?.toLowerCase().includes(this.state.search.toLowerCase()) ||
        user.bio?.toLowerCase().includes(this.state.search.toLowerCase()) ||
        user.role?.toLowerCase().includes(this.state.search.toLowerCase())
    );
  };

  render() {
    return (
      <UsersView
        users={this.getFilteredUsers()}
        allUsers={this.props.users}
        isLoading={this.props.fetchUsersPending}
        search={this.state.search}
        onSearchChange={this.handleSearchChange}
        onAddClick={this.openAddModal}
        onEditClick={this.openEditModal}
        onDeleteClick={this.handleDeleteUser}
        onBulkDeleteClick={this.handleBulkDeleteUsers}
        isAddOpen={this.state.isAddOpen}
        isEditOpen={this.state.isEditOpen}
        onAddSubmit={this.handleAddUser}
        onEditSubmit={this.handleEditUser}
        onAddClose={this.closeAddModal}
        onEditClose={this.closeEditModal}
        selectedUser={this.state.selectedUser}
        selectedUserIds={this.state.selectedUserIds}
        setSelectedUserIds={(ids) => this.setState({ selectedUserIds: ids })}
      />
    );
  }
}

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
      registerNormalAdminUser,
      registerNormalUser,
      initializeUserSocket,
      cleanupUserSocket,
      initializePostCategorySocket,
      cleanupPostCategorySocket,
      initializePostTagSocket,
      cleanupPostTagSocket,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);