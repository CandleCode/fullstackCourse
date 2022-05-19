const Filter = ({ newFilter, handleFilterChange }) => (
  <>
    find countries
    <input value={newFilter} onChange={handleFilterChange} />
  </>
);

export default Filter;
