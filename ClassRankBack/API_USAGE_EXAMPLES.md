# API Usage Guide - Data Registration

This guide shows how to use the API to register data in all models with implemented validations.

## Available Endpoints

### Students
- **GET** `/api/academics/students/` - List students
- **POST** `/api/academics/students/` - Create student
- **PUT/PATCH** `/api/academics/students/{id}/` - Update student
- **DELETE** `/api/academics/students/{id}/` - Delete student

### Teachers
- **GET** `/api/users/` - List teachers
- **POST** `/api/users/` - Create teacher
- **PUT/PATCH** `/api/users/{id}/` - Update teacher
- **DELETE** `/api/users/{id}/` - Delete teacher

### Subjects
- **GET** `/api/academics/subjects/` - List subjects
- **POST** `/api/academics/subjects/` - Create subject
- **PUT/PATCH** `/api/academics/subjects/{id}/` - Update subject
- **DELETE** `/api/academics/subjects/{id}/` - Delete subject

### Sections
- **GET** `/api/academics/sections/` - List sections
- **POST** `/api/academics/sections/` - Create section
- **PUT/PATCH** `/api/academics/sections/{id}/` - Update section
- **DELETE** `/api/academics/sections/{id}/` - Delete section

### Enrollments
- **GET** `/api/academics/enrollments/` - List enrollments
- **POST** `/api/academics/enrollments/` - Create enrollment
- **PUT/PATCH** `/api/academics/enrollments/{id}/` - Update enrollment
- **DELETE** `/api/academics/enrollments/{id}/` - Delete enrollment

### Teacher Qualifications
- **GET** `/api/academics/teacher-qualifications/` - List qualifications
- **POST** `/api/academics/teacher-qualifications/` - Create qualification
- **PUT/PATCH** `/api/academics/teacher-qualifications/{id}/` - Update qualification
- **DELETE** `/api/academics/teacher-qualifications/{id}/` - Delete qualification

### Auxiliary Endpoints
- **GET** `/api/academics/form-data/` - Get data for forms
- **GET** `/api/academics/qualified-teachers/{subject_id}/` - Qualified teachers for a subject

## Registration Examples

### 1. Register a Student

```json
POST /api/academics/students/
{
    "code": 2019478125,
    "first_name": "Juan Carlos",
    "last_name": "Pérez González",
    "special_attention": false,
    "strikes": 0
}
```

**Validations:**
- `code`: Must be a positive 10-digit number and unique
- `first_name`: Minimum 2 characters, only letters and spaces
- `last_name`: Minimum 2 characters, only letters and spaces
- `strikes`: Cannot be negative or greater than 20

### 2. Register a Teacher

```json
POST /api/users/
{
    "email_teacher": "juan.perez@academicos.udg.mx",
    "first_name": "Juan",
    "last_name": "Pérez",
    "password": "MyPassword123",
    "is_staff": false
}
```

**Validations:**
- `email_teacher`: Must be @academicos.udg.mx or @sems.udg.mx and unique
- `first_name`: Minimum 2 characters, only letters and spaces
- `last_name`: Minimum 2 characters, only letters and spaces
- `password`: Minimum 8 characters, must contain uppercase, lowercase and number

### 3. Register a Subject

```json
POST /api/academics/subjects/
{
    "name_subject": "Web Programming",
    "credits": 8.0
}
```

**Validations:**
- `name_subject`: Minimum 3 characters, maximum 50, must be unique
- `credits`: Must be positive and not greater than 20

### 4. Register a Section

```json
POST /api/academics/sections/
{
    "term": "2024A",
    "schedule_start": "08:00:00",
    "schedule_end": "10:00:00",
    "classrooms": "A12",
    "subject_id": 1,
    "teacher_id": 1
}
```

**Validations:**
- `term`: Format YYYYA or YYYYB (e.g.: 2024A, 2024B)
- `schedule_start`: Must be less than `schedule_end`
- `classrooms`: Maximum 3 characters
- Cannot have schedule conflicts in the same classroom and term
- Teacher must be qualified for the subject

### 5. Qualify a Teacher for a Subject

```json
POST /api/academics/teacher-qualifications/
{
    "teacher_id": 1,
    "subject_id": 1
}
```

**Validations:**
- `teacher_id`: Teacher must exist
- `subject_id`: Subject must exist
- Cannot duplicate the same teacher-subject combination

### 6. Enroll a Student in a Section

```json
POST /api/academics/enrollments/
{
    "student_id": 1,
    "section_id": 1,
    "score": 85.5,
    "absences": 2,
    "feedback": "Good academic performance"
}
```

**Validations:**
- `student_id`: Student must exist
- `section_id`: Section must exist
- `score`: Must be between 0 and 100
- `absences`: Cannot be negative or greater than 50
- Cannot duplicate enrollment of the same student in the same section

## Respuestas de Error

En caso de errores de validación, la API responde con un formato como:

```json
{
    "field_name": ["Mensaje de error"],
    "another_field": ["Otro mensaje de error"]
}
```

Para errores generales:

```json
{
    "error": "Descripción del error",
    "details": "Detalles técnicos del error"
}
```

## Obtener Datos para Formularios

Para obtener listas de datos necesarios para formularios:

```json
GET /api/academics/form-data/
```

Respuesta:
```json
{
    "students": [
        {
            "id": 1,
            "code": 2019478125,
            "first_name": "Juan Carlos",
            "last_name": "Pérez González"
        }
    ],
    "subjects": [
        {
            "id": 1,
            "name_subject": "Programación Web",
            "credits": 8.0
        }
    ],
    "teachers": [
        {
            "id": 1,
            "first_name": "Juan",
            "last_name": "Pérez",
            "email_teacher": "juan.perez@academicos.udg.mx"
        }
    ],
    "sections": [
        {
            "id": 1,
            "display_name": "2024A - Programación Web - Juan Pérez",
            "term": "2024A",
            "subject_name": "Programación Web",
            "teacher_name": "Juan Pérez",
            "schedule": "08:00:00 - 10:00:00",
            "classroom": "A12"
        }
    ]
}
```

## Autenticación

Todas las operaciones requieren autenticación de administrador. Incluir el token de autenticación en el header:

```
Authorization: Token tu_token_aqui
```