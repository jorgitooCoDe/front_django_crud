import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Project {
  id: number;
  title: string;
  description: string;
  technology: string;
  created_at: string;
}

interface EditProjectProps {
  project: Project;
  fetchProjects: () => void;
  onClose: () => void;
}

const EditProject: React.FC<EditProjectProps> = ({ project, fetchProjects, onClose }) => {
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [technology, setTechnology] = useState(project.technology);

  const handleEditProject = () => {
    const projectData = { title, description, technology };
    console.log('Enviando datos del proyecto:', projectData);

    axios.put(`http://localhost:8000/api/projects/${project.id}/`, projectData)
      .then(response => {
        console.log(`Proyecto editado: ${response.data.title}`);
        fetchProjects();
        onClose();
      })
      .catch(error => {
        console.error('Error editing project:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
        }
      });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Editar Proyecto</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título del proyecto"
        className="border p-2 mb-2 w-full"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción del proyecto"
        className="border p-2 mb-2 w-full"
      />
      <input
        type="text"
        value={technology}
        onChange={(e) => setTechnology(e.target.value)}
        placeholder="Tecnología utilizada"
        className="border p-2 mb-2 w-full"
      />
      <button onClick={handleEditProject} className="bg-green-500 text-white p-2 rounded">
        Guardar Cambios
      </button>
      <button onClick={onClose} className="bg-gray-500 text-white p-2 rounded ml-2">
        Cancelar
      </button>
    </div>
  );
};

export default EditProject;