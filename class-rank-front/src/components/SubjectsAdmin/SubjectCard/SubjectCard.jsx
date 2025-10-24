import React from 'react';
import { Card, Row, Col, Spinner, Alert, Badge } from 'react-bootstrap';
import './SubjectCard.css';

export function SubjectCard(props) {
    const { subjects, loading, error } = props;
    console.log('Subjects in SubjectCard:', subjects);

    if (loading) {
        return (
            <div className="text-center p-4">
                <Spinner animation="border" variant="primary" role="status">
                    <span className="visually-hidden">Cargando materias...</span>
                </Spinner>
                <p className="mt-2 text-muted">Cargando información de materias...</p>
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="danger">
                <Alert.Heading>
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    Error al cargar materias
                </Alert.Heading>
                <p>{error.message || 'Ha ocurrido un error inesperado al cargar la información.'}</p>
            </Alert>
        );
    }

    if (!subjects || subjects.length === 0) {
        return (
            <Alert variant="info" className="text-center">
                <i className="bi bi-info-circle me-2"></i>
                No hay materias registradas en el sistema.
            </Alert>
        );
    }

    const getSemesterBadgeColor = (semester) => {
        const colors = ['primary', 'success', 'info', 'warning', 'danger', 'secondary'];
        return colors[(semester - 1) % colors.length] || 'secondary';
    };

    return (
        <Row className="g-3">
            {subjects.map((subject) => (
                <Col key={subject.id} xs={12} md={6} lg={4}>
                    <Card className="h-100 shadow-sm border-0">
                        <Card.Header className="bg-primary text-white d-flex align-items-center">
                            <i className="bi bi-journal-text me-2"></i>
                            <Badge 
                                bg={getSemesterBadgeColor(subject.semester)} 
                                className="ms-auto"
                            >
                                {subject.semester}° Semestre
                            </Badge>
                        </Card.Header>
                        
                        <Card.Body className="p-3">
                            <div className="d-flex align-items-center mb-3">
                                <div className="bg-light rounded-circle p-2 me-3">
                                    <i className="bi bi-book text-primary fs-4"></i>
                                </div>
                                <div>
                                    <h6 className="mb-0 fw-bold text-dark">
                                        {subject.name_subject}
                                    </h6>
                                    <small className="text-muted">Materia</small>
                                </div>
                            </div>

                            <div className="mb-2">
                                <small className="text-muted">
                                    <i className="bi bi-calendar3 me-1"></i>
                                    Semestre:
                                </small>
                                <div>
                                    <Badge bg={getSemesterBadgeColor(subject.semester)} className="ms-1">
                                        {subject.semester}° Semestre
                                    </Badge>
                                </div>
                            </div>

                        </Card.Body>

                        <Card.Footer className="bg-light border-0 d-flex justify-content-between align-items-center">
                            <small className="text-muted">
                            </small>
                            <div>
                                <button 
                                    className="btn btn-outline-primary btn-sm me-2"
                                    title="Editar materia"
                                    onClick={() => console.log('Editar materia:', subject.id)}
                                >
                                    <i className="bi bi-pencil"></i>
                                </button>
                                <button 
                                    className="btn btn-outline-danger btn-sm"
                                    title="Eliminar materia"
                                    onClick={() => console.log('Eliminar materia:', subject.id)}
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}
