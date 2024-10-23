"use client"

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const TodoList = () => {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch('http://localhost:5000/api/todos')
      if (!response.ok) {
        throw new Error('Failed to fetch todos')
      }
      const data = await response.json()
      setTodos(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching todos:', error)
      setError('Failed to load todos. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const addTodo = async (e) => {
    e.preventDefault()
    if (!newTodo.trim()) return

    try {
      setError(null)
      const response = await fetch('http://localhost:5000/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTodo }),
      })
      if (!response.ok) {
        throw new Error('Failed to add todo')
      }
      const data = await response.json()
      setTodos([...todos, data])
      setNewTodo('')
    } catch (error) {
      console.error('Error adding todo:', error)
      setError('Failed to add todo. Please try again.')
    }
  }

  const toggleTodo = async (id) => {
    const todoToUpdate = todos.find(todo => todo.id === id)
    if (!todoToUpdate) return

    try {
      setError(null)
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !todoToUpdate.completed }),
      })
      if (!response.ok) {
        throw new Error('Failed to update todo')
      }
      const updatedTodo = await response.json()
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo))
    } catch (error) {
      console.error('Error updating todo:', error)
      setError('Failed to update todo. Please try again.')
    }
  }

  return (
    <div className="w-full m-auto max-w-md">
      <form onSubmit={addTodo} className="mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="w-full text-black p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="mt-2 w-full bg-blue-500 text-white p-2 rounded">
          Add Todo
        </button>
      </form>
      {isLoading && <p>Loading todos...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!isLoading && !error && (
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between p-2 border-b border-gray-200"
            >
              <span
                className={`cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''}`}
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.title}
              </span>
            </li>
          ))}
        </ul>
      )}
      {!isLoading && !error && todos.length === 0 && (
        <p>No todos yet. Add one above!</p>
      )}
    </div>
  )
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ),
}

export default TodoList