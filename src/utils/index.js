export const trimField = (field) =>
  typeof field === "string" ? field.trim() : field;

export const splitStringMainLetter = (str, separator = "_") => {
  const arr = str.split(separator);
  arr.forEach((word, index) => {
    arr[index] = word[0].toUpperCase() + word.slice(1);
  });
  return arr.join(" ");
};
