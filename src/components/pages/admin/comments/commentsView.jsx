// Comments.js
import React, { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { Card } from "../../../common/card/Card";
import Modal from "../../../common/modal/modal";
import DataTable from "react-data-table-component";
import SearchBar from "../../../controls/searchbar/searchbar";
import Select from "../../../controls/selection/selection";
import Button from "../../../controls/button/buttonView";
import { format } from "date-fns";
import TopNavbar from "../../../common/topNavbar/topNavbar";

const CommentsView = ({
  comments,
  search,
  selectedStatus,
  onSearchChange,
  onFilterChange,
  onViewClick,
  selectedComment,
  isDetailOpen,
  onDetailClose,
}) => {
  const [filtered, setFiltered] = useState(comments);

  useEffect(() => {
    let filteredData = comments;

    if (search) {
      filteredData = filteredData.filter((c) =>
        c.content.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedStatus !== "all") {
      filteredData = filteredData.filter((c) => c.status === selectedStatus);
    }

    setFiltered(filteredData);
  }, [search, selectedStatus, comments]);

  const columns = [
    {
      name: "Author",
      selector: (row) => row.authorName,
      cell: (row) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.authorName}</span>
          <span className="text-xs text-gray-500">{format(new Date(row.createdAt), "dd MMM yyyy")}</span>
        </div>
      ),
    },
    {
      name: "Post",
      selector: (row) => row.postTitle,
      cell: (row) => (
        <a
          href={`/post/${row.postSlug}`}
          target="_blank"
          className="text-blue-500 hover:underline"
        >
          {row.postTitle}
        </a>
      ),
    },
    {
      name: "Comment",
      selector: (row) => row.content,
      cell: (row) => <p className="line-clamp-2 max-w-xs">{row.content}</p>,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            row.status === "approved"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
        name: "Actions",
        cell: (row) => (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
            size="mini"
              onClick={() => onViewClick(row)}
              title="View"
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="mini"
              onClick={() => console.log("Approve", row.id)} // Replace with onApproveClick(row)
              className="text-green-600 border-green-600"
            >
             Approve
            </Button>
            <Button
              variant="outline"
            size="mini"
              onClick={() => console.log("Reject", row.id)} // Replace with onRejectClick(row)
              className="text-red-600 border-red-600"
            >
              Reject
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
        <h1 className="text-2xl font-bold text-gray-800">All Comments</h1>
      </div>

      <div className="flex justify-end gap-4">
        <SearchBar
          searchQuery={search}
          setSearchQuery={(val) => onSearchChange({ target: { value: val } })}
          placeholder="Search comments..."
        />
        <div className="w-[200px]">
          <Select
            value={selectedStatus}
            onChange={(val) => onFilterChange(val)}
            options={[
              { value: "all", label: "All" },
              { value: "approved", label: "Approved" },
              { value: "pending", label: "Pending" },
            ]}
          />
        </div>
      </div>

      <Card>
        <DataTable
          columns={columns}
          data={filtered}
          noHeader
          pagination
          highlightOnHover
          striped
        />
      </Card>

      {selectedComment && (
        <Modal
          title="Comment Detail"
          isOpen={isDetailOpen}
          onClose={onDetailClose}
          mode="view"
        >
          <div>
            <h4 className="font-semibold mb-1">Author</h4>
            <p>{selectedComment.authorName}</p>

            <hr className="my-2" />

            <h4 className="font-semibold mb-1">Post</h4>
            <a
              href={`/post/${selectedComment.postSlug}`}
              className="text-blue-500 hover:underline"
              target="_blank"
            >
              {selectedComment.postTitle}
            </a>

            <hr className="my-2" />

            <h4 className="font-semibold mb-1">Comment</h4>
            <p>{selectedComment.content}</p>

            <hr className="my-2" />

            <h4 className="font-semibold mb-1">Status</h4>
            <p>{selectedComment.status}</p>
          </div>
        </Modal>
      )}
      </main>
      </div>
    </div>
  );
};

export default CommentsView;
