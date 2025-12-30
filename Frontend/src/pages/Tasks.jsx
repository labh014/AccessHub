import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        const result = await api.get('/tasks');
        if (result.success) {
            setTasks(result.data);
        }
        setIsLoading(false);
    };

    const addTask = async (e) => {
        e.preventDefault();

        const result = await api.post('/tasks', { title, description: desc });

        if (result.success) {
            setTitle('');
            setDesc('');
            loadTasks();
        } else {
            alert('Could not add task: ' + result.message);
        }
    };

    const removeTask = async (id) => {
        if (!window.confirm('Delete this task?')) return;

        const result = await api.delete(`/tasks/${id}`);
        if (result.success) {
            loadTasks();
        }
    };

    const toggleStatus = async (task) => {
        const newStatus = task.status === 'PENDING' ? 'COMPLETED' : 'PENDING';

        const result = await api.patch(`/tasks/${task.id}`, { status: newStatus });
        if (result.success) {
            loadTasks();
        }
    };

    const signout = () => {
        logout();
        navigate('/login');
    };

    if (isLoading) return <div className="container" style={{ textAlign: 'center' }}>Loading...</div>;

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 style={{ margin: 0 }}>My Tasks</h1>
                <div>
                    <Link to="/" className="btn btn-secondary" style={{ marginRight: '10px' }}>
                        Dashboard
                    </Link>
                    <button onClick={signout} className="btn btn-danger">
                        Sign Out
                    </button>
                </div>
            </div>

            <div className="auth-box" style={{ maxWidth: '100%', margin: '0 0 30px 0', padding: '20px' }}>
                <h3 style={{ marginTop: 0 }}>New Task</h3>
                <form onSubmit={addTask} style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1 }}>
                        <input
                            type="text"
                            placeholder="What needs to be done?"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <input
                            type="text"
                            placeholder="Details (optional)"
                            value={desc}
                            onChange={e => setDesc(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn">Add</button>
                </form>
            </div>

            <div>
                {tasks.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#999' }}>No tasks yet. Add one above!</p>
                ) : (
                    tasks.map(task => (
                        <div key={task.id} className="task-card">
                            <div className="task-info">
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <h4>{task.title}</h4>
                                    <span className={`status-badge ${task.status === 'COMPLETED' ? 'status-completed' : 'status-pending'}`}>
                                        {task.status}
                                    </span>
                                </div>
                                <p>{task.description}</p>
                                {task.user && <small style={{ color: '#999' }}>By: {task.user.email}</small>}
                            </div>

                            {(user.role === 'ADMIN' || task.userId === user.id) && (
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button
                                        className="btn btn-secondary btn-small"
                                        onClick={() => toggleStatus(task)}
                                    >
                                        {task.status === 'PENDING' ? 'Done' : 'Undo'}
                                    </button>
                                    <button
                                        className="btn btn-danger btn-small"
                                        onClick={() => removeTask(task.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Tasks;
