import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { LoginAdmin } from '../../pages'
import { useAuth } from '../../hooks/useAuth'
import { Sidebar } from '../../components'

export function AdminLayout(props) {
    const { children } = props
    const { user } = useAuth();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    if (!user) return <LoginAdmin/>;

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    return (
        <div className="admin-layout">
            {/* Mobile sidebar toggle button */}
            <button 
                className="sidebar-toggle d-md-none"
                onClick={toggleSidebar}
                aria-label="Toggle sidebar"
            >
                <i className="bi bi-list"></i>
            </button>

            {/* Sidebar */}
            <div className={`sidebar-wrapper ${sidebarCollapsed ? 'collapsed' : ''}`}>
                <Sidebar />
            </div>

            {/* Main content area */}
            <div className="main-content">
                <Container fluid>
                    {children}
                </Container>
            </div>
        </div>
    )
}
