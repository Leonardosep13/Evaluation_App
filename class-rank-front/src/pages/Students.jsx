import React, { useEffect, useState } from 'react';
import { PageHeader } from '../components/common';
import { useStudents } from '../hooks/useStudents';
import { StudentsTable } from '../components/StudentsAdmin/StudentsTable/StudentsTable';

export function Students() {
  const { students, loading, error, getStudents, deleteStudents } = useStudents();

  useEffect(() => {
    getStudents();
  }, []);

  return (
  <div>
    <PageHeader
      icon="bi-people"
      title="Gestión de Estudiantes"
      cardTitle="Lista de Estudiantes"
    >
      <StudentsTable
        students={students}
        loading={loading}
        error={error}
      />
    </PageHeader>
  </div>
  );
}