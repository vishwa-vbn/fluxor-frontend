import React, { useState, useEffect } from "react";
import { PlusCircle, Search, Edit, Trash2 } from "lucide-react";
import { Card } from "../../../common/card/Card";
import Input from "../../../controls/input/inputView";
import Textarea from "../../../controls/textarea/Textarea";
import Modal from "../../../common/modal/modal";
import DataTable from "react-data-table-component";
import Button from "../../../controls/button/buttonView";
import TopNavbar from "../../../common/topNavbar/topNavbar";
import SearchBar from "../../../controls/searchbar/searchbar";
import { useResponsiveRowsPerPage } from "../../../../utils/responsiveRowsPerPage"; // Adjust path as needed

const TagsView = ({
  tags,
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
  selectedTag,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Use the responsive rows per page hook
  const { rowsPerPage, currentPage, setCurrentPage } = useResponsiveRowsPerPage(
    {
      rowHeight: 60, // Same as Post and CategoriesView; adjust if needed
      navbarHeight: 60,
      controlsHeight: 120, // Accounts for search bar and margins
      extraPadding: 50,
      minRows: 5,
      maxRowsMobile: 5,
      maxRowsTablet: 10,
      maxRowsDesktop: 20,
      debounceDelay: 200,
    }
  );

  // Reset page when search or tags change
  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 when data changes
  }, [search, tags, setCurrentPage]);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => <div className="text-center">{row.name}</div>,
    },
    {
      name: "Slug",
      selector: (row) => row.slug,
      sortable: true,
      cell: (row) => <div className="text-center">{row.slug}</div>,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      cell: (row) => (
        <div className="text-center max-w-[200px] truncate">
          {row.description || "-"}
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
    name: "John Doe",
    email: "john@example.com",
  };

  const handleSearch = (query) => {
    onSearchChange({ target: { value: query } });
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
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
        <main className="flex-1 max-w-[100%] w-full mx-auto px-6 py-3 space-y-8">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold text-gray-800">All Tags</h1>
            <Button
              variant="primary"
              onClick={onAddClick}
              className="flex items-center"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Tag
            </Button>
          </div>

          <div className="flex justify-end mb-2">
            <SearchBar
              searchQuery={search}
              setSearchQuery={(val) =>
                onSearchChange({ target: { value: val } })
              }
              placeholder="Search tags..."
            />
          </div>

          <Card>
            <DataTable
              key={`datatable-${rowsPerPage}`} // Force re-render when rowsPerPage changes
              columns={columns}
              data={tags} // Use tags directly from container
              progressPending={isLoading}
              noDataComponent="No tags found"
              pagination
              paginationPerPage={rowsPerPage}
              paginationRowsPerPageOptions={[5, 10, 20, rowsPerPage].sort(
                (a, b) => a - b
              )}
              paginationDefaultPage={currentPage}
              onChangePage={handlePageChange}
              highlightOnHover
              striped
              noHeader
            />
          </Card>

          {/* Add Modal */}
          <Modal
            title="Add Tag"
            isOpen={isAddOpen}
            onClose={onAddClose}
            onSubmit={onAddSubmit}
            initialData={{ name: "", slug: "", description: "" }}
          >
            <Input label="Name" name="name" required />
            <Input label="Slug" name="slug" />
            <Textarea label="Description" name="description" rows={3} />
          </Modal>

          {/* Edit Modal */}
          {selectedTag && (
            <Modal
              title="Edit Tag"
              isOpen={isEditOpen}
              onClose={onEditClose}
              onSubmit={onEditSubmit}
              initialData={{
                name: selectedTag.name || "",
                slug: selectedTag.slug || "",
                description: selectedTag.description || "",
              }}
            >
              <Input
                label="Name"
                name="name"
                required
                defaultValue={selectedTag.name}
              />
              <Input label="Slug" name="slug" defaultValue={selectedTag.slug} />
              <Textarea
                label="Description"
                name="description"
                rows={3}
                defaultValue={selectedTag.description || ""}
              />
            </Modal>
          )}
        </main>
      </div>
    </div>
  );
};

export default TagsView;
