import React, { useState } from 'react';
import axios from 'axios';

interface AddProjectProps {
  fetchProjects: () => void;
}

const AddProject: React.FC<AddProjectProps> = ({ fetchProjects }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [technology, setTechnology] = useState('');

  const handleAddProject = () => {
    const projectData = { title, description, technology };
    console.log('Enviando datos del proyecto:', projectData);

    axios.post('http://localhost:8000/api/projects/', projectData)
      .then(response => {
        console.log(`Proyecto agregado: ${response.data.title}`);
        setTitle('');
        setDescription('');
        setTechnology('');
        fetchProjects();
      })
      .catch(error => {
        console.error('Error adding project:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
        }
      });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Agregar Proyecto</h2>
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
      <button onClick={handleAddProject} className="bg-blue-500 text-white p-2 rounded">
        Agregar
      </button>
    </div>
  );
};

export default AddProject;