import { INIT_TOMATOS, ADD_TOMATO, UPDATE_TOMATO } from "../actiontypes";

// reducer 只是为了管理 state，根据 action 告诉 state 该如何变化。
// 其中 action = {type, payload}
function tomatos(state, action) {
  state = state || [];
  switch (action.type) {
    case INIT_TOMATOS:
      return [...action.payload];
    case ADD_TOMATO:
      return [action.payload, ...state];
    case UPDATE_TOMATO:
      return state.map((tomato) =>
        tomato.id === action.payload.id ? action.payload : tomato
      );
    default:
      return state;
  }
}

export default tomatos;
