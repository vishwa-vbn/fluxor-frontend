import React, { useState, useEffect } from "react";
import CommentForm from "../comment-form/comment-form";
import { Reply } from "lucide-react";
import Button from "../../controls/button/buttonView";

export default function CommentList({ postId }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);

  useEffect(() => {
    async function fetchComments() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/posts/${postId}/comments`);
        if (!res.ok) throw new Error("Failed to fetch comments");
        const data = await res.json();
        setComments(data);
        setIsError(false);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchComments();
  }, [postId]);

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get replies for a given comment
  const getReplies = (commentId) => {
    return comments.filter((comment) => comment.parentId === commentId);
  };

  // Render a single comment with its replies
  const renderComment = (comment, isReply = false) => {
    const replies = getReplies(comment.id);

    return (
      <div
        key={comment.id}
        className={`${
          isReply ? "ml-8 mt-6 border-l-2 border-gray-200 pl-4" : "mb-8"
        } bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow`}
      >
        <div className="flex items-start">
          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-lg font-medium flex-shrink-0">
            {comment.authorName?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="ml-4 flex-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {comment.authorName || "Anonymous"}
                </p>
                <p className="text-xs text-gray-500">
                  {formatDate(comment.createdAt)}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setReplyingTo(replyingTo === comment.id ? null : comment.id)
                }
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
              >
                <Reply className="h-4 w-4" />
                <span>Reply</span>
              </Button>
            </div>
            <div className="mt-3 text-sm text-gray-700 leading-relaxed">
              {comment.content}
            </div>

            {/* Reply Form */}
            {replyingTo === comment.id && (
              <div className="mt-4">
                <CommentForm
                  postId={postId}
                  parentId={comment.id}
                  onSuccess={() => setReplyingTo(null)}
                />
              </div>
            )}

            {/* Render Replies */}
            {replies.length > 0 && (
              <div className="mt-4 space-y-4">
                {replies.map((reply) => renderComment(reply, true))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="text-center py-12 text-gray-600 bg-gray-50 rounded-lg">
        Loading comments...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12 text-red-600 bg-gray-50 rounded-lg">
        Error loading comments
      </div>
    );
  }

  if (!comments || comments.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
        No comments yet. Be the first to comment!
      </div>
    );
  }

  // Filter top-level comments (no parentId)
  const topLevelComments = comments.filter((comment) => !comment.parentId);

  return (
    <div className="space-y-4">
      {topLevelComments.map((comment) => renderComment(comment))}
    </div>
  );
}