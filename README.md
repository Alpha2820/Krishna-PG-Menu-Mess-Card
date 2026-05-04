# 🍽️ Krishna PG — Mess Menu App

A mobile-first web app for Krishna PG residents to view mess menus, special meals, and mess details.

## Key Features

- **Home** — Today’s meals with a live clock, active meal highlights, and a tomorrow preview
- **Weekly** — Full 7-day mess schedule with today highlighted
- **Special** — Sunday specials, festival menus, and guest meal information
- **About** — Mess timings, contact details, and general PG info
- **Login / Admin** — Authentication-ready admin access and protected admin pages

## Tech Stack

- React 19 + Vite
- Tailwind CSS
- React Router DOM
- Firebase
- React Icons

## Getting Started

```bash
npm install
npm run dev
```

Open the app in your browser at `http://localhost:5173`.

## Available Scripts

- `npm run dev` — start the development server
- `npm run build` — build the app for production
- `npm run preview` — locally preview the production build
- `npm run lint` — run ESLint against the source files

## Project Structure

```
src/
├── assets/              # Static media and images
├── components/
│   ├── Header.jsx       # App header, navigation tabs, and live time display
│   ├── MealCard.jsx     # Menu card UI for each meal
│   ├── Navbar.jsx       # Bottom navigation bar for page routing
│   └── TomorrowMenu.jsx # Tomorrow’s meal preview component
├── data/
│   └── menu.js          # Mess menu data for daily and weekly views
├── pages/
│   ├── About.jsx        # Mess timings and contact information
│   ├── Admin.jsx        # Admin dashboard / protected page layout
│   ├── Home.jsx         # Today’s menu and current meal view
│   ├── Login.jsx        # Authentication page for admin access
│   ├── Special.jsx      # Special menus and guest meal details
│   └── Weekly.jsx       # Full weekly meal planner
├── utils/
│   └── dateHelper.js    # Date handling and meal timing utilities
└── firebase.js          # Firebase configuration and initialization
```

## Meal Timings

| Meal      | Timing          |
| --------- | --------------- |
| Breakfast | 7:00 – 9:00 AM  |
| Lunch     | 12:00 – 2:00 PM |
| Dinner    | 7:00 – 9:00 PM  |

## Deployment

1. Build the app: `npm run build`
2. Serve the generated `dist/` folder with a static host or platform such as Vercel

---

Built with ❤️ for Krishna PG residents by Abhijeet Tiwari
