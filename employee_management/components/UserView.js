import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import userService from '../services/userService';
import './components.css';

const UserView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const data = await userService.getUserById(id);
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) return <div className="loading-spinner"><div className="spinner"></div></div>;
  if (error) return <div className="error-message">{error}<button className="btn btn-secondary mt-3" onClick={() => navigate('/')}>Back</button></div>;
  if (!user) return null;

  return (
    <div>
      <div className="page-header"><h1>Employee Profile</h1></div>
      <div className="card">
        <div className="card-header">{user.name} ({user.username})</div>
        <div className="card-body">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Website:</strong> {user.website}</p>
          
          <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #dee2e6' }} />
          <h3 style={{ color: '#333', marginBottom: '15px' }}>Address</h3>
          <p>{user.address?.street}, {user.address?.suite}, {user.address?.city}</p>

          <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #dee2e6' }} />
          <h3 style={{ color: '#333', marginBottom: '15px' }}>Company</h3>
          <p><strong>Name:</strong> {user.company?.name}</p>
          <p><strong>Catchphrase:</strong> {user.company?.catchPhrase}</p>

          <div className="action-buttons" style={{ marginTop: '30px' }}>
            <button className="btn btn-warning" onClick={() => navigate(`/edit/${user.id}`)}>Edit</button>
            <button className="btn btn-secondary" onClick={() => navigate('/')}>Back to List</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserView;