import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const signout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="container">
            <div className="auth-box" style={{ maxWidth: '600px', marginTop: '60px' }}>
                <h1 style={{ marginTop: 0 }}>Hello, {user?.name || 'User'}!</h1>
                <p style={{ color: '#666', marginBottom: '30px' }}>
                    You are logged in as: <strong>{user?.email}</strong>
                    <span className="status-badge status-completed" style={{ verticalAlign: 'middle' }}>
                        {user?.role}
                    </span>
                </p>

                <div style={{ display: 'flex', gap: '15px' }}>
                    <Link to="/tasks" className="btn">
                        Go to My Tasks
                    </Link>
                    <button onClick={signout} className="btn btn-secondary">
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
