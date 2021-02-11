import React, {useState, useRef, useEffect} from 'react'
import TodoList from './TodoList'
import uuidv4 from 'uuid/dist/v4'


function App() {
  const [todos, setTodos] = useState([])
   const [textValue, setTextValue] = useState('')
   const todoNameRef = useRef();
  useEffect(() => {
   const storedTodos =JSON.parse(localStorage.getItem('todoApp'))
   if (storedTodos) setTodos(storedTodos)
  }, [])


  useEffect(() => {
    localStorage.setItem('todoApp', JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleDelete() {
    const newTodos = todos.filter(todo => !todo.complete)
  
    setTodos(newTodos)
  }

  function handleChange() {
    const name = todoNameRef.current.value
    setTextValue(name)
  }
  function handleAddTodo(e) {
  const name = todoNameRef.current.value
      if (name === '') return
    
    setTodos(prevTodos => {
      return  [...prevTodos, {id: uuidv4(), name: name, complete: false}] 
    });
    todoNameRef.current.value = null
    setTextValue('')
  }

  return (
    <>
    <TodoList todos={todos} toggleTodo={toggleTodo} />
    <input onChange={handleChange} ref={todoNameRef} type="text" />
    <button onClick={handleAddTodo} disabled={textValue === '' ? true : false}>Add Todo</button>
    <button onClick={handleDelete} disabled={todos.filter(todo => todo.complete).length === 0 ? true : false}>Delete Complete</button>
    <div>{todos.filter(todo => !todo.complete).length} left to do </div>
    </>
  )
}

export default App;
