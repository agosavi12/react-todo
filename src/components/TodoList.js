//styles
import "./TodoList.css";

const TodoList = ({
  todos,
  deleteTodo,
  favouriteHandler,
  filteredTodos,
  searchTerm,
}) => {
  return (
    <div className="todoList">
      {todos
        .filter((val) => {
          if (searchTerm === "") {
            return val;
          } else if (
            val.title.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return val;
          }
        })
        .map((todo) => (
          <div
            className={`todo mb-3 ${todo.favourite ? "favourite" : ""}`}
            key={todo.id}
          >
            <div className="row align-items-center">
              <div className="col-9 todoText">
                <p className={`mb-0`}>{todo.title.toUpperCase()}</p>
              </div>
              <div className="col-3 d-grid gap-2 d-flex justify-content-end">
                <button
                  className="btn btn-secondary favourite-btn"
                  type="button"
                  onClick={() => favouriteHandler(todo.id)}
                >
                  <i className="bi bi-star-fill"></i>
                </button>
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => deleteTodo(todo.id)}
                >
                  <i className="bi bi-trash-fill"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TodoList;
