# Restaurant Management System

A modern web application for managing restaurant zones, tables, and customers built with Next.js and TypeScript.

## Live Demo

Visit [restaurant.tuanlinh.site](https://restaurant.tuanlinh.site) to see the application in action.

## Features

- Zone Management
  - Create, edit, and delete restaurant zones
  - View zone statistics and occupancy rates
- Table Management
  - Manage tables within zones
  - Track table status (available/occupied)
  - Assign customers to tables
- Customer Management
  - Register new customers
  - Track customer seating
  - Manage customer information

## Technology Stack

- **Frontend**: Next.js 15.3
- **UI**: TailwindCSS 4.1
- **State Management**: React Hooks
- **API Integration**: Axios
- **Charts**: Chart.js with React-Chartjs-2

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager
- Backend API server running

### Backend Setup

You have two options for the backend API:

#### Option 1: Use the deployed API
Skip the backend setup and use the deployed API at `https://restaurantbe.azurewebsites.net/`

#### Option 2: Run backend locally
1. Clone the backend repository:
```bash
git clone https://github.com/tuan2linh/mobile-app-restaurant-be.git
cd mobile-app-restaurant-be
```

2. Install backend dependencies:
```bash
npm install
```

3. Start the backend server:
```bash
npm run start:dev
```

The local backend API will be available at `http://localhost:8080`.

### Frontend Installation

1. Clone the repository:
```bash
git clone https://github.com/tuan2linh/restaurant-manager-fe.git
cd restaurant-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and choose one of these configurations:
```env
# Option 1: Use deployed API (recommended for quick start)
NEXT_PUBLIC_API_URL=https://restaurantbe.azurewebsites.net

# Option 2: Use local backend (if you're running the backend locally)
# NEXT_PUBLIC_API_URL=http://localhost:8080
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Build for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

Then start the production server:

```bash
npm run start
# or
yarn start
```

## Project Structure

```
restaurant-frontend/
├── src/
│   ├── app/            # Next.js app router pages
│   ├── components/     # Reusable React components
│   ├── services/       # API service integrations
│   └── types/         # TypeScript type definitions
├── public/            # Static files
└── ...config files
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
