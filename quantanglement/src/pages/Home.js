import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <>
            <h1>Welcome to Quantanglement</h1>
            <nav>
                <ul>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/chat">Chat</Link></li>
                </ul>
            </nav>
        </>
    );
}
