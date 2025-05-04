// import React, { useEffect, useState } from "react";
// import { Eye, Check, X, Trash2 } from "lucide-react";
// import { Card } from "../../../common/card/Card";
// import Modal from "../../../common/modal/modal";
// import SearchBar from "../../../controls/searchbar/searchbar";
// import Select from "../../../controls/selection/selection";
// import Button from "../../../controls/button/buttonView";
// import { format } from "date-fns";
// import TopNavbar from "../../../common/topNavbar/topNavbar";
// import { useResponsiveRowsPerPage } from "../../../../utils/responsiveRowsPerPage";
// import { getPostInfoByKey, getUserInfoByKey } from "../../../../utils/index";
// import ReusableDataTable from "../../../common/DataTable/DataTable"; // Adjust path as needed

// const CommentsView = ({
//   comments,
//   isLoading,
//   search,
//   selectedStatus,
//   onSearchChange,
//   onFilterChange,
//   onSortChange,
//   sortBy,
//   sortOrder,
//   onViewClick,
//   onApproveClick,
//   onRejectClick,
//   onDeleteClick,
//   selectedComment,
//   isDetailOpen,
//   onDetailClose,
//   postOptions,
//   selectedPostId,
//   onPostChange,
//   postsLoading,
// }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const { rowsPerPage, currentPage, setCurrentPage } = useResponsiveRowsPerPage(
//     {
//       rowHeight: 60,
//       navbarHeight: 60,
//       controlsHeight: 120,
//       extraPadding: 50,
//       minRows: 5,
//       maxRowsMobile: 5,
//       maxRowsTablet: 10,
//       maxRowsDesktop: 20,
//       debounceDelay: 200,
//     }
//   );

//   // Reset page when filters change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [search, selectedStatus, comments, setCurrentPage]);

//   const columns = [
//     {
//       name: "Author",
//       selector: (row) => row.authorName,
//       sortable: true,
//       cell: (row) => (
//         <div className="flex flex-col">
//           <span className="font-medium">
//             {getUserInfoByKey(row.authorid, "name")}
//           </span>
//           <span className="text-xs text-gray-500">
//             {row.createdat
//               ? format(new Date(row.createdat), "dd MMM yyyy")
//               : "N/A"}
//           </span>
//         </div>
//       ),
//       width: "200px",
//       sortField: "authorName",
//     },
//     {
//       name: "Post",
//       selector: (row) => row.postTitle,
//       sortable: true,
//       cell: (row) => (
//         <a
//           href={`/post/${row.postSlug}`}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-blue-500 hover:underline"
//         >
//           {getPostInfoByKey(row.postid, "title") || "Unknown Post"}
//         </a>
//       ),
//       sortField: "postTitle",
//     },
//     {
//       name: "Comment",
//       selector: (row) => row.content,
//       cell: (row) => <p className="line-clamp-2 max-w-xs">{row.content}</p>,
//       sortable: true,
//       sortField: "content",
//     },
//     {
//       name: "Status",
//       selector: (row) => row.status,
//       sortable: true,
//       cell: (row) => (
//         <span
//           className={`px-2 py-1 text-xs rounded-full ${
//             row.status === "approved"
//               ? "bg-green-100 text-green-700"
//               : row.status === "pending"
//               ? "bg-yellow-100 text-yellow-700"
//               : "bg-red-100 text-red-700"
//           }`}
//         >
//           {row.status}
//         </span>
//       ),
//       width: "100px",
//       sortField: "status",
//     },
//     {
//       name: "Actions",
//       cell: (row) => (
//         <div className="flex items-center justify-center gap-1">
//           <Button
//             variant="ghost"
//             size="mini"
//             onClick={() => onViewClick(row)}
//             title="View Comment"
//             className="p-1"
//           >
//             <Eye className="w-4 h-4 text-gray-600" />
//           </Button>
//           {row.status !== "approved" && (
//             <Button
//               variant="ghost"
//               size="mini"
//               onClick={() => onApproveClick(row.id)}
//               title="Approve Comment"
//               className="p-1 text-green-600 hover:text-green-800"
//             >
//               <Check className="w-4 h-4" />
//             </Button>
//           )}
//           {row.status !== "rejected" && (
//             <Button
//               variant="ghost"
//               size="mini"
//               onClick={() => onRejectClick(row.id)}
//               title="Reject Comment"
//               className="p-1 text-red-600 hover:text-red-800"
//             >
//               <X className="w-4 h-4" />
//             </Button>
//           )}
//           <Button
//             variant="ghost"
//             size="mini"
//             onClick={() => onDeleteClick(row.id)}
//             title="Delete Comment"
//             className="p-1 text-red-600 hover:text-red-800"
//           >
//             <Trash2 className="w-4 h-4" />
//           </Button>
//         </div>
//       ),
//       center: true,
//     },
//   ];

