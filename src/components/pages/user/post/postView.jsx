// import React from "react";
// import { Link } from "react-router-dom";
// import { Calendar, User, Eye, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
// import TopNavbar from "../../../common/topNavbar/topNavbar";
// import CommentList from "../../../common/comment-list/comment-list";
// import CommentForm from "../../../common/comment-form/comment-form";
// import { getUserInfoByKey ,getInfoByTags ,getCategoryInfoByKey} from "../../../../utils";

// export default function PostPage({ post, loading, error }) {
//   // Format date
//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const sampleUserData = {
//     name: "John Doe",
//     email: "john@example.com",
//   };

//   // Calculate read time (approx. 200 words per minute)
//   const calculateReadTime = (content) => {
//     const wordCount = content.split(/\s+/).length;
//     return Math.max(1, Math.ceil(wordCount / 200));
//   };

//   // Copy URL to clipboard for sharing
//   const copyLink = () => {
//     navigator.clipboard.writeText(window.location.href);
//     alert("Link copied to clipboard");
//   };

//   // Share on social media
//   const shareOnSocial = (platform, title = "Check out this blog post") => {
//     const url = encodeURIComponent(window.location.href);
//     const encodedTitle = encodeURIComponent(title);

//     let shareUrl = "";
//     switch (platform) {
//       case "facebook":
//         shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
//         break;
//       case "twitter":
//         shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${encodedTitle}`;
//         break;
//       case "linkedin":
//         shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
//         break;
//       default:
//         return;
//     }

//     window.open(shareUrl, "_blank", "width=600,height=400");
//   };

//   // Placeholder author, categories, and tags
//   const author = post?.authorid 

//   const categories = post?.selectedCategory
//     ? [{ id: post.selectedCategory, }]
//     : [];
//   const tags = post?.selectedTags
//     ? post.selectedTags.map((tagId) => ({
//         id: tagId,
      
//       }))
//     : [];
//   const readTime = post ? calculateReadTime(post.content) : 1;

//   // Dummy related posts
//   const dummyRelatedPosts = [
//     {
//       id: 1,
//       slug: "dummy-post-1",
//       title: "Dummy Post 1",
//       content: "This is a sample dummy post for related content.",
//       featuredimage: "https://via.placeholder.com/400x200?text=Dummy+Post+1",
//       publishedat: "2025-04-01T10:00:00Z",
//       viewcount: 150,
//       selectedCategory: 1,
//     },
//     {
//       id: 2,
//       slug: "dummy-post-2",
//       title: "Dummy Post 2",
//       content: "Another sample dummy post for related content.",
//       featuredimage: "https://via.placeholder.com/400x200?text=Dummy+Post+2",
//       publishedat: "2025-04-02T12:00:00Z",
//       viewcount: 200,
//       selectedCategory: 1,
//     },
//   ];

//   // Display loading state
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-50">
//         <svg
//           className="animate-spin h-8 w-8 text-gray-600"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//         >
//           <circle
//             className="opacity-25"
//             cx="12"
//             cy="12"
//             r="10"
//             stroke="currentColor"
//             strokeWidth="4"
//           />
//           <path
//             className="opacity-75"
//             fill="currentColor"
//             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//           />
//         </svg>
//       </div>
//     );
//   }

//   // Display error state
//   if (error) {
//     return (
//       <div className="max-w-2xl mx-auto px-4 py-16 text-center bg-gray-50 min-h-screen">
//         <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">Post Not Found</h1>
//         <p className="text-gray-600 mb-6">{error}</p>
//         <Link
//           to="/blog"
//           className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
//         >
//           Return to Blog
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <TopNavbar userData={sampleUserData} notificationCount={3} />
//       <main className="max-w-11/12 mx-auto px-4 py-12">
//         <article>
//           {post?.featuredimage && (
//             <img
//               src={post.featuredimage}
//               alt={post.title}
//               className="w-full h-96 object-cover rounded-lg mb-8"
//             />
//           )}

//           {/* Categories */}
//           {categories.length > 0 && (
//             <div className="flex flex-wrap gap-2 mb-4">
//               {categories.map((category) => (

//                 <Link
//                   key={category.id}
//                   to={`/category/${category.slug}`}
//                   className="px-3 py-1 bg-gray-200 text-gray-800 text-sm font-medium rounded-full hover:bg-gray-300 transition-colors"
//                 >
//                   {getCategoryInfoByKey(category.id,"name")}
//                 </Link>
//               ))}
//             </div>
//           )}

//           {/* Title */}
//           <h1 className="text-4xl font-serif font-bold text-gray-900 mb-6 leading-tight">
//             {post?.title || "Untitled Post"}
//           </h1>

