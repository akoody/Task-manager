import React from 'react';
import { Link } from 'react-router-dom';

const Help: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Help & How It Works</h1>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2 text-gray-700">Welcome to Task Manager</h2>
                    <p className="text-gray-600">
                        This is a simple task management application built with a Node.js backend and a React frontend. Here's how to use it:
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2 text-gray-700">Getting Started</h2>
                    <ul className="list-disc pl-5 text-gray-600 space-y-2">
                        <li>
                            <strong>Register:</strong> Go to the <Link to="/register" className="text-blue-500 hover:underline">Register</Link> page, enter your name, email, and a password (at least 6 characters). Click "Register" to create an account.
                        </li>
                        <li>
                            <strong>Login:</strong> Visit the <Link to="/login" className="text-blue-500 hover:underline">Login</Link> page, enter your email and password, and click "Login" to access your tasks.
                        </li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2 text-gray-700">Managing Tasks</h2>
                    <ul className="list-disc pl-5 text-gray-600 space-y-2">
                        <li>
                            <strong>Create a Task:</strong> On the Tasks page, click "Create Task", fill in the title and optional description, then click "Save".
                        </li>
                        <li>
                            <strong>View Tasks:</strong> Your tasks (or all tasks if you're an admin) are listed on the Tasks page.
                        </li>
                        <li>
                            <strong>Edit a Task:</strong> Click "Edit" on a task, update the title, description, or status (Pending/Completed), and click "Save".
                        </li>
                        <li>
                            <strong>Delete a Task:</strong> Click "Delete" on a task to remove it.
                        </li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2 text-gray-700">Roles</h2>
                    <p className="text-gray-600">
                        - <strong>User:</strong> Can create, edit, and delete their own tasks.<br />
                        - <strong>Admin:</strong> Can see and manage all tasks in the system.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2 text-gray-700">Troubleshooting</h2>
                    <ul className="list-disc pl-5 text-gray-600 space-y-2">
                        <li>If you see "Account does not exist" or "Invalid password" on login, check your email and password.</li>
                        <li>If the "Register" button is grayed out, ensure your password is at least 6 characters long.</li>
                    </ul>
                </section>

                <div className="text-center">
                    <Link to="/login" className="inline-block px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Help;