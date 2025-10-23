import React, { useState, useEffect } from 'react';
import { Button, Row, Col} from 'react-bootstrap';
import { PageHeader, BasicModal } from '../components/common';
import { TeacherCard} from '../components/TeachersAdmin/TeacherCard';
import { CreateTeacherForm } from '../components/TeachersAdmin/TeachersForms/CreateTeacherForm';
import { useUser } from '../hooks/useUser';
import { SuccessAlert, ErrorAlert } from '../components/Alerts/GenericAlert';

export function Profesores() {
  const [showModal, setShowModal] = useState(false);
  const { createUser, deleteUser, loading, error, users, getUsers } = useUser();

  useEffect(() => {
    getUsers();
  }, []);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => { setShowModal(false);};

  const handleCreateTeacher = async (formData) => {
    try {
      await createUser(formData);
      await getUsers();
      SuccessAlert(
        'Profesor creado',
        'El profesor ha sido creado exitosamente.'
      );
      setTimeout(() => {
        handleCloseModal();
      }, 2000);
    } catch (error) {
      ErrorAlert(
        'Error',
        'Error al crear el profesor. Por favor, inténtalo de nuevo.'
      );
    }
  };

  const handleDeleteTeacher = async (userId) => {
    try {
      await deleteUser(userId);
      await getUsers();
    } catch (error) {
      throw error;
    }
  };

  const handleUpdateTeacher = async () => {
  try{
    await getUsers();
    SuccessAlert(
      'Profesor actualizado',
      'El profesor ha sido actualizado exitosamente.'
    );
    setTimeout(() => {
      handleCloseModal();
    }, 2000);
  } catch (error) {
    ErrorAlert(
      'Error',
      'Error al actualizar el profesor. Por favor, inténtalo de nuevo.'
    );
  };
  }
  
  return (
    <div>
      <PageHeader
        icon="bi-person-badge"
        title="Gestión de Profesores"
        cardTitle="Lista de Profesores"
      >
        <Row className="mb-3">
          <Col className="d-flex justify-content-end">
            <Button
              variant="primary"
              onClick={handleShowModal}
              className="shadow-sm"
            >
              <i className="bi bi-person-plus me-2"></i>
              Registrar Nuevo Profesor
            </Button>
          </Col>
        </Row>
        <TeacherCard
          users={users}
          loading={loading}
          error={error}
          onDeleteUser={handleDeleteTeacher}
          onUpdateUser={handleUpdateTeacher}
        />
      </PageHeader>

      <BasicModal
        title="Registrar Nuevo Profesor"
        show={showModal}
        handleClose={handleCloseModal}
        actionButtonDescription="Registrar Profesor"
        loading={loading}
        size="lg"
      >
        <CreateTeacherForm
          onSubmit={handleCreateTeacher}
          loading={loading}
          error={error}
        />
      </BasicModal>
    </div>
  );
}