// // import React, { useState, useEffect } from "react";
// // import { PlusCircle, Search, Edit, Trash2 } from "lucide-react";
// // import { Card } from "../../../common/card/Card";
// // import Input from "../../../controls/input/inputView";
// // import Textarea from "../../../controls/textarea/Textarea";
// // import Modal from "../../../common/modal/modal";
// // import DataTable from "react-data-table-component";
// // import Button from "../../../controls/button/buttonView";
// // import TopNavbar from "../../../common/topNavbar/topNavbar";
// // import SearchBar from "../../../controls/searchbar/searchbar";
// // import { useResponsiveRowsPerPage } from "../../../../utils/responsiveRowsPerPage"; // Adjust path as needed

// // const TagsView = ({
// //   tags,
// //   isLoading,
// //   search,
// //   onSearchChange,
// //   onAddClick,
// //   onEditClick,
// //   onDeleteClick,
// //   isAddOpen,
// //   isEditOpen,
// //   onAddSubmit,
// //   onEditSubmit,
// //   onAddClose,
// //   onEditClose,
// //   selectedTag,
// // }) => {
// //   const [sidebarOpen, setSidebarOpen] = useState(false);

// //   // Use the responsive rows per page hook
// //   const { rowsPerPage, currentPage, setCurrentPage } = useResponsiveRowsPerPage(
// //     {
// //       rowHeight: 60, // Same as Post and CategoriesView; adjust if needed
// //       navbarHeight: 60,
// //       controlsHeight: 120, // Accounts for search bar and margins
// //       extraPadding: 50,
// //       minRows: 5,
// //       maxRowsMobile: 5,
// //       maxRowsTablet: 10,
// //       maxRowsDesktop: 20,
// //       debounceDelay: 200,
// //     }
// //   );

// //   // Reset page when search or tags change
// //   useEffect(() => {
// //     setCurrentPage(1); // Reset to page 1 when data changes
// //   }, [search, tags, setCurrentPage]);

// //   const columns = [
// //     {
// //       name: "Name",
// //       selector: (row) => row.name,
// //       sortable: true,
// //       cell: (row) => <div className="text-center">{row.name}</div>,
// //     },
// //     {
// //       name: "Slug",
// //       selector: (row) => row.slug,
// //       sortable: true,
// //       cell: (row) => <div className="text-center">{row.slug}</div>,
// //     },
// //     {
// //       name: "Description",
// //       selector: (row) => row.description,
// //       cell: (row) => (
// //         <div className="text-center max-w-[200px] truncate">
// //           {row.description || "-"}
// //         </div>
// //       ),
// //     },
// //     {
// //       name: "Actions",
// //       cell: (row) => (
// //         <div className="flex justify-center space-x-2">
// //           <Button variant="ghost" size="sm" onClick={() => onEditClick(row)}>
// //             <Edit className="w-4 h-4 text-blue-600" />
// //           </Button>
// //           <Button
// //             variant="ghost"
// //             size="sm"
// //             onClick={() => onDeleteClick(row.id)}
// //           >
// //             <Trash2 className="w-4 h-4 text-red-600" />
// //           </Button>
// //         </div>
// //       ),
// //     },
// //   ];

// //   const sampleUserData = {
// //     name: "John Doe",
// //     email: "john@example.com",
// //   };

// //   const handleSearch = (query) => {
// //     onSearchChange({ target: { value: query } });
// //   };

// //   // Handle page change
// //   const handlePageChange = (page) => {
// //     setCurrentPage(page);
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 px-0 py-0 space-y-6">
// //       <div className="flex-1 flex flex-col">
// //         <TopNavbar
// //           userData={sampleUserData}
// //           onSearch={handleSearch}
// //           notificationCount={3}
// //           toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
// //         />
// //         <main className="flex-1 max-w-[100%] w-full mx-auto px-6 py-3 space-y-8">
// //           <div className="flex justify-between items-center mb-2">
// //             <h1 className="text-2xl font-bold text-gray-800">All Tags</h1>
// //             <Button
// //              variant="outline"
// //               onClick={onAddClick}
// //               className="flex items-center"
// //             >
// //               <PlusCircle className="w-4 h-4 mr-2" />
// //               Add Tag
// //             </Button>
// //           </div>

