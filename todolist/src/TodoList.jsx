import { useState } from "react";

function TodoList() {
  const [todo, setTodo] = useState("");
  const [list, setList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    setTodo(e.target.value);
  };

  const addOrEditTodo = () => {
    if (todo.trim() === "") {
      alert("Todo cannot be empty!");
      return;
    }

    if (isEditing) {
      const updatedList = list.map((item, index) =>
        index === editIndex ? { ...item, text: todo } : item
      );
      setList(updatedList);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setList([...list, { text: todo.trim(), completed: false }]);
    }

    setTodo(""); // Clear the input field
  };

  const deleteTodo = (index) => {
    const newList = list.filter((_, i) => i !== index);
    setList(newList);
  };

  const toggleComplete = (index) => {
    const updatedList = list.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    setList(updatedList);
  };

  const editTodo = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    setTodo(list[index].text);
  };

  const completedCount = list.filter((item) => item.completed).length;
  const uncompletedCount = list.length - completedCount;

  return (
    <div className="container mt-5">
      <h2 className="text-center">Todo List</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          value={todo}
          onChange={handleInputChange}
          className="form-control"
          placeholder={isEditing ? "Edit todo" : "Enter a new todo"}
        />
        <button onClick={addOrEditTodo} className="btn btn-primary">
          {isEditing ? "Save" : "Add"}
        </button>
      </div>
      <div className="card mt-3">
        <ul className="list-group list-group-flush">
          {list.length > 0 ? (
            list.map((item, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <span
                    onClick={() => toggleComplete(index)}
                    style={{
                      textDecoration: item.completed ? "line-through" : "none",
                      cursor: "pointer",
                    }}
                  >
                    {item.text}
                  </span>
                </div>
                <div>
                  <button
                    onClick={() => editTodo(index)}
                    className="btn btn-warning btn-sm me-2"
                  >
                    <i className="bi bi-pencil mx-2"></i>
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(index)}
                    className="btn btn-danger btn-sm"
                  >
                    <i className="bi bi-x-lg mx-1"></i>
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="list-group-item text-center">
              No todos available. Add a new one!
            </li>
          )}
        </ul>
        <div className="card-header">
          <span>Tasks Completed: {completedCount}</span> |{" "}
          <span>Tasks Not Completed: {uncompletedCount}</span>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
