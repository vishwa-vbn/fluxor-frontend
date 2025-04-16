import React from "react";

export default function PostCard({ post, className = "" }) {
  // Format date
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  // Calculate read time (approx. 200 words per minute)
  const wordCount = post.content.split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div
      className={`bg-white rounded-lg shadow-sm overflow-hidden transition-shadow hover:shadow-md ${className}`}
    >
      {post.featuredImage && (
        <div className="w-full aspect-video overflow-hidden">
          <a href={`/post/${post.slug}`}>
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-48 object-cover transition-transform hover:scale-105 duration-300"
            />
          </a>
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center space-x-2 mb-2">
          {post.categories && post.categories.length > 0 && (
            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full hover:bg-blue-200 transition-colors">
              {post.categories[0].name}
            </span>
          )}
          <span className="text-gray-500 text-sm">{readTime} min read</span>
        </div>

        <a href={`/post/${post.slug}`}>
          <h3 className="text-lg font-serif font-bold mb-2 hover:text-blue-600 transition-colors">
            {post.title}
          </h3>
        </a>

        {post.excerpt && (
          <p className="text-gray-600 mb-4 text-sm line-clamp-3">
            {post.excerpt}
          </p>
        )}
      </div>

      <div className="pt-0 px-5 pb-5 flex justify-between items-center w-full">
        <div className="flex items-center">
          {post.author && (
            <>
              <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
                <img
                  src={post.author.avatar}
                  alt={post.author.username}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div
                  className="hidden h-8 w-8 bg-gray-200 rounded-full items-center justify-center text-gray-500 text-sm font-medium"
                  style={{ display: "none" }}
                >
                  {post.author.username.charAt(0).toUpperCase()}
                </div>
              </div>
              <span className="text-xs text-gray-500">{post.author.username}</span>
            </>
          )}
        </div>
        <span className="text-xs text-gray-500">{formattedDate}</span>
      </div>
    </div>
  );
}