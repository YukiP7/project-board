import { useState } from 'react';

export default function ProjectSelector({ projects, currentProject, onProjectChange , isDarkMode }) {
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareLink, setShareLink] = useState('');

  const handleShare = () => {
    const link = `${window.location.origin}/dashboard?project=${currentProject.id}`;
    setShareLink(link);
    setShowShareModal(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
  };

  return (
    <div className={`rounded-lg p-4 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="flex items-center justify-between mb-4">
        <select
          value={currentProject?.id || ''}
          onChange={(e) => {
            const selectedProject = projects.find((p) => p.id === e.target.value);
            onProjectChange(selectedProject); // Pass the whole project object
          }}
          className={`${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleShare}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Share Project
        </button>
      </div>

      <div className="mt-4">
        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Team Members</h3>
        <div className="space-y-2">
          {currentProject?.team?.map((member) => (
            <div key={member.id} className="flex items-center space-x-2">
              <img
                src={`https://ui-avatars.com/api/?name=${member.name}&background=random`}
                alt={member.name}
                className="w-8 h-8 rounded-full"
              />
              <span className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{member.name}</span>
            </div>
          ))}
        </div>
      </div>

      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Share Project</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={shareLink}
                readOnly
                className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2"
              />
              <button
                onClick={copyToClipboard}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
