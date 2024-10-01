import React from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  technology: string;
  created_at: string;
}

interface ProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onEdit, onDelete }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Lista de Proyectos</h2>
      <ul>
        {projects.map(project => (
          <li key={project.id} className="mb-2 border p-2">
            <h3 className="text-xl font-bold">{project.title}</h3>
            <p>{project.description}</p>
            <p><strong>Tecnología:</strong> {project.technology}</p>
            <p><small>Creado el: {new Date(project.created_at).toLocaleDateString()}</small></p>
            <button onClick={() => onEdit(project)} className="bg-yellow-500 text-white p-2 rounded mr-2">
              Editar
            </button>
            <button onClick={() => onDelete(project)} className="bg-red-500 text-white p-2 rounded">
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;