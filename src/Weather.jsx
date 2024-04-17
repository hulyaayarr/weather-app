import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Form } from "react-bootstrap";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const getCelsius = (fahrenheit) => {
    return ((fahrenheit - 32) / 1.8).toFixed(0);
  };
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const d = new Date();
  let day = weekday[d.getDay()];
  const month = months[d.getMonth() + 1]; // Adding 1 because getMonth() returns zero-based index
  const dayOfMonth = d.getDate();

  const fetchData = async () => {
    if (!city) {
      return;
    }
    try {
      const response = await axios.get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=P4SNV3AVLASGNSZBAAZPYRJG4&contentType=json`
      );
      setWeatherData(response.data);
      console.log(response.data); //You can see all the weather data in console log
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <>
      <div className="container-fluid">
        <div className=" d-flex justify-content-center py-5 my-5">
          <Form onSubmit={handleSubmit}>
            <Form.Control
              className="form-input"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              placeholder="Enter city name"
              value={city}
              onChange={handleInputChange}
            />
          </Form>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row mx-5 ">
          {city ? (
            <>
              <h1>{weatherData ? weatherData.resolvedAddress : ""}</h1>
              <p>
                {day} {dayOfMonth} {month}
              </p>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <Container>
        <div className="row mt-5">
          <div className="col-7 ">
            {city && weatherData ? (
              <div>
                <div className="d-flex align-items-center">
                  <img
                    className="img-fluid cloud-image"
                    src="/src/assets/cloud.png"
                  />
                  <div className="big-font">
                    {getCelsius(weatherData.currentConditions.temp)}
                    °C
                  </div>
                </div>
                <div
                  className="d-flex justify-content-end"
                  style={{
                    width: "280px",
                  }}
                >
                  {weatherData.days[0].conditions}
                </div>
                {/* <p>Day 1: {getCelsius(weatherData.days[0].temp)}</p>
                <p>Day:{day}</p>
                <p>Day 2: {getCelsius(weatherData.days[1].temp)}</p> */}
              </div>
            ) : (
              <p>Loading weather data...</p>
            )}
          </div>
          <div className="col-5 background-panel">
            {city && weatherData ? (
              <div className="row">
                <div className="col-4 panel-data">
                  <div className="text-center py-4">
                    {getCelsius(weatherData.days[0].tempmax)}°C
                    <p>Max</p>
                  </div>
                  <div className="text-center">
                    {getCelsius(weatherData.days[0].tempmin)}°C
                    <p>Min</p>
                  </div>
                </div>
                <div className="col-4 panel-data">
                  <div className="text-center py-4">
                    {weatherData.days[0].sunrise}
                    <p>Sunrise</p>
                  </div>
                  <div className="text-center">
                    {weatherData.days[0].sunset}
                    <p>Sunset</p>
                  </div>
                </div>
                <div className="col-4  panel-data">
                  <div className="text-center py-4">
                    {weatherData.days[0].sunrise}
                    <p>Sunrise</p>
                  </div>
                  <div className="text-center">
                    {weatherData.days[0].sunset}
                    <p>Sunset</p>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Weather;
