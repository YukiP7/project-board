import { Draggable } from "react-beautiful-dnd";

export default function TaskCard({ task, index }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-900/50 text-red-200 border-red-500';
      case 'medium':
        return 'bg-yellow-900/50 text-yellow-200 border-yellow-500';
      case 'low':
        return 'bg-green-900/50 text-green-200 border-green-500';
      default:
        return 'bg-gray-700 text-gray-300 border-gray-600';
    }
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`task-card bg-gray-800 rounded-lg shadow-lg border border-gray-700 hover:border-gray-600 transition-all duration-300 ${
            snapshot.isDragging ? "bg-gray-200 shadow-xl" : ""
          }`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex items-start justify-between p-4">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-white">{task.title}</h3>
              <div className="mt-1 flex items-center text-xs text-gray-400">
                <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {task.dueDate}
              </div>
            </div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
          </div>
          
          <div className="px-4 pb-4 flex items-center">
            <div className="flex-shrink-0">
              <img className="h-6 w-6 rounded-full ring-2 ring-gray-700" src={`https://ui-avatars.com/api/?name=${task.assignee}&background=random`} alt={task.assignee} />
            </div>
            <div className="ml-2">
              <p className="text-xs font-medium text-gray-300">{task.assignee}</p>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
