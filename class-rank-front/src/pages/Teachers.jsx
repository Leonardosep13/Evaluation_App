import React from 'react';
import { PageHeader } from '../components/common';
import { TeacherCard } from '../components/TeacherCard/TeacherCard';

export function Profesores() {
  return (
    <PageHeader
      icon="bi-person-badge"
      title="Gestión de Profesores"
      cardTitle="Lista de Profesores"
    >
      <TeacherCard/>
    </PageHeader>
  );
}