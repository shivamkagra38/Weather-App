import React from 'react';
import { useState } from 'react';

const API_KEY = "bd7024ada82e9c1401fd14565ecfa44b";

const dateBuilder = (currentDate) =>
{
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["Januray","February","March","April","May","June","July","August","September",
                  "October", "November", "December"];

  return `${currentDate.getDate()} ${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
}

const SearchBar = () => {

  const[inputField, setInputField] = useState("");
  const[weather, setWeather] = useState({cod : -1});
  const[loading, setLoading] = useState("");

  //Updating input field
  const inputFunction = (e) =>
  {
    setInputField(e.target.value);
  }

  //Search button clicked
  const searchButtonClicked  = async () =>
  {
    
    setLoading("Loading...");

    let cityName = inputField;

    if(cityName.toLowerCase() == "anu")
    {
      setLoading("");
      setWeather(
      {
        name:"I Love You",
        sys:{
          country:" Anu❤️"
        },
        main:{
          temp:0
        },
        weather:[{main:""}]
      });

      return;

    }

    try
    {
      let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`);
      let data = await response.json();

      if(data.cod == 404)
      {
        setLoading("Invalid City Name !");
        return;
      }

      console.log(data);

      console.log(data);
      setWeather(data);
      setInputField("");
      setLoading("");

    }
    catch(e)
    {

      setLoading("Network Connection Error !");

      console.error("Can't make an API Call !");
    }

  }

  return (
  
  <main className={weather.name != undefined ?  weather.main.temp >= 20 ? "warm" : "cold"  : "warm"}>

    <div className="search-container">
        <input className="search-bar" type="text" placeholder="Search City Name Here..." value={inputField} onChange={inputFunction} ></input>
        <button className="search-btn" onClick={searchButtonClicked}>Search</button>
    </div>
    <h3>
      {loading}
    </h3>
    {
      weather.name != undefined ?     <div className="result-container">

      <div className="location">
        {weather.name},{weather.sys.country}
      </div>

      <div className="date">
        {dateBuilder(new Date)}
      </div>

      <div className="temperature">
        {Math.round(weather.main.temp)}°C
      </div>

      <div className="weather-type">
        {weather.weather[0].main}
      </div>

    </div> :

    <div className="result-container-initial">
      <div className="welcome-message-1">Welcome to</div>
      <div className="welcome-message-2">SumBeam App</div>
    </div>

    }

  </main>

  );
  
}

export default SearchBar;
