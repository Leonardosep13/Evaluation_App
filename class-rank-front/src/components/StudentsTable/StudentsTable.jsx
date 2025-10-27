import React from 'react';
import { Table, Card, Spinner, Alert, Badge } from 'react-bootstrap';
import './StudentsTable.css';

export function StudentsTable(props) {
    const { students, loading, error } = props;

    if (loading) {
        return (
            <div className="text-center p-4">
                <Spinner animation="border" variant="primary" role="status">
                    <span className="visually-hidden">Cargando estudiantes...</span>
                </Spinner>
                <p className="mt-2 text-muted">Cargando información de estudiantes...</p>
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="danger">
                <Alert.Heading>
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    Error al cargar estudiantes
                </Alert.Heading>
                <p>{error.message || 'Ha ocurrido un error inesperado al cargar la información.'}</p>
            </Alert>
        );
    }

    if (!students || !Array.isArray(students) || students.length === 0) {
        return (
            <Alert variant="info" className="text-center">
                <i className="bi bi-info-circle me-2"></i>
                No hay estudiantes registrados en el sistema.
            </Alert>
        );
    }

    const getAttentionBadge = (specialAttention) => {
        return specialAttention ? (
            <Badge bg="warning" text="dark">
                <i className="bi bi-exclamation-triangle me-1"></i>
                Atención Especial
            </Badge>
        ) : (
            <Badge bg="success">
                <i className="bi bi-check-circle me-1"></i>
                Regular
            </Badge>
        );
    };

    const getStrikesBadge = (strikes) => {
        if (strikes === 0) {
            return <Badge bg="success">{strikes}</Badge>;
        } else if (strikes <= 2) {
            return <Badge bg="warning" text="dark">{strikes}</Badge>;
        } else {
            return <Badge bg="danger">{strikes}</Badge>;
        }
    };

    return (
        <Card className="shadow-sm border-0">
            <Card.Header className="bg-primary text-white d-flex align-items-center">
                <i className="bi bi-people me-2"></i>
                <span className="fw-bold">Lista de Estudiantes</span>
                <Badge bg="light" text="dark" className="ms-auto">
                    Total: {students.length}
                </Badge>
            </Card.Header>
            
            <Card.Body className="p-0">
                <div className="table-responsive">
                    <Table className="students-table mb-0" hover striped>
                        <thead className="table-dark">
                            <tr>
                                <th scope="col" className="py-3">
                                    <i className="bi bi-hash me-1"></i>
                                    Código
                                </th>
                                <th scope="col" className="py-3">
                                    <i className="bi bi-person me-1"></i>
                                    Nombre
                                </th>
                                <th scope="col" className="py-3">
                                    <i className="bi bi-person-badge me-1"></i>
                                    Apellidos
                                </th>
                                <th scope="col" className="py-3 text-center">
                                    <i className="bi bi-exclamation-diamond me-1"></i>
                                    Atención
                                </th>
                                <th scope="col" className="py-3 text-center">
                                    <i className="bi bi-x-octagon me-1"></i>
                                    Materias Reprobadas
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <tr key={student.id || index} className="student-row">
                                    <td className="py-3">
                                        <span className="fw-bold text-primary">
                                            {student.code}
                                        </span>
                                    </td>
                                    <td className="py-3">
                                        <div className="d-flex align-items-center">
                                            <div className="student-avatar bg-light rounded-circle me-2 d-flex align-items-center justify-content-center">
                                                <i className="bi bi-person-fill text-primary"></i>
                                            </div>
                                            <span className="fw-semibold">
                                                {student.first_name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-3">
                                        <span className="text-dark">
                                            {student.last_name}
                                        </span>
                                    </td>
                                    <td className="py-3 text-center">
                                        {getAttentionBadge(student.special_attention)}
                                    </td>
                                    <td className="py-3 text-center">
                                        {getStrikesBadge(student.strikes)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Card.Body>
            
            <Card.Footer className="bg-light text-muted text-center py-2">
                <small>
                    <i className="bi bi-info-circle me-1"></i>
                    Mostrando {students.length} estudiante{students.length !== 1 ? 's' : ''}
                </small>
            </Card.Footer>
        </Card>
    );
}
