import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Home, User, PlusCircle, LogOut, Layout } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="glass" style={{ margin: '1rem', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: '1rem', zIndex: 100 }}>
            <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Home className="text-primary" />
                Prop<span style={{ color: '#6366f1' }}>Space</span>
            </Link>
            
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Feed</Link>
                {user ? (
                    <>
                        <Link to="/my-listings" style={{ color: 'white', textDecoration: 'none' }}>My Listings</Link>
                        <Link to="/create-listing" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <PlusCircle size={18} /> Add Property
                        </Link>
                        <Link to="/profile" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <User size={18} /> {user.username}
                        </Link>
                        <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <LogOut size={18} /> Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
                        <Link to="/register" className="btn-primary" style={{ textDecoration: 'none' }}>Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
