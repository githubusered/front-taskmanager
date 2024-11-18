const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
      case 'TASK_LOADING':
          return { ...state, loading: true, error: null };

      case 'ADD_TASK_SUCCESS':
          return { ...state, loading: false, tasks: [...state.tasks, action.payload], error: null };

      case 'UPDATE_TASK_SUCCESS':
          return { ...state, loading: false, tasks:state.tasks.map((task) =>
            task._id === action.payload._id ? action.payload : task // Update the task in the array
        ), error: null };

      case 'REMOVE_TASK_SUCCESS':
          return {
              ...state,
              loading: false,
              tasks: state.tasks.filter((task) => task._id !== action.payload),
              error: null,
          };

      case 'TOGGLE_TASK_COMPLETION_SUCCESS':
          const toggledTasks = state.tasks.map((task) =>
              task._id === action.payload._id ? { ...task, completed: action.payload.completed } : task
          );
          return { ...state, loading: false, tasks: toggledTasks, error: null };

      case 'TASK_ERROR':
          return { ...state, loading: false, error: action.payload };

      case 'GET_TASKS_SUCCESS':
          return { ...state, loading: false, tasks: action.payload, error: null };

      case 'LOGOUT':
          return initialState; // Reset state on logout

      default:
          return state;
  }
};

export default taskReducer;
