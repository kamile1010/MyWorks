# PropSpace

PropSpace is an easy-to-use application for listing and finding properties.

## Features
- **User Accounts**: Sign up, log in, and manage your profile securely.
- **Properties**: Create, view, update, and delete property listings.
- **Search**: Easily find properties using filters.

## Folders
- `frontend/`: Contains the user interface (React).
- `backend/`: Contains the server and API (Node.js/Express).

## How to Run

1. **Database**: Make sure you have MongoDB running.
2. **Backend**:
   - Open terminal in `backend/`
   - Run `npm install`
   - Add a `.env` file with `PORT`, `MONGO_URI`, and `JWT_SECRET`
   - Run `node index.js`
3. **Frontend**:
   - Open terminal in `frontend/`
   - Run `npm install`
   - Run `npm run dev`
