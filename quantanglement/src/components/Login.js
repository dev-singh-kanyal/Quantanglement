import React, { useState } from 'react';

function Login() {
    // State for form fields
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform authentication logic (e.g., API call, validation)
        console.log('Submitted:', { username, password });
        // Reset form fields (optional)
        setUsername('');
        setPassword('');
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
