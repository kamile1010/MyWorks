import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/api';
import { LogIn, Mail, Lock } from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const { data } = await api.post('/users/login', formData);
            login(data);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div className="glass" style={{ padding: '2.5rem', width: '100%', maxWidth: '400px' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <LogIn size={40} className="text-primary" style={{ marginBottom: '1rem' }} />
                    <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>Welcome Back</h2>
                    <p style={{ color: '#94a3b8' }}>Log in to manage your listings</p>
                </div>

                {error && <div style={{ background: '#ef444422', color: '#ef4444', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', border: '1px solid #ef444444' }}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail style={{ position: 'absolute', left: '0.75rem', top: '0.75rem', color: '#94a3b8' }} size={20} />
                            <input 
                                type="email" 
                                className="input-field" 
                                style={{ paddingLeft: '2.5rem' }}
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock style={{ position: 'absolute', left: '0.75rem', top: '0.75rem', color: '#94a3b8' }} size={20} />
                            <input 
                                type="password" 
                                className="input-field" 
                                style={{ paddingLeft: '2.5rem' }}
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '1rem' }}>
                        {loading ? 'Logging in...' : 'Log In'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#94a3b8', fontSize: '0.875rem' }}>
                    Don't have an account? <Link to="/register" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: '600' }}>Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
