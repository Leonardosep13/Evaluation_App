import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

export function Secciones() {
  return (
    <div>
      <Row className="mb-4">
        <Col>
          <h2 className="text-dark">
            <i className="bi bi-diagram-3 me-2"></i>
            Gestión de Secciones
          </h2>
        </Col>
      </Row>
      
      <Row>
        <Col md={12}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Lista de Secciones</h5>
            </Card.Header>
            <Card.Body>
              <p>Aquí se mostrará la lista de secciones y las opciones para gestionarlas.</p>
              {/* Aquí irá el contenido de gestión de secciones */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}