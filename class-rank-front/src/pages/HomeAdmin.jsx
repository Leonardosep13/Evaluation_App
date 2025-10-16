import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'

export function HomeAdmin() {
  return (
    <div>
      <Row className="mb-4">
        <Col>
          <h2 className="text-dark">
            <i className="bi bi-house-door me-2"></i>
            Panel de Administración
          </h2>
          <p className="text-muted">Bienvenido al sistema de gestión académica ClassRank</p>
        </Col>
      </Row>
      
      <Row>
        <Col md={6} lg={3} className="mb-4">
          <Card className="text-center h-100">
            <Card.Body>
              <i className="bi bi-person-badge display-4 text-primary mb-3"></i>
              <Card.Title>Profesores</Card.Title>
              <Card.Text>Gestiona la información de los profesores</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} lg={3} className="mb-4">
          <Card className="text-center h-100">
            <Card.Body>
              <i className="bi bi-journal-text display-4 text-success mb-3"></i>
              <Card.Title>Materias</Card.Title>
              <Card.Text>Administra las materias del currículo</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} lg={3} className="mb-4">
          <Card className="text-center h-100">
            <Card.Body>
              <i className="bi bi-diagram-3 display-4 text-warning mb-3"></i>
              <Card.Title>Secciones</Card.Title>
              <Card.Text>Organiza las secciones académicas</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} lg={3} className="mb-4">
          <Card className="text-center h-100">
            <Card.Body>
              <i className="bi bi-people display-4 text-info mb-3"></i>
              <Card.Title>Estudiantes</Card.Title>
              <Card.Text>Administra los estudiantes registrados</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