//           {/* Post Meta */}
//           <div className="flex items-center gap-6 mb-8 text-sm text-gray-500">
//             <div className="flex items-center">
//               <Calendar className="h-4 w-4 mr-2" />
//               {formatDate(post?.publishedat)}
//             </div>
//             <div className="flex items-center">
//               <User className="h-4 w-4 mr-2" />
//               { getUserInfoByKey(author,"name") || "Unknown Author"}
//             </div>
//             <div className="flex items-center"> 
//               <Eye className="h-4 w-4 mr-2" />
//               {post?.viewcount || 0} views
//             </div>
//             <div>{readTime} min read</div>
//           </div>

//           {/* Author Info */}
//           {author && (
//             <div className="flex items-center mb-12 bg-gray-100 p-4 rounded-lg">
//               <img
//           src={getUserInfoByKey(author,"avatar")}
//           alt="Profile"
//           className="w-10 h-10 rounded-full object-cover"
//           onError={(e) =>
//             (e.target.outerHTML = `<div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium text-sm">${getInitials(
//               userData.name
//             )}</div>`)
//           }
//         />
//               <div className="ml-4">
//                 <p className="text-sm font-semibold text-gray-900">{getUserInfoByKey(author,"name")}</p>
//                 <p className="text-xs text-gray-500    ">{getUserInfoByKey(author,"bio")}</p>
//               </div>
//             </div>
//           )}

//           {/* Post Content */}
//           <div
//             className="prose prose-lg prose-gray max-w-none text-gray-800 leading-relaxed"
//             dangerouslySetInnerHTML={{ __html: post?.content || "" }}
//           />

//           {/* Tags */}
//           {tags.length > 0 && (
//             <div className="mt-12">
//               <div className="flex flex-wrap gap-2">
//                 {tags.map((tag) => (

//                   console.log("tags map",tag),
//                   <Link
//                     key={tag.id}
//                     to={`/blog?tag=${tag.slug}`}
//                     className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded-full hover:bg-gray-100 transition-colors"
//                   >
//                     #{getInfoByTags(tag.id,"name")}
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Share Buttons */}
//           <div className="mt-12">
//             <h3 className="text-sm font-medium text-gray-500 mb-3">Share this post</h3>
//             <div className="flex space-x-4">
//               <button
//                 onClick={() => shareOnSocial("facebook", post?.title)}
//                 className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
//               >
//                 <Facebook className="h-4 w-4" />
//               </button>
//               <button
//                 onClick={() => shareOnSocial("twitter", post?.title)}
//                 className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
//               >
//                 <Twitter className="h-4 w-4" />
//               </button>
//               <button
//                 onClick={() => shareOnSocial("linkedin", post?.title)}
//                 className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
//               >
//                 <Linkedin className="h-4 w-4" />
//               </button>
//               <button
//                 onClick={copyLink}
//                 className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
//               >
//                 <Share2 className="h-4 w-4" />
//               </button>
//             </div>
//           </div>

//           {/* Comments Section */}
//           {post?.iscommentsenabled && (
//   <div className="mt-12 max-w-11/12 mx-auto px-1">
//     {/* Simplified card container with gray border */}
//     <div className="bg-white rounded-lg border border-gray-200 p-6">
//       {/* Header matching post typography */}
//       <h2 className="text-2xl font-sans font-bold text-gray-900 mb-6">
//         Comments
//       </h2>

//       {/* Comment list with consistent styling */}
//       <div className="mb-8">
//         <CommentList postId={post.id} />
//       </div>

//       {/* Divider matching other sections */}
//       <hr className="my-6 border-gray-200" />

//       {/* Comment form section */}
//       <div>
//         <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//           <svg
//             className="w-4 h-4 mr-2 text-gray-600"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l4-4h3.414A1.994 1.994 0 009 13.414"
//             />
//           </svg>
//           Leave a Comment
//         </h3>
//         <CommentForm postId={post.id} />
//       </div>
//     </div>
//   </div>
// )}

//           {/* Related Posts */}
//           {dummyRelatedPosts.length > 0 && (
//             <div className="mt-16">
//               <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Related Posts</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {dummyRelatedPosts.map((relatedPost) => (
//                   <Link
//                     key={relatedPost.id}
//                     to={`/post/${relatedPost.slug}`}
//                     className="group"
//                   >
//                     <img
//                       src={relatedPost.featuredimage}
//                       alt={relatedPost.title}
//                       className="w-full h-48 object-cover rounded-lg mb-3 group-hover:opacity-90 transition-opacity"
//                     />
//                     <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
//                       {relatedPost.title}
//                     </h3>
//                     <p className="text-sm text-gray-500">{formatDate(relatedPost.publishedat)}</p>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           )}
//         </article>
//       </main>
//     </div>
//   );
// }


