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