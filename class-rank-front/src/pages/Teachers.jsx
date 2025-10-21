import React, { useState } from 'react';
import { Button, Row, Col, Alert } from 'react-bootstrap';
import { PageHeader, BasicModal } from '../components/common';
import { TeacherCard} from '../components/TeacherCard';
import { CreateTeacherForm } from '../components/TeachersForms/CreateTeacherForm';
import { useUser } from '../hooks/useUser';

export function Profesores() {
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const { createUser, loading, error } = useUser();

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setSuccess(false);
  };

  const handleCreateTeacher = async (formData) => {
    try {
      await createUser(formData);
      setSuccess(true);
      getUsers();
      setTimeout(() => {
        handleCloseModal();
      }, 2000);
    } catch (error) {
      console.error('Error creating teacher:', error);
    }
  };

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

        {success && (
          <Alert variant="success" className="mb-3">
            <i className="bi bi-check-circle me-2"></i>
            ¡Profesor registrado exitosamente!
          </Alert>
        )}

        <TeacherCard/>
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