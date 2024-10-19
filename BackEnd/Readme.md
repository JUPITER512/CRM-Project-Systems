# Node.js Express Backend

## Overview

This Node.js Express backend provides a robust solution for user authentication and customer management. It supports user sign-up, sign-in, password management, email verification, and CRUD operations for customer data. The backend is designed to work with MongoDB for data storage and Cloudinary for handling image uploads.

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

1. **Clone the Repository**:

    ```bash
    gir clone https://github.com/JUPITER512/CRM-Project-Systems.git
    cd CRM-Project-Systems
    cd backend
    ```

2. **Install Dependencies**:

    ```bash
    npm install
    ```

3. **Set Up Environment Variables**:

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

4. **Get Gmail App Password**:

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

Thank you for using and contributing to this Node.js Express backend!
