import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { 
    validateEditTeacherField, 
    validateEditTeacherForm, 
    processEditTeacherFormData, 
    processFieldValue 
} from '../../../../utils/validations/FormsValidator';
import './UpdateTeacherForm.css';

import { useUser } from '../../../../hooks/useUser';

export function UpdateTeacherForm(props) {
    const { teacher, onCancel, onSuccess } = props;
    const { updateUser, loading, error } = useUser();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email_teacher: '',
        password: '',
        confirmPassword: '',
        is_staff: false,
        is_active: true,
    });

    const [validationErrors, setValidationErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});

    useEffect(() => {
        if (teacher) {
            setFormData({
                first_name: teacher.first_name || '',
                last_name: teacher.last_name || '',
                email_teacher: teacher.email_teacher || '',
                password: '',
                confirmPassword: '',
                is_staff: teacher.is_staff || false,
                is_active: teacher.is_active !== undefined ? teacher.is_active : true,
            });
            setValidationErrors({});
            setTouchedFields({});
        }
    }, [teacher]);

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouchedFields(prev => ({ ...prev, [name]: true }));
        
        const error = validateEditTeacherField(name, value, formData);
        setValidationErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const processedValue = type === 'checkbox' ? checked : processFieldValue(name, value, type);

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
        const errors = validateEditTeacherForm(formData);
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
                
        if (validateForm()) {
            const processedData = processEditTeacherFormData(formData);            
            try {
                await updateUser(teacher.id, processedData);
                onSuccess && onSuccess();
            } catch (error) {
                console.error('Error al actualizar profesor:', error);
            }
        }
    };

    return (
        <Form onSubmit={handleSubmit} id="update-teacher-form" className="teacher-form">
            {error && (
                <Alert variant="danger" className="mb-3">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {typeof error === 'string' ? error : 'Error al actualizar el profesor. Verifica los datos ingresados.'}
                </Alert>
            )}
            
            <Row className="mb-3">
                <Col md={6}>
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
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>
                            <i className="bi bi-person me-1"></i>
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

            <Row className="mb-3">
                <Col>
                    <Form.Group>
                        <Form.Label>
                            <i className="bi bi-envelope me-1"></i>
                            Email *
                        </Form.Label>
                        <Form.Control
                            type="email"
                            name="email_teacher"
                            value={formData.email_teacher}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!validationErrors.email_teacher}
                            placeholder="profesor@academicos.udg.mx"
                        />
                        <Form.Text className="text-muted">
                            <i className="bi bi-info-circle me-1"></i>
                            Solo se aceptan correos institucionales (@academicos.udg.mx o @sems.udg.mx)
                        </Form.Text>
                        <Form.Control.Feedback type="invalid">
                            {validationErrors.email_teacher}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>
                            <i className="bi bi-lock me-1"></i>
                            Nueva Contraseña (opcional)
                        </Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!validationErrors.password}
                            placeholder="Dejar vacío para mantener la actual"
                        />
                        <Form.Text className="text-muted">
                            <i className="bi bi-shield-lock me-1"></i>
                            Solo completa si deseas cambiar la contraseña. Min. 8 caracteres con: 1 mayúscula, 1 minúscula y 1 número
                        </Form.Text>
                        <Form.Control.Feedback type="invalid">
                            {validationErrors.password}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>
                            <i className="bi bi-lock-fill me-1"></i>
                            Confirmar Nueva Contraseña
                        </Form.Label>
                        <Form.Control
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!validationErrors.confirmPassword}
                            placeholder="Confirma la nueva contraseña"
                            disabled={!formData.password}
                        />
                        <Form.Control.Feedback type="invalid">
                            {validationErrors.confirmPassword}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col>
                    <Form.Group>
                        <Form.Check
                            type="checkbox"
                            name="is_staff"
                            checked={formData.is_staff}
                            onChange={handleChange}
                            label={
                                <span>
                                    <i className="bi bi-shield-check me-1"></i>
                                    Permisos de coordinación
                                </span>
                            }
                        />
                        <Form.Text className="text-muted">
                            Los profesores con permisos de coordinación pueden administrar el sistema
                        </Form.Text>
                    </Form.Group>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col>
                    <Form.Group>
                        <Form.Check
                            type="checkbox"
                            name="is_active"
                            checked={formData.is_active}
                            onChange={handleChange}
                            label={
                                <span>
                                    <i className="bi bi-check-circle me-1"></i>
                                    Usuario activo
                                </span>
                            }
                        />
                        <Form.Text className="text-muted">
                            Los usuarios activos pueden iniciar sesión en el sistema
                        </Form.Text>
                    </Form.Group>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col className="d-flex justify-content-end gap-2">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        <i className="bi bi-x-lg me-1"></i>
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Spinner animation="border" size="sm" className="me-2" />
                                Actualizando...
                            </>
                        ) : (
                            <>
                                <i className="bi bi-check-lg me-1"></i>
                                Actualizar Profesor
                            </>
                        )}
                    </button>
                </Col>
            </Row>
        </Form>
    );
}