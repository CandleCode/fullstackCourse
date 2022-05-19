const CountryList = ({ country, setShowSingleCountry }) => {
  const handleClick = () => setShowSingleCountry([country]);
  return (
    <li>
      {country.name.common}
      <button onClick={handleClick}>show</button>
    </li>
  );
};
export default CountryList;
