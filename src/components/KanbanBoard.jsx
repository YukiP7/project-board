import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";
import Column from "./Column";
import Sidebar from "./Sidebar";
import ProjectProgress from "./ProjectProgress";
import ProjectSelector from "./ProjectSelector";
import AddTaskModal from "./AddTaskModal";

export default function KanbanBoard({ user, projects, isDarkMode, onThemeChange }) {
  const navigate = useNavigate();
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(projects[0]);

  const [tasks, setTasks] = useState({
    todo: [
      { id: "1", title: "Design UI", priority: "high", dueDate: "2024-03-25", assignee: "John" },
      { id: "2", title: "Fix Bugs", priority: "medium", dueDate: "2024-03-26", assignee: "Sarah" }
    ],
    inprogress: [
      { id: "3", title: "Write Code", priority: "high", dueDate: "2024-03-24", assignee: "Mike" }
    ],
    done: [
      { id: "4", title: "Deploy App", priority: "low", dueDate: "2024-03-23", assignee: "Emma" }
    ],
  });

  const onDragEnd = (result) => {
    console.log("Drag Event:", result); // Debugging
  
    if (!result.destination) return;
  
    const { source, destination } = result;
  
    // Ensure the source and destination columns exist
    if (!tasks[source.droppableId] || !tasks[destination.droppableId]) {
      console.error("Invalid Droppable ID:", source.droppableId, destination.droppableId);
      return;
    }
  
    // Copy the columns
    const sourceColumn = Array.from(tasks[source.droppableId]);
    const destColumn = Array.from(tasks[destination.droppableId]);
  
    // Remove the dragged item from source column
    const [movedTask] = sourceColumn.splice(source.index, 1);
  
    // Add the dragged item to destination column
    destColumn.splice(destination.index, 0, movedTask);
  
    // Update state immutably
    setTasks((prevTasks) => ({
      ...prevTasks,
      [source.droppableId]: sourceColumn,
      [destination.droppableId]: destColumn,
    }));
  
    console.log("Updated Tasks:", tasks);
  };
  

  
  

  const handleAddTask = (newTask) => {
    setTasks({
      ...tasks,
      todo: [...tasks.todo, newTask]
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {/* <div className="flex h-screen bg-gray-900"> */}
        {/* <Sidebar user={user} /> */}
        
        <div className="flex-1  flex-col overflow-hidden flex h-screen bg-gray-900 ">
          <header className="bg-gray-800 shadow-lg">
            <div className="px-6 py-4 flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-white">Project Dashboard</h1>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => onThemeChange(!isDarkMode)}
                  className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors duration-200"
                >
                  {isDarkMode ? (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </button>
                <button
                  onClick={() => navigate('/settings')}
                  className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </header>
          
          <main className={`flex-1 overflow-x-hidden overflow-y-auto ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
            <div className="container mx-auto px-6 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2">
                  <ProjectProgress tasks={tasks} isDarkMode={isDarkMode} />
                </div>
                <div>
                  <ProjectSelector
                    isDarkMode={isDarkMode}
                    projects={projects}
                    currentProject={currentProject}
                    onProjectChange={setCurrentProject}
                  />
                </div>
              </div>
              
              <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex flex-col md:flex-row gap-6">
                  <Column title="todo" tasks={tasks.todo} isDarkMode={isDarkMode}   />
                  <Column title="inprogress" tasks={tasks.inprogress} isDarkMode={isDarkMode} />
                  <Column title="done" tasks={tasks.done} isDarkMode={isDarkMode} />
                </div>

                <p className="text-gray-500 text-sm mt-1">* You can drag and drop the tasks to the desired list</p>
              </DragDropContext>
            </div>
          </main>
      </div>

      {/* Add Task Button */}
      <button
        onClick={() => setShowAddTaskModal(true)}
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={showAddTaskModal}
        onClose={() => setShowAddTaskModal(false)}
        onAddTask={handleAddTask}
      />
    </DragDropContext>
  );
}
