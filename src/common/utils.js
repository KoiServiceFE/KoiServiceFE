export const getCurrentDate = () => {
  const now = new Date(); // Get the current date and time
  const year = now.getFullYear(); // Get the full year (e.g., 2024)
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Get month (0-11), so add 1 and pad to two digits
  const day = String(now.getDate()).padStart(2, "0"); // Get day and pad to two digits

  return `${year}-${month}-${day}`; // Format as "YYYY-MM-DD"
};
