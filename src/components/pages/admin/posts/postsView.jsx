import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Eye, Edit, Trash2, PlusCircle, Search } from "lucide-react";
import { Link } from "react-router-dom";
import TopNavbar from "../../../common/topNavbar/topNavbar";
import AlertDialog from "../../../common/alertDialog/alertDialog";
import Button from "../../../controls/button/buttonView";
import Select from "../../../controls/selection/selection";

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
      <div className="flex items-center">
        <img
          src={
            row.author?.avatar ||
            `https://ui-avatars.com/api/?name=${row.author?.username}`
          }
          alt=""
          className="w-8 h-8 rounded-full mr-2"
        />
        <span className="text-gray-800 font-medium">
          {row.author?.username || "Unknown"}
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
        <span className={`badge ${statusColors[row.status] || "badge-ghost"}`}>
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </span>
      );
    },
  },
  {
    name: "Date",
    selector: (row) =>
      new Date(row.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
  },
  {
    name: "Views",
    selector: (row) => row.viewCount,
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
        <Link to={`/admin/posts/edit/${row.id}`}>
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

export default function Post({ posts = [], loading }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Filter by search + status
  useEffect(() => {
    const filtered = posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.author?.username?.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || post.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
    setFilteredPosts(filtered);
  }, [search, statusFilter, posts]);

  const handleDelete = () => {
    console.log("Deleting post:", selectedPost);
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <TopNavbar
        userData={sampleUserData}
        onSearch={(q) => setSearch(q)}
        notificationCount={3}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex-1 w-full max-w-11/12 mx-auto py-8 space-y-6">
        {/* ─── Header + New Post Button ───────────────────────────── */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">All Posts</h1>
          <Link to="/admin/posts/create">
            <Button variant="primary" size="md" className="flex items-center">
              <PlusCircle className="w-4 h-4 mr-2" /> New Post
            </Button>
          </Link>
        </div>

        {/* ─── Filters floating right ────────────────────────────── */}
        <div className="flex justify-end gap-4 mb-4">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="relative w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 w-full bg-white border border-gray-300 rounded-[5px] px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </form>

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

        {/* ─── Data Table ──────────────────────────────────────────── */}
        <div className="bg-white rounded-[5px] shadow-sm p-4 transition hover:shadow-md">
          <DataTable
            columns={columns((post) => {
              setSelectedPost(post);
              setIsDialogOpen(true);
            })}
            data={filteredPosts}
            progressPending={loading}
            pagination
            highlightOnHover
            striped
            noHeader
          />
        </div>

        {/* ─── Delete Confirmation ────────────────────────────────── */}
        {selectedPost && (
          <AlertDialog
            open={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            onConfirm={handleDelete}
            title="Are you sure?"
            description={`This will permanently delete the post "${selectedPost.title}".`}
          />
        )}
      </div>
    </div>
  );
}
