import React, { useState } from 'react';
import { Form, Row, Col, Alert, Spinner } from 'react-bootstrap';
import './CreateTeacherForm.css';

export function CreateTeacherForm({ onSubmit, loading, error }) {
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

    const validateField = (name, value) => {
        let error = '';

        switch (name) {
            case 'first_name':
                if (!value || !value.trim()) {
                    error = 'El nombre es requerido';
                } else if (value.trim().length < 2) {
                    error = 'El nombre debe tener al menos 2 caracteres';
                } else if (!/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(value)) {
                    error = 'El nombre solo puede contener letras y espacios';
                }
                break;
            case 'last_name':
                if (!value || !value.trim()) {
                    error = 'Los apellidos son requeridos';
                } else if (value.trim().length < 2) {
                    error = 'Los apellidos deben tener al menos 2 caracteres';
                } else if (!/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(value)) {
                    error = 'Los apellidos solo pueden contener letras y espacios';
                }
                break;
            case 'email_teacher':
                if (!value || !value.trim()) {
                    error = 'El email es requerido';
                } else {
                    const emailPattern = /^[A-Za-z0-9._%+-]+@academicos\.udg\.mx$|^[A-Za-z0-9._%+-]+@sems\.udg\.mx$/;
                    if (!emailPattern.test(value.trim().toLowerCase())) {
                        error = 'El email debe ser una cuenta institucional (@academicos.udg.mx o @sems.udg.mx)';
                    }
                }
                break;
            case 'password':
                if (!value) {
                    error = 'La contraseña es requerida para nuevos usuarios';
                } else if (value.length < 8) {
                    error = 'La contraseña debe tener al menos 8 caracteres';
                } else if (!/[A-Z]/.test(value)) {
                    error = 'La contraseña debe contener al menos una letra mayúscula';
                } else if (!/[a-z]/.test(value)) {
                    error = 'La contraseña debe contener al menos una letra minúscula';
                } else if (!/[0-9]/.test(value)) {
                    error = 'La contraseña debe contener al menos un número';
                }
                break;
            case 'confirmPassword':
                if (value !== formData.password) {
                    error = 'Las contraseñas no coinciden';
                }
                break;
        }

        return error;
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouchedFields(prev => ({ ...prev, [name]: true }));
        
        const error = validateField(name, value);
        setValidationErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let processedValue = value;
        if (type !== 'checkbox') {
            if (name === 'first_name' || name === 'last_name') {
                processedValue = value;
            } else if (name === 'email_teacher') {
                processedValue = value.trim().toLowerCase();
            }
        }

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : processedValue
        }));

        if (validationErrors[name]) {
            setValidationErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.first_name || !formData.first_name.trim()) {
            errors.first_name = 'El nombre es requerido';
        } else if (formData.first_name.trim().length < 2) {
            errors.first_name = 'El nombre debe tener al menos 2 caracteres';
        } else if (!/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(formData.first_name)) {
            errors.first_name = 'El nombre solo puede contener letras y espacios';
        }

        if (!formData.last_name || !formData.last_name.trim()) {
            errors.last_name = 'Los apellidos son requeridos';
        } else if (formData.last_name.trim().length < 2) {
            errors.last_name = 'Los apellidos deben tener al menos 2 caracteres';
        } else if (!/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(formData.last_name)) {
            errors.last_name = 'Los apellidos solo pueden contener letras y espacios';
        }

        if (!formData.email_teacher || !formData.email_teacher.trim()) {
            errors.email_teacher = 'El email es requerido';
        } else {
            const emailPattern = /^[A-Za-z0-9._%+-]+@academicos\.udg\.mx$|^[A-Za-z0-9._%+-]+@sems\.udg\.mx$/;
            if (!emailPattern.test(formData.email_teacher.trim().toLowerCase())) {
                errors.email_teacher = 'El email debe ser una cuenta institucional (@academicos.udg.mx o @sems.udg.mx)';
            }
        }

        if (!formData.password) {
            errors.password = 'La contraseña es requerida para nuevos usuarios';
        } else {
            if (formData.password.length < 8) {
                errors.password = 'La contraseña debe tener al menos 8 caracteres';
            } else if (!/[A-Z]/.test(formData.password)) {
                errors.password = 'La contraseña debe contener al menos una letra mayúscula';
            } else if (!/[a-z]/.test(formData.password)) {
                errors.password = 'La contraseña debe contener al menos una letra minúscula';
            } else if (!/[0-9]/.test(formData.password)) {
                errors.password = 'La contraseña debe contener al menos un número';
            }
        }

        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Las contraseñas no coinciden';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            const { confirmPassword, ...submitData } = formData;
            
            const processedData = {
                ...submitData,
                first_name: submitData.first_name.trim().replace(/\b\w/g, l => l.toUpperCase()),
                last_name: submitData.last_name.trim().replace(/\b\w/g, l => l.toUpperCase()),
                email_teacher: submitData.email_teacher.trim().toLowerCase()
            };
            
            onSubmit(processedData);
        }
    };

    return (
        <Form onSubmit={handleSubmit} id="teacher-form" className="teacher-form">
            {error && (
                <Alert variant="danger" className="mb-3">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {typeof error === 'string' ? error : 'Error al crear el profesor. Verifica los datos ingresados.'}
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
                            Contraseña *
                        </Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!validationErrors.password}
                            placeholder="Min. 8 caracteres, 1 mayúscula, 1 minúscula, 1 número"
                        />
                        <Form.Text className="text-muted">
                            <i className="bi bi-shield-lock me-1"></i>
                            Mínimo 8 caracteres con al menos: 1 mayúscula, 1 minúscula y 1 número
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
                            Confirmar Contraseña *
                        </Form.Label>
                        <Form.Control
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!validationErrors.confirmPassword}
                            placeholder="Repite la contraseña"
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

            {loading && (
                <div className="text-center mt-3">
                    <Spinner animation="border" size="sm" className="me-2" />
                    Registrando profesor...
                </div>
            )}
        </Form>
    );
}