// //           <div className="flex justify-end mb-2">
// //             <SearchBar
// //               searchQuery={search}
// //               setSearchQuery={(val) =>
// //                 onSearchChange({ target: { value: val } })
// //               }
// //               placeholder="Search tags..."
// //             />
// //           </div>

// //           <Card>
// //             <DataTable
// //               key={`datatable-${rowsPerPage}`} // Force re-render when rowsPerPage changes
// //               columns={columns}
// //               data={tags} // Use tags directly from container
// //               progressPending={isLoading}
// //               noDataComponent="No tags found"
// //               pagination
// //               paginationPerPage={rowsPerPage}
// //               paginationRowsPerPageOptions={[5, 10, 20, rowsPerPage].sort(
// //                 (a, b) => a - b
// //               )}
// //               paginationDefaultPage={currentPage}
// //               onChangePage={handlePageChange}
// //               highlightOnHover
// //               striped
// //               noHeader
// //             />
// //           </Card>

// //           {/* Add Modal */}
// //           <Modal
// //             title="Add Tag"
// //             isOpen={isAddOpen}
// //             onClose={onAddClose}
// //             onSubmit={onAddSubmit}
// //             initialData={{ name: "", slug: "", description: "" }}
// //           >
// //             <Input label="Name" name="name" required />
// //             <Input label="Slug" name="slug" />
// //             <Textarea label="Description" name="description" rows={3} />
// //           </Modal>

// //           {/* Edit Modal */}
// //           {selectedTag && (
// //             <Modal
// //               title="Edit Tag"
// //               isOpen={isEditOpen}
// //               onClose={onEditClose}
// //               onSubmit={onEditSubmit}
// //               initialData={{
// //                 name: selectedTag.name || "",
// //                 slug: selectedTag.slug || "",
// //                 description: selectedTag.description || "",
// //               }}
// //             >
// //               <Input
// //                 label="Name"
// //                 name="name"
// //                 required
// //                 defaultValue={selectedTag.name}
// //               />
// //               <Input label="Slug" name="slug" defaultValue={selectedTag.slug} />
// //               <Textarea
// //                 label="Description"
// //                 name="description"
// //                 rows={3}
// //                 defaultValue={selectedTag.description || ""}
// //               />
// //             </Modal>
// //           )}
// //         </main>
// //       </div>
// //     </div>
// //   );
// // };

// // export default TagsView;

// import React, { useState, useEffect } from "react";
// import { PlusCircle, Search, Edit, Trash2 } from "lucide-react";
// import { Card } from "../../../common/card/Card";
// import Input from "../../../controls/input/inputView";
// import Textarea from "../../../controls/textarea/Textarea";
// import Modal from "../../../common/modal/modal";
// import Button from "../../../controls/button/buttonView";
// import TopNavbar from "../../../common/topNavbar/topNavbar";
// import SearchBar from "../../../controls/searchbar/searchbar";
// import { useResponsiveRowsPerPage } from "../../../../utils/responsiveRowsPerPage"; // Adjust path as needed
// import ReusableDataTable from "../../../common/DataTable/DataTable"; // Adjust path as needed

// const TagsView = ({
//   tags,
//   isLoading,
//   search,
//   onSearchChange,
//   onAddClick,
//   onEditClick,
//   onDeleteClick,
//   isAddOpen,
//   isEditOpen,
//   onAddSubmit,
//   onEditSubmit,
//   onAddClose,
//   onEditClose,
//   selectedTag,
// }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   // Use the responsive rows per page hook
//   const { rowsPerPage, currentPage, setCurrentPage } = useResponsiveRowsPerPage({
//     rowHeight: 60, // Same as Post and CategoriesView; adjust if needed
//     navbarHeight: 60,
//     controlsHeight: 120, // Accounts for search bar and margins
//     extraPadding: 50,
//     minRows: 5,
//     maxRowsMobile: 5,
//     maxRowsTablet: 10,
//     maxRowsDesktop: 20,
//     debounceDelay: 200,
//   });

