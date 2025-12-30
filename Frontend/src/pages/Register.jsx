import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        role: ''
    });
    const [error, setError] = useState('');

    const { register } = useAuth();
    const navigate = useNavigate();

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const result = await register(values.email, values.password, values.role);

        if (result.success) {
            navigate('/login');
        } else {
            setError(result.message || 'Registration failed');
        }
    };

    return (
        <div className="auth-box">
            <h2 style={{ textAlign: 'center', marginTop: 0 }}>Create Account</h2>

            {error && <p style={{ color: '#e74c3c', textAlign: 'center' }}>{error}</p>}

            <form onSubmit={onSubmit}>
                <div className="input-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={onChange}
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={onChange}
                        required
                    />
                </div>

                <div className="input-group">
                    <label>I am a...</label>
                    <select
                        name="role"
                        value={values.role}
                        onChange={onChange}
                        required
                    >
                        <option value="" disabled>Select Role</option>
                        <option value="USER">User (I want to manage tasks)</option>
                        <option value="ADMIN">Admin (I manage everyone)</option>
                    </select>
                </div>

                <button type="submit" className="btn" style={{ width: '100%' }}>
                    Sign Up
                </button>
            </form>

            <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px' }}>
                Already have an account? <Link to="/login">Log In</Link>
            </p>
        </div>
    );
};

export default Register;
