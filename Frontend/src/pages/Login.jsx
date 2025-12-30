import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const result = await login(email, password);

        if (result.success) {
            navigate('/');
        } else {
            setError(result.message || 'Check your details and try again');
        }
    };

    return (
        <div className="auth-box">
            <h2 style={{ textAlign: 'center', marginTop: 0 }}>Welcome Back</h2>

            {error && <p style={{ color: '#e74c3c', textAlign: 'center' }}>{error}</p>}

            <form onSubmit={onSubmit}>
                <div className="input-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn" style={{ width: '100%' }}>
                    Log In
                </button>
            </form>

            <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px' }}>
                Need an account? <Link to="/register">Sign Up</Link>
            </p>
        </div>
    );
};

export default Login;
