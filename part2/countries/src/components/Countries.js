import SingleCountry from "./SingleCountry";
import CountryList from "./CountryList";

const Countries = ({
  countries,
  newFilter,
  singleCountry,
  setSingleCountry,
}) => {
  let countriesToShow;
  if (singleCountry.length) {
    countriesToShow = singleCountry;
  } else
    countriesToShow = newFilter
      ? countries.filter((country) =>
          country.name.common.toLowerCase().match(newFilter.toLowerCase())
        )
      : [];

  if (countriesToShow.length === 0) return <p></p>;
  if (countriesToShow.length > 10)
    return <p>Too many matches, specify another filter</p>;

  return countriesToShow.length > 1 ? (
    <ul>
      {countriesToShow.map((country) => (
        <CountryList
          key={country.name.common}
          country={country}
          setShowSingleCountry={setSingleCountry}
        />
      ))}
    </ul>
  ) : (
    <SingleCountry country={countriesToShow[0]} />
  );
};
export default Countries;
