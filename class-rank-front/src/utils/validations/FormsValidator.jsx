
export const validateTeacherField = (name, value, formData = {}) => {
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

export const validateTeacherForm = (formData) => {
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

    return errors;
};


export const processTeacherFormData = (formData) => {
    const { confirmPassword, ...submitData } = formData;
    
    return {
        ...submitData,
        first_name: submitData.first_name.trim().replace(/\b\w/g, l => l.toUpperCase()),
        last_name: submitData.last_name.trim().replace(/\b\w/g, l => l.toUpperCase()),
        email_teacher: submitData.email_teacher.trim().toLowerCase()
    };
};

export const processFieldValue = (name, value, type) => {
    if (type === 'checkbox') {
        return value;
    }
    
    switch (name) {
        case 'first_name':
        case 'last_name':
            return value;
        case 'email_teacher':
            return value.trim().toLowerCase();
        default:
            return value;
    }
};

export const validateEditTeacherField = (name, value, formData = {}) => {
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
            // Para edición, la contraseña es opcional
            if (value && value.length > 0) {
                if (value.length < 8) {
                    error = 'La contraseña debe tener al menos 8 caracteres';
                } else if (!/[A-Z]/.test(value)) {
                    error = 'La contraseña debe contener al menos una letra mayúscula';
                } else if (!/[a-z]/.test(value)) {
                    error = 'La contraseña debe contener al menos una letra minúscula';
                } else if (!/[0-9]/.test(value)) {
                    error = 'La contraseña debe contener al menos un número';
                }
            }
            break;
        case 'confirmPassword':
            if (formData.password && formData.password.length > 0) {
                if (value !== formData.password) {
                    error = 'Las contraseñas no coinciden';
                }
            }
            break;
    }

    return error;
};

export const validateEditTeacherForm = (formData) => {
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

    if (formData.password && formData.password.length > 0) {
        if (formData.password.length < 8) {
            errors.password = 'La contraseña debe tener al menos 8 caracteres';
        } else if (!/[A-Z]/.test(formData.password)) {
            errors.password = 'La contraseña debe contener al menos una letra mayúscula';
        } else if (!/[a-z]/.test(formData.password)) {
            errors.password = 'La contraseña debe contener al menos una letra minúscula';
        } else if (!/[0-9]/.test(formData.password)) {
            errors.password = 'La contraseña debe contener al menos un número';
        }

        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Las contraseñas no coinciden';
        }
    }

    return errors;
};

export const processEditTeacherFormData = (formData) => {
    const { confirmPassword, ...submitData } = formData;
    
    const processedData = {
        first_name: submitData.first_name.trim().replace(/\b\w/g, l => l.toUpperCase()),
        last_name: submitData.last_name.trim().replace(/\b\w/g, l => l.toUpperCase()),
        email_teacher: submitData.email_teacher.trim().toLowerCase()
    };

    if (submitData.password && submitData.password.length > 0) {
        processedData.password = submitData.password;
    }

    return processedData;
};