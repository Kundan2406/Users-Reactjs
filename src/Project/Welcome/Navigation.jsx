
import React, { useState } from "react";
import { Link, Outlet, Navigate } from 'react-router-dom';

function Navigation() {

    const [redirect, setredirect] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('LoggedInfo');
        setredirect(true);
    }

    return (
        <div>
            <div>
                {
                    redirect && (
                        <Navigate to="/welcome" />
                    )
                }
            </div>

            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">Dashboard</Link>
                    <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavId">
                        <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/chats">Group Chats</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/users">Manage Users</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/document">Documents</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/logout" onClick={handleLogout}>Logout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container">
                <Outlet />
            </div>
        </div>);
}

export default Navigation;