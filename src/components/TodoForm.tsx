import React, { useContext, useState } from 'react'
import { nanoid } from 'nanoid'
import { TodoContext } from '../contexts/TodoContext'

export default function TodoForm() {
  const { addTodo } = useContext(TodoContext)
  const [text, setText] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!text) return
    const todo = {
      id: nanoid(),
      text,
      completed: false
    }
    addTodo(todo)
    setText('')
  }

  return (
    <form className='flex gap-2 mt-4' onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        className='flex-1 border rounded border-blue-400 px-4'
      />
      <button className='bg-blue-400 hover:bg-blue-500 text-white rounded px-4 py-1'>Add</button>
    </form>
  )
}
