import React, { useState, useEffect, useRef } from "react";
import DataTable from "react-data-table-component";
import { Eye, Edit, Trash2, PlusCircle, ArrowLeft } from "lucide-react";
import { Link, useHistory } from "react-router-dom";
import TopNavbar from "../../../common/topNavbar/topNavbar";
import AlertDialog from "../../../common/alertDialog/alertDialog";
import Button from "../../../controls/button/buttonView";
import Select from "../../../controls/selection/selection";
import SearchBar from "../../../controls/searchbar/searchbar";
import { useResponsiveRowsPerPage } from "../../../../utils/responsiveRowsPerPage"; // Adjust path as needed
import { getUserInfoByKey } from "../../../../utils";
import ReusableDataTable from "../../../common/DataTable/DataTable";

const sampleUserData = {
  name: "John Doe",
  email: "john@example.com",
};

const columns = (onDeleteClick) => [
  {
    name: "Title",
    selector: (row) => row.title,
    sortable: true,
    grow: 2,
  },
  {
    name: "Author",
    cell: (row) => (
      console.log("row",row),
      <div className="flex items-center">
        <img
          src={
           getUserInfoByKey(row.authorid,"avatar")
          }
          alt=""
          className="w-8 h-8 rounded-full mr-2"
        />
        <span className="text-gray-800 font-medium">
          {getUserInfoByKey(row.authorid,"username")}
        </span>
      </div>
    ),
  },
  {
    name: "Status",
    cell: (row) => {
      const statusColors = {
        published: "badge-success",
        draft: "badge-warning",
        scheduled: "badge-info",
        archived: "badge-error",
      };
      return (
        <span className={`badge rounded-[3px] ${statusColors[row.status] || "badge-ghost rounded-[5px]"}`}>
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </span>
      );
    },
  },
  {
    name: "Date",
    selector: (row) =>
      row.publishedat
        ? new Date(row.publishedat).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "Not Published",
  },
  {
    name: "Views",
    selector: (row) => row.viewCount || 0,
    sortable: true,
  },
  {
    name: "Actions",
    right: true,
    cell: (row) => (
      <div className="flex space-x-2">
        <Link to={`/post/${row.slug}`} target="_blank">
          <Button variant="ghost" size="sm">
            <Eye className="w-4 h-4 text-black" />
          </Button>
        </Link>
        <Link to={`/edit-post/${row.slug}`}>
          <Button variant="ghost" size="sm">
            <Edit className="w-4 h-4 text-blue-600" />
          </Button>
        </Link>
        <Button variant="ghost" size="sm" onClick={() => onDeleteClick(row)}>
          <Trash2 className="w-4 h-4 text-red-500" />
        </Button>
      </div>
    ),
  },
];

export default function Post({ posts = [], loading, deletePost }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useHistory();
  const containerRef = useRef(null);

  // Use the custom hook for responsive rows per page
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

  // Update filtered posts based on search text and status filter
  useEffect(() => {
    const filtered = posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        (post.author?.username &&
          post.author.username.toLowerCase().includes(search.toLowerCase()));
      const matchesStatus = statusFilter === "all" || post.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
    setFilteredPosts(filtered);
    setCurrentPage(1); // Reset page when data changes
  }, [search, statusFilter, posts, setCurrentPage]);

  const handleDelete = () => {
    if (selectedPost?.id && deletePost) {
      deletePost(selectedPost.id);
    }
    setIsDialogOpen(false);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" ref={containerRef}>
      <TopNavbar
        userData={sampleUserData}
        onSearch={(q) => setSearch(q)}
        notificationCount={3}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <main className="flex-1 w-full mx-auto px-6 py-3 space-y-8">
        <div className="flex justify-between items-center mb-2">
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate.goBack()}
            className="flex items-center text-gray-800 hover:text-blue-600"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <Link to="/create-post">
            <Button variant="primary" size="md" className="flex items-center">
              <PlusCircle className="w-4 h-4 mr-2" /> New Post
            </Button>
          </Link>
        </div>

        <div className="flex justify-end gap-4 mb-0">
          <SearchBar
            searchQuery={search}
            setSearchQuery={setSearch}
            placeholder="Search posts..."
            className="w-[300px]"
          />
          <div className="w-[200px]">
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              placeholder="Filter by status"
              options={[
                { value: "all", label: "All Status" },
                { value: "published", label: "Published" },
                { value: "draft", label: "Draft" },
                { value: "scheduled", label: "Scheduled" },
                { value: "archived", label: "Archived" },
              ]}
            />
          </div>
        </div>

        <div className="bg-white rounded shadow-sm p-4 transition hover:shadow-md">
          {/* <DataTable
            key={`datatable-${rowsPerPage}`} // Force re-render when rowsPerPage changes
            columns={columns((post) => {
              setSelectedPost(post);
              setIsDialogOpen(true);
            })}
            data={filteredPosts}
            progressPending={loading}
            pagination
            paginationPerPage={rowsPerPage}
            paginationRowsPerPageOptions={[5, 10, 20, rowsPerPage].sort((a, b) => a - b)}
            paginationDefaultPage={currentPage}
            onChangePage={handlePageChange}
            highlightOnHover
            striped
            noHeader
          /> */}

<ReusableDataTable
            columns={columns((post) => {
              setSelectedPost(post);
              setIsDialogOpen(true);
            })}
            data={filteredPosts}
            loading={loading}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            onChangePage={handlePageChange}
            paginationRowsPerPageOptions={[5, 10, 20, rowsPerPage].sort((a, b) => a - b)}
            highlightOnHover
            striped
            noHeader
          />
        </div>

        {selectedPost && (
          <AlertDialog
            open={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            onConfirm={handleDelete}
            title="Are you sure?"
            description={`This will permanently delete the post "${selectedPost.title}".`}
          />
        )}
      </main>
    </div>
  );
}