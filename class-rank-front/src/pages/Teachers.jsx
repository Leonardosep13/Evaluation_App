import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

export function Profesores() {
  return (
    <div>
      <Row className="mb-4">
        <Col>
          <h2 className="text-dark">
            <i className="bi bi-person-badge me-2"></i>
            Gestión de Profesores
          </h2>
        </Col>
      </Row>
      
      <Row>
        <Col md={12}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Lista de Profesores</h5>
            </Card.Header>
            <Card.Body>
              <p>Aquí se mostrará la lista de profesores y las opciones para gestionarlos.</p>
              {/* Aquí irá el contenido de gestión de profesores */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}