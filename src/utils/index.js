import { getState } from "../store/configure/configureStore";

export const trimField = (field) =>
  typeof field === "string" ? field.trim() : field;

export const splitStringMainLetter = (str, separator = "_") => {
  const arr = str.split(separator);
  arr.forEach((word, index) => {
    arr[index] = word[0].toUpperCase() + word.slice(1);
  });
  return arr.join(" ");
};

export const getUserInfoByKey = (id, key) => {
  console.log("id and key", id, key);
  const state = getState();
  const users = state.auth?.users || [];

  // Log for debugging (optional, remove in production)
  console.log("Users in state:", users);
  console.log("Searching for id:", id, "with key:", key);

  const user = users.find((u) => u.id === id);
  if (user) {
    if (key in user) {
      return user[key] !== null ? user[key] : "unknown"; // Handle null values
    }
    console.warn(`Key "${key}" not found for user id ${id}`);
    return "unknown";
  }
  console.warn(`User with id ${id} not found`);
  return "unknown";
};

export const getCategoryInfoByKey = (id, key) => {
  const state = getState(); // Make sure getState is correctly imported or defined
  const categories = state.category?.categories?.data || [];

  // Optional logs for debugging
  console.log("Categories in state:", categories);
  console.log("Searching for id:", id, "with key:", key);

  const category = categories.find((cat) => cat.id === id);

  if (category) {
    if (key in category) {
      return category[key] !== null ? category[key] : "unknown";
    }
    console.warn(`Key "${key}" not found for category id ${id}`);
    return "unknown";
  }

  console.warn(`Category with id ${id} not found`);
  return "unknown";
};

export const getInfoByTags = (id, key) => {
  const state = getState(); // Assumes getState is imported from Redux or defined elsewhere
  const tags = state.tags?.tags || [];

  // Optional logs for debugging
  console.log("Tags in state:", tags);
  console.log("Searching for id:", id, "with key:", key);

  const tag = tags.find((tag) => tag.id === id);

  if (tag) {
    if (key in tag) {
      return tag[key] !== null ? tag[key] : "unknown";
    }
    console.warn(`Key "${key}" not found for tag id ${id}`);
    return "unknown";
  }

  console.warn(`Tag with id ${id} not found`);
  return "unknown";
};

export const getPostInfoByKey = (id, key) => {
  const state = getState();
  const posts = state.post?.posts?.data || []; // Adjust path based on your Redux state structure

  // Log for debugging (optional, remove in production)
  console.log("Posts in state:", posts);
  console.log("Searching for id:", id, "with key:", key);

  const post = posts.find((p) => p.id === id);
  if (post) {
    if (key in post) {
      return post[key] !== null ? post[key] : "unknown"; // Handle null values
    }
    console.warn(`Key "${key}" not found for post id ${id}`);
    return "unknown";
  }
  console.warn(`Post with id ${id} not found`);
  return "unknown";
};




// Utility to get dashboard statistics
export const getDashboardStats = () => {
  const state = getState();
  const posts = state.post?.posts?.data || [];
  const publishedPosts = state.post?.publishedPosts?.data || [];
  const comments = state.comments?.comments || [];
  const users = state.auth?.users || [];

  return {
    postsCount: posts.length,
    publishedPostsCount: publishedPosts.length,
    draftPostsCount: posts.filter(post => post.status === "draft").length,
    commentsCount: comments.length,
    approvedCommentsCount: state.comments?.approvedComments?.length || 0,
    usersCount: users.length,
    viewsCount: posts.reduce((sum, post) => sum + (post.viewcount || 0), 0),
  };
};

// Utility to get data for Weekly Traffic bar chart
export const getWeeklyTrafficData = () => {
  const state = getState();
  const posts = state.post?.posts?.data || [];
  
  // Mock data for demonstration (replace with actual view count logic)
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const viewData = days.map((_, index) => {
    return posts.reduce((sum, post) => {
      const postDate = new Date(post.publishedat || Date.now());
      const dayDiff = (new Date().getDay() - postDate.getDay() + 7) % 7;
      return dayDiff === index ? sum + (post.viewcount || 0) : sum;
    }, 0);
  });

  return {
    labels: days,
    datasets: [
      {
        label: "Page Views",
        data: viewData,
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
        borderRadius: 6,
        hoverBackgroundColor: "rgba(59, 130, 246, 1)",
      },
    ],
  };
};

// Utility to get data for Post Status doughnut chart
export const getPostStatusData = () => {
  const state = getState();
  const posts = state.post?.posts?.data || [];

  const statusCounts = {
    published: posts.filter(post => post.status === "published").length,
    drafts: posts.filter(post => post.status === "draft").length,
    scheduled: 0, // Add logic for scheduled posts if available
    archived: 0, // Add logic for archived posts if available
  };

  return {
    labels: ["Published", "Drafts", "Scheduled", "Archived"],
    datasets: [
      {
        data: [
          statusCounts.published,
          statusCounts.drafts,
          statusCounts.scheduled,
          statusCounts.archived,
        ],
        backgroundColor: [
          "#10b981", // emerald-500
          "#f59e0b", // amber-500
          "#3b82f6", // blue-500
          "#ef4444", // red-500
        ],
        borderWidth: 0,
        hoverOffset: 8,
      },
    ],
  };
};

// Utility to get data for User Growth line chart
export const getUserGrowthData = () => {
  const state = getState();
  const users = state.auth?.users || [];

  // Group users by registration month (assuming createdat field exists)
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const userGrowth = months.map((_, index) => {
    return users.filter(user => {
      // Mock createdat if not available
      const createdAt = user.createdat ? new Date(user.createdat) : new Date();
      return createdAt.getMonth() === index;
    }).length;
  });

  return {
    labels: months,
    datasets: [
      {
        label: "User Growth",
        data: userGrowth,
        borderColor: "#8b5cf6", // violet-500
        backgroundColor: "rgba(139, 92, 246, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };
};

// Utility to get quick stats for dashboard
export const getQuickStats = () => {
  const state = getState();
  const posts = state.post?.posts?.data || [];
  const categories = state.category?.categories?.data || [];

  // Calculate top category
  const categoryCounts = posts.reduce((acc, post) => {
    const categoryId = post.selectedCategory;
    if (categoryId) {
      acc[categoryId] = (acc[categoryId] || 0) + 1;
    }
    return acc;
  }, {});
  
  const topCategoryId = Object.keys(categoryCounts).reduce((a, b) => 
    categoryCounts[a] > categoryCounts[b] ? a : b, null
  );
  const topCategory = categories.find(cat => cat.id === parseInt(topCategoryId))?.name || "Tech";

  return {
    avgReadTime: "4.2 min", // Replace with actual logic if available
    bounceRate: "32%", // Replace with actual logic if available
    topCategory,
  };
};

// Utility to get comment count by post
export const getCommentCountByPost = (postId) => {
  const state = getState();
  const comments = state.comments?.comments || [];
  return comments.filter(comment => comment.postid === postId).length;
};

// Utility to get posts by category
export const getPostsByCategory = (categoryId) => {
  const state = getState();
  const posts = state.post?.posts?.data || [];
  return posts.filter(post => post.selectedCategory === categoryId);
};

// Utility to get posts by tag
export const getPostsByTag = (tagId) => {
  const state = getState();
  const posts = state.post?.posts?.data || [];
  return posts.filter(post => post.selectedTags.includes(tagId));
};