import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function ProjectsTabs({ projects, onProjectChange, isDarkMode }) {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    role: ''
  });

  const currentProject = projects.find(p => p.id === projectId);

  const handleShare = () => {
    const link = `${window.location.origin}/projects/${projectId}`;
    setShareLink(link);
    setShowShareModal(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    const member = {
      ...newMember,
      id: Date.now().toString()
    };
    
    const updatedProject = {
      ...currentProject,
      team: [...currentProject.team, member]
    };
    
    onProjectChange(updatedProject);
    setShowAddMemberModal(false);
    setNewMember({ name: '', email: '', role: '' });
  };

  if (!currentProject) {
    return <div className={`text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Project not found</div>;
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className={`flex-1 overflow-x-hidden overflow-y-auto ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-6 py-8">
          {/* Project Header */}
          <div className={`rounded-lg shadow-lg p-6 mb-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex justify-between items-center">
              <div>
                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{currentProject.name}</h2>
                <p className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Project ID: {currentProject.id}</p>
              </div>
              <button
                onClick={() => navigate('/projects')}
                className="text-blue-500 hover:text-blue-600 transition-colors"
              >
                <ArrowLeftIcon className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className={`rounded-lg shadow-lg mb-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <nav className="flex space-x-4 px-6 py-4 border-b border-gray-700">
              {['overview', 'tasks', 'team', 'reports'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium capitalize transition-colors duration-200 ${
                    activeTab === tab
                      ? 'text-blue-500 border-b-2 border-blue-500'
                      : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className={`rounded-lg shadow-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Project Overview</h3>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    {currentProject.description}
                  </p>
                </div>
                <div className={`rounded-lg shadow-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Project Timeline</h3>
                  <div className="space-y-4">
                    <div>
                      <label className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Start Date</label>
                      <p className={`mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{currentProject.startDate}</p>
                    </div>
                    <div>
                      <label className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Target End Date</label>
                      <p className={`mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{currentProject.endDate}</p>
                    </div>
                  </div>
                </div>
                <div className={`lg:col-span-2 rounded-lg shadow-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <div className="flex justify-between items-center">
                    <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Share Project</h3>
                    <button
                      onClick={handleShare}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Share Link
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'tasks' && (
              <div className={`rounded-lg shadow-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h3 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Task Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className={`rounded-lg p-6 text-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="text-3xl font-bold text-red-500 mb-2">12</div>
                    <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>To Do</div>
                  </div>
                  <div className={`rounded-lg p-6 text-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="text-3xl font-bold text-yellow-500 mb-2">8</div>
                    <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>In Progress</div>
                  </div>
                  <div className={`rounded-lg p-6 text-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="text-3xl font-bold text-green-500 mb-2">15</div>
                    <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Completed</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'team' && (
              <div className={`rounded-lg shadow-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex justify-between items-center mb-6">
                  <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Team Members</h3>
                  <button
                    onClick={() => setShowAddMemberModal(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Add Member
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentProject.team.map((member) => (
                    <div key={member.id} className={`rounded-lg p-4 flex items-center justify-between ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex items-center space-x-4">
                        <img
                          src={`https://ui-avatars.com/api/?name=${member.name}&background=random`}
                          alt={member.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <div className={isDarkMode ? 'text-white' : 'text-gray-900'}>{member.name}</div>
                          <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{member.role || 'Team Member'}</div>
                        </div>
                      </div>
                      <button className="text-blue-500 hover:text-blue-600 transition-colors">
                        View Profile
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reports' && (
              <div className={`rounded-lg shadow-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h3 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Project Reports</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className={`rounded-lg p-6 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>75%</div>
                    <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Completion Rate</div>
                  </div>
                  <div className={`rounded-lg p-6 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>15/20</div>
                    <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Tasks Completed</div>
                  </div>
                  <div className={`rounded-lg p-6 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="text-2xl font-bold text-green-500 mb-2">On Track</div>
                    <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Project Status</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`rounded-lg p-6 max-w-md w-full mx-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Share Project</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                value={shareLink}
                readOnly
                className={`flex-1 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border border-gray-600 text-white' 
                    : 'bg-gray-50 border border-gray-300 text-gray-900'
                }`}
              />
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Copy
              </button>
            </div>
            <button
              onClick={() => setShowShareModal(false)}
              className={`mt-4 w-full px-4 py-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 text-white hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {showAddMemberModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`rounded-lg p-6 max-w-md w-full mx-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Add Team Member</h3>
            <form onSubmit={handleAddMember} className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Name</label>
                <input
                  type="text"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode 
                      ? 'bg-gray-700 border border-gray-600 text-white' 
                      : 'bg-gray-50 border border-gray-300 text-gray-900'
                  }`}
                  required
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
                <input
                  type="email"
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode 
                      ? 'bg-gray-700 border border-gray-600 text-white' 
                      : 'bg-gray-50 border border-gray-300 text-gray-900'
                  }`}
                  required
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Role</label>
                <input
                  type="text"
                  value={newMember.role}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode 
                      ? 'bg-gray-700 border border-gray-600 text-white' 
                      : 'bg-gray-50 border border-gray-300 text-gray-900'
                  }`}
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddMemberModal(false)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 text-white hover:bg-gray-600' 
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 