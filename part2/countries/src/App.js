import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';

const SearchInput = ({ countryName, handleCountryNameChange }) => {
  return (
    <div className="searchInput">
      <label htmlFor="country">Find countries: </label>
      <input
        id="country"
        value={countryName}
        onChange={handleCountryNameChange} />
    </div>
  );
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
  );
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
              );
            })
      }
    </div>
  );
}

const Weather = ({ api_key, weather }) => {

  if (weather) {
    return (
      <div className="weather">
        <h3>Weather in {weather.location.name}</h3>
        <p><strong>Temperature:</strong> {weather.current.temperature}&#176; Celsius</p>
        <img src={weather.current.weather_icons[0]} alt="Weather symbol" />
        <p>
          <strong>Wind: </strong>
          {weather.current.wind_speed} mph direction {weather.current.wind_dir}
        </p>
      </div>
    );
  }

  return null
}

const CountryInfo = ({ country, api_key, weather }) => {
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
      <img id="flag" src={country.flag} alt="Country's flag" />
      <Weather
        api_key={api_key}
        weather={weather} />
    </>
  )
}

const CountryData = ({ filtered, api_key, weather }) => {

  if (filtered.length === 1) {
    return (
      <div className="countryData">
        <CountryInfo
          api_key={api_key}
          country={filtered[0]}
          weather={weather} />
      </div>
    );
  }

  return null;
}


const App = () => {
  const [countries, setCountries] = useState([]) // All countries and infos
  const [countryName, setCountryName] = useState('') // Control input for country
  const [capital, setCapital] = useState("") // Capital to reference for weather fetch
  const [filtered, setFiltered] = useState([]) // List of filtered countries based on the input
  const [weather, setWeather] = useState("") // Data fetched from the weather service
  const api_key = process.env.REACT_APP_API_KEY

  // Fetch all countries information in the first render
  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all?fields=name;capital;population;languages;flag')
      .then(response => {
        const list = response.data
        setCountries(list)
      })
  }, [])

  // Fetch weather information when capital changes
  useEffect(() => {
    // Guarantee no fetch in the first render
    if (capital) {
      axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
        .then(response => {
          const weather = response.data
          setWeather(weather)
        })
    }
  }, [capital, api_key])

  /* Control input, filter countries based on the input,
  set the capital name, triggering a fetch for weather info */
  const handleCountryNameChange = (event) => {
    const filtered = countries.filter(
      c => c.name.toLowerCase().includes(event.target.value.toLowerCase())
    );

    if (filtered.length === 1) {
      setCapital(filtered[0].capital);
      // If a different country is selected, clear weather info
      if (filtered[0].capital !== capital) {
        setWeather("")
      }
    }

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
      <CountryData
        filtered={filtered}
        api_key={api_key}
        weather={weather} />
    </div>
  );
}

export default App;
