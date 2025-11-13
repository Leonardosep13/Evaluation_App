import { Table, Card, Spinner, Alert, Badge, Form, InputGroup, Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import './StudentsTable.css';
import { DeleteAlert } from '../../Alerts/DeleteAlert/DeleteAlert';
import { UpdateStudentForm } from '../StudentsForms/UpdateStudentForm/UpdateStudentForm';
import { ErrorAlert, SuccessAlert } from '../../Alerts/GenericAlert/GenericAlert';
import BasicModal from '../../common/Modal';

export function StudentsTable(props) {
    const { students, loading, error, onDeleteStudent, onUpdateStudent } = props;
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');


    const handleDeleteStundent = async (studentId) => {
        try {
            const confirmDelete = await DeleteAlert({
                title: '¿Estás seguro de eliminar este estudiante?',
                text: 'Esta acción no se puede deshacer.',
                icon: 'warning'
            });
            if (confirmDelete) {
                await onDeleteStudent(studentId);
                SuccessAlert(
                    'Estudiante eliminado',
                    'El estudiante ha sido eliminado exitosamente.',
                    2000
                );
            }
        }
        catch (error) {
            let errorMessage = 'Error al eliminar el estudiante. Por favor, inténtalo de nuevo.';
            if (error.detail) {
                errorMessage = error.detail;
            } else if (error.message) {
                errorMessage = error.message;
            } else if (typeof error === 'string') {
                errorMessage = error;
            }
            ErrorAlert('Error al eliminar', errorMessage);
        }
    }

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setSelectedStudent(null);
    }

    const handleUpdateSuccess = () => {
        handleCloseEditModal();
        onUpdateStudent();
    };

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

    const normalizedSearch = searchTerm.trim().toLowerCase();
    const filteredStudents = normalizedSearch === ''
        ? students
        : students.filter(s => {
            const codeStr = String(s.code || '').toLowerCase();
            const first = String(s.first_name || '').toLowerCase();
            const last = String(s.last_name || '').toLowerCase();

            return codeStr.includes(normalizedSearch)
                || first.includes(normalizedSearch)
                || last.includes(normalizedSearch);
        });

    const getAttentionBadge = (strikes) => {
        if (strikes >= 3) {
            return (
                <Badge bg="warning" text="dark">
                    <i className="bi bi-exclamation-triangle me-1"></i>
                    Atención Especial
                </Badge>
            ) 
        }
        else if (strikes < 3) { (
            <Badge bg="success">
                <i className="bi bi-check-circle me-1"></i>
                Regular
            </Badge>
        );
    }
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
    <div>
        <Card className="shadow-sm border-2">
            <Card.Body className="p-3">
                <div className="mb-3">
                    <InputGroup>
                        <InputGroup.Text>
                            <i className="bi bi-search"></i>
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="Buscar por nombre o apellidos"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            aria-label="Buscar estudiantes"
                        />
                        <Button variant="outline-secondary" onClick={() => setSearchTerm('')} disabled={!searchTerm} title="Limpiar búsqueda">
                            <i className="bi bi-x-lg"></i>
                        </Button>
                    </InputGroup>
                </div>
                <div className="table-responsive">
                    <Table className="students-table mb-0" hover striped>
                        <thead className="table-dark">
                            <tr>
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
                                <th scope="col" className="py-3 text-center">
                                    <i className="bi bi bi-tools me-1"></i>
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map((student, index) => (
                                <tr key={student.id || index} className="student-row">
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
                                        {getAttentionBadge(student.strikes)}
                                    </td>
                                    <td className="py-3 text-center">
                                        {getStrikesBadge(student.strikes)}
                                    </td>
                                    <td className="py-3 text-center">
                                        <button className="btn btn-sm btn-outline-primary me-2"
                                            onClick={() => {
                                                setSelectedStudent(student);
                                                setShowEditModal(true);
                                            }}
                                        >
                                            <i className="bi bi-pencil-fill"></i>
                                        </button>
                                        <button className="btn btn-sm btn-outline-danger"
                                            onClick={() => handleDeleteStundent(student.id)}
                                        >
                                            <i className="bi bi-trash-fill"></i>
                                        </button>
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

        <BasicModal
            show={showEditModal}
            title="Editar Estudiante"
            handleClose={handleCloseEditModal}
            showActionButton={false}
        >
            {selectedStudent && (
                <UpdateStudentForm
                    student={selectedStudent}
                    onSuccess={handleUpdateSuccess}
                    onCancel={handleCloseEditModal}
                />
            )}
        </BasicModal>
    </div>
    );
}
