import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';

const CountryInfo = ({ country }) => {
  return (
    <>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h4>Languages</h4>
      <ul>
        {country.languages.map((lang) => <li key={lang.name}>{lang.name}</li>)}
      </ul>
      <h4>Flag:</h4>
      <div className="flag">
        <img src={country.flag} alt="Country's flag" />
      </div>
    </>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [countryName, setCountryName] = useState('')
  const [filtered, setFiltered] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all?fields=name;capital;population;languages;flag')
      .then(response => {
        const list = response.data
        setCountries(list)
      })
  }, [])

  const handleCountryNameChange = (event) => {
    const filtered = countries.filter(
      c => c.name.toLowerCase().includes(event.target.value.toLowerCase())
    );

    setCountryName(event.target.value)
    setFiltered(filtered)
  }

  return (
    <div className="Wrapper">
      <h1 className="centerText">Search for a country's info</h1>
      <div className="searchInput">
        <label htmlFor="country">Find countries: </label>
        <input
          id="country"
          value={countryName}
          onChange={handleCountryNameChange} />
      </div>
      <br />
      <div className='searchResult'>
        {!countryName ?
          'Type some name to search for a country' :
          filtered.length > 10 ?
            'Too many matches, specify another filter' :
            filtered.length === 1 ? '' :
              filtered.map((c) => <p key={c.name}>{c.name}</p>)
        }
      </div>
      <div className="countryData">
        {filtered.length === 1 ? <CountryInfo country={filtered[0]} /> : ''}
      </div>
    </div>
  );
}

export default App;
