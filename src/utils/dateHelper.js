// utils/dateHelper.js

export const getTodayIndex = () => new Date().getDay();

export const getTomorrowIndex = () => (new Date().getDay() + 1) % 7;

export const getFormattedDate = () => {
  const now = new Date();
  return now.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getShortDate = () => {
  const now = new Date();
  return now.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
};

export const getTimeOfDay = () => {
  const hr = new Date().getHours();
  if (hr >= 5 && hr < 12) return "Morning";
  if (hr >= 12 && hr < 17) return "Afternoon";
  if (hr >= 17 && hr < 21) return "Evening";
  return "Night";
};

export const getCurrentMeal = () => {
  const hr = new Date().getHours();
  if (hr >= 7 && hr < 12) return "breakfast";
  if (hr >= 12 && hr < 17) return "lunch";
  if (hr >= 17 && hr < 23) return "dinner";
  return "breakfast"; // midnight–6 AM → next meal is breakfast
};

export const getCurrentMealIndex = () => {
  const hr = new Date().getHours();
  if (hr >= 7 && hr < 12) return 0; // breakfast
  if (hr >= 12 && hr < 17) return 1; // lunch
  if (hr >= 17 && hr < 23) return 2; // dinner
  return 0; // midnight–6 AM → next meal is breakfast
};

export const isMealTime = () => {
  const hr = new Date().getHours();
  return (hr >= 7 && hr < 12) || (hr >= 12 && hr < 17) || (hr >= 17 && hr < 23);
};

export const getMealStatus = () => {
  const hr = new Date().getHours();
  if (hr >= 7 && hr < 12) return "Serving until 9:00 AM";
  if (hr >= 12 && hr < 17) return "Serving until 2:00 PM";
  if (hr >= 17 && hr < 23) return "Serving until 9:00 PM";
  return "Next meal: Breakfast at 7:00 AM"; // midnight–6 AM
};
