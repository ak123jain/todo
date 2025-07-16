"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

interface Todo {
  id: number
  text: string
  completed: boolean
  createdAt: Date
}

type FilterType = "all" | "active" | "completed"

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState("")
  const [filter, setFilter] = useState<FilterType>("all")

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos")
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos).map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
      }))
      setTodos(parsedTodos)
    }
  }, [])

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
        createdAt: new Date(),
      }
      setTodos([newTodo, ...todos])
      setInputValue("")
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed))
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed
    if (filter === "completed") return todo.completed
    return true
  })

  const activeTodosCount = todos.filter((todo) => !todo.completed).length
  const completedTodosCount = todos.filter((todo) => todo.completed).length

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Todo App</h1>
          <p className="text-gray-600">Stay organized and get things done</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Add New Todo</span>
              <Badge variant="secondary">{activeTodosCount} active</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="What needs to be done?"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={addTodo} disabled={!inputValue.trim()}>
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Filter Todos</CardTitle>
              {completedTodosCount > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearCompleted}
                  className="text-red-600 hover:text-red-700 bg-transparent"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear Completed ({completedTodosCount})
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
                All ({todos.length})
              </Button>
              <Button
                variant={filter === "active" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("active")}
              >
                Active ({activeTodosCount})
              </Button>
              <Button
                variant={filter === "completed" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("completed")}
              >
                Completed ({completedTodosCount})
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {filter === "all" && "All Todos"}
              {filter === "active" && "Active Todos"}
              {filter === "completed" && "Completed Todos"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredTodos.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {filter === "all" && "No todos yet. Add one above!"}
                {filter === "active" && "No active todos. Great job!"}
                {filter === "completed" && "No completed todos yet."}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredTodos.map((todo) => (
                  <div
                    key={todo.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                      todo.completed ? "bg-gray-50 border-gray-200" : "bg-white border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={() => toggleTodo(todo.id)}
                      className="flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm font-medium transition-all ${
                          todo.completed ? "line-through text-gray-500" : "text-gray-900"
                        }`}
                      >
                        {todo.text}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {todo.createdAt.toLocaleDateString()} at{" "}
                        {todo.createdAt.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteTodo(todo.id)}
                      className="flex-shrink-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {todos.length > 0 && (
          <div className="mt-6 text-center text-sm text-gray-500">
            Total: {todos.length} todos • Active: {activeTodosCount} • Completed: {completedTodosCount}
          </div>
        )}
      </div>
    </div>
  )
}