//   const sampleUserData = {
//     name: "John Doe",
//     email: "john@example.com",
//   };

//   const handleSearch = (query) => {
//     onSearchChange({ target: { value: query } });
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handleSort = (column, direction) => {
//     onSortChange(column.sortField);
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

//         <main className="flex-1 max-w-[100%] w-full mx-auto px-6 py-8 space-y-8">
//           <div className="flex justify-between items-center">
//             <h1 className="text-2xl font-bold text-gray-800">All Comments</h1>
//           </div>

//           <div className="flex justify-end gap-4">
//             <SearchBar
//               searchQuery={search}
//               setSearchQuery={(val) =>
//                 onSearchChange({ target: { value: val } })
//               }
//               placeholder="Search comments..."
//             />
//             <div className="w-[200px]">
//               <Select
//                 value={selectedStatus}
//                 onChange={(val) => onFilterChange(val)}
//                 options={[
//                   { value: "all", label: "All" },
//                   { value: "approved", label: "Approved" },
//                   { value: "pending", label: "Pending" },
//                   { value: "rejected", label: "Rejected" },
//                 ]}
//               />
//             </div>
//             <div className="w-[300px]">
//               <Select
//                 value={selectedPostId}
//                 onChange={(val) => onPostChange(val)}
//                 options={[
//                   { value: "", label: "Select a Post" },
//                   ...postOptions,
//                 ]}
//                 isLoading={postsLoading}
//                 placeholder="Select a Post"
//               />
//             </div>
//           </div>

//           <Card>
//             <ReusableDataTable
//               columns={columns}
//               data={Array.isArray(comments) ? comments : []}
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
//               noDataComponent={
//                 selectedPostId ? "No comments found" : "Please select a post"
//               }
//               onSort={handleSort}
//               sortServer={true}
//             />
//           </Card>

//           {selectedComment && (
//             <Modal
//               title="Comment Detail"
//               isOpen={isDetailOpen}
//               onClose={onDetailClose}
//               mode="view"
//             >
//               <div>
//                 <div className="flex items-center mb-2 last:mb-0">
//                   <h4 className="font-medium text-gray-700 mr-1 text-sm min-w-[80px]">
//                     Author:
//                   </h4>
//                   <p className="bg-green-100 p-1 rounded text-sm border border-green-200">
//                     {selectedComment.authorName || "Anonymous"}
//                   </p>
//                 </div>

//                 <div className="flex items-center mb-2 last:mb-0">
//                   <h4 className="font-medium text-gray-700 mr-1 text-sm min-w-[80px]">
//                     Post:
//                   </h4>
//                   <p className="bg-purple-100 p-1 rounded text-sm border border-purple-200">
//                     <a
//                       href={`/post/${selectedComment.postSlug}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-500 hover:underline"
//                     >
//                       {selectedComment.postTitle || "Unknown Post"}
//                     </a>
//                   </p>
//                 </div>

//                 <div className="flex items-center mb-2 last:mb-0">
//                   <h4 className="font-medium text-gray-700 mr-1 text-sm min-w-[80px]">
//                     Comment:
//                   </h4>
//                   <p className="bg-yellow-100 p-1 rounded text-sm border border-yellow-200">
//                     {selectedComment.content}
//                   </p>
//                 </div>

//                 <div className="flex items-center mb-2 last:mb-0">
//                   <h4 className="font-medium text-gray-700 mr-1 text-sm min-w-[80px]">
//                     Status:
//                   </h4>
//                   <p className="bg-gray-100 p-1 rounded text-sm border border-gray-200">
//                     {selectedComment.status}
//                   </p>
//                 </div>
//               </div>
//             </Modal>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default CommentsView;


import React, { useEffect, useState } from "react";
import { Eye, Check, X, Trash2 } from "lucide-react";
import { Card } from "../../../common/card/Card";
import Modal from "../../../common/modal/modal";
import SearchBar from "../../../controls/searchbar/searchbar";
import Select from "../../../controls/selection/selection";
import Button from "../../../controls/button/buttonView";
import { format } from "date-fns";
import TopNavbar from "../../../common/topNavbar/topNavbar";
import { useResponsiveRowsPerPage } from "../../../../utils/responsiveRowsPerPage";
import { getPostInfoByKey, getUserInfoByKey } from "../../../../utils/index";
import ReusableDataTable from "../../../common/DataTable/DataTable";
import AlertDialog  from "../../../common/alertDialog/alertDialog";

const CommentsView = ({
  comments,
  isLoading,
  search,
  selectedStatus,
  onSearchChange,
  onFilterChange,
  onSortChange,
  sortBy,
  sortOrder,
  onViewClick,
  onApproveClick,
  onRejectClick,
  onDeleteClick,
  selectedComment,
  isDetailOpen,
  onDetailClose,
  postOptions,
  selectedPostId,
  onPostChange,
  postsLoading,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
const [commentToDelete, setCommentToDelete] = useState(null);

  const { rowsPerPage, currentPage, setCurrentPage } = useResponsiveRowsPerPage({
    rowHeight: 60,
    navbarHeight: 60,
    controlsHeight: 120,
    extraPadding: 50,
    minRows: 5,
    maxRowsMobile: 5,
    maxRowsTablet: 10,
    maxRowsDesktop: 20,
    debounceDelay: 200,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedStatus, comments, setCurrentPage]);

  const handleDeleteClick = (comment) => {
    setCommentToDelete(comment);
    setIsDialogOpen(true);
  };
  
  // Function to handle delete confirmation
  const handleDeleteConfirm = () => {
    if (commentToDelete) {
      try {
        onDeleteClick(commentToDelete.id);
      } catch (error) {
        console.error("Error in onDeleteClick:", error);
      }
    }
    setIsDialogOpen(false);
    setCommentToDelete(null);
  };

  const columns = [
    {
      name: "Author",
      selector: (row) => row.authorName,
      sortable: true,
      cell: (row) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {getUserInfoByKey(row.authorid, "name")}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {row.createdat
              ? format(new Date(row.createdat), "dd MMM yyyy")
              : "N/A"}
          </span>
        </div>
      ),
      width: "200px",
      sortField: "authorName",
    },
    {
      name: "Post",
      selector: (row) => row.postTitle,
      sortable: true,
      cell: (row) => (
        <a
          href={`/post/${row.postSlug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 dark:text-blue-400 hover:underline"
        >
          {getPostInfoByKey(row.postid, "title") || "Unknown Post"}
        </a>
      ),
      sortField: "postTitle",
    },
    {
      name: "Comment",
      selector: (row) => row.content,
      cell: (row) => (
        <p className="line-clamp-2 max-w-xs text-gray-900 dark:text-gray-100">
          {row.content}
        </p>
      ),
      sortable: true,
      sortField: "content",
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            row.status === "approved"
              ? "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300"
              : row.status === "pending"
              ? "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300"
              : "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300"
          }`}
        >
          {row.status}
        </span>
      ),
      width: "100px",
      sortField: "status",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex items-center justify-center gap-1">
          <Button
            variant="ghost"
            size="mini"
            onClick={() => onViewClick(row)}
            title="View Comment"
            className="p-1"
          >
            <Eye className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </Button>
          {row.status !== "approved" && (
            <Button
              variant="ghost"
              size="mini"
              onClick={() => onApproveClick(row.id)}
              title="Approve Comment"
              className="p-1 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
            >
              <Check className="w-4 h-4" />
            </Button>
          )}
          {row.status !== "rejected" && (
            <Button
              variant="ghost"
              size="mini"
              onClick={() => onRejectClick(row.id)}
              title="Reject Comment"
              className="p-1 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
           <Button
        variant="ghost"
        size="mini"
        onClick={() => handleDeleteClick(row)}
        title="Delete Comment"
        className="p-1 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
        </div>
      ),
      center: true,
    },
  ];

  const sampleUserData = {
    name: "John Doe",
    email: "john@example.com",
  };

  const handleSearch = (query) => {
    onSearchChange({ target: { value: query } });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSort = (column, direction) => {
    onSortChange(column.sortField);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-0 py-0 space-y-6 transition-colors duration-200">
     <AlertDialog
  open={isDialogOpen}
  onClose={() => setIsDialogOpen(false)}
  onConfirm={handleDeleteConfirm}
  title="Are you sure?"
  description={`This will permanently delete the comment by "${commentToDelete?.authorName || "Anonymous"}".`}
/>
     
      <div className="flex-1 flex flex-col">
        <TopNavbar
          userData={sampleUserData}
          onSearch={handleSearch}
          notificationCount={3}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
        />

        <main className="flex-1 max-w-[100%] w-full mx-auto px-6 py-8 space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              All Comments
            </h1>
          </div>

          <div className="flex justify-end gap-4">
            <SearchBar
              searchQuery={search}
              setSearchQuery={(val) =>
                onSearchChange({ target: { value: val } })
              }
              placeholder="Search comments..."
              className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
            <div className="w-[200px]">
              <Select
                value={selectedStatus}
                onChange={(val) => onFilterChange(val)}
                options={[
                  { value: "all", label: "All" },
                  { value: "approved", label: "Approved" },
                  { value: "pending", label: "Pending" },
                  { value: "rejected", label: "Rejected" },
                ]}
                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="w-[300px]">
              <Select
                value={selectedPostId}
                onChange={(val) => onPostChange(val)}
                options={[
                  { value: "", label: "Select a Post" },
                  ...postOptions,
                ]}
                isLoading={postsLoading}
                placeholder="Select a Post"
                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <ReusableDataTable
              columns={columns}
              data={Array.isArray(comments) ? comments : []}
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
              noDataComponent={
                selectedPostId ? "No comments found" : "Please select a post"
              }
              onSort={handleSort}
              sortServer={true}
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </Card>

          {selectedComment && (
            <Modal
              title="Comment Detail"
              isOpen={isDetailOpen}
              onClose={onDetailClose}
              mode="view"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
            >
              <div>
                <div className="flex items-center mb-2 last:mb-0">
                  <h4 className="font-medium text-gray-700 dark:text-gray-300 mr-1 text-sm min-w-[80px]">
                    Author:
                  </h4>
                  <p className="bg-green-100 dark:bg-green-900/50 p-1 rounded text-sm border border-green-200 dark:border-green-700 text-green-700 dark:text-green-300">
                    {selectedComment.authorName || "Anonymous"}
                  </p>
                </div>

                <div className="flex items-center mb-2 last:mb-0">
                  <h4 className="font-medium text-gray-700 dark:text-gray-300 mr-1 text-sm min-w-[80px]">
                    Post:
                  </h4>
                  <p className="bg-purple-100 dark:bg-purple-900/50 p-1 rounded text-sm border border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300">
                    <a
                      href={`/post/${selectedComment.postSlug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 dark:text-blue-400 hover:underline"
                    >
                      {selectedComment.postTitle || "Unknown Post"}
                    </a>
                  </p>
                </div>

                <div className="flex items-center mb-2 last:mb-0">
                  <h4 className="font-medium text-gray-700 dark:text-gray-300 mr-1 text-sm min-w-[80px]">
                    Comment:
                  </h4>
                  <p className="bg-yellow-100 dark:bg-yellow-900/50 p-1 rounded text-sm border border-yellow-200 dark:border-yellow-700 text-yellow-700 dark:text-yellow-300">
                    {selectedComment.content}
                  </p>
                </div>

                <div className="flex items-center mb-2 last:mb-0">
                  <h4 className="font-medium text-gray-700 dark:text-gray-300 mr-1 text-sm min-w-[80px]">
                    Status:
                  </h4>
                  <p className="bg-gray-100 dark:bg-gray-700 p-1 rounded text-sm border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                    {selectedComment.status}
                  </p>
                </div>
              </div>
            </Modal>
          )}
        </main>
      </div>
    </div>
  );
};

export default CommentsView;