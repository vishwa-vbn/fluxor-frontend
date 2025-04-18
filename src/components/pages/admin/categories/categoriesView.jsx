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
import FileUpload from "../../../controls/fileUpload/fileUpload";
import SearchBar from "../../../controls/searchbar/searchbar";
import { useResponsiveRowsPerPage } from "../../../../utils/responsiveRowsPerPage"; // Adjust path as needed
import ReusableDataTable from "../../../common/DataTable/DataTable";
import { getCategoryInfoByKey } from "../../../../utils";
const CategoriesView = ({
  categories,
  allCategories = [],
  loading,
  search,
  onSearchChange,
  onCreate,
  onUpdate,
  onDelete,
  selectedCategory,
}) => {
  const [filtered, setFiltered] = useState(categories);
  const [parentFilter, setParentFilter] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  // Use the responsive rows per page hook
  const { rowsPerPage, currentPage, setCurrentPage } = useResponsiveRowsPerPage(
    {
      rowHeight: 60, // Same as Post component; adjust if rows differ
      navbarHeight: 60,
      controlsHeight: 120, // Accounts for search bar, filter, and margins
      extraPadding: 50,
      minRows: 5,
      maxRowsMobile: 5,
      maxRowsTablet: 10,
      maxRowsDesktop: 20,
      debounceDelay: 200,
    }
  );

  useEffect(() => {
    let filteredData = categories || [];

    if (search) {
      const query = search.toLowerCase();
      filteredData = filteredData.filter((cat) =>
        cat.name?.toLowerCase().includes(query) || cat.slug?.toLowerCase().includes(query)
      );
    }
    

    if (parentFilter !== "all") {
      filteredData = filteredData.filter(
        (cat) => String(cat.parentid) === String(parentFilter)
      );
    }
    

    setFiltered(filteredData);
    setCurrentPage(1); // Reset page when data changes
  }, [search, parentFilter, categories, setCurrentPage]);

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
      name: "Parent",
      selector: (row) => {
        const parent = getCategoryInfoByKey(row.parentid, "name");
        return parent ? parent : "";
      },
      cell: (row) => (
        console.log("row is", row),
        (
          <div className="text-center">
            {getCategoryInfoByKey(row.parentid, "name")}
          </div>
        )
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex justify-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setEditCategory(row);
              setIsEditOpen(true);
            }}
          >
            <Edit className="w-4 h-4 text-blue-600" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onDelete(row.id)}>
            <Trash2 className="w-4 h-4 text-red-600" />
          </Button>
        </div>
      ),
      right: true,
    },
  ];

  const sampleUserData = {
    name: "John Doe",
    email: "john@example.com",
  };

  const handleSearch = (query) => {
    onSearchChange(query);
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
            <h1 className="text-2xl font-bold text-gray-800 ">
              All Categories
            </h1>
            <Button
              variant="primary"
              onClick={() => setIsAddOpen(true)}
              className="flex items-center"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </div>

          <div className="flex justify-end gap-4 mb-0">
            <SearchBar
              searchQuery={search}
              setSearchQuery={handleSearch}
              placeholder="Search categories..."
            />
            <div className="w-[200px]">
              <Select
                value={parentFilter}
                onChange={(val) => setParentFilter(val)}
                placeholder="Filter by parent"
                options={[
                  { value: "all", label: "All Parents" },
                  ...Array.from(allCategories || []).map((c) => ({
                    value: String(c.id),
                    label: c.name,
                  })),
                ]}
              />
            </div>
          </div>

          <Card>
            <ReusableDataTable
              columns={columns}
              data={Array.isArray(filtered) ? filtered : []}
              loading={loading}
              rowsPerPage={rowsPerPage}
              currentPage={currentPage}
              onChangePage={handlePageChange}
              paginationRowsPerPageOptions={[5, 10, 20, rowsPerPage].sort(
                (a, b) => a - b
              )}
              striped={true}
              highlightOnHover={true}
              noHeader={true}
            />
          </Card>

          <Modal
            title="Add Category"
            isOpen={isAddOpen}
            onClose={() => setIsAddOpen(false)}
            onSubmit={(data) => {
              onCreate(data);
              setIsAddOpen(false);
            }}
            initialData={{}}
          >
            <Input label="Name" name="name" required />
            <Input label="Slug" name="slug" required />
            <FileUpload label="Featured Image" name="featuredImage" />
            <Select
              label="Parent Category"
              name="parentId"
              options={Array.from(allCategories ?? []).map((c) => ({
                value: c.id,
                label: c.name,
              }))}
              allowEmpty
            />
          </Modal>

          {editCategory && (
            <Modal
              title="Edit Category"
              isOpen={isEditOpen}
              onClose={() => {
                setIsEditOpen(false);
                setEditCategory(null);
              }}
              onSubmit={(data) => {
                onUpdate(editCategory?.id, data);
                setIsEditOpen(false);
                setEditCategory(null);
              }}
              initialData={editCategory}
            >
              <Input label="Name" name="name" required />
              <Input label="Slug" name="slug" required />
              <FileUpload
                label="Featured Image"
                name="featuredImage"
                value={editCategory.featuredImage}
              />
              <Select
                label="Parent Category"
                name="parentId"
                options={(allCategories ?? [])
                  .filter((c) => c.id !== editCategory.id)
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
