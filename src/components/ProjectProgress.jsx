export default function ProjectProgress({ tasks , isDarkMode}) {
  const totalTasks = Object.values(tasks).reduce((acc, curr) => acc + curr.length, 0);
  const completedTasks = tasks.done.length;
  const inProgressTasks = tasks.inProgress.length;
  const todoTasks = tasks.todo.length;

  const completionPercentage = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const getOverdueTasks = () => {
    const today = new Date();
    return Object.values(tasks).reduce((acc, column) => {
      return acc + column.filter(task => {
        const dueDate = new Date(task.dueDate);
        return dueDate < today && task.priority === 'high';
      }).length;
    }, 0);
  };

  const overdueTasks = getOverdueTasks();

  return (
    <div className={`rounded-lg p-6 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}  `}>
      <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} `}>Project Progress</h2>
      
      {/* Progress Bar */}
      <div className="mb-6">
        <div className={`flex justify-between text-sm ${isDarkMode ? 'text-gray-100' : 'text-gray-700'} mb-2`}>
          <span>Overall Progress</span>
          <span>{completionPercentage}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="text-2xl font-bold text-white mb-1">{totalTasks}</div>
          <div className="text-sm text-gray-400">Total Tasks</div>
        </div>
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-400 mb-1">{completedTasks}</div>
          <div className="text-sm text-gray-400">Completed</div>
        </div>
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-400 mb-1">{inProgressTasks}</div>
          <div className="text-sm text-gray-400">In Progress</div>
        </div>
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="text-2xl font-bold text-red-400 mb-1">{overdueTasks}</div>
          <div className="text-sm text-gray-400">Overdue</div>
        </div>
      </div>

      {/* Task Distribution */}
      <div className="mt-6">
        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Task Distribution</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <div className={`w-24 text-sm ${isDarkMode ? 'text-gray-100' : 'text-gray-700'}`}>To Do</div>
            <div className="flex-1 bg-gray-700 rounded-full h-2">
              <div
                className="bg-red-500 h-2 rounded-full"
                style={{ width: `${(todoTasks / totalTasks) * 100}%` }}
              ></div>
            </div>
            <div className={`w-12 text-right text-sm ${isDarkMode ? 'text-gray-100' : 'text-gray-700'}`}>{todoTasks}</div>
          </div>
          <div className="flex items-center">
            <div className={`w-24 text-sm ${isDarkMode ? 'text-gray-100' : 'text-gray-700'}`}>In Progress</div>
            <div className="flex-1 bg-gray-700 rounded-full h-2">
              <div
                className="bg-yellow-500 h-2 rounded-full"
                style={{ width: `${(inProgressTasks / totalTasks) * 100}%` }}
              ></div>
            </div>
            <div className={`w-12 text-right text-sm ${isDarkMode ? 'text-gray-100' : 'text-gray-700'}`}>{inProgressTasks}</div>
          </div>
          <div className="flex items-center">
            <div className={`w-24 text-sm ${isDarkMode ? 'text-gray-100' : 'text-gray-700'}`}>Done</div>
            <div className="flex-1 bg-gray-700 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
              ></div>
            </div>
            <div className={`w-12 text-right text-sm ${isDarkMode ? 'text-gray-100' : 'text-gray-700'}`}>{completedTasks}</div>
          </div>
        </div>
      </div>
    </div>
  );
} 