//   // Reset page when search or tags change
//   useEffect(() => {
//     setCurrentPage(1); // Reset to page 1 when data changes
//   }, [search, tags, setCurrentPage]);

//   const columns = [
//     {
//       name: "Name",
//       selector: (row) => row.name,
//       sortable: true,
//       cell: (row) => <div className="text-center">{row.name}</div>,
//     },
//     {
//       name: "Slug",
//       selector: (row) => row.slug,
//       sortable: true,
//       cell: (row) => <div className="text-center">{row.slug}</div>,
//     },
//     {
//       name: "Description",
//       selector: (row) => row.description,
//       cell: (row) => (
//         <div className="text-center max-w-[200px] truncate">
//           {row.description || "-"}
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
//     name: "John Doe",
//     email: "john@example.com",
//   };

//   const handleSearch = (query) => {
//     onSearchChange({ target: { value: query } });
//   };

//   // Handle page change
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
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
//             <h1 className="text-2xl font-bold text-gray-800">All Tags</h1>
//             <Button
//              variant="outline"
//               onClick={onAddClick}
//               className="flex items-center"
//             >
//               <PlusCircle className="w-4 h-4 mr-2" />
//               Add Tag
//             </Button>
//           </div>

//           <div className="flex justify-end mb-2">
//             <SearchBar
//               searchQuery={search}
//               setSearchQuery={(val) =>
//                 onSearchChange({ target: { value: val } })
//               }
//               placeholder="Search tags..."
//             />
//           </div>

//           <Card>
//             <ReusableDataTable
//               columns={columns}
//               data={Array.isArray(tags) ? tags : []}
//               loading={isLoading}
//               rowsPerPage={rowsPerPage}
//               currentPage={currentPage}
//               onChangePage={handlePageChange}
//               paginationRowsPerPageOptions={[5, 10, 20, rowsPerPage].sort(
//                 (a, b) => a - b
//               )}
//               striped={true}
//               highlightOnHover={true}
//               noHeader={true}
//               noDataComponent="No tags found"
//             />
//           </Card>

//           {/* Add Modal */}
//           <Modal
//             title="Add Tag"
//             isOpen={isAddOpen}
//             onClose={onAddClose}
//             onSubmit={onAddSubmit}
//             initialData={{ name: "", slug: "", description: "" }}
//           >
//             <Input label="Name" name="name" required />
//             <Input label="Slug" name="slug" />
//             <Textarea label="Description" name="description" rows={3} />
//           </Modal>

//           {/* Edit Modal */}
//           {selectedTag && (
//             <Modal
//               title="Edit Tag"
//               isOpen={isEditOpen}
//               onClose={onEditClose}
//               onSubmit={onEditSubmit}
//               initialData={{
//                 name: selectedTag.name || "",
//                 slug: selectedTag.slug || "",
//                 description: selectedTag.description || "",
//               }}
//             >
//               <Input
//                 label="Name"
//                 name="name"
//                 required
//                 defaultValue={selectedTag.name}
//               />
//               <Input label="Slug" name="slug" defaultValue={selectedTag.slug} />
//               <Textarea
//                 label="Description"
//                 name="description"
//                 rows={3}
//                 defaultValue={selectedTag.description || ""}
//               />
//             </Modal>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default TagsView;

