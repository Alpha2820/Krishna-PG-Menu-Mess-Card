# 🍽️ Krishna PG — Mess Menu App

A clean, mobile-friendly web app for Krishna PG residents to check daily, weekly, and special mess menus.

## Features

- **Home** — Today's meal cards with live clock, active meal highlight, and tomorrow's preview
- **Weekly** — Full 7-day menu with today highlighted
- **Special** — Sunday specials, festival menus, and guest meal info
- **About** — Mess timings and contact info

## Tech Stack

- React + Vite
- Tailwind CSS
- React Router DOM
- React Icons

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx       # App header with meal tabs and live clock
│   ├── MealCard.jsx     # Individual meal display card
│   ├── Navbar.jsx       # Bottom navigation bar
│   └── TomorrowMenu.jsx # Tomorrow's meal preview
├── data/
│   └── menu.js          # Weekly menu data
├── pages/
│   ├── Home.jsx         # Today's menu page
│   ├── Weekly.jsx       # Full week overview
│   ├── Special.jsx      # Special occasions menu
│   └── About.jsx        # Mess info page
└── utils/
    └── dateHelper.js    # Date and meal timing utilities
```

## Meal Timings

| Meal      | Timing          |
| --------- | --------------- |
| Breakfast | 7:00 – 9:00 AM  |
| Lunch     | 12:00 – 2:00 PM |
| Dinner    | 7:00 – 9:00 PM  |

---

Built with ❤️ for Krishna PG residents  
by Abhijeet Tiwari
