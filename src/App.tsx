import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectList from './components/organism/list';
import AddProject from './components/organism/add';
import EditProject from './components/organism/edit';
import DeleteProject from './components/organism/delete';

interface Project {
  id: number;
  title: string;
  description: string;
  technology: string;
  created_at: string;
}

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchProjects = () => {
    axios.get('http://localhost:8000/api/projects/')
      .then(response => setProjects(response.data))
      .catch(error => console.error('Error fetching projects:', error));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setIsEditing(true);
  };

  const handleDelete = (project: Project) => {
    setSelectedProject(project);
    setIsDeleting(true);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setIsEditing(false);
    setIsDeleting(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex">
        <div className="w-1/3 p-4">
          <h2 className="text-2xl font-bold mb-4">Opciones</h2>
          <AddProject fetchProjects={fetchProjects} />
          {isEditing && selectedProject && (
            <EditProject project={selectedProject} fetchProjects={fetchProjects} onClose={handleCloseModal} />
          )}
          {isDeleting && selectedProject && (
            <DeleteProject project={selectedProject} fetchProjects={fetchProjects} onClose={handleCloseModal} />
          )}
        </div>
        <div className="w-2/3 p-4">
          <ProjectList projects={projects} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default App;