import React, { useState } from "react";
import "./Todo.css";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [formData, setFormData] = useState({
    date: "",
    priority: "Medium",
    task: "",
    completed: false,
  });

  const handleAddEditTodo = () => {
    if (editingTodo !== null) {
      const updatedTodos = todos.map((todo, index) =>
        index === editingTodo ? { ...formData } : todo
      );
      setTodos(updatedTodos);
    } else {
      setTodos([...todos, formData]);
    }
    setModalVisible(false);
    setEditingTodo(null);
    setFormData({ date: "", priority: "Medium", task: "", completed: false });
  };

  const handleEdit = (index) => {
    setEditingTodo(index);
    setFormData(todos[index]);
    setModalVisible(true);
  };

  const handleDelete = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <button onClick={() => setModalVisible(true)}>Add Todo</button>
      <table> 
        <thead>
          <tr>
            <th>Date of Item</th>
            <th>Priority</th>
            <th>Task</th>
            <th>Completed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={index}>
              <td>{todo.date}</td>
              <td>{todo.priority}</td>
              <td>{todo.task}</td>
              <td>{todo.completed ? "Yes" : "No"}</td>
              <td>
               <div className="action-buttons">
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editingTodo !== null ? "Edit Todo" : "Add Todo"}</h2>
            <label>Date of Item : </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
            <label>Priority : </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <label>Task : </label>
            <input
              type="text"
              value={formData.task}
              onChange={(e) => setFormData({ ...formData, task: e.target.value })}
            />
            <label id="checkboxoptn">
              <input
                type="checkbox"
                checked={formData.completed}
                onChange={(e) => setFormData({ ...formData, completed: e.target.checked })}
              />
              Completed
            </label>
            <div className="btn">
            <button onClick={handleAddEditTodo}>Save</button>
            <button onClick={() => setModalVisible(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoApp;
