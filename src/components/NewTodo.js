//styles
import { useState } from "react";
import "./NewTodo.css";

const NewTodo = ({ addTodos }) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title === "" || title.length <= 3) {
      setError("Oops!, Please enter valid todo.");
      return;
    }

    const newTodo = {
      title: title,
      favourite: false,
      id: Math.floor(Math.random() * 10000),
    };

    addTodos(newTodo);

    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Your Todo"
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={() => setError(false)}
          value={title}
        />
        <button className="btn btn-primary submit-btn">
          <i className="bi bi-plus-square-fill"></i>
        </button>
      </div>

      {error && (
        <div className="mt-3 text-center" style={{ color: "red" }}>
          <p>{error}</p>
        </div>
      )}
    </form>
  );
};

export default NewTodo;
