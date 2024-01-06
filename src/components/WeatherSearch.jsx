import React, { useEffect, useState } from "react";

const WeatherSearch = () => {
  const [searchCity, setSearchCity] = useState("Kolkata");
  const [cityData, SetCityData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    const featchWeather = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=f591b68946a68e14d6ec87bc36e457f7`
      );
      SetCityData(await response.json());
      // console.log(cityData);
    };

    featchWeather();
  }, [searchCity]);
  const handleOnchange = (e) => {
    setSearchInput(e.target.value);
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
  };

  let icon = null;
  if (typeof cityData.main != "undefined") {
    if (cityData.weather[0].main === "Clouds") {
      icon = "fa-cloud";
    } else if (cityData.weather[0].main === "Thunderstorm") {
      icon = "fa-bolt";
    } else if (cityData.weather[0].main === "Drizzle") {
      icon = "fa-cloud-rain";
    } else if (cityData.weather[0].main === "Rain") {
      icon = "fa-cloud-shower-heavy";
    } else if (cityData.weather[0].main === "Snow") {
      icon = "fa-snow-flake";
    } else {
      icon = "fa-smog";
    }
  } else {
    return <div>....Loading</div>;
  }

  let tempInC = (cityData.main.temp - 273.15).toFixed(2);
  let tempInC_min = (cityData.main.temp_min - 273.15).toFixed(2);
  let tempInC_max = (cityData.main.temp_max - 273.15).toFixed(2);
  // console.log(tempInC);
  // Date
  let d = new Date();
  // console.log(d);
  let date = d.getDate();
  // console.log(date);
  let year = d.getFullYear();
  let month = d.toLocaleString("default", { month: "long" });
  let day = d.toLocaleString("default", { weekday: "long" });
  //Time
  let time = d.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card text-bg-dark text-center border-0">
              <img
                src={`http://source.unsplash.com/600x900/?${cityData.weather[0].main}`}
                className="card-img"
                alt="..."
              />
              <div className="card-img-overlay">
                <form onSubmit={handleOnSubmit}>
                  <div className="input-group mb-4 w-90 mx-auto">
                    <input
                      type="search"
                      className="form-control p-3"
                      placeholder="search city"
                      aria-label="search city"
                      aria-describedby="basic-addon2"
                      name="search"
                      value={searchInput}
                      onChange={handleOnchange}
                      required
                    />
                    <button
                      type="submit"
                      className="input-group-text"
                      id="basic-addon2"
                    >
                      <i class="fa-solid fa-magnifying-glass-location fa-2x"></i>
                    </button>
                  </div>
                </form>
                <div className="bg-dark bg-oppacity-50 py-3">
                  <h2 className="card-title">{cityData.name}</h2>
                  <p className="card-text lead">
                    {day}, {month} {date}, {year}
                    <br />
                    {time}
                  </p>
                  <hr />
                  <i className={`fas ${icon} fa-4x`}></i>
                  <h1 className="fw-bolder mb-5">{tempInC} &deg;C</h1>
                  <p className="lead fw-bolder mb-0">
                    {cityData.weather[0].main}
                  </p>
                  <p className="lead">
                    {tempInC_min} &deg;C | {tempInC_max} &deg;C
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WeatherSearch;
