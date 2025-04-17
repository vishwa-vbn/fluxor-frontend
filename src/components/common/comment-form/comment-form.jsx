import React, { useState } from "react";
import Modal from "../modal/modal";
import { Loader2 } from "lucide-react";

export default function CommentForm({ postId, parentId, onSuccess }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Simulated user (replace with your auth logic)
  const user = null; // Example: { id: 1, name: "John", email: "john@example.com" } or null

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const commentData = {
        content: data.content,
        postId,
        parentId: parentId || null,
        authorId: user ? user.id : undefined,
        authorName: !user ? data.authorName : undefined,
        authorEmail: !user ? data.authorEmail : undefined,
      };

      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentData),
      });

      if (!res.ok) throw new Error("Failed to submit comment");
      await res.json();

      // Simulate query invalidation (replace with your cache logic if needed)
      // e.g., queryClient.invalidateQueries([`/api/posts/${postId}/comments`]);
      alert("Comment submitted successfully!");
      setIsOpen(false);
      if (onSuccess) onSuccess();
    } catch (error) {
      alert(error.message || "Failed to submit comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="inline-block mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : parentId ? (
          "Reply"
        ) : (
          "Post Comment"
        )}
      </button>

      <Modal
        title={parentId ? "Reply to Comment" : "Post Comment"}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        initialData={{
          content: "",
          authorName: user ? user.name || user.username : "",
          authorEmail: user ? user.email : "",
        }}
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Your Comment
            </label>
            <textarea
              name="content"
              placeholder="Write your comment here..."
              className="w-full min-h-[100px] border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {!user && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="authorName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  name="authorName"
                  placeholder="Your name"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="authorEmail"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  name="authorEmail"
                  type="email"
                  placeholder="Your email"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}