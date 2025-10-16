import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

export function Estudiantes() {
  return (
    <div>
      <Row className="mb-4">
        <Col>
          <h2 className="text-dark">
            <i className="bi bi-people me-2"></i>
            Gestión de Estudiantes
          </h2>
        </Col>
      </Row>
      
      <Row>
        <Col md={12}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Lista de Estudiantes</h5>
            </Card.Header>
            <Card.Body>
              <p>Aquí se mostrará la lista de estudiantes y las opciones para gestionarlos.</p>
              {/* Aquí irá el contenido de gestión de estudiantes */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}