import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getCommentsByPost,
  getApprovedComments,
  approveComment,
  rejectComment,
  deleteComment,
} from "../../../../store/comments/commentsActions";
import { getPublishedPosts } from "../../../../store/post/postActions";
import CommentsView from "./commentsView";

const CommentsContainer = ({
  comments,
  approvedComments,
  posts,
  loading,
  commentsLoading,
  getCommentsByPost,
  getApprovedComments,
  approveComment,
  rejectComment,
  deleteComment,
  getPublishedPosts,
}) => {
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedComment, setSelectedComment] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedPostId, setSelectedPostId] = useState("");

  useEffect(() => {
    getPublishedPosts(1, 100);
  }, [getPublishedPosts]);

  useEffect(() => {
    if (selectedPostId) {
      getCommentsByPost(selectedPostId);
      getApprovedComments(selectedPostId);
    }
  }, [selectedPostId, getCommentsByPost, getApprovedComments]);

  useEffect(() => {
    console.log("posts:", posts); console.log("postsLoading:", loading);
  }, [posts, loading]);

  const handlePostChange = (postId) => {
    setSelectedPostId(postId);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleFilterChange = (val) => {
    setSelectedStatus(val);
  };

  const handleSortChange = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  const openCommentDetail = (comment) => {
    setSelectedComment({ ...comment });
    setIsDetailOpen(true);
  };

  const closeCommentDetail = () => {
    setSelectedComment(null);
    setIsDetailOpen(false);
  };

  const handleApproveComment = (commentId) => {
    approveComment(commentId);
  };

  const handleRejectComment = (commentId) => {
    rejectComment(commentId);
  };

  const handleDeleteComment = (commentId) => {
    deleteComment(commentId);
  };

  const getFilteredComments = () => {
    let filteredData = selectedStatus === "approved" ? approvedComments : comments;

    if (!filteredData || !Array.isArray(filteredData)) return [];

    if (search) {
      filteredData = filteredData.filter((comment) =>
        comment.content.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedStatus !== "all" && selectedStatus !== "approved") {
      filteredData = filteredData.filter(
        (comment) => comment.status === selectedStatus
      );
    }

    filteredData = [...filteredData].sort((a, b) => {
      const valueA = a[sortBy] || "";
      const valueB = b[sortBy] || "";
      if (sortBy === "createdAt") {
        return sortOrder === "asc"
          ? new Date(valueA) - new Date(valueB)
          : new Date(valueB) - new Date(valueA);
      }
      return sortOrder === "asc"
        ? String(valueA).localeCompare(String(valueB))
        : String(valueB).localeCompare(String(valueA));
    });

    return filteredData;
  };

  const postOptions = posts
    ? posts.map((post) => ({
        value: post.id.toString(),
        label: post.title || "Untitled Post",
      }))
    : [];

  console.log("postOptions:", postOptions);

  return (
    <CommentsView
      comments={getFilteredComments()}
      allComments={comments}
      isLoading={commentsLoading}
      search={search}
      selectedStatus={selectedStatus}
      onSearchChange={handleSearchChange}
      onFilterChange={handleFilterChange}
      onSortChange={handleSortChange}
      sortBy={sortBy}
      sortOrder={sortOrder}
      onViewClick={openCommentDetail}
      onApproveClick={handleApproveComment}
      onRejectClick={handleRejectComment}
      onDeleteClick={handleDeleteComment}
      selectedComment={selectedComment}
      isDetailOpen={isDetailOpen}
      onDetailClose={closeCommentDetail}
      postOptions={postOptions}
      selectedPostId={selectedPostId}
      onPostChange={handlePostChange}
      postsLoading={loading}
    />
  );
};

const mapStateToProps = (state) => ({
  comments: state.comments?.comments || [],
  approvedComments: state.comments?.approvedComments || [],
  commentsLoading: state.comments?.loading || false,
  posts: state.post?.publishedPosts?.data || [],
  loading: state.post?.loading || false,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCommentsByPost,
      getApprovedComments,
      approveComment,
      rejectComment,
      deleteComment,
      getPublishedPosts,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CommentsContainer);