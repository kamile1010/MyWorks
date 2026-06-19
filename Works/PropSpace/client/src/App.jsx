import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MyListings from './pages/MyListings';
import CreateListing from './pages/CreateListing';
import Profile from './pages/Profile';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = React.useContext(AuthContext);
  if (loading) return <div className="container" style={{ paddingTop: '5rem' }}>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen">
          <Navbar />
          <main className="container" style={{ paddingBottom: '2rem' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Routes */}
              <Route path="/my-listings" element={
                <ProtectedRoute>
                  <MyListings />
                </ProtectedRoute>
              } />
              <Route path="/create-listing" element={
                <ProtectedRoute>
                  <CreateListing />
                </ProtectedRoute>
              } />
              <Route path="/edit-listing/:id" element={
                <ProtectedRoute>
                  <CreateListing isEdit={true} />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
