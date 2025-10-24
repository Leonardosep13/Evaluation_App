import React, { useState } from 'react';
import { Card, Row, Col, Spinner, Alert, Badge } from 'react-bootstrap';
import BasicModal from '../../common/Modal';
import { UpdateTeacherForm } from '../TeachersForms/UpdateTeacherForm';
import { DeleteAlert } from '../../Alerts/DeleteAlert/DeleteAlert';
import { ErrorAlert, SuccessAlert } from '../../Alerts/GenericAlert/GenericAlert';

export function TeacherCard(props) {
    const { users, loading, error, onDeleteUser, onUpdateUser } = props;
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);

    const handleDeleteUser = async (userId) => {
        try {
            const confirmDelete = await DeleteAlert({
                title: '¿Estás seguro de eliminar este profesor?',
                text: 'Esta acción no se puede deshacer.',
                icon: 'warning'
            });
            
            if (confirmDelete) {
                // Intentar eliminar el usuario
                await onDeleteUser(userId);
                
                // Si llegamos aquí, la eliminación fue exitosa
                SuccessAlert(
                    'Profesor eliminado',
                    'El profesor ha sido eliminado exitosamente.',
                    2000
                );
            }
        } catch (error) {
            console.error('Error al eliminar profesor:', error);
            
            // Analizar el tipo de error para mostrar un mensaje más específico
            let errorMessage = 'Error al eliminar el profesor. Por favor, inténtalo de nuevo.';
            
            if (error.detail) {
                errorMessage = error.detail;
            } else if (error.message) {
                errorMessage = error.message;
            } else if (typeof error === 'string') {
                errorMessage = error;
            }
            
            ErrorAlert('Error al eliminar', errorMessage);
        }
    };

    const handleUpdateUser = (user) => {
        setSelectedTeacher(user);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setSelectedTeacher(null);
    };

    const handleUpdateSuccess = () => {
        handleCloseEditModal();
        onUpdateUser();
    };

    if (loading) {
        return (
            <div className="text-center p-4">
                <Spinner animation="border" variant="primary" role="status">
                    <span className="visually-hidden">Cargando profesores...</span>
                </Spinner>
                <p className="mt-2 text-muted">Cargando información de profesores...</p>
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="danger">
                <Alert.Heading>
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    Error al cargar profesores
                </Alert.Heading>
                <p>{error.message || 'Ha ocurrido un error inesperado al cargar la información.'}</p>
            </Alert>
        );
    }

    if (!users || users.length === 0) {
        return (
            <Alert variant="info" className="text-center">
                <i className="bi bi-info-circle me-2"></i>
                No hay profesores registrados en el sistema.
            </Alert>
        );
    }

    return (
        <>
            <Row className="g-3">
                {users.map((teacher) => (
                    <Col key={teacher.id} xs={12} md={6} lg={4}>
                        <Card className="h-100 shadow-sm border-0">
                            <Card.Header className="bg-primary text-white d-flex align-items-center">
                                <i className="bi bi-person-badge me-2"></i>
                                {teacher.is_staff && (
                                    <Badge bg="warning" text="dark" className="ms-auto">
                                        <i className="bi bi-shield-check me-1"></i>
                                        Admin
                                    </Badge>
                                )}
                            </Card.Header>
                            
                            <Card.Body className="p-3">
                                <div className="d-flex align-items-center mb-3">
                                    <div className="bg-light rounded-circle p-2 me-3">
                                        <i className="bi bi-person-fill text-primary fs-4"></i>
                                    </div>
                                    <div>
                                        <h6 className="mb-0 fw-bold text-dark">
                                            {teacher.first_name} {teacher.last_name}
                                        </h6>
                                        
                                        <small className="text-muted">Profesor</small>
                                    </div>
                                </div>

                                <div className="mb-2">
                                    <small className="text-muted">
                                        <i className="bi bi-envelope me-1"></i>
                                        Email:
                                    </small>
                                    <p className="mb-0 text-break">
                                        <small>{teacher.email_teacher}</small>
                                    </p>
                                </div>

                                <div className="mb-2">
                                    <small className="text-muted">
                                        <i className="bi bi-calendar me-1"></i>
                                        Estado:
                                    </small>
                                    <div>
                                        <Badge 
                                            bg={teacher.is_active ? 'success' : 'danger'}
                                            className="ms-1"
                                        >
                                            {teacher.is_active ? 'Activo' : 'Inactivo'}
                                        </Badge>
                                    </div>
                                </div>

                                {teacher.is_staff && (
                                    <div className="mb-2">
                                        <small className="text-muted">
                                            <i className="bi bi-gear me-1"></i>
                                            Permisos:
                                        </small>
                                        <div>
                                            <Badge bg="info" className="ms-1">
                                                <i className="bi bi-tools me-1"></i>
                                                Coordinacion
                                            </Badge>
                                            {teacher.is_superuser && (
                                                <Badge bg="danger" className="ms-1">
                                                    <i className="bi bi-person-gear me-1"></i>
                                                    Superusuario
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </Card.Body>

                            <Card.Footer className="bg-light border-0 d-flex justify-content-between align-items-center">
                                <small className="text-muted">
                                </small>
                                <div>
                                    <button 
                                        className="btn btn-outline-primary btn-sm me-2"
                                        title="Editar profesor"
                                        onClick={() => handleUpdateUser(teacher)}
                                    >
                                        <i className="bi bi-pencil"></i>
                                    </button>
                                    <button 
                                        className="btn btn-outline-danger btn-sm"
                                        title="Eliminar profesor"
                                        onClick={() => handleDeleteUser(teacher.id)}
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>

            <BasicModal
                title="Editar Profesor"
                show={showEditModal}
                handleClose={handleCloseEditModal}
                showActionButton={false}
            >
                {selectedTeacher && (
                    <UpdateTeacherForm 
                        teacher={selectedTeacher}
                        onSuccess={handleUpdateSuccess}
                        onCancel={handleCloseEditModal}
                    />
                )}
            </BasicModal>
        </>
    );
}
