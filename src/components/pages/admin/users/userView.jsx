import React, { useState } from "react";
import { PlusCircle, Search, Edit, Trash2 } from "lucide-react";
import { Card } from "../../../common/card/Card";
import Input from "../../../controls/input/inputView";
import Textarea from "../../../controls/textarea/Textarea";
import Modal from "../../../common/modal/modal";
import DataTable from "react-data-table-component";
import Button from "../../../controls/button/buttonView";
import TopNavbar from "../../../common/topNavbar/topNavbar";
import SearchBar from "../../../controls/searchbar/searchbar";
import Select from "../../../controls/selection/selection";

const UsersView = ({
  users,
  isLoading,
  search,
  onSearchChange,
  onAddClick,
  onEditClick,
  onDeleteClick,
  isAddOpen,
  isEditOpen,
  onAddSubmit,
  onEditSubmit,
  onAddClose,
  onEditClose,
  selectedUser,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const roleOptions = [
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
    { value: "editor", label: "Editor" },
  ];

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => <div className="text-center">{row.name}</div>,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      cell: (row) => <div className="text-center">{row.email}</div>,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
      cell: (row) => <div className="text-center">{row.role}</div>,
    },
    {
      name: "Bio",
      selector: (row) => row.bio,
      cell: (row) => (
        <div className="text-center max-w-[200px] truncate">
          {row.bio || "-"}
        </div>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex justify-center space-x-2">
          <Button variant="ghost" size="sm" onClick={() => onEditClick(row)}>
            <Edit className="w-4 h-4 text-blue-600" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDeleteClick(row.id)}
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </Button>
        </div>
      ),
    },
  ];

  const sampleUserData = {
    name: "Jane Doe",
    email: "jane@example.com",
  };

  const handleSearch = (query) => {
    onSearchChange({ target: { value: query } });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-0 py-0 space-y-6">
      <div className="flex-1 flex flex-col">
        <TopNavbar
          userData={sampleUserData}
          onSearch={handleSearch}
          notificationCount={3}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="flex-1 max-w-11/12 w-full mx-auto px-6 py-8 space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">All Users</h1>
            <Button
              variant="primary"
              onClick={onAddClick}
              className="flex items-center"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>

          <div className="flex justify-end mb-4">
            <SearchBar
              searchQuery={search}
              setSearchQuery={(val) =>
                onSearchChange({ target: { value: val } })
              }
              placeholder="Search users..."
            />
          </div>

          <Card>
            <DataTable
              columns={columns}
              data={users}
              progressPending={isLoading}
              noDataComponent="No users found"
              pagination
              highlightOnHover
              striped
              noHeader
            />
          </Card>

          {/* Add Modal */}
          <Modal
            title="Add User"
            isOpen={isAddOpen}
            onClose={onAddClose}
            onSubmit={onAddSubmit}
            initialData={{ name: "", email: "", role: "user", bio: "" }}
          >
            <Input label="Name" name="name" required />
            <Input label="Email" name="email" type="email" required />
            <Select
              label="Role"
              name="role"
              options={roleOptions}
              defaultValue="user"
            />
            <Textarea label="Bio" name="bio" rows={3} />
          </Modal>

          {/* Edit Modal */}
          {selectedUser && (
            <Modal
              title="Edit User"
              isOpen={isEditOpen}
              onClose={onEditClose}
              onSubmit={onEditSubmit}
              initialData={{
                name: selectedUser.name || '',
                email: selectedUser.email || '',
                role: selectedUser.role || 'user',
                bio: selectedUser.bio || '',
              }}
            >
              <Input label="Name" name="name" required defaultValue={selectedUser.name} />
              <Input label="Email" name="email" type="email" required defaultValue={selectedUser.email} />
              <Select
                label="Role"
                name="role"
                options={roleOptions}
                defaultValue={selectedUser.role}
              />
              <Textarea
                label="Bio"
                name="bio"
                rows={3}
                defaultValue={selectedUser.bio || ''}
              />
            </Modal>
          )}
        </main>
      </div>
    </div>
  );
};

export default UsersView;