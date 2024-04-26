import React, { createContext, useReducer } from "react";

export type InitialState = {
  id: string
  text: string
  completed: boolean
}

const initialState: InitialState[] = []

const enum ReducerActionType {
  ADD_TODO,
  UPDATE_TODO,
  CHECK_TODO,
  DELETE_TODO,
  CLEAR_TODO
}

type AddTodoAction = {
  type: ReducerActionType.ADD_TODO
  payload: InitialState
}

type UpdateTodoAction = {
  type: ReducerActionType.UPDATE_TODO
  payload: Pick<InitialState, 'id' | 'text'>
}

type CheckTodoAction = {
  type: ReducerActionType.CHECK_TODO
  payload: Pick<InitialState, 'id' | 'completed'>
}

type DeleteTodoAction = {
  type: ReducerActionType.DELETE_TODO
  payload: Pick<InitialState, 'id'>
}

type ClearTodoAction = {
  type: ReducerActionType.CLEAR_TODO
}

type ReducerAction =
  | AddTodoAction
  | UpdateTodoAction
  | CheckTodoAction
  | DeleteTodoAction
  | ClearTodoAction

function reducer(state: InitialState[], action: ReducerAction): InitialState[] {
  switch (action.type) {
    case ReducerActionType.ADD_TODO: {
      return [...state, action.payload]
    }
    case ReducerActionType.UPDATE_TODO: {
      return state.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, text: action.payload.text }
        }
        return todo
      })
    }
    case ReducerActionType.CHECK_TODO: {
      return state.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, completed: action.payload.completed }
        }
        return todo
      })
    }
    case ReducerActionType.DELETE_TODO: {
      return state.filter(todo => todo.id !== action.payload.id)
    }
    case ReducerActionType.CLEAR_TODO: {
      return []
    }
    default: throw new Error('error')
  }
}

function useTodoContext() {
  const [state, dispatch] = useReducer(reducer, null, () => {
    const value = localStorage.getItem('todo')
    if (value != null) return JSON.parse(value)
    return []
  })

  const addTodo = (todo: InitialState) => dispatch({
    type: ReducerActionType.ADD_TODO,
    payload: todo
  })

  const updateTodo = (id: string, text: string) => dispatch({
    type: ReducerActionType.UPDATE_TODO,
    payload: {
      id,
      text
    }
  })

  const checkTodo = (e: React.ChangeEvent<HTMLInputElement>, id: string) => dispatch({
    type: ReducerActionType.CHECK_TODO,
    payload: {
      id,
      completed: e.target.checked
    }
  })

  const deleteTodo = (id: string) => dispatch({
    type: ReducerActionType.DELETE_TODO,
    payload: {
      id
    }
  })

  const clearTodo = () => dispatch({
    type: ReducerActionType.CLEAR_TODO
  })

  return { state, addTodo, updateTodo, checkTodo, deleteTodo, clearTodo }
}

type UseTodoContextType = ReturnType<typeof useTodoContext>

const initialTodoContextState: UseTodoContextType = {
  state: initialState,
  addTodo: () => { },
  updateTodo: () => { },
  checkTodo: () => { },
  deleteTodo: () => { },
  clearTodo: () => { },
}

export const TodoContext = createContext<UseTodoContextType>(initialTodoContextState)

type TodoProviderProps = {
  children: React.ReactElement
}

export default function TodoProvider({ children }: TodoProviderProps): React.ReactElement {
  return (
    <TodoContext.Provider value={useTodoContext()}>
      {children}
    </TodoContext.Provider>
  )
}