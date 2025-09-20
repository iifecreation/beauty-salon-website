export const getErrorMessage = (error: any): string => {
  if (!error) return "An unknown error occurred.";

  const response = error.response;
  if (!response || !response.data) return error.message || "Something went wrong.";

  const data = response.data;

  // If it's a plain string
  if (typeof data === "string") {
    return data;
  }

  // If there's an `error` key
  if (data.error) {
    if (typeof data.error === "string") {
      return data.error;
    } else if (typeof data.error === "object") {
      // Try to grab first string in nested object
      const nestedMsg = Object.values(data.error).find(val => typeof val === "string");
      return nestedMsg || "An unexpected error occurred.";
    }
  }

  return "An unexpected error occurred.";
};
