import React, { useEffect, useState } from 'react';
import { PageHeader, BasicModal } from '../components/common';
import { useStudents } from '../hooks/useStudents';
import { StudentsTable } from '../components/StudentsAdmin/StudentsTable/StudentsTable'
import { CreateStudentForm } from '../components/StudentsAdmin/StudentsForms/CreateStudentForm/CreateStudentForm';
import { Button, Row, Col } from 'react-bootstrap';
import { ErrorAlert, SuccessAlert } from '../components/Alerts/GenericAlert';

export function Students() {
  const { students, loading, error, getStudents, deleteStudents, createStudents } = useStudents();
  const [showModal, setModal] = useState(false);

  const handleShowModal = () => setModal(true);
  const handleCloseModal = () => setModal(false);

  const handleCreateStudent = async (formData) => {
    try {
      await createStudents(formData);
      await getStudents();
      SuccessAlert(
        'Estudiante creado',
        'El estudiante ha sido creado exitosamente.'
      );
      setTimeout(() => {
        handleCloseModal();
      }, 2000);
    } catch (error) {
      ErrorAlert(
        'Error',
        'Error al crear al estudiante. Por favor, inténtalo de nuevo.'
      );


      throw error;
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      await deleteStudents(studentId);
      await getStudents();
    } catch (error) {
      throw error;
    }
  };

  const handleUpdateStudent = async () => {
    try {
      await getStudents();
      SuccessAlert(
        'Estudiante actualizado',
        'El estudiante ha sido actualizado exitosamente.'
      );
    } catch (error) {
      ErrorAlert(
        'Error',
        'Error al actualizar el estudiante. Por favor, inténtalo de nuevo.'
      );
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
  <div>
    <PageHeader
      icon="bi-people"
      title="Gestión de Estudiantes"
      cardTitle="Lista de Estudiantes"
    >
    <Row className="mb-3">
      <Col className="d-flex justify-content-end">
        <Button
          variant="primary"
          onClick={handleShowModal}
          className="shadow-sm"
        >
          <i className="bi bi-journal-plus me-2"></i>
            Registrar Nuevo Estudiante
        </Button>
      </Col>
    </Row>
      <StudentsTable
        students={students}
        loading={loading}
        error={error}
        onDeleteStudent={handleDeleteStudent}
        onUpdateStudent={handleUpdateStudent}
      />
    </PageHeader>

        <BasicModal
            title="Registrar Nuevo Estudiante"
            show={showModal}
            handleClose={handleCloseModal}
            actionButtonDescription="Registrar Estudiante"
            loading={loading}
            size="md"
            >
            <CreateStudentForm
              onSubmit={handleCreateStudent}
              loading={loading}
              error={error}
            />
        </BasicModal>
  </div>
  );
}