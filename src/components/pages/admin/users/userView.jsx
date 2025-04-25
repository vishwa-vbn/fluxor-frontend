// import React, { useState, useEffect } from "react";
// import { PlusCircle, Search, Edit, Trash2 } from "lucide-react";
// import { Card } from "../../../common/card/Card";
// import Input from "../../../controls/input/inputView";
// import Textarea from "../../../controls/textarea/Textarea";
// import Modal from "../../../common/modal/modal";
// import Button from "../../../controls/button/buttonView";
// import TopNavbar from "../../../common/topNavbar/topNavbar";
// import SearchBar from "../../../controls/searchbar/searchbar";
// import Select from "../../../controls/selection/selection";
// import { useResponsiveRowsPerPage } from "../../../../utils/responsiveRowsPerPage"; // Adjust path as needed
// import ReusableDataTable from "../../../common/DataTable/DataTable";

// const UsersView = ({
//   users,
//   isLoading,
//   search,
//   onSearchChange,
//   onAddClick,
//   onEditClick,
//   onDeleteClick,
//   onBulkDeleteClick,
//   isAddOpen,
//   isEditOpen,
//   onAddSubmit,
//   onEditSubmit,
//   onAddClose,
//   onEditClose,
//   selectedUser,
//   selectedUserIds,
//   setSelectedUserIds,
// }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   // Use the responsive rows per page hook
//   const { rowsPerPage, currentPage, setCurrentPage } = useResponsiveRowsPerPage({
//     rowHeight: 60, // Same as Post, CategoriesView, TagsView; adjust if needed
//     navbarHeight: 60,
//     controlsHeight: 120, // Accounts for search bar, bulk delete button, and margins
//     extraPadding: 50,
//     minRows: 5,
//     maxRowsMobile: 5,
//     maxRowsTablet: 10,
//     maxRowsDesktop: 20,
//     debounceDelay: 200,
//   });

//   // Reset page when search or users change
//   useEffect(() => {
//     setCurrentPage(1); // Reset to page 1 when data changes
//   }, [search, users, setCurrentPage]);

//   const roleOptions = [
//     { value: "admin", label: "Admin" },
//     { value: "user", label: "User" },
//   ];

//   const columns = [
//     {
//       name: (
//         <input
//           type="checkbox"
//           checked={selectedUserIds.length === users.length && users.length > 0}
//           onChange={(e) => {
//             if (e.target.checked) {
//               setSelectedUserIds(users.map((user) => user.id));
//             } else {
//               setSelectedUserIds([]);
//             }
//           }}
//         />
//       ),
//       selector: (row) => row.id,
//       cell: (row) => (
//         <input
//           type="checkbox"
//           checked={selectedUserIds.includes(row.id)}
//           onChange={(e) => {
//             if (e.target.checked) {
//               setSelectedUserIds([...selectedUserIds, row.id]);
//             } else {
//               setSelectedUserIds(selectedUserIds.filter((id) => id !== row.id));
//             }
//           }}
//         />
//       ),
//       width: "50px",
//     },
//     {
//       name: "Username",
//       selector: (row) => row.username,
//       sortable: true,
//       cell: (row) => (
//         <div className="text-center">{row.username || "Unnamed"}</div>
//       ),
//     },
//     {
//       name: "Name",
//       selector: (row) => row.name,
//       sortable: true,
//       cell: (row) => <div className="text-center">{row.name || "-"}</div>,
//     },
//     {
//       name: "Email",
//       selector: (row) => row.email,
//       sortable: true,
//       cell: (row) => <div className="text-center">{row.email}</div>,
//     },
//     {
//       name: "Role",
//       selector: (row) => row.role,
//       sortable: true,
//       cell: (row) => <div className="text-center">{row.role}</div>,
//     },
//     {
//       name: "Bio",
//       selector: (row) => row.bio,
//       cell: (row) => (
//         <div className="text-center max-w-[200px] truncate">
//           {row.bio || "-"}
//         </div>
//       ),
//     },
//     {
//       name: "Avatar",
//       selector: (row) => row.avatar,
//       cell: (row) => (
//         <div className="text-center">
//           <img
//             src={row.avatar || ""}
//             alt="avatar"
//             className="w-8 h-8 rounded-full mx-auto"
//             onError={(e) => (e.target.src = "")}
//           />
//         </div>
//       ),
//     },
//     {
//       name: "Actions",
//       cell: (row) => (
//         <div className="flex justify-center space-x-2">
//           <Button variant="ghost" size="sm" onClick={() => onEditClick(row)}>
//             <Edit className="w-4 h-4 text-blue-600" />
//           </Button>
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={() => onDeleteClick(row.id)}
//           >
//             <Trash2 className="w-4 h-4 text-red-600" />
//           </Button>
//         </div>
//       ),
//     },
//   ];

