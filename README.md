# XeroPilot

XeroPilot is a full-stack dashboard and AI assistant application designed to streamline accounting tasks and automations. It features a modern React-based frontend and an Express/Node.js backend.

## Project Structure

This repository is organized into two main components:

- **Frontend (Root `.` directory)**: A responsive React dashboard built with Vite, Tailwind CSS, and React Query.
- **Backend (`/xero-pilot-backend` directory)**: An Express-based Node.js API that provides endpoints for authentication, invoices, receipts, bank integrations, contacts, automations, and AI features.

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (Node Package Manager)

### Running the Frontend

1. Navigate to the project root directory:
   ```bash
   cd XeroPilot
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. *Optional*: Build the frontend for production:
   ```bash
   npm run build
   ```

### Running the Backend

1. Navigate to the backend directory:
   ```bash
   cd xero-pilot-backend
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables (if required):
   Copy `.env.example` to `.env` and populate it with the necessary configuration details.
4. Start the backend server:
   ```bash
   npm start
   ```
   *Note: For active development with hot-reloading, you can run `npm run dev`.*

> Note: OAuth scopes are currently being debugged, but the full flow is implemented and deployed. The next step is aligning scopes and completing the AI analysis pipeline.

## Technologies Used

**Frontend:**
- [React](https://reactjs.org/) (v18)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Query](https://react-query.v3.tanstack.com/)
- [React Router DOM](https://reactrouter.com/)
- [Axios](https://axios-http.com/)

**Backend:**
- [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/)
- [LowDB](https://github.com/typicode/lowdb) (Local JSON database)
- [Axios](https://axios-http.com/)
- CORS & dotenv