import React from "react";
import { Link } from "react-router-dom";
import { Calendar, User, Eye, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import TopNavbar from "../../../common/topNavbar/topNavbar";
import CommentList from "../../../common/comment-list/comment-list";
import CommentForm from "../../../common/comment-form/comment-form";
import { getUserInfoByKey, getInfoByTags, getCategoryInfoByKey } from "../../../../utils";

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

  const sampleUserData = {
    name: "John Doe",
    email: "john@example.com",
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
  const author = post?.authorid;

  const categories = post?.selectedCategory
    ? [{ id: post.selectedCategory }]
    : [];
  const tags = post?.selectedTags
    ? post.selectedTags.map((tagId) => ({
        id: tagId,
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
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-800">
        <svg
          className="animate-spin h-8 w-8 text-gray-600 dark:text-gray-400"
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
      <div className="max-w-2xl mx-auto px-4 py-16 text-center bg-gray-50 dark:bg-gray-800 min-h-screen">
        <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-gray-100 mb-4">Post Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
        <Link
          to="/blog"
          className="px-6 py-2 bg-gray-900 dark:bg-gray-700 text-white dark:text-gray-100 rounded-md hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
        >
          Return to Blog
        </Link>
      </div>
    );
  }

  // Helper function to get initials
  const getInitials = (name) => {
    if (!name) return "U";
    const nameParts = name.split(" ");
    return nameParts.length > 1
      ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
      : nameParts[0][0].toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
      <TopNavbar userData={sampleUserData} notificationCount={3} />
      <main className="max-w-[90%] mx-auto px-4 py-12">
        <article>
          {post?.featuredimage && (
            <img
              src={post.featuredimage}
              alt={post.title}
              className="w-full h-96 object-cover rounded-lg mb-8 border border-gray-200 dark:border-gray-600"
            />
          )}

          {/* Categories */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-medium rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  {getCategoryInfoByKey(category.id, "name")}
                </Link>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
            {post?.title || "Untitled Post"}
          </h1>

          {/* Post Meta */}
          <div className="flex items-center gap-6 mb-8 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {formatDate(post?.publishedat)}
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              {getUserInfoByKey(author, "name") || "Unknown Author"}
            </div>
            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-2" />
              {post?.viewcount || 0} views
            </div>
            <div>{readTime} min read</div>
          </div>

          {/* Author Info */}
          {author && (
            <div className="flex items-center mb-12 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <img
                src={getUserInfoByKey(author, "avatar")}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-600"
                onError={(e) =>
                  (e.target.outerHTML = `<div className="w-10 h-10 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white dark:text-gray-100 font-medium text-sm">${getInitials(
                    getUserInfoByKey(author, "name")
                  )}</div>`)
                }
              />
              <div className="ml-4">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {getUserInfoByKey(author, "name")}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {getUserInfoByKey(author, "bio")}
                </p>
              </div>
            </div>
          )}

          {/* Post Content */}
          <div
            className="prose prose-lg prose-gray max-w-none text-gray-800 dark:text-gray-200 leading-relaxed dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post?.content || "" }}
          />

          {/* Tags */}
          {tags.length > 0 && (
            <div className="mt-12">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Link
                    key={tag.id}
                    to={`/blog?tag=${tag.slug}`}
                    className="px-3 py-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    #{getInfoByTags(tag.id, "name")}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Share Buttons */}
          <div className="mt-12">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
              Share this post
            </h3>
            <div className="flex space-x-4">
              <button
                onClick={() => shareOnSocial("facebook", post?.title)}
                className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </button>
              <button
                onClick={() => shareOnSocial("twitter", post?.title)}
                className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </button>
              <button
                onClick={() => shareOnSocial("linkedin", post?.title)}
                className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </button>
              <button
                onClick={copyLink}
                className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Comments Section */}
          {post?.iscommentsenabled && (
            <div className="mt-12 max-w-[90%] mx-auto px-1">
              {/* Simplified card container with gray border */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 p-6">
                {/* Header matching post typography */}
                <h2 className="text-2xl font-sans font-bold text-gray-900 dark:text-gray-100 mb-6">
                  Comments
                </h2>

                {/* Comment list with consistent styling */}
                <div className="mb-8">
                  <CommentList postId={post.id} />
                </div>

                {/* Divider matching other sections */}
                <hr className="my-6 border-gray-200 dark:border-gray-600" />

                {/* Comment form section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-gray-600 dark:text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l4-4h3.414A1.994 1.994 0 009 13.414"
                      />
                    </svg>
                    Leave a Comment
                  </h3>
                  <CommentForm postId={post.id} />
                </div>
              </div>
            </div>
          )}

          {/* Related Posts */}
          {dummyRelatedPosts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-gray-100 mb-6">
                Related Posts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dummyRelatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    to={`/post/${relatedPost.slug}`}
                    className="group"
                  >
                    <img
                      src={relatedPost.featuredimage}
                      alt={relatedPost.title}
                      className="w-full h-48 object-cover rounded-lg mb-3 border border-gray-200 dark:border-gray-600 group-hover:opacity-90 transition-opacity"
                    />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(relatedPost.publishedat)}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
    </div>
  );
}