import { useEffect, useState } from 'react';
import { PageHeader, BasicModal } from '../components/common';
import { Row, Col, Button } from 'react-bootstrap';
import { useSubject } from '../hooks/useSubject';
import { SubjectCard } from '../components/SubjectsAdmin/SubjectCard';

export function Materias() {
  const [showModal, setShowModal] = useState(false);
  const {subjects, loading, error, getSubjects} = useSubject();
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

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
        />
        
    </PageHeader>

    <BasicModal
        title="Registrar Nueva Materia"
        show={showModal}
        handleClose={handleCloseModal}
        actionButtonDescription="Registrar"
        size="lg"
        >

        </BasicModal>
  </div>  
  );
}