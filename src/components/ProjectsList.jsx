import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProjectsList({ projects, onProjectChange , isDarkMode}) {
  const navigate = useNavigate();
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    team: []
  });

  const ongoingProjects = projects.filter(project => project.status === 'ongoing');
  const pastProjects = projects.filter(project => project.status === 'completed');

  const handleAddProject = (e) => {
    e.preventDefault();
    const project = {
      ...newProject,
      id: Date.now().toString(),
      status: 'ongoing',
      createdAt: new Date().toISOString()
    };
    onProjectChange(project);
    setShowAddProjectModal(false);
    setNewProject({
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      team: []
    });
  };

  return (
    <div className={`min-w-4xl mx-auto p-6 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} `}>
      <div className={` p-4 rounded-lg border shadow-lg ${isDarkMode ? 'bg-gray-800 border-gray-800 ' : 'bg-white border-gray-100 '}`}>
      <div className="flex justify-between items-center mb-8">
        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Projects</h1>
        <button
          onClick={() => setShowAddProjectModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Project
        </button>
      </div>

      {/* Ongoing Projects */}
      <div className="mb-8">
        <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Ongoing Projects</h2>
        {ongoingProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ongoingProjects.map(project => (
              <div
                key={project.id}
                onClick={() => navigate(`/projects/${project.id}`)}
                className="bg-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-900 transition-colors"
              >
                <h3 className="text-lg font-semibold text-white mb-2">{project.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {project.team.slice(0, 3).map(member => (
                      <img
                        key={member.id}
                        src={`https://ui-avatars.com/api/?name=${member.name}&background=random`}
                        alt={member.name}
                        className="w-6 h-6 rounded-full"
                      />
                    ))}
                    {project.team.length > 3 && (
                      <span className="text-sm text-gray-400">+{project.team.length - 3}</span>
                    )}
                  </div>
                  <span className="text-sm text-green-400">In Progress</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <p className="text-gray-400">No ongoing projects</p>
          </div>
        )}
      </div>

      {/* Past Projects */}
      <div>
        <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Past Projects</h2>
        {pastProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pastProjects.map(project => (
              <div
                key={project.id}
                onClick={() => navigate(`/projects/${project.id}`)}
                className="bg-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-900 transition-colors"
              >
                <h3 className="text-lg font-semibold text-white mb-2">{project.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {project.team.slice(0, 3).map(member => (
                      <img
                        key={member.id}
                        src={`https://ui-avatars.com/api/?name=${member.name}&background=random`}
                        alt={member.name}
                        className="w-6 h-6 rounded-full"
                      />
                    ))}
                    {project.team.length > 3 && (
                      <span className="text-sm text-gray-400">+{project.team.length - 3}</span>
                    )}
                  </div>
                  <span className="text-sm text-gray-400">Completed</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-700 hover:bg-gray-900 rounded-lg p-8 text-center">
            <p className="text-gray-400">No past projects</p>
          </div>
        )}
      </div>

      {/* Add Project Modal */}
      {showAddProjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-white mb-4">Add New Project</h3>
            <form onSubmit={handleAddProject} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Project Name</label>
                <input
                  type="text"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={newProject.startDate}
                    onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">End Date</label>
                  <input
                    type="date"
                    value={newProject.endDate}
                    onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddProjectModal(false)}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
    </div>
  );
} 