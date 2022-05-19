import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState("");
  const [singleCountry, setSingleCountry] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
    setSingleCountry([]);
  };
  if (!countries.length)
    return <h1>loading country data</h1>; // awaits for country data
  else
    return (
      <>
        <Filter handleFilterChange={handleFilterChange} newFilter={newFilter} />
        <Countries
          countries={countries}
          newFilter={newFilter}
          singleCountry={singleCountry}
          setSingleCountry={setSingleCountry}
        />
      </>
    );
};

export default App;
