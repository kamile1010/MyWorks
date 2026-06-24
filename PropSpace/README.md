# PropSpace

PropSpace is an easy-to-use application for listing and finding properties.

## Features
- **User Authentication**: Securely register, log in, and manage your account.
- **Property Management**: Create, update, view, and delete property listings.
- **Advanced Search**: Filter and search properties by city, price range, and property type.
- **Modern Interface**: A sleek, fully cohesive user interface (React).
- **Secure**: Ownership validation ensures you can only edit or delete your own properties.

## Tech Stack
- **Frontend**: React (Vite), Axios, Lucide React, clean CSS3 styling.
- **Backend**: Node.js, Express.
- **Database**: MongoDB (Mongoose).
- **Security**: JWT tokens, Bcrypt password hashing.

## Project Structure
- `frontend/`: Contains the React user interface and front-end logic.
- `backend/`: Contains the Express server, models, and API endpoints.

## Getting Started

### Prerequisites
- **Node.js** installed on your computer.
- **MongoDB** running locally or a cloud URI (like MongoDB Atlas).

### Installation & Setup

1. **Clone the repository** to your local machine.

2. **Setup the Backend**:
   - Navigate to the backend folder: `cd backend`
   - Install dependencies: `npm install`
   - Create a `.env` file in the `backend` folder and add the following variables:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     ```
   - Start the backend server: `npm start` (or `npm run dev` for nodemon).

3. **Setup the Frontend**:
   - Open a new terminal and navigate to the frontend folder: `cd frontend`
   - Install dependencies: `npm install`
   - Run the development server: `npm run dev`

4. **Run Both at Once (Optional)**:
   - You can also start both from the root folder if you have `concurrently` installed:
   - Run `npm install` in the root folder, then run `npm start`.

## API Overview

Here is a quick glance at the available API routes (running on the backend):

**Authentication (`/api/users`)**
- `POST /register`: Create a new user account.
- `POST /login`: Log into an existing account.
- `GET /profile`: Fetch the logged-in user's profile info.

**Properties (`/api/properties`)**
- `GET /`: Retrieve all property listings (supports search filters).
- `GET /mine`: View your authored properties.
- `POST /`: Create a new property listing.
- `PUT /:id`: Update an existing property.
- `DELETE /:id`: Delete a property.

## API Error Testing Guide

This section demonstrates how to trigger and test specific API behaviors and HTTP error boundaries using tools like Postman over local API endpoints (`http://localhost:5000/api`).

### 1. 201 Created (Success)
- **Method**: `POST`
- **URL**: `/api/users/register`
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "username": "Tester",
    "email": "test@example.com",
    "password": "password123"
  }
  ```
- **Expected Response**: `201 Created` with secure JWT token wrapper.

### 2. 200 OK (Success)
- **Method**: `GET`
- **URL**: `/api/properties`
- **Expected Response**: `200 OK` listing array.

### 3. 400 Bad Request
Trigger validation checks on required fields.
- **Method**: `POST`
- **URL**: `/api/properties`
- **Headers**: `Content-Type: application/json`, `Authorization: Bearer <valid_token>`
- **Body**:
  ```json
  {
    "description": "Missing title and price"
  }
  ```
- **Expected Response**: `400 Bad Request`
  ```json
  {
    "message": "Missing required fields"
  }
  ```

### 4. 401 Unauthorized
Simulate expired or missing tokens.
- **Method**: `GET`
- **URL**: `/api/users/profile`
- **Headers**: `<no Authorization header provided>`
- **Expected Response**: `401 Unauthorized`
  ```json
  {
    "message": "Not authorized, no token"
  }
  ```

### 5. 403 Forbidden
Attempt to delete an item owned by another author.
- **Method**: `DELETE`
- **URL**: `/api/properties/<id_owned_by_account_a>`
- **Headers**: `Authorization: Bearer <token_belonging_to_account_b>`
- **Expected Response**: `403 Forbidden`
  ```json
  {
    "message": "Unauthorized to delete this listing"
  }
  ```

### 6. 404 Not Found
Test database absence catch.
- **Method**: `GET`
- **URL**: `/api/properties/detail/64f000000000000000000000` (fake valid hex ID)
- **Expected Response**: `404 Not Found`
  ```json
  {
    "message": "Property not found"
  }
  ```
