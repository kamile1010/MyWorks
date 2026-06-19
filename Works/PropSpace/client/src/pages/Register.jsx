import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/api';
import { UserPlus, Mail, Lock, User } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            return setError('Passwords do not match');
        }
        setLoading(true);
        setError('');
        try {
            const { data } = await api.post('/users/register', formData);
            login(data);
            navigate('/');
        } catch (err) {
            console.error('Registration Error:', err);
            setError(err.response?.data?.message || 'Registration failed. Check console for details.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div className="glass" style={{ padding: '2.5rem', width: '100%', maxWidth: '400px' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <UserPlus size={40} className="text-primary" style={{ marginBottom: '1rem' }} />
                    <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>Create Account</h2>
                    <p style={{ color: '#94a3b8' }}>Join our property marketplace</p>
                </div>

                {error && <div style={{ background: '#ef444422', color: '#ef4444', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', border: '1px solid #ef444444' }}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Username</label>
                        <div style={{ position: 'relative' }}>
                            <User style={{ position: 'absolute', left: '0.75rem', top: '0.75rem', color: '#94a3b8' }} size={20} />
                            <input 
                                type="text" 
                                className="input-field" 
                                style={{ paddingLeft: '2.5rem' }}
                                required
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            />
                        </div>
                    </div>
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
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Confirm Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock style={{ position: 'absolute', left: '0.75rem', top: '0.75rem', color: '#94a3b8' }} size={20} />
                            <input 
                                type="password" 
                                className="input-field" 
                                style={{ paddingLeft: '2.5rem' }}
                                required
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '1rem' }}>
                        {loading ? 'Creating account...' : 'Sign Up'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#94a3b8', fontSize: '0.875rem' }}>
                    Already have an account? <Link to="/login" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: '600' }}>Log In</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
