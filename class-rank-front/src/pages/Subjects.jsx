import { useEffect, useState } from 'react';
import { PageHeader, BasicModal } from '../components/common';
import { Row, Col, Button } from 'react-bootstrap';
import { useSubject } from '../hooks/useSubject';
import { SubjectCard } from '../components/SubjectsAdmin/SubjectCard';
import { CreateSubjectForm } from '../components/SubjectsAdmin/SubjectsForms/CreateSubjectForm/CreateSubjectForm';
import { ErrorAlert, SuccessAlert } from '../components/Alerts/GenericAlert';

export function Materias() {
  const [showModal, setShowModal] = useState(false);
  const {subjects, loading, error, getSubjects, deleteSubject, createSubject} = useSubject();
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleCreateSubject = async (formData) => {
    try {
      await createSubject(formData);
      await getSubjects();
      SuccessAlert(
        'Materia creada',
        'La materia ha sido creada exitosamente.'
      );
      setTimeout(() => {
        handleCloseModal();
      }, 2000);
    } catch (error) {
      ErrorAlert(
        'Error',
        'Error al crear la materia. Por favor, inténtalo de nuevo.'
      );


      throw error;
    }
  };

  const handleDeleteSubject = async (subjectId) => {
    try {
      await deleteSubject(subjectId);
      await getSubjects();
    } catch (error) {
      throw error;
    }
  };

  const handleUpdateSubject = async () => {
    try{
      await getSubjects();
      SuccessAlert(
        'Materia actualizada',
        'La materia ha sido actualizada exitosamente.'
      );
      setTimeout(() => {
        handleCloseModal();
      }, 2000);
    }
      catch (error) {
      ErrorAlert(
        'Error',
        'Error al actualizar la materia. Por favor, inténtalo de nuevo.'
      );
    }
  };

  useEffect(() => {
    getSubjects();
  }, []);

  return (
  <div>
    <PageHeader
      icon="bi-journal-text"
      title="Gestión de Materias"
      cardTitle="Lista de Materias"
    >
        <Row className="mb-3">
          <Col className="d-flex justify-content-end">
            <Button
              variant="primary"
              onClick={handleShowModal}
              className="shadow-sm"
            >
              <i className="bi bi-journal-plus me-2"></i>
              Registrar Nueva Materia
            </Button>
          </Col>
        </Row>
        
        <SubjectCard
          subjects={subjects}
          loading={loading}
          error={error}
          onDeleteSubject={handleDeleteSubject}
          onUpdateSubject={handleUpdateSubject}
        />
        
    </PageHeader>

    <BasicModal
        title="Registrar Nueva Materia"
        show={showModal}
        handleClose={handleCloseModal}
        actionButtonDescription="Registrar materia"
        loading={loading}
        size="lg"
        >
          <CreateSubjectForm 
          onSubmit={handleCreateSubject}
          loading={loading}
          error={error}
        />
        </BasicModal>
  </div>  
  );
}