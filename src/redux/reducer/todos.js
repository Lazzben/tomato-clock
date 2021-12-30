import { INIT_TODOS, UPDATE_TODO, EDIT_TODO, ADD_TODO } from "../actiontypes";

// reducer 只是为了管理 state，根据 action 告诉 state 该如何变化。
// 其中 action = {type, payload}
function todos(state, action) {
  state = state || [];
  switch (action.type) {
    case INIT_TODOS:
      return [...action.payload];
    case ADD_TODO:
      return [action.payload, ...state]
    case UPDATE_TODO:
      return state.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
    case EDIT_TODO:
      return state.map((todo) => {
        if (todo.id === action.payload) {
          todo.isEditing = true;
          return todo;
        } else {
          todo.isEditing = false;
          return todo;
        }
      });
    default:
      return state;
  }
}

export default todos;
