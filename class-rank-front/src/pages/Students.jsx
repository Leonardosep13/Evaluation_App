import React from 'react';
import { PageHeader } from '../components/common';

export function Students() {
  return (
    <PageHeader
      icon="bi-people"
      title="Gestión de Estudiantes"
      cardTitle="Lista de Estudiantes"
      description="Aquí se mostrará la lista de estudiantes y las opciones para gestionarlos."
    >
      {/* Aquí irá el contenido de gestión de estudiantes */}
    </PageHeader>
  );
}