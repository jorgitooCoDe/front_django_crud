import React from 'react';
import axios from 'axios';

interface Project {
  id: number;
  title: string;
  description: string;
  technology: string;
  created_at: string;
}

interface DeleteProjectProps {
  project: Project;
  fetchProjects: () => void;
  onClose: () => void;
}

const DeleteProject: React.FC<DeleteProjectProps> = ({ project, fetchProjects, onClose }) => {
  const handleDeleteProject = () => {
    axios.delete(`http://localhost:8000/api/projects/${project.id}/`)
      .then(() => {
        console.log(`Proyecto eliminado: ${project.title}`);
        fetchProjects();
        onClose();
      })
      .catch(error => console.error('Error deleting project:', error));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Eliminar Proyecto</h2>
      <p>¿Estás seguro de que deseas eliminar el proyecto <strong>{project.title}</strong>?</p>
      <button onClick={handleDeleteProject} className="bg-red-500 text-white p-2 rounded">
        Eliminar
      </button>
      <button onClick={onClose} className="bg-gray-500 text-white p-2 rounded ml-2">
        Cancelar
      </button>
    </div>
  );
};

export default DeleteProject;