# Onneshon Blog Platform (Frontend)

[![Backend API](https://img.shields.io/badge/Backend-onnsehon--blog--api-blue?logo=github)](https://github.com/ShubratoDn/onneshon-blog-api)

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Folder Structure](#folder-structure)
- [Tech Stack](#tech-stack)
- [Setup & Installation](#setup--installation)
- [Usage Guide](#usage-guide)
- [API & Backend Integration](#api--backend-integration)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

**Onneshon** is a modern, full-featured blogging platform built with React.js for the frontend and a RESTful API backend ([onnsehon-blog-api](https://github.com/ShubratoDn/onneshon-blog-api)). It allows users to register, log in, write blogs with rich text and images, comment on posts, and manage their profiles. The platform is designed for scalability, user experience, and easy integration with the backend API.

---

## Features

- **User Authentication:** Sign up, log in, and log out securely.
- **Profile Management:** View and update user profiles, including profile images and bio.
- **Blog Creation:** Write blogs with a rich text editor (Jodit), upload images, and assign categories.
- **Blog Listing:** Infinite scroll news feed, user-specific blog lists, and category filtering.
- **Blog Details:** View full blog content, author info, publication date, and comments.
- **Comment System:** Add and view comments on blogs (with authentication).
- **Search:** Real-time search for blogs by title.
- **Responsive UI:** Mobile-friendly, modern design using Bootstrap and custom CSS.
- **Error Handling:** Custom 404 and error pages.
- **Notifications:** Toast notifications for actions and errors.

<!-- ---

## Screenshots

> _Add screenshots or GIFs here to showcase the UI and features._ -->

---

## Folder Structure

```
/D:/Learn Web Development/React.js/onneshon
├── public/                  # Static files (index.html, favicon, etc.)
├── src/
│   ├── assets/
│   │   ├── images/          # Image assets (logo, user images, etc.)
│   │   └── styles/          # Global CSS (style.css)
│   ├── components/          # Reusable UI components (Navbar, Footer, Feed, SearchBar, etc.)
│   ├── pages/
│   │   ├── blog-route/      # Blog-related pages (WriteBlog, BlogPrivateGate)
│   │   ├── user-route/      # User dashboard and private routes
│   │   └── ...              # Main pages (Home, About, Login, Signup, Blog, ErrorPage)
│   ├── services/            # API service modules (auth, blog, user)
│   ├── utils/               # Utility files (constants, axios instance)
│   ├── App.js               # Main app component and routing
│   ├── index.js             # Entry point
│   └── ...
├── package.json             # Project metadata and dependencies
├── package-lock.json        # Dependency lock file
└── README.md                # Project documentation
```

---

## Tech Stack

- **Frontend:** React.js (v18+)
- **Routing:** react-router-dom
- **State Management:** React Hooks
- **UI Framework:** Bootstrap 5, Reactstrap, FontAwesome
- **Rich Text Editor:** Jodit React
- **Form Handling:** Formik, Yup
- **HTTP Client:** Axios
- **Notifications:** React Toastify
- **Infinite Scroll:** react-infinite-scroll-component
- **Testing:** @testing-library/react, jest-dom, user-event

---

## Setup & Installation

### Prerequisites
- Node.js (v16+ recommended)
- npm (v8+)
- Backend API running ([onnsehon-blog-api](https://github.com/ShubratoDn/onneshon-blog-api))

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/onneshon.git
cd onneshon
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure API Endpoint
- The API base URL is set in `src/utils/constants.js`:
  ```js
  export const BASE_URL = "http://127.0.0.1:1234";
  ```
- Change this if your backend runs on a different host/port.

### 4. Start the Development Server
```bash
npm start
```
- The app will run at [http://localhost:3000](http://localhost:3000)

---

## Usage Guide

### User Flows
- **Sign Up:** Register with name, email, password, profile image, and bio.
- **Login:** Access your dashboard and write blogs.
- **Write Blog:** Use the rich text editor to compose, add images, and select categories.
- **View Blogs:** Browse all blogs, search, and filter by category or author.
- **Comment:** Add comments to blogs (must be logged in).
- **Profile:** View your profile and all your blogs.

### Main Pages
- `/home` or `/` - Home/news feed
- `/about` - About the platform
- `/login` - User login
- `/signup` - User registration
- `/user/dashboard` - User dashboard (private)
- `/blog/write-blog` - Write a new blog (private)
- `/blog/:blogId` - View a specific blog
- `/user/:userId` - View a user's profile and blogs

---

## API & Backend Integration

This frontend is tightly integrated with the [onnsehon-blog-api](https://github.com/ShubratoDn/onneshon-blog-api) backend. Key integration points:

- **Authentication:** JWT-based, stored in localStorage.
- **Blog CRUD:** Create, read, and comment on blogs via REST API endpoints.
- **User Management:** Register, login, fetch user info, and update profile.
- **Image Uploads:** Handled via multipart/form-data to the backend.
- **Category Management:** Blogs can be assigned categories (fetched from backend).
- **Error Handling:** Handles API errors and displays user-friendly messages.

> **Backend Setup:**
> - See [onnsehon-blog-api](https://github.com/ShubratoDn/onneshon-blog-api) for backend installation, API docs, and environment variables.

---

## Available Scripts

In the project directory, you can run:

- `npm start` — Runs the app in development mode.
- `npm run build` — Builds the app for production.
- `npm test` — Launches the test runner.
- `npm run eject` — Ejects the app (not recommended unless necessary).

---

## Contributing

Contributions are welcome! To contribute:
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

Please follow the existing code style and include tests where appropriate.

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## Acknowledgements
- [onnsehon-blog-api](https://github.com/ShubratoDn/onneshon-blog-api) — Backend API
- [React](https://reactjs.org/), [Bootstrap](https://getbootstrap.com/), [Formik](https://formik.org/), [Yup](https://github.com/jquense/yup), [Jodit Editor](https://xdsoft.net/jodit/), [React Toastify](https://fkhadra.github.io/react-toastify/) 