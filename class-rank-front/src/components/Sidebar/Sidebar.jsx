import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './Sidebar.css';

export function Sidebar() {
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
  ];

  return (
    <div className="sidebar bg-dark">
      <div className="sidebar-header p-3">
        <h5 className="text-light mb-0">Coordinación</h5>
      </div>
      <Nav className="flex-column sidebar-nav">
        {navigationItems.map((item, index) => (
          <LinkContainer key={index} to={item.path}>
            <Nav.Link className="sidebar-link text-light d-flex align-items-center py-3 px-3">
              <i className={`${item.icon} me-3`}></i>
              <span>{item.title}</span>
            </Nav.Link>
          </LinkContainer>
        ))}
      </Nav>
    </div>
  );
}