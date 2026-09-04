# Country Explorer
A web app to explore countries and build a personal "places to visit" list using React, TypeScript, Vite, Supabase, and Countries API. 

Users can search for countries, add countries to their personal list, manage their travel status, add notes, and upload photos to country-specific albums.

---

## Tech Stack
- **Frontend**: React, TypeScript, Vite, CSS
- **Backend / Database**: Supabase for authentication, storage, and CRUD entity.
- **APIs**: REST Countries API for country information and search.
- **Deployment**: Vercel for hosting the web app.
- **Version Control and Project Management**: GitHub repository, GitHub kanban board for tracking issues and progress.

---

## Features

- User registration and login
- Supabase authentication
- Search/Browse for countries
- View country information
- Add countries to a personal travel list
- Track the status of each country
- Add personal notes to countries
- Filter countries by status
- Upload photos to country albums
- View photos in a full-screen album viewer
- Remove countries from your personal list
- Personal profile/dashboard
- Responsive layout for different screen sizes
- Protected routes for authenticated users

### Country Statuses

Countries in a user's list can have different statuses, such as:

- Want to Visit
- Visited
- N/A
  
---

## Requirements

Before running the project, make sure you have installed:

- Node.js
- npm
- Git

You can check your installed versions with:

```bash
node --version
npm --version
git --version
```
---

## Getting Started

### 1. Clone the project to your computer

```bash
git clone <YOUR_REPOSITORY_URL>
```

Move into the project directory:

```bash
cd <PROJECT_DIRECTORY>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

---

## Running the Application

Once the dependencies and environment variables are configured, start the development server:

```bash
npm run dev
```
and search ```http://localhost:your_port_number``` in the browser.

---

## Environment Variables

The application requires the following environment variables:

| Variable                        | Description                 |
| ------------------------------- | --------------------------- |
| `VITE_SUPABASE_URL`             | URL of the Supabase project |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable key    |


