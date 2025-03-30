import { Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";

export default function Column({ title, tasks , isDarkMode}) {
  console.log("Task IDs:", tasks);

  return (
    <Droppable droppableId={title.toLowerCase()}>
      {(provided) => (
        <div 
        ref={provided.innerRef}
        {...provided.droppableProps}
        className={`column column-${title} w-full md:w-80 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl`}>
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className="flex items-center">
              <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} capitalize`}>{title.replace("-", " ")}</h2>
              <span className="ml-2 px-2 py-1 text-xs font-medium bg-gray-700 text-gray-300 rounded-full">
                {tasks.length}
              </span>
            </div>
            {/* <button className="p-1 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors duration-200">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button> */}
          </div>

          
          
          <div className="p-4 space-y-3">
            {(tasks || []).map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}
