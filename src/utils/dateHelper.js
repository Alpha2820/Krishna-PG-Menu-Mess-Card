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
  if (hr >= 7 && hr < 9) return "breakfast";
  if (hr >= 9 && hr < 19) return "lunch";
  if (hr >= 19 && hr <= 23) return "dinner";
  return "breakfast"; // midnight → breakfast
};

export const getCurrentMealIndex = () => {
  const hr = new Date().getHours();
  if (hr >= 7 && hr < 9) return 0; // breakfast time
  if (hr >= 9 && hr < 12) return 1; // after breakfast → show lunch
  if (hr >= 12 && hr < 14) return 1; // lunch time
  if (hr >= 14 && hr < 19) return 2; // after lunch → show dinner
  if (hr >= 19 && hr <= 23) return 2; // dinner time + late night → keep dinner
  return 0; // midnight → breakfast 🌅
};

export const isMealTime = () => {
  const hr = new Date().getHours();
  return (hr >= 7 && hr < 9) || (hr >= 12 && hr < 14) || (hr >= 19 && hr < 21);
};

export const getMealStatus = () => {
  const hr = new Date().getHours();
  if (hr >= 7 && hr < 9) return "Serving until 9:00 AM";
  if (hr >= 9 && hr < 12) return "Next: Lunch at 12:00 PM";
  if (hr >= 12 && hr < 14) return "Serving until 2:00 PM";
  if (hr >= 14 && hr < 19) return "Next: Dinner at 7:00 PM";
  if (hr >= 19 && hr < 21) return "Serving until 9:00 PM";
  if (hr >= 21 && hr <= 23) return "Next: Breakfast at 7:00 AM";
  return "Next: Breakfast at 7:00 AM";
};
