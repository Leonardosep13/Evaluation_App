import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { 
    validateEditSubjectField, 
    validateEditSubjectForm, 
    processEditSubjectFormData, 
    processSubjectFieldValue 
} from '../../../../utils/validations/FormsValidator';
import './UpdateSubjectForm.css';
import { useSubject } from '../../../../hooks/useSubject';

export function UpdateSubjectForm(props) {
    const { subject, onCancel, onSuccess } = props;
    const { updateSubject, loading, error } = useSubject();
    const [formData, setFormData] = useState({
        name_subject: '',
        semester: ''
    });

    const [validationErrors, setValidationErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});

    useEffect(() => {
        if (subject) {
            setFormData({
                name_subject: subject.name_subject || '',
                semester: subject.semester?.toString() || '',
            });
            setValidationErrors({});
            setTouchedFields({});
        }
    }, [subject]);

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouchedFields(prev => ({ ...prev, [name]: true }));
        
        const error = validateEditSubjectField(name, value, formData);
        setValidationErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const processedValue = processSubjectFieldValue(name, value, type);

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
        const errors = validateEditSubjectForm(formData);
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
                
        if (validateForm()) {
            const processedData = processEditSubjectFormData(formData);            
            try {
                await updateSubject(subject.id, processedData);
                onSuccess && onSuccess();
            } catch (error) {
                console.error('Error al actualizar materia:', error);
            }
        }
    };

    return (
        <Form onSubmit={handleSubmit} id="update-subject-form" className="subject-form">
            {error && (
                <Alert variant="danger" className="mb-3">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {typeof error === 'string' ? error : 'Error al actualizar la materia. Verifica los datos ingresados.'}
                </Alert>
            )}
            
            <Row className="mb-3">
                <Col>
                    <Form.Group>
                        <Form.Label>
                            <i className="bi bi-journal-text me-1"></i>
                            Nombre de la Materia *
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="name_subject"
                            value={formData.name_subject}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!validationErrors.name_subject}
                            placeholder="Ej: Matemáticas I, Historia de México, Programación..."
                        />
                        <Form.Text className="text-muted">
                            <i className="bi bi-info-circle me-1"></i>
                            Mínimo 3 caracteres, máximo 50. Solo letras, números, espacios, guiones y puntos.
                        </Form.Text>
                        <Form.Control.Feedback type="invalid">
                            {validationErrors.name_subject}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>
                            <i className="bi bi-calendar3 me-1"></i>
                            Semestre *
                        </Form.Label>
                        <Form.Select
                            name="semester"
                            value={formData.semester}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!validationErrors.semester}
                        >
                            <option value="">Selecciona el semestre</option>
                            <option value="1">1° Primer Semestre</option>
                            <option value="2">2° Segundo Semestre</option>
                            <option value="3">3° Tercer Semestre</option>
                            <option value="4">4° Cuarto Semestre</option>
                            <option value="5">5° Quinto Semestre</option>
                            <option value="6">6° Sexto Semestre</option>
                        </Form.Select>
                        <Form.Text className="text-muted">
                            <i className="bi bi-mortarboard me-1"></i>
                            Selecciona el semestre en el que se imparte la materia
                        </Form.Text>
                        <Form.Control.Feedback type="invalid">
                            {validationErrors.semester}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <div className="semester-preview mt-4 p-3 bg-light rounded">
                        <small className="text-muted d-block">Vista previa:</small>
                        {formData.name_subject && formData.semester ? (
                            <div className="d-flex align-items-center">
                                <i className="bi bi-book text-primary me-2"></i>
                                <span className="fw-bold">{formData.name_subject}</span>
                                <span className="badge bg-primary ms-2">
                                    {formData.semester}° Semestre
                                </span>
                            </div>
                        ) : (
                            <span className="text-muted">
                                <i className="bi bi-eye-slash me-1"></i>
                                Completa los campos para ver la vista previa
                            </span>
                        )}
                    </div>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col>
                    <div className="form-info-box p-3 bg-warning bg-opacity-10 border border-warning border-opacity-25 rounded">
                        <h6 className="text-warning mb-2">
                            <i className="bi bi-exclamation-triangle me-1"></i>
                            Información Importante
                        </h6>
                        <ul className="mb-0 small text-muted">
                            <li>Los cambios se aplicarán inmediatamente al guardar</li>
                            <li>Asegúrate de que el nombre sea único en el sistema</li>
                            <li>Verifica que el semestre sea correcto antes de guardar</li>
                            <li>Los estudiantes inscritos en esta materia mantendrán su inscripción</li>
                        </ul>
                    </div>
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
                                Actualizar Materia
                            </>
                        )}
                    </button>
                </Col>
            </Row>
        </Form>
    );
}