import React, { useState, useEffect } from "react";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { Card } from "../../../common/card/Card";
import Input from "../../../controls/input/inputView";
import Textarea from "../../../controls/textarea/Textarea";
import Modal from "../../../common/modal/modal";
import Button from "../../../controls/button/buttonView";
import TopNavbar from "../../../common/topNavbar/topNavbar";
import SearchBar from "../../../controls/searchbar/searchbar";
import { useResponsiveRowsPerPage } from "../../../../utils/responsiveRowsPerPage";
import ReusableDataTable from "../../../common/DataTable/DataTable";
import clsx from "clsx";
import AlertDialog from "../../../common/alertDialog/alertDialog";

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tagToDelete, setTagToDelete] = useState(null);

  // Use the responsive rows per page hook
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

  // Function to handle delete click
  const handleDeleteClick = (tag) => {
    setTagToDelete(tag);
    setIsDialogOpen(true);
  };

  // Function to handle delete confirmation
  const handleDeleteConfirm = () => {
    if (tagToDelete) {
      try {
        onDeleteClick(tagToDelete.id);
      } catch (error) {
        console.error("Error in onDeleteClick:", error);
      }
    }
    setIsDialogOpen(false);
    setTagToDelete(null);
  };
  // Reset page when search or tags change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, tags, setCurrentPage]);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => (
        <div
          className={clsx(
            "text-center",
            // Light theme
            "text-gray-900",
            // Dark theme
            "dark:text-gray-200"
          )}
        >
          {row.name}
        </div>
      ),
    },
    {
      name: "Slug",
      selector: (row) => row.slug,
      sortable: true,
      cell: (row) => (
        <div
          className={clsx(
            "text-center",
            // Light theme
            "text-gray-900",
            // Dark theme
            "dark:text-gray-200"
          )}
        >
          {row.slug}
        </div>
      ),
    },
    {
      name: "Description",
      selector: (row) => row.description,
      cell: (row) => (
        <div
          className={clsx(
            "text-center max-w-[200px] truncate",
            // Light theme
            "text-gray-900",
            // Dark theme
            "dark:text-gray-200"
          )}
        >
          {row.description || "-"}
        </div>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex justify-center space-x-2">
          <Button variant="ghost" size="sm" onClick={() => onEditClick(row)}>
            <Edit
              className={clsx(
                "w-4 h-4",
                // Light theme
                "text-blue-600",
                // Dark theme
                "dark:text-blue-400"
              )}
            />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDeleteClick(row)}
          >
            <Trash2
              className={clsx("w-4 h-4", "text-red-600", "dark:text-red-400")}
            />
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
    <div
      className={clsx(
        "min-h-screen px-0 py-0 space-y-6",
        // Light theme
        "bg-gray-50",
        // Dark theme
        "dark:bg-gray-900"
      )}
    >
      <AlertDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Are you sure?"
        description={`This will permanently delete the tag "${
          tagToDelete?.name || ""
        }".`}
      />
      <div className="flex-1 flex flex-col">
        <TopNavbar
          userData={sampleUserData}
          onSearch={handleSearch}
          notificationCount={3}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="flex-1 max-w-[100%] w-full mx-auto px-6 py-3 space-y-8">
          <div className="flex justify-between items-center mb-2">
            <h1
              className={clsx(
                "text-2xl font-bold",
                // Light theme
                "text-gray-800",
                // Dark theme
                "dark:text-gray-200"
              )}
            >
              All Tags
            </h1>
            <Button
              variant="outline"
              onClick={onAddClick}
              className="flex items-center"
            >
              <PlusCircle
                className={clsx(
                  "w-4 h-4 mr-2",
                  // Light theme
                  "text-dark-800",
                  // Dark theme
                  "dark:text-white"
                )}
              />
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
            <ReusableDataTable
              columns={columns}
              data={Array.isArray(tags) ? tags : []}
              loading={isLoading}
              rowsPerPage={rowsPerPage}
              currentPage={currentPage}
              onChangePage={handlePageChange}
              paginationRowsPerPageOptions={[5, 10, 20, rowsPerPage].sort(
                (a, b) => a - b
              )}
              striped={true}
              highlightOnHover={true}
              noHeader={true}
              noDataComponent="No tags found"
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
