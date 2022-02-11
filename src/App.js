//styles
import { useState, useEffect } from "react";
import styles from "./App.module.css";
//assets
import logo from "./assets/images/todo-img.png";
import Day from "./components/Day";
import Filter from "./components/Filter";
import NewTodo from "./components/NewTodo";
import { Pagination } from "./components/Pagination";
// import Search from "./components/Search";
import TodoList from "./components/TodoList";

function App() {
  const LOCAL_STORAGE_KEY = "todos";

  const [todos, setTodos] = useState([
    { title: "Feed Dogs", favourite: false, id: "1" },
    { title: "Call Parents", favourite: false, id: "2" },
    { title: "Make new HTML", favourite: false, id: "3" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [todoPerPage] = useState(4);

  //get current todo
  const indexOfLastTodo = currentPage * todoPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todoPerPage;
  const currentTodo = filteredTodos
    .filter((val) => {
      if (searchTerm === "") {
        return val;
      } else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return val;
      }
    })
    .slice(indexOfFirstTodo, indexOfLastTodo);

  //change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    filterHandler();
  }, [todos, filter]);

  const filterHandler = () => {
    switch (filter) {
      case "favourite":
        setFilteredTodos(todos.filter((todo) => todo.favourite === true));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodos = (newTodo) => {
    setTodos((prevTodos) => {
      return [newTodo, ...prevTodos];
    });
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => {
        return id !== todo.id;
      });
    });
  };

  const favouriteHandler = (id) => {
    setTodos(
      todos.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            favourite: !item.favourite,
          };
        }
        return item;
      })
    );
  };

  return (
    <div className="App">
      <div className={styles.customecontainer}>
        <div className="row d-flex justify-content-center mb-4">
          <div className="col-3">
            <img src={logo} className="logo img-fluid" alt="logo" />
          </div>
        </div>

        <div className="row mb-4">
          <p
            className="mb-0 text-center"
            style={{ color: "white", fontWeight: "bold", fontSize: "22px" }}
          >
            <span>Wohooo!</span>, it's {<Day />}
          </p>
        </div>

        <div className="row mb-4">
          <NewTodo addTodos={addTodos} />
        </div>

        <div className="row">
          <div className="searchFilters mb-3">
            <div className="row">
              <Filter setFilter={setFilter} />
              <div className="col-12 col-sm-6 offset-md-2">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search Your Todo"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <TodoList
            todos={currentTodo}
            searchTerm={searchTerm}
            filteredTodos={filteredTodos}
            deleteTodo={deleteTodo}
            favouriteHandler={favouriteHandler}
          />
        </div>

        <div className="row">
          <Pagination
            todoPerPage={todoPerPage}
            totalTodos={filteredTodos.length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
