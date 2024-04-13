import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Form, Row } from "react-bootstrap";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const getCelsius = (fahrenheit) => {
    return (((fahrenheit - 32) * 5) / 9).toFixed(0);
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

  const d = new Date();
  let day = weekday[d.getDay() + 10 - 0];

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
      <Container className="d-flex justify-content-center">
        <Row>
          <div className=" my-5">
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
        </Row>
        <Row className="wrapper-row d-flex justify-content-center align-items-center mt-5">
          <div className="col-6 text-center">
            <img
              className="img-fluid"
              src="/src/assets/sun.png"
              alt=""
              style={{
                height: "250px",
              }}
            />
          </div>
          <div className="col-6 ">
            {city && weatherData ? (
              <>
                {/* <h2>{weatherData.name}</h2>
                <p>Temperature: {weatherData.main.temp}°C</p>
                <p>Description: {weatherData.weather[0].description}</p>
                <p>Feels like : {weatherData.main.feels_like}°C</p>
                <p>Humidity : {weatherData.main.humidity}%</p>
                <p>Pressure : {weatherData.main.pressure}</p>
                <p>Wind Speed : {weatherData.wind.speed}m/s</p> */}
                <h4>Today</h4>
                <h1 className="mb-5">{city.toLocaleUpperCase()}</h1>
                <p>
                  Temperature: {getCelsius(weatherData.currentConditions.temp)}
                  °C
                </p>
                <p>{weatherData.description}</p>
                <p>Day:{day}</p>
                {/* <p>Day 1: {getCelsius(weatherData.days[0].temp)}</p>
                <p>Day:{day}</p>
                <p>Day 2: {getCelsius(weatherData.days[1].temp)}</p>
                <p>Day 3: {getCelsius(weatherData.days[2].temp)}</p>
                <p>Day 4: {getCelsius(weatherData.days[3].temp)}</p> */}
              </>
            ) : (
              <p>Loading weather data...</p>
            )}
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Weather;
