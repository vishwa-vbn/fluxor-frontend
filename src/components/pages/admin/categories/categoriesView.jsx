import React, { useState, useEffect } from "react";
import { PlusCircle, Search, Edit, Trash2 } from "lucide-react";
import { Card } from "../../../common/card/Card";
import Input from "../../../controls/input/inputView";
import Select from "../../../controls/selection/selection";
import Textarea from "../../../controls/textarea/Textarea";
import Modal from "../../../common/modal/modal";
import DataTable from "react-data-table-component";
import Button from "../../../controls/button/buttonView";
import TopNavbar from "../../../common/topNavbar/topNavbar";
import FileUpload from "../../../controls/fileUpload/fileUpload"; // <-- new
import SearchBar from "../../../controls/searchbar/searchbar";

const CategoriesView = ({
  categories,
  allCategories,
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
  selectedCategory,
}) => {
  const [filtered, setFiltered] = useState(categories);
  const [parentFilter, setParentFilter] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    let filteredData = categories;

    if (search) {
      filteredData = filteredData.filter((cat) =>
        cat.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (parentFilter !== "all") {
      filteredData = filteredData.filter(
        (cat) => String(cat.parentId) === String(parentFilter)
      );
    }

    setFiltered(filteredData);
  }, [search, parentFilter, categories]);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => <div className="text-center">{row.name}</div>, // Centered text
    },
    {
      name: "Slug",
      selector: (row) => row.slug,
      sortable: true,
      cell: (row) => <div className="text-center">{row.slug}</div>, // Centered text
    },
    {
      name: "Parent",
      selector: (row) => {
        const parent = allCategories.find((cat) => cat.id === row.parentId);
        return parent ? parent.name : "-";
      },
      cell: (row) => (
        <div className="text-center">
          {allCategories.find((cat) => cat.id === row.parentId)?.name || "-"}
        </div>
      ), // Centered text
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex justify-center space-x-2"> {/* Center actions */}
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
      right: true, // Keeping this to align actions to the right if necessary
    },
  ];
  

  const sampleUserData = {
    name: "John Doe",
    email: "john@example.com",
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
          {/* ─── Header + Button ───────────────── */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">All Categories</h1>
            <Button
              variant="primary"
              onClick={onAddClick}
              className="flex items-center"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </div>

          {/* ─── Search + Filter ─────────────── */}
          <div className="flex justify-end gap-4 mb-4">
          <SearchBar
  searchQuery={search}
  setSearchQuery={(val) => onSearchChange({ target: { value: val } })}
  placeholder="Search categories..."
/>


            <div className="w-[200px]">
              <Select
                value={parentFilter}
                onChange={(val) => setParentFilter(val)}
                placeholder="Filter by parent"
                options={[
                  { value: "all", label: "All Parents" },
                  ...allCategories.map((c) => ({
                    value: String(c.id),
                    label: c.name,
                  })),
                ]}
              />
            </div>
          </div>

          {/* ─── Data Table ─────────────────── */}
          <Card>
            <DataTable
              columns={columns}
              data={filtered}
              progressPending={isLoading}
              noDataComponent="No categories found"
              pagination
              highlightOnHover
              striped
              noHeader
            />
          </Card>

          {/* ─── Add Modal ───────────────────── */}
          <Modal
            title="Add Category"
            isOpen={isAddOpen}
            onClose={onAddClose}
            onSubmit={onAddSubmit}
          >
            <Input label="Name" name="name" required />
            <Input label="Slug" name="slug" required />
            <FileUpload label="Featured Image" name="featuredImage" />
            <Select
              label="Parent Category"
              name="parentId"
              options={allCategories.map((c) => ({
                value: c.id,
                label: c.name,
              }))}
              allowEmpty
            />
          </Modal>

          {/* ─── Edit Modal ──────────────────── */}
          {selectedCategory && (
            <Modal
              title="Edit Category"
              isOpen={isEditOpen}
              onClose={onEditClose}
              onSubmit={onEditSubmit}
              initialData={selectedCategory}
            >
              <Input label="Name" name="name" required />
              <Input label="Slug" name="slug" required />
              <FileUpload
                label="Featured Image"
                name="featuredImage"
                value={selectedCategory.featuredImage}
              />
              <Select
                label="Parent Category"
                name="parentId"
                options={allCategories
                  .filter((c) => c.id !== selectedCategory.id)
                  .map((c) => ({ value: c.id, label: c.name }))}
                allowEmpty
              />
            </Modal>
          )}
        </main>
      </div>
    </div>
  );
};

export default CategoriesView;
