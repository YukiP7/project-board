import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Settings({ onThemeChange, isDarkMode, user, setUser }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [userDetails, setUserDetails] = useState({
    name: user.name,
    email: user.email,
    bio: '',
    location: '',
    timezone: 'UTC'
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUser(userDetails);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className={`flex-1 overflow-x-hidden overflow-y-auto ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-6 py-8">
          {/* Settings Header */}
          <div className={`rounded-lg shadow-lg p-6 mb-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Settings</h1>
            <p className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Manage your account settings and preferences</p>
          </div>

          {/* Settings Navigation */}
          <div className={`rounded-lg shadow-lg mb-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <nav className="flex space-x-4 px-6 py-4 border-b border-gray-700">
              {['profile', 'theme', 'notifications', 'security'].map((tab) => (
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

          {/* Settings Content */}
          <div className="space-y-6">
            {activeTab === 'profile' && (
              <div className={`rounded-lg shadow-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Profile Settings</h2>
                <form onSubmit={handleSaveProfile} className="space-y-6">
                  <div className="flex items-center space-x-6">
                    <img
                      src={`https://ui-avatars.com/api/?name=${userDetails.name}&background=random`}
                      alt={userDetails.name}
                      className="w-24 h-24 rounded-full"
                    />
                    <div>
                      <h3 className={isDarkMode ? 'text-white' : 'text-gray-900'}>{userDetails.name}</h3>
                      <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{userDetails.email}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Name</label>
                      <input
                        type="text"
                        value={userDetails.name}
                        onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                        className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isDarkMode 
                            ? 'bg-gray-700 border border-gray-600 text-white' 
                            : 'bg-gray-50 border border-gray-300 text-gray-900'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
                      <input
                        type="email"
                        value={userDetails.email}
                        onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                        className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isDarkMode 
                            ? 'bg-gray-700 border border-gray-600 text-white' 
                            : 'bg-gray-50 border border-gray-300 text-gray-900'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Bio</label>
                      <textarea
                        value={userDetails.bio}
                        onChange={(e) => setUserDetails({ ...userDetails, bio: e.target.value })}
                        className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isDarkMode 
                            ? 'bg-gray-700 border border-gray-600 text-white' 
                            : 'bg-gray-50 border border-gray-300 text-gray-900'
                        }`}
                        rows="3"
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Location</label>
                      <input
                        type="text"
                        value={userDetails.location}
                        onChange={(e) => setUserDetails({ ...userDetails, location: e.target.value })}
                        className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isDarkMode 
                            ? 'bg-gray-700 border border-gray-600 text-white' 
                            : 'bg-gray-50 border border-gray-300 text-gray-900'
                        }`}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'theme' && (
              <div className={`rounded-lg shadow-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Theme Settings</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={isDarkMode ? 'text-white' : 'text-gray-900'}>Dark Mode</h3>
                      <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Toggle dark mode theme</p>
                    </div>
                    <button
                      onClick={() => onThemeChange(!isDarkMode)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDarkMode ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          isDarkMode ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={isDarkMode ? 'text-white' : 'text-gray-900'}>System Theme</h3>
                      <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Use system theme preference</p>
                    </div>
                    <button
                      className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className={`rounded-lg shadow-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Notification Settings</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={isDarkMode ? 'text-white' : 'text-gray-900'}>Email Notifications</h3>
                      <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Receive email notifications for updates</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={isDarkMode ? 'text-white' : 'text-gray-900'}>Push Notifications</h3>
                      <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Receive push notifications on your device</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={isDarkMode ? 'text-white' : 'text-gray-900'}>Task Reminders</h3>
                      <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Get reminded about upcoming tasks</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className={`rounded-lg shadow-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Security Settings</h2>
                <div className="space-y-6">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Current Password</label>
                    <input
                      type="password"
                      className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDarkMode 
                          ? 'bg-gray-700 border border-gray-600 text-white' 
                          : 'bg-gray-50 border border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>New Password</label>
                    <input
                      type="password"
                      className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDarkMode 
                          ? 'bg-gray-700 border border-gray-600 text-white' 
                          : 'bg-gray-50 border border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Confirm New Password</label>
                    <input
                      type="password"
                      className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDarkMode 
                          ? 'bg-gray-700 border border-gray-600 text-white' 
                          : 'bg-gray-50 border border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>
                  <div className="flex justify-end">
                    <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 