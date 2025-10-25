import React, { useState } from 'react';
import { Form, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { 
    validateSubjectField, 
    validateSubjectForm, 
    processSubjectFormData, 
    processSubjectFieldValue 
} from '../../../../utils/validations/FormsValidator';
import './CreateSubjectForm.css';

export function CreateSubjectForm(props) {
    const { onSubmit, loading, error } = props;
    const [formData, setFormData] = useState({
        name_subject: '',
        semester: ''
    });

    const [validationErrors, setValidationErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouchedFields(prev => ({ ...prev, [name]: true }));
        
        const error = validateSubjectField(name, value, formData);
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
        const errors = validateSubjectForm(formData);
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            const processedData = processSubjectFormData(formData);
            onSubmit(processedData);
        }
    };

    return (
        <Form onSubmit={handleSubmit} id="form" className="form">
            {error && (
                <Alert variant="danger" className="mb-3">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {typeof error === 'string' ? error : 'Error al crear la materia. Verifica los datos ingresados.'}
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
                    <div className="form-info-box p-3 bg-info bg-opacity-10 border border-info border-opacity-25 rounded">
                        <h6 className="text-info mb-2">
                            <i className="bi bi-lightbulb me-1"></i>
                            Información Importante
                        </h6>
                        <ul className="mb-0 small text-muted">
                            <li>El nombre de la materia debe ser único en el sistema</li>
                            <li>Asegúrate de seleccionar el semestre correcto</li>
                            <li>Usa nombres descriptivos y claros para facilitar la búsqueda</li>
                            <li>Puedes incluir números romanos o códigos en el nombre si es necesario</li>
                        </ul>
                    </div>
                </Col>
            </Row>

            {loading && (
                <div className="text-center mt-3">
                    <Spinner animation="border" size="sm" className="me-2" />
                    Registrando materia...
                </div>
            )}
        </Form>
    );
}
