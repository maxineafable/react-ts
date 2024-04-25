import React, { useContext, useState } from 'react'
import { InitialState, TodoContext } from '../contexts/TodoContext'

type TodoProps = {
  todo: InitialState
}
export default function Todo({ todo }: TodoProps) {
  const { updateTodo, checkTodo, deleteTodo } = useContext(TodoContext)
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(todo.text)

  return (
    <li className='first:mt-8 flex items-center gap-2'>
      {isEditing ? (
        <>
          <input
            type="text"
            id={todo.id}
            value={text}
            onChange={e => setText(e.target.value)}
            className='flex-1 border border-blue-400 rounded px-4'
          />
          <div>
            <button
              onClick={() => {
                if (!text) return
                updateTodo(todo.id, text)
                setIsEditing(false)
              }}
              className='mr-2 bg-green-400 hover:bg-green-500 px-2 rounded text-white'
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className='bg-red-400 hover:bg-red-500 px-2 rounded text-white'
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            id={todo.id}
            checked={todo.completed}
            onChange={e => checkTodo(e, todo.id)}
          />
          <label className={`flex-1 hover:text-blue-600  ${todo.completed && 'line-through text-gray-400'}`} htmlFor={todo.id}>
            {todo.text}
          </label>
          <div>
            <button
              onClick={() => setIsEditing(true)}
              className='mr-2 bg-yellow-400 hover:bg-yellow-500 px-2 rounded text-white'
            >
              Edit
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className='bg-red-400 hover:bg-red-500 px-2 rounded text-white'
            >
              Delete
            </button>
          </div>
        </>
      )
      }
    </li >
  )
}
