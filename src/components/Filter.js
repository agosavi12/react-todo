const Filter = ({ setFilter }) => {
  const onFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="col-12 col-sm-4 mb-3">
      <select className="form-select" onChange={onFilterChange}>
        <option value="all">All</option>
        <option value="favourite">Favourite</option>
      </select>
    </div>
  );
};

export default Filter;
