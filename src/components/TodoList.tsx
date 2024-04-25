import React from 'react'
import Todo from './Todo'
import { InitialState } from '../contexts/TodoContext'

type TodoListProps = {
  state: InitialState[]
}

export default function TodoList({ state }: TodoListProps) {
  return (
    <section className=''>
      <ul className='grid gap-4'>
        {state?.map(todo => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </ul>
    </section>
  )
}
