import { INIT_TODOS, UPDATE_TODO, EDIT_TODO, ADD_TODO } from "./actiontypes";

export function initTodos(payload) {
  return {
    type: INIT_TODOS,
    payload,
  };
}

export function updateTodo(payload) {
  return {
    type: UPDATE_TODO,
    payload,
  };
}

export function editTodo(payload) {
  return {
    type: EDIT_TODO,
    payload,
  };
}

export function addTodo(payload) {
  return {
    type: ADD_TODO,
    payload,
  };
}
