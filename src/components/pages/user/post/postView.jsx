import React from "react";
import { Link } from "react-router-dom";
import PostCard from "../../../common/post-card/post-card";
import CommentList from "../../../common/comment-list/comment-list";
import CommentForm from "../../../common/comment-form/comment-form";
import { Calendar, User, Eye, Share2, Facebook, Twitter, Linkedin } from "lucide-react";

export default function PostPage({ post, loading, error }) {
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calculate read time (approx. 200 words per minute)
  const calculateReadTime = (content) => {
    const wordCount = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / 200));
  };

  // Copy URL to clipboard for sharing
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard");
  };

  // Share on social media
  const shareOnSocial = (platform, title = "Check out this blog post") => {
    const url = encodeURIComponent(window.location.href);
    const encodedTitle = encodeURIComponent(title);

    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${encodedTitle}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  // Placeholder author, categories, and tags
  const author = post ? { username: `User${post.authorid}` } : null;
  const categories = post?.selectedCategory
    ? [{ id: post.selectedCategory, name: `Category ${post.selectedCategory}`, slug: `category-${post.selectedCategory}` }]
    : [];
  const tags = post?.selectedTags
    ? post.selectedTags.map((tagId) => ({
        id: tagId,
        name: `Tag ${tagId}`,
        slug: `tag-${tagId}`,
      }))
    : [];
  const readTime = post ? calculateReadTime(post.content) : 1;

  // Dummy related posts
  const dummyRelatedPosts = [
    {
      id: 1,
      slug: "dummy-post-1",
      title: "Dummy Post 1",
      content: "This is a sample dummy post for related content.",
      featuredimage: "https://via.placeholder.com/400x200?text=Dummy+Post+1",
      publishedat: "2025-04-01T10:00:00Z",
      viewcount: 150,
      selectedCategory: 1,
    },
    {
      id: 2,
      slug: "dummy-post-2",
      title: "Dummy Post 2",
      content: "Another sample dummy post for related content.",
      featuredimage: "https://via.placeholder.com/400x200?text=Dummy+Post+2",
      publishedat: "2025-04-02T12:00:00Z",
      viewcount: 200,
      selectedCategory: 1,
    },
  ];

  // Display loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] py-12">
        <svg
          className="animate-spin h-12 w-12 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    );
  }

  // Display error state
  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Post Not Found</h1>
        <p className="text-gray-600 mb-6">{error}</p>
        <Link
          to="/blog"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Return to Blog
        </Link>
      </div>
    );
  }

  return (
    <main className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


         <TopNavbar
                  userData={sampleUserData}
                  onSearch={handleSearch}
                  notificationCount={3}
                  toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                />
                
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Post (80% width) */}
          <div className="w-full lg:w-4/5">
            <article>
              {post?.featuredimage && (
                <div className="w-full mb-6">
                  <img
                    src={post.featuredimage}
                    alt={post.title}
                    className="w-full h-80 object-cover rounded-lg"
                  />
                </div>
              )}

              <div>
                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {categories.length > 0 &&
                    categories.map((category) => (
                      <Link
                        key={category.id}
                        to={`/category/${category.slug}`}
                        className="inline-block px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors"
                      >
                        {category.name}
                      </Link>
                    ))}
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
                  {post?.title || "Untitled Post"}
                </h1>

                {/* Post Meta */}
                <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formatDate(post?.publishedat)}
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    {author?.username || "Unknown Author"}
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-2" />
                    {post?.viewcount || 0} views
                  </div>
                  <div>{readTime} min read</div>
                </div>

                {/* Author info */}
                {author && (
                  <div className="flex items-center mb-8">
                    <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-lg font-medium">
                      {author.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-4">
                      <p className="text-base font-semibold text-gray-900">{author.username}</p>
                      <p className="text-sm text-gray-600">Author bio unavailable</p>
                    </div>
                  </div>
                )}

                {/* Post Content */}
                <div
                  className="prose prose-lg prose-gray max-w-none text-gray-800"
                  dangerouslySetInnerHTML={{ __html: post?.content || "" }}
                />

                {/* Tags */}
                {tags.length > 0 && (
                  <div className="mt-10">
                    <h3 className="text-base font-medium text-gray-600 mb-3">Tags:</h3>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Link
                          key={tag.id}
                          to={`/blog?tag=${tag.slug}`}
                          className="inline-block px-3 py-1 border border-gray-400 text-gray-800 text-sm rounded-md hover:bg-gray-200 transition-colors"
                        >
                          #{tag.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Share buttons */}
                <div className="mt-10">
                  <h3 className="text-base font-medium text-gray-600 mb-3">Share this post:</h3>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => shareOnSocial("facebook", post?.title)}
                      className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    >
                      <Facebook className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => shareOnSocial("twitter", post?.title)}
                      className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-400 text-white hover:bg-blue-500 transition-colors"
                    >
                      <Twitter className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => shareOnSocial("linkedin", post?.title)}
                      className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-800 text-white hover:bg-blue-900 transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </button>
                    <button
                      onClick={copyLink}
                      className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-600 text-white hover:bg-gray-700 transition-colors"
                    >
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              {post?.iscommentsenabled && (
                <div className="mt-12">
                  <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Comments</h2>
                  <CommentList postId={post.id} />
                  <hr className="my-8 border-gray-300" />
                  <h3 className="text-2xl font-medium text-gray-900 mb-4">Leave a Comment</h3>
                  <CommentForm postId={post.id} />
                </div>
              )}
            </article>
          </div>

          {/* Related Posts (20% width) */}
          {dummyRelatedPosts.length > 0 && (
            <aside className="w-full lg:w-1/5">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Related Posts</h2>
              <div className="space-y-6">
                {dummyRelatedPosts.map((relatedPost) => (
                  <div key={relatedPost.id}>
                    <Link to={`/post/${relatedPost.slug}`}>
                      <img
                        src={relatedPost.featuredimage}
                        alt={relatedPost.title}
                        className="w-full h-32 object-cover rounded-lg mb-2"
                      />
                      <h3 className="text-base font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                        {relatedPost.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-600">{formatDate(relatedPost.publishedat)}</p>
                  </div>
                ))}
              </div>
            </aside>
          )}
        </div>
      </div>
    </main>
  );
}