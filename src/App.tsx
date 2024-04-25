import React, { useContext } from 'react'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import { TodoContext } from './contexts/TodoContext'
import { useLocalStorage } from './hooks/useLocalStorage'

export default function App() {
  const { state } = useContext(TodoContext)

  useLocalStorage('todo', state)

  const todoCount = state.filter(todo => !todo.completed).length
  const todoText = todoCount !== 1 ? 'todos' : 'todo'

  return (
    <div className='mx-4 sm:mx-auto sm:max-w-lg bg-white p-4 my-4 rounded-lg'>
      <header>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-medium'>Todo List</h1>
          <p>{todoCount} {todoText} left</p>
        </div>
        <TodoForm />
      </header>
      <main>
        <TodoList state={state} />
      </main>
    </div>
  )
}
