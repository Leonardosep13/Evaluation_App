import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../../hooks/useAuth';
import './Sidebar.css';

export function Sidebar() {
  const {logout, auth} = useAuth();
  const navigationItems = [
    {
      title: 'Profesores',
      path: '/admin/teachers',
      icon: 'bi bi-person-badge'
    },
    {
      title: 'Materias',
      path: '/admin/subjects',
      icon: 'bi bi-journal-text'
    },
    {
      title: 'Estudiantes',
      path: '/admin/students',
      icon: 'bi bi-people'
    },
    {
      title: 'Secciones',
      path: '/admin/sections',
      icon: 'bi bi-diagram-3'
    },
    {
      title: 'Asignaciones de materias',
      path: '/admin/subject-assignments',
      icon: 'bi bi-bookmark-check'
    },
  ];

  return (
    <div className="sidebar bg-dark d-flex flex-column">
      <div className="sidebar-header p-3">
        <h5 className="text-light mb-0">{auth.me.first_name}</h5>
      </div>
      <Nav className="flex-column sidebar-nav flex-grow-1">
        {navigationItems.map((item, index) => (
          <LinkContainer key={index} to={item.path}>
            <Nav.Link className="sidebar-link text-light d-flex align-items-center py-3 px-3">
              <i className={`${item.icon} me-3`}></i>
              <span>{item.title}</span>
            </Nav.Link>
          </LinkContainer>
        ))}
      </Nav>
      
      <div className="sidebar-footer mt-auto p-3">
        <button 
          className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center"
          onClick={() => logout()}
        >
          <i className="bi bi-box-arrow-right me-2"></i>
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
}