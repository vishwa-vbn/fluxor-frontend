import React, { useState, useEffect } from "react";
import CommentForm from "../comment-form/comment-form";
import { Reply } from "lucide-react";

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
      <div key={comment.id} className={`${isReply ? "ml-12 mt-4" : "mb-8"}`}>
        <div className="flex">
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-lg font-medium flex-shrink-0">
            {comment.authorName?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="ml-4 flex-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {comment.authorName || "Anonymous"}
                </p>
                <p className="text-xs text-gray-500">
                  {formatDate(comment.createdAt)}
                </p>
              </div>
              <button
                onClick={() =>
                  setReplyingTo(replyingTo === comment.id ? null : comment.id)
                }
                className="flex items-center text-xs text-gray-600 hover:bg-gray-100 rounded-md px-2 py-1 transition-colors"
              >
                <Reply className="h-3 w-3 mr-1" />
                Reply
              </button>
            </div>
            <div className="mt-2 text-sm text-gray-700">{comment.content}</div>

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
      <div className="text-center py-8 text-gray-600">Loading comments...</div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-8 text-red-600">
        Error loading comments
      </div>
    );
  }

  if (!comments || comments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No comments yet. Be the first to comment!
      </div>
    );
  }

  // Filter top-level comments (no parentId)
  const topLevelComments = comments.filter((comment) => !comment.parentId);

  return <div>{topLevelComments.map((comment) => renderComment(comment))}</div>;
}
