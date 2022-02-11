export const Pagination = ({
  todoPerPage,
  totalTodos,
  paginate,
  currentTodo,
}) => {
  let pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalTodos / todoPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <nav>
      <ul className="pagination justify-content-center">
        {pageNumber.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} href="!#" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
