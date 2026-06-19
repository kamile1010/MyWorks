# PropSpace - Property Listing Application

PropSpace is a full-stack real-time web application where users can list, view, update, and delete properties for rent or sale.

## Features
- **User Authentication**: Secure register/login with JWT and Bcrypt hashing.
- **Property Management**: Complete CRUD operations for property listings.
- **Account Dashboard**: Manage personal profile, update contact info, and change passwords safely.
- **Public Feed**: Search and filter properties by city, price range, and property type.
- **Ownership Validation**: Secure backend guards ensure only authors can modify their listings.
- **Premium UI**: Modern dark-mode interface with glassmorphism and responsive design.

## Tech Stack
- **Frontend**: React (Vite), Axios, Lucide React, CSS3.
- **Backend**: Node.js, Express.
- **Database**: MongoDB (Mongoose).
- **Security**: JWT, BcryptJS, CORS.

## Project Structure
- `client/`: React frontend source code.
- `server/`: Express backend source code.

## Getting Started

### Prerequisites
- Node.js installed.
- MongoDB instance running locally or via Atlas.

### Installation
1. **Clone the repository** (or download the files).
2. **Setup Backend**:
   - `cd server`
   - `npm install`
   - Create a `.env` file with `PORT`, `MONGO_URI`, and `JWT_SECRET`.
   - `node index.js`
3. **Setup Frontend**:
   - `cd client`
   - `npm install`
   - `npm run dev`

## API Endpoints

### Authentication
- `POST /api/users/register`: Register a new user.
- `POST /api/users/login`: Login and receive JWT.
- `GET /api/users/profile`: Get authenticated user profile.
- `PUT /api/users/profile`: Update profile info.

### Properties
- `GET /api/properties`: Get all properties (supports query filters: city, type, minPrice, maxPrice).
- `GET /api/properties/detail/:id`: Get single property details.
- `GET /api/properties/mine`: Get listings authored by the current user.
- `POST /api/properties`: Create a new listing.
- `PUT /api/properties/:id`: Update an existing listing.
- `DELETE /api/properties/:id`: Remove a listing.
