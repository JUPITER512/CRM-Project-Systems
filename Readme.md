# CRM Suite

## Description

The CRM Suite is a comprehensive Customer Relationship Manager web application designed to help managers store, retrieve, and modify customer information efficiently. This suite includes both a frontend and backend component that work together to provide a robust solution for managing customer relationships and user authentication. Whether you need to manage your profile, handle customer data, or ensure secure access to the system, CRM Suite offers a complete set of features to meet your needs.

## Table of Contents

1. [Frontend](#frontend)
   - [Features](#features)
   - [Implementation](#implementation)
   - [Installation](#installation)
   - [Usage](#usage)
   - [Routes](#routes)
   - [Authentication](#authentication)
   - [Private Routes](#private-routes)
   - [Route to Dashboard](#route-to-dashboard)
   - [Proxy Configuration](#proxy-configuration)
   
2. [Backend](#backend)
   - [Overview](#overview)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation-1)
   - [Scripts](#scripts)
   - [API Routes](#api-routes)
   - [Contributing](#contributing)
   - [Contact](#contact)

---

## Frontend

### Features

- **User Authentication**:
  - Sign up and sign in
  - Password change and reset
  - Email and OTP verification
  - Token-based authentication with JWT

- **User Management**:
  - Retrieve and update user profile
  - Upload and update profile images

- **Customer Management**:
  - Add, retrieve, update, and delete customer information

### Implementation

- **React Query**: For efficient data fetching and caching, reducing unnecessary useEffect and state usage.
- **React Table**: For dynamic and flexible table handling.
- **Recoil.js**: For state management.
- **Axios Custom Hook**: For API requests with interceptors.
- **AuthProvider**: Context provider for user authentication.
- **Protected Routes Custom Hook**: To restrict access to private routes.
- **RouteToDashboard Custom Hook**: To redirect authenticated users to the dashboard.

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/JUPITER512/CRM-Project-Systems.git
    ```
2. Navigate to the project directory:
    ```sh
    cd CRM-Project-Systems
    cd frontend
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

### Usage

1. Start the development server:
    ```sh
    npm run dev
    ```
2. Open your browser and navigate to `http://localhost:5173`.

### Routes

The application uses `react-router-dom` for routing. Below are the main routes:

- `/`: Redirects to `/Sign-in`
- `/Sign-in`: Sign-in page
- `/Sign-up`: Sign-up page
- `/Forget-password`: Forget password page
- `/Change-password`: Change password page
- `/Otp-Code`: OTP code page
- `/Home`: Main application layout with the following child routes:
  - `/Home/Dashboard`: Dashboard
  - `/Home/CustomerList`: Customer list
  - `/Home/AddCustomer`: Add customer
  - `/Home/ProfileSettings`: Profile settings
  - `/Home/Change-Password`: Change password
  - `/Home/Customer/View-Customer-Info/:id`: View customer info
  - `/Home/Customer/Update-Customer-Info/:id`: Update customer info
- `*`: Not found page

### Authentication

The application uses context for authentication. The main authentication context provider is `AuthContextProvider`.

### Private Routes

A custom hook is implemented to reroute users to the sign-in page if they attempt to access private routes without logging in.

### Route to Dashboard

A custom hook is implemented to redirect authenticated users to the dashboard if they try to access authentication routes.

### Proxy Configuration

The proxy is set to forward API requests to the backend:
```js
proxy: {
  '/api': 'http://localhost:3000' // Proxy '/api' to backend
}
```

# CRM Suite Backend

# Overview

This Node.js Express backend provides a robust solution for user authentication and customer management within the CRM Suite. It supports user sign-up, sign-in, password management, email verification, and CRUD operations for customer data. The backend integrates with MongoDB for data storage and Cloudinary and multer for handling image uploads.

## Features

- **User Authentication**:
  - Sign up and sign in
  - Password change and reset
  - Email and OTP verification
  - Token-based authentication with JWT

- **User Management**:
  - Retrieve and update user profile
  - Upload and update profile images

- **Customer Management**:
  - Add, retrieve, update, and delete customer information

## Prerequisites

Ensure you have the following installed:

- Node.js (v18 or later recommended)
- npm (v8 or later recommended)
- MongoDB Atlas account (for database)
- Cloudinary account (for image storage)
- Gmail account (for sending emails)

## Installation

1. Clone the Repository:
    ```bash
    git clone https://github.com/JUPITER512/CRM-Project-Systems.git
    cd CRM-Project-Systems
    cd backend
    ```

2. Install Dependencies:
    ```bash
    npm install
    ```

3. Set Up Environment Variables:

    Create a `.env` file in the root directory and add the following environment variables:
    ```plaintext
    PORT=3000
    DB_CONNECTION=mongodb+srv://<username>:<password>@<cluster-url>/test?retryWrites=true&w=majority

    ACCESS_EXPIRIY=1h
    ACCESS_KEY_SECRET=<your-access-key-secret>

    REFRESH_EXPIRIY=1d
    REFRESH_KEY_SECRET=<your-refresh-key-secret>

    CLOUDINARY_Cloud_Name=<your-cloud-name>
    CLOUDINARY_API_KEY=<your-api-key>
    CLOUDINARY_API_SECRET=<your-api-secret>

    GMAIL_APP_EMAIL=<your-gmail-app-email>
    GMAIL_APP_PASSWORD=<your-gmail-app-password>
    ```

4. Get Gmail App Password:

    Follow the [Google Workspace guide](https://knowledge.workspace.google.com/kb/how-to-create-app-passwords-000009237) to generate an app password for Gmail.

## Scripts

- **Start the Server**:
    ```bash
    npm start
    ```

- **Start the Server in Development Mode**:
    ```bash
    npm run dev
    ```

- **Run Tests**:
    ```bash
    npm test
    ```

    *(Currently, no tests are specified.)*

## API Routes

### Authentication

- `POST /sign-up`: Register a new user
- `POST /sign-in`: Authenticate a user
- `POST /verify-otp`: Verify OTP during sign-up
- `GET /verify-account`: Verify user account
- `POST /forget-password`: Request a password reset
- `POST /change-password`: Change the user password
- `POST /update-access-token`: Refresh the access token
- `GET /email-verification/:userId`: Verify email address
- `POST /change-password-fromProfile`: Change password from user profile

### User Management

- `GET /me`: Get information of the authenticated user
- `GET /me_customer_info`: Get customer information associated with the authenticated user
- `PUT /update-user-info`: Update user information
- `PUT /upload-image`: Upload a profile image for the user
- `PATCH /update-image`: Update the user's profile image
- `GET /logout-user`: Logout the authenticated user

### Customer Management

- `POST /add-customer`: Add a new customer
- `GET /get-customer`: Retrieve all customers
- `DELETE /remove-customer`: Remove a customer
- `PUT /update-customer-info`: Update customer information
- `GET /get-single-customer/:id`: Retrieve a single customer by ID

## Contributing

Contributions are welcome! Please follow the standard Git workflow: fork the repository, create a feature branch, make your changes, and submit a pull request.

## Contact

For any questions or support, please contact [syedalimurtaza36@gmail.com](mailto:syedalimurtaza36@example.com).

---

Thank you for using and contributing to CRM Suite!
