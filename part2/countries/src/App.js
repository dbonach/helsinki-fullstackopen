import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';

const SearchInput = (props) => {
  return (
    <div className="searchInput">
      <label htmlFor="country">Find countries: </label>
      <input
        id="country"
        value={props.countryName}
        onChange={props.handleCountryNameChange} />
    </div>
  )
}

const CountryResult = ({ country, handleCountryNameChange }) => {
  return (
    <div className="countryItem">
      <p>{country.name}</p>
      <button
        type="button"
        value={country.name}
        onClick={handleCountryNameChange}
      >Show</button>
    </div>
  )
}

const SearchResult = ({ countryName, filtered, handleCountryNameChange }) => {
  return (
    <div className='searchResult'>
      {!countryName ?
        'Type some name to search for a country' :
        filtered.length > 10 ?
          'Too many matches, specify another filter' :
          filtered.length === 1 ? '' :
            filtered.map((c) => {
              return (
                <CountryResult
                  key={c.name}
                  country={c}
                  handleCountryNameChange={handleCountryNameChange} />
              )
            })
      }
    </div>
  )
}

const CountryData = ({ filtered }) => {
  return (
    <div className="countryData">
      {filtered.length === 1 ? <CountryInfo country={filtered[0]} /> : ''}
    </div>
  )
}

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
  const [countries, setCountries] = useState([]) // All countries
  const [countryName, setCountryName] = useState('') // Input control
  const [filtered, setFiltered] = useState([]) // Filtered countries

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all?fields=name;capital;population;languages;flag')
      .then(response => {
        const list = response.data
        setCountries(list)
      })
  }, [])

  const handleCountryNameChange = (event) => {
    console.log(event.target.value);
    const filtered = countries.filter(
      c => c.name.toLowerCase().includes(event.target.value.toLowerCase())
    );

    setCountryName(event.target.value)
    setFiltered(filtered)
  }

  return (
    <div className="Wrapper">
      <h1 className="centerText">Search for a country's info</h1>
      <SearchInput
        countryName={countryName}
        handleCountryNameChange={handleCountryNameChange} />
      <br />
      <SearchResult
        countryName={countryName}
        filtered={filtered}
        handleCountryNameChange={handleCountryNameChange} />
      <CountryData filtered={filtered} />
    </div>
  );
}

export default App;
