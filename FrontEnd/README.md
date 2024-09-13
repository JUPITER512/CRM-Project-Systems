# React + Vite

# CRM Suite Frontend

This is the frontend repository for the CRM Suite, a comprehensive customer relationship management system.

## Table of Contents

- Installation
- Usage
- Routes
- Authentication

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

## Implementation
- **React Query (to elimnate the useage of unneccssary useffect/states also it helps to cache the data)**
- **React Table**
- **Recoil js(state mangement)**
- **Axios Custom Hook(with interceptors)**
- **AuthProvider (context) for user authenctication**
- **Proctecd Routes custom hook**
- **Routetodashboard custom hook**

## Installation

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

## Usage

1. Start the development server:
    ```sh
    npm run dev
    ```
2. Open your browser and navigate to `http://localhost:5173`.

## Routes

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

## Authentication

The application uses context for authentication. The main authentication context provider is `AuthContextProvider` .

## Private Routes

This application have implementation of custom hook for rerouting the user to sign-in page if he/she tries to navgiate to the private route without logging in

## Route to Dashboard 

This application have implementation of custom hook for rerouting the user to dashboard page if he/she tries to navgiate to the authentication route if he/she already logged in

### Proxy Configuration

The proxy is set to forward API requests to the backend:
```js
proxy: {
  '/api': 'http://localhost:3000' // Proxy '/api' to backend
},
