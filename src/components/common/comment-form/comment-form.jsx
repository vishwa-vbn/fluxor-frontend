import React, { useState } from "react";
import Modal from "../modal/modal";
import { Loader2 } from "lucide-react";
import Button from "../../controls/button/buttonView"; // Adjust path based on your project structure

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
    <div className="space-y-4">
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        isLoading={isSubmitting}
        disabled={isSubmitting}
      >
        {parentId ? "Reply" : "Post Comment"}
      </Button>

      <Modal
        title={parentId ? "Reply to Comment" : "Post a Comment"}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        initialData={{
          content: "",
          authorName: user ? user.name || user.username : "",
          authorEmail: user ? user.email : "",
        }}
      >
        <div className="space-y-6">
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Your Comment
            </label>
            <textarea
              name="content"
              placeholder="Write your comment here..."
              className="w-full min-h-[120px] border border-gray-200 rounded-lg p-3 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
              required
            />
          </div>

          {!user && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="authorName"
                  className="block text-sm font-medium text-gray-900 mb-2"
                >
                  Name
                </label>
                <input
                  name="authorName"
                  placeholder="Your name"
                  className="w-full border border-gray-200 rounded-lg p-3 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="authorEmail"
                  className="block text-sm font-medium text-gray-900 mb-2"
                >
                  Email
                </label>
                <input
                  name="authorEmail"
                  type="email"
                  placeholder="Your email"
                  className="w-full border border-gray-200 rounded-lg p-3 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
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