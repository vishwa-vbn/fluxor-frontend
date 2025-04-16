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