//   const sampleUserData = {
//     name: "Admin User",
//     email: "admin@example.com",
//   };

//   const handleSearch = (query) => {
//     onSearchChange({ target: { value: query } });
//   };

//   // Handle page change
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   // Handle row click
//   const handleRowClick = (row) => {
//     // Optionally handle row click if needed, e.g., for navigation or selection
//     console.log("Row clicked:", row);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 px-0 py-0 space-y-6">
//       <div className="flex-1 flex flex-col">
//         <TopNavbar
//           userData={sampleUserData}
//           onSearch={handleSearch}
//           notificationCount={3}
//           toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
//         />
//         <main className="flex-1 max-w-[100%] w-full mx-auto px-6 py-3 space-y-8">
//           <div className="flex justify-between items-center mb-2">
//             <h1 className="text-2xl font-bold text-gray-800">All Users</h1>
//             <div className="flex space-x-2">
//               <Button
//                variant="outline"
//                 onClick={onAddClick}
//                 className="flex items-center"
//               >
//                 <PlusCircle className="w-4 h-4 mr-2" />
//                 Add User
//               </Button>
//             </div>
//           </div>

//           <div className="flex justify-end mb-2 items-center space-x-4">
//             <SearchBar
//               searchQuery={search}
//               setSearchQuery={(val) =>
//                 onSearchChange({ target: { value: val } })
//               }
//               placeholder="Search users..."
//             />
//             {selectedUserIds.length > 0 && (
//               <Button
//                variant="outline"
//                 onClick={onBulkDeleteClick}
//                 className="flex items-center"
//               >
//                 <Trash2 className="w-4 h-4 mr-2" />
//                 Bulk Delete ({selectedUserIds.length})
//               </Button>
//             )}
//           </div>

//           <Card>
//             <ReusableDataTable
//               columns={columns}
//               data={users}
//               loading={isLoading}
//               rowsPerPage={rowsPerPage}
//               currentPage={currentPage}
//               onChangePage={handlePageChange}
//               onRowClick={handleRowClick}
//               paginationRowsPerPageOptions={[5, 10, 20, rowsPerPage].sort(
//                 (a, b) => a - b
//               )}
//               striped={true}
//               highlightOnHover={true}
//               noHeader={true}
//             />
//           </Card>

//           {/* Add Modal */}
//           <Modal
//             title="Add User"
//             isOpen={isAddOpen}
//             onClose={onAddClose}
//             onSubmit={onAddSubmit}
//             initialData={{
//               username: "",
//               email: "",
//               role: "user",
//               name: "",
//               bio: "",
//               avatar: "",
//               password: "",
//             }}
//           >
//             <Input label="Username" name="username" required />
//             <Input label="Name" name="name" required />
//             <Input label="Email" name="email" type="email" required />
//             <Input label="Password" name="password" type="password" required />
//             <Select
//               label="Role"
//               name="role"
//               options={roleOptions}
//               defaultValue="user"
//             />
//             <Textarea label="Bio" name="bio" rows={3} />
//             <Input label="Avatar URL" name="avatar" type="url" />
//           </Modal>

//           {/* Edit Modal */}
//           {selectedUser && (
//             <Modal
//               title="Edit User"
//               isOpen={isEditOpen}
//               onClose={onEditClose}
//               onSubmit={onEditSubmit}
//               initialData={{
//                 username: selectedUser.username || "",
//                 name: selectedUser.name || "",
//                 email: selectedUser.email || "",
//                 role: selectedUser.role || "user",
//                 bio: selectedUser.bio || "",
//                 avatar: selectedUser.avatar || "",
//                 password: "",
//               }}
//             >
//               <Input
//                 label="Username"
//                 name="username"
//                 required
//                 defaultValue={selectedUser.username || ""}
//               />
//               <Input
//                 label="Name"
//                 name="name"
//                 required
//                 defaultValue={selectedUser.name || ""}
//               />
//               <Input
//                 label="Email"
//                 name="email"
//                 type="email"
//                 required
//                 defaultValue={selectedUser.email || ""}
//               />
//               <Input
//                 label="Password (leave blank to keep unchanged)"
//                 name="password"
//                 type="password"
//               />
//               <Select
//                 label="Role"
//                 name="role"
//                 options={roleOptions}
//                 defaultValue={selectedUser.role || "user"}
//               />
//               <Textarea
//                 label="Bio"
//                 name="bio"
//                 rows={3}
//                 defaultValue={selectedUser.bio || ""}
//               />
//               <Input
//                 label="Avatar URL"
//                 name="avatar"
//                 type="url"
//                 defaultValue={selectedUser.avatar || ""}
//               />
//             </Modal>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default UsersView;

import React, { useState, useEffect } from "react";
import { PlusCircle, Search, Edit, Trash2 } from "lucide-react";
import { Card } from "../../../common/card/Card";
import Input from "../../../controls/input/inputView";
import Textarea from "../../../controls/textarea/Textarea";
import Modal from "../../../common/modal/modal";
import Button from "../../../controls/button/buttonView";
import TopNavbar from "../../../common/topNavbar/topNavbar";
import SearchBar from "../../../controls/searchbar/searchbar";
import Select from "../../../controls/selection/selection";
import { useResponsiveRowsPerPage } from "../../../../utils/responsiveRowsPerPage";
import ReusableDataTable from "../../../common/DataTable/DataTable";

const UsersView = ({
  users,
  isLoading,
  search,
  onSearchChange,
  onAddClick,
  onEditClick,
  onDeleteClick,
  onBulkDeleteClick,
  isAddOpen,
  isEditOpen,
  onAddSubmit,
  onEditSubmit,
  onAddClose,
  onEditClose,
  selectedUser,
  selectedUserIds,
  setSelectedUserIds,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { rowsPerPage, currentPage, setCurrentPage } = useResponsiveRowsPerPage(
    {
      rowHeight: 60,
      navbarHeight: 60,
      controlsHeight: 120,
      extraPadding: 50,
      minRows: 5,
      maxRowsMobile: 5,
      maxRowsTablet: 10,
      maxRowsDesktop: 20,
      debounceDelay: 200,
    }
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, users, setCurrentPage]);

  const roleOptions = [
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
  ];

  const columns = [
    {
      name: (
        <input
          type="checkbox"
          checked={selectedUserIds.length === users.length && users.length > 0}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedUserIds(users.map((user) => user.id));
              administrator;
              setSelectedUserIds([]);
            }
          }}
          className="text-blue-600 dark:text-blue-400 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-400"
        />
      ),
      selector: (row) => row.id,
      cell: (row) => (
        <input
          type="checkbox"
          checked={selectedUserIds.includes(row.id)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedUserIds([...selectedUserIds, row.id]);
            } else {
              setSelectedUserIds(selectedUserIds.filter((id) => id !== row.id));
            }
          }}
          className="text-blue-600 dark:text-blue-400 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-400"
        />
      ),
      width: "50px",
    },
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
      cell: (row) => (
        <div className="text-center text-gray-900 dark:text-gray-100">
          {row.username || "Unnamed"}
        </div>
      ),
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => (
        <div className="text-center text-gray-900 dark:text-gray-100">
          {row.name || "-"}
        </div>
      ),
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      cell: (row) => (
        <div className="text-center text-gray-900 dark:text-gray-100">
          {row.email}
        </div>
      ),
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
      cell: (row) => (
        <div className="text-center text-gray-900 dark:text-gray-100">
          {row.role}
        </div>
      ),
    },
    {
      name: "Bio",
      selector: (row) => row.bio,
      cell: (row) => (
        <div className="text-center max-w-[200px] truncate text-gray-900 dark:text-gray-100">
          {row.bio || "-"}
        </div>
      ),
    },
    {
      name: "Avatar",
      selector: (row) => row.avatar,
      cell: (row) => (
        <div className="text-center">
          <img
            src={row.avatar || ""}
            alt="avatar"
            className="w-8 h-8 rounded-full mx-auto border border-gray-200 dark:border-gray-600"
            onError={(e) => (e.target.src = "")}
          />
        </div>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex justify-center space-x-2">
          <Button variant="ghost" size="sm" onClick={() => onEditClick(row)}>
            <Edit className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDeleteClick(row.id)}
          >
            <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
          </Button>
        </div>
      ),
    },
  ];

  const sampleUserData = {
    name: "Admin User",
    email: "admin@example.com",
  };

  const handleSearch = (query) => {
    onSearchChange({ target: { value: query } });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowClick = (row) => {
    console.log("Row clicked:", row);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-0 py-0 space-y-6 transition-colors duration-200">
      <div className="flex-1 flex flex-col">
        <TopNavbar
          userData={sampleUserData}
          onSearch={handleSearch}
          notificationCount={3}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
        />
        <main className="flex-1 max-w-[100%] w-full mx-auto px-6 py-3 space-y-8">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              All Users
            </h1>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={onAddClick}
                className="flex items-center bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-blue-600 "
              >
                <PlusCircle className="w-4 text-blue-600 dark:text-white  h-4 mr-2" />
                Add User
              </Button>
            </div>
          </div>

          <div className="flex justify-end mb-2 items-center space-x-4">
            <SearchBar
              searchQuery={search}
              setSearchQuery={(val) =>
                onSearchChange({ target: { value: val } })
              }
              placeholder="Search users..."
              className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
            {selectedUserIds.length > 0 && (
              <Button
                variant="outline"
                onClick={onBulkDeleteClick}
                className="flex items-center bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 text-white"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Bulk Delete ({selectedUserIds.length})
              </Button>
            )}
          </div>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <ReusableDataTable
              columns={columns}
              data={users}
              loading={isLoading}
              rowsPerPage={rowsPerPage}
              currentPage={currentPage}
              onChangePage={handlePageChange}
              onRowClick={handleRowClick}
              paginationRowsPerPageOptions={[5, 10, 20, rowsPerPage].sort(
                (a, b) => a - b
              )}
              striped={true}
              highlightOnHover={true}
              noHeader={true}
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </Card>

          {/* Add Modal */}
          <Modal
            title="Add User"
            isOpen={isAddOpen}
            onClose={onAddClose}
            onSubmit={onAddSubmit}
            initialData={{
              username: "",
              email: "",
              role: "user",
              name: "",
              bio: "",
              avatar: "",
              password: "",
            }}
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
          >
            <Input
              label="Username"
              name="username"
              required
              className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
            <Input
              label="Name"
              name="name"
              required
              className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
            <Input
              label="Email"
              name="email"
              type="email"
              required
              className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
            <Input
              label="Password"
              name="password"
              type="password"
              required
              className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
            <Select
              label="Role"
              name="role"
              options={roleOptions}
              defaultValue="user"
              className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
            <Textarea
              label="Bio"
              name="bio"
              rows={3}
              className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
            <Input
              label="Avatar URL"
              name="avatar"
              type="url"
              className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
          </Modal>

          {/* Edit Modal */}
          {selectedUser && (
            <Modal
              title="Edit User"
              isOpen={isEditOpen}
              onClose={onEditClose}
              onSubmit={onEditSubmit}
              initialData={{
                username: selectedUser.username || "",
                name: selectedUser.name || "",
                email: selectedUser.email || "",
                role: selectedUser.role || "user",
                bio: selectedUser.bio || "",
                avatar: selectedUser.avatar || "",
                password: "",
              }}
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
            >
              <Input
                label="Username"
                name="username"
                required
                defaultValue={selectedUser.username || ""}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
              <Input
                label="Name"
                name="name"
                required
                defaultValue={selectedUser.name || ""}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
              <Input
                label="Email"
                name="email"
                type="email"
                required
                defaultValue={selectedUser.email || ""}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
              <Input
                label="Password (leave blank to keep unchanged)"
                name="password"
                type="password"
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
              <Select
                label="Role"
                name="role"
                options={roleOptions}
                defaultValue={selectedUser.role || "user"}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
              <Textarea
                label="Bio"
                name="bio"
                rows={3}
                defaultValue={selectedUser.bio || ""}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
              <Input
                label="Avatar URL"
                name="avatar"
                type="url"
                defaultValue={selectedUser.avatar || ""}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </Modal>
          )}
        </main>
      </div>
    </div>
  );
};

export default UsersView;
