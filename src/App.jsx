import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import KanbanBoard from './components/KanbanBoard';
import Settings from './components/Settings';
import ProjectsTabs from './components/ProjectsTabs';
import ProjectsList from './components/ProjectsList';
import Sidebar from './components/Sidebar';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
  });

  const [projects, setProjects] = useState([
    {
      id: "1",
      name: "Main Project",
      description: "A comprehensive project management dashboard",
      status: "ongoing",
      startDate: "2024-03-01",
      endDate: "2024-04-30",
      team: [
        { id: "1", name: "John Doe", role: "Project Manager" },
        { id: "2", name: "Jane Smith", role: "Developer" },
        { id: "3", name: "Mike Johnson", role: "Designer" }
      ]
    },
    {
      id: "2",
      name: "Website Redesign",
      description: "Redesigning the company website",
      status: "ongoing",
      startDate: "2024-02-15",
      endDate: "2024-03-30",
      team: [
        { id: "1", name: "John Doe", role: "Project Manager" },
        { id: "4", name: "Sarah Wilson", role: "Developer" }
      ]
    }
  ]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const handleProjectChange = (updatedProject) => {
    setProjects(projects.map(project => 
      project.id === updatedProject.id ? updatedProject : project
    ));
  };

  const handleAddProject = (newProject) => {
    setProjects([...projects, newProject]);
  };

  return (
    <BrowserRouter>
      <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={
            <div className="flex h-screen">
              <Sidebar user={user} />
              <KanbanBoard user={user} projects={projects} isDarkMode={isDarkMode} onThemeChange={setIsDarkMode} />
            </div>
          } />
          <Route path="/settings" element={
            <div className="flex h-screen">
              <Sidebar user={user} />
              <Settings  isDarkMode={isDarkMode} onThemeChange={setIsDarkMode} user={user} setUser={setUser} />
            </div>
          } />
          <Route path="/projects" element={
            <div className="flex h-screen">
              <Sidebar user={user} />
              <ProjectsList projects={projects} onProjectChange={handleAddProject} isDarkMode={isDarkMode} />
            </div>
          } />
          <Route path="/projects/:projectId" element={
            <div className="flex h-screen">
              <Sidebar user={user} />
              <ProjectsTabs projects={projects} onProjectChange={handleProjectChange} isDarkMode={isDarkMode}  onThemeChange={setIsDarkMode}/>
            </div>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
