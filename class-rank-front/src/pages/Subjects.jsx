import React from 'react';
import { PageHeader } from '../components/common';

export function Materias() {
  return (
    <PageHeader
      icon="bi-journal-text"
      title="Gestión de Materias"
      cardTitle="Lista de Materias"
      description="Aquí se mostrará la lista de materias y las opciones para gestionarlas."
    >
      {/* Aquí irá el contenido de gestión de materias */}
    </PageHeader>
  );
}