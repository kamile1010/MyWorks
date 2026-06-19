import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { Search, MapPin, DollarSign, Home as HomeIcon } from 'lucide-react';

const PropertyCard = ({ property }) => (
    <div className="card glass">
        <img 
            src={property.imageUrls[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'} 
            alt={property.title} 
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
        />
        <div style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{property.title}</h3>
                <span style={{ background: '#6366f122', color: '#6366f1', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.875rem' }}>
                    {property.propertyType}
                </span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <MapPin size={16} /> {property.location.city}, {property.location.country}
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#6366f1' }}>${property.price.toLocaleString()}</span>
                <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}>by {property.author?.username}</span>
            </div>
        </div>
    </div>
);

const Home = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ city: '', minPrice: '', maxPrice: '', type: '' });

    const fetchProperties = async () => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const { data } = await api.get(`/properties?${queryParams}`);
            setProperties(data);
        } catch (error) {
            console.error('Error fetching properties:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, [filters]);

    return (
        <div style={{ paddingTop: '2rem' }}>
            <div className="glass" style={{ padding: '2rem', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Find Your Dream Home</h1>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div style={{ position: 'relative' }}>
                        <Search style={{ position: 'absolute', left: '0.75rem', top: '0.75rem', color: '#94a3b8' }} size={20} />
                        <input 
                            type="text" 
                            placeholder="City" 
                            className="input-field" 
                            style={{ paddingLeft: '2.5rem' }}
                            value={filters.city}
                            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                        />
                    </div>
                    <input 
                        type="number" 
                        placeholder="Min Price" 
                        className="input-field" 
                        value={filters.minPrice}
                        onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                    />
                    <input 
                        type="number" 
                        placeholder="Max Price" 
                        className="input-field" 
                        value={filters.maxPrice}
                        onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                    />
                    <select 
                        className="input-field"
                        value={filters.type}
                        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                    >
                        <option value="">All Types</option>
                        <option value="Apartment">Apartment</option>
                        <option value="House">House</option>
                        <option value="Studio">Studio</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <p>Loading properties...</p>
            ) : properties.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem' }}>
                    <HomeIcon size={48} style={{ color: '#94a3b8', marginBottom: '1rem' }} />
                    <h3>No properties found</h3>
                    <p style={{ color: '#94a3b8' }}>Try adjusting your filters.</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {properties.map(property => (
                        <PropertyCard key={property._id} property={property} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
