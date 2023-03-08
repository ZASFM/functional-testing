import { Routes, Route } from "react-router-dom";
import TodoItem from "./TodoItem";
import TodoList from "./TodoList";

const App = () => {
  return (
    <div className="App">
      <div className="App-body">
        <div>Todo app</div>
        <Routes>
          <Route path="/item/:id" element={<TodoItem />} />
          <Route path="/" element={<TodoList />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;