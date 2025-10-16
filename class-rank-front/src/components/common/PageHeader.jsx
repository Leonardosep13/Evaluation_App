import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

export function PageHeader(props){
  const {icon, title, cardTitle, children, description} = props;
  return (
    <div>
      <Row className="mb-4">
        <Col>
          <h2 className="text-dark">
            <i className={`bi ${icon} me-2`}></i>
            {title}
          </h2>
        </Col>
      </Row>
      
      <Row>
        <Col md={12}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">{cardTitle}</h5>
            </Card.Header>
            <Card.Body>
              {description && <p>{description}</p>}
              {children}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}