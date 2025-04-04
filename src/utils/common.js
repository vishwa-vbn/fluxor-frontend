export const trimFormData = (data) => {
  const newData = {};
  for (let field in data) {
    if (typeof data[field] === "string") {
      newData[field] = data[field].trim();
    } else {
      console.log(newData[field]);
      newData[field] = data[field];
    }
  }
  return newData;
};
export const phoneMask = (val) => {
  let arr = String(val).trim().split("");
  const num = Number(arr[arr.length - 1]);
  if (!Number.isInteger(+num)) {
    arr.pop();
  }
  arr = arr.filter((item) => Number.isInteger(+item) && item !== " ");
  arr.length && arr.splice(0, 0, "(");
  arr.length > 4 && arr.splice(4, 0, ") ");
  arr.length > 8 && arr.splice(8, 0, "-");
  return arr.join("").slice(0, 14);
};

export const getAllNum = (string) => {
  if (!string) return "";
  return string.toString().replace(/\D+/g, "");
};

export const formatter = (number, params) => {
  if (!number && number !== 0) return false;
  let maxDigit = 2;
  let letter = "";

  if (params?.style !== "percent") {
    if (Math.abs(number) < 5) maxDigit = 4;
    if (Math.abs(number) < 0.01) maxDigit = 4;
    // if (Math.abs(number) < 0.001) maxDigit = 4;
    if (Math.abs(number) < 0.0001) maxDigit = 5;
    if (Math.abs(number) < 0.00001) maxDigit = 6;
    if (Math.abs(number) < 0.000001) maxDigit = 7;
    if (Math.abs(number) < 0.0000001) maxDigit = 8;
  }

  if (params?.showLetter) {
    if (number > 999999 && number < 1000000000) {
      letter = "M";
      number = number / 1000000;
      maxDigit = 3;
    }
    if (number > 999999999) {
      letter = "B";
      number = number / 1000000000;
    }
  }

  const options = {
    style: "decimal",
    currency: "USD",
    maximumFractionDigits: maxDigit,
    ...params,
  };

  const formatter = new Intl.NumberFormat("en-US", options);

  if (params?.showLetter) return formatter.format(number) + letter;

  return formatter.format(number);
};

export const formatPrice = (stringNumber) => {
  let numbers = String(stringNumber).replace(/\D+/g, "");

  const options = {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  };

  const formatter = new Intl.NumberFormat("en-US", options);

  return formatter.format(+numbers / 100);
};

export const reFormatPrice = (stringPrice) => {
  // => 1232324.88
  return +stringPrice.toString().replace(/,|\$/g, "");
};
