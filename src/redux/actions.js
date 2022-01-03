import {
  INIT_TODOS,
  UPDATE_TODO,
  EDIT_TODO,
  ADD_TODO,
  INIT_TOMATOS,
  ADD_TOMATO,
  UPDATE_TOMATO,
} from "./actiontypes";

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

export function initTomatos(payload) {
  return {
    type: INIT_TOMATOS,
    payload,
  };
}

export function addTomato(payload) {
  return {
    type: ADD_TOMATO,
    payload,
  };
}

export function updateTomato(payload) {
  return {
    type: UPDATE_TOMATO,
    payload,
  };
}
