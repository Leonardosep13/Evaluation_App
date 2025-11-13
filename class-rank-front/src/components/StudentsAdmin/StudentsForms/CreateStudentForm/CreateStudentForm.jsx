import React, { useState } from 'react';
import { Form, Row, Col, Alert, Spinner } from 'react-bootstrap';
import {
  validateStudentField,
  validateStudentForm,
  processStudentFormData,
  processStudentFieldValue
} from '../../../../utils/validations/FormsValidator';
import './CreateStudentForm.css';

export function CreateStudentForm(props) {
  const { onSubmit, loading, error } = props;

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    strikes: '0'
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouchedFields(prev => ({ ...prev, [name]: true }));

    const error = validateStudentField(name, value, formData);
    setValidationErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const processedValue = type === 'checkbox' ? checked : processStudentFieldValue(name, value, type);

    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));

    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = validateStudentForm(formData);
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const processedData = processStudentFormData(formData);
      onSubmit(processedData);
    }
  };

  return (
    <Form onSubmit={handleSubmit} id="form" className="student-form">
      {error && (
        <Alert variant="danger" className="mb-3">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {typeof error === 'string' ? error : 'Error al crear el estudiante. Verifica los datos ingresados.'}
        </Alert>
      )}

      <Row className="mb-3">
        <Col md={12}>
          <Form.Group>
            <Form.Label>
              <i className="bi bi-person me-1"></i>
              Nombre *
            </Form.Label>
            <Form.Control
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!validationErrors.first_name}
              placeholder="Mínimo 2 caracteres, solo letras"
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.first_name}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md ={12}>
          <Form.Group>
            <Form.Label>
              <i className="bi bi-person-lines-fill me-1"></i>
              Apellidos *
            </Form.Label>
            <Form.Control
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!validationErrors.last_name}
              placeholder="Mínimo 2 caracteres, solo letras"
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.last_name}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-0">
        <Col md={6}>
          <Form.Group>
            <Form.Label>
              <i className="bi bi-exclamation-circle me-1"></i>
              Strikes (Materias reprobadas)
            </Form.Label>
            <Form.Control
              type="number"
              min="0"
              name="strikes"
              value={formData.strikes}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!validationErrors.strikes}
              placeholder="0"
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.strikes}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      {loading && (
        <div className="text-center mt-3">
          <Spinner animation="border" size="sm" className="me-2" />
          Registrando estudiante...
        </div>
      )}
    </Form>
  );
}
