import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function BasicModal(props) {
  const { 
    title, 
    children, 
    show, 
    handleClose, 
    handleShow, 
    actionButtonDescription,
    onActionClick,
    showActionButton = true,
    actionButtonVariant = "primary",
    loading = false,
    size = "lg"
  } = props;

  const handleActionClick = () => {
    if (onActionClick) {
      onActionClick();
    } else {
      handleClose();
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size={size} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-person-plus me-2"></i>
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        {showActionButton && (
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose} disabled={loading}>
              Cancelar
            </Button>
            <Button 
              variant={actionButtonVariant} 
              onClick={handleActionClick}
              disabled={loading}
              type="submit"
              form="form"
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Registrando...
                </>
              ) : (
                <>
                  <i className="bi bi-check-lg me-1"></i>
                  {actionButtonDescription || 'Guardar'}
                </>
              )}
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
}

export default BasicModal;