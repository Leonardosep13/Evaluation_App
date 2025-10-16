import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

export function Materias() {
  return (
    <div>
      <Row className="mb-4">
        <Col>
          <h2 className="text-dark">
            <i className="bi bi-journal-text me-2"></i>
            Gestión de Materias
          </h2>
        </Col>
      </Row>
      
      <Row>
        <Col md={12}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Lista de Materias</h5>
            </Card.Header>
            <Card.Body>
              <p>Aquí se mostrará la lista de materias y las opciones para gestionarlas.</p>
              {/* Aquí irá el contenido de gestión de materias */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}