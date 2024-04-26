import React, { useContext, useState } from 'react'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import { TodoContext } from './contexts/TodoContext'
import { useLocalStorage } from './hooks/useLocalStorage'

export default function App() {
  const { state, clearTodo } = useContext(TodoContext)
  const [isChecked, setIsChecked] = useState(false)

  const todos = isChecked ? state.filter(todo => !todo.completed) : state

  useLocalStorage('todo', state)

  const todoCount = todos.filter(todo => !todo.completed).length
  const todoText = todoCount !== 1 ? 'todos' : 'todo'

  return (
    <div className='mx-4 sm:mx-auto sm:max-w-lg bg-white p-4 my-4 rounded-lg'>
      <header>
        <div className='flex flex-col gap-2'>
          <div className='flex justify-between items-center'>
            <h1 className='text-2xl font-medium'>Todo List</h1>
            <p>{todoCount} {todoText} left</p>
          </div>
          <div className='flex justify-between items-center'>
            <div>
              <input
                type="checkbox"
                id='checkbox'
                checked={isChecked}
                onChange={e => setIsChecked(e.target.checked)}
              />
              <label
                htmlFor="checkbox"
                className='ml-2'
              >
                Show only active todos
              </label>
            </div>
            <button
              onClick={() => {
                clearTodo()
              }}
              className='bg-green-400 hover:bg-green-500 text-white px-2 rounded'
            >
              Clear todos
            </button>
          </div>
        </div>
        <TodoForm />
      </header>
      <main>
        <TodoList state={todos} />
      </main>
    </div>
  )
}
