import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row } from "react-bootstrap";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const fetchData = async () => {
    if (!city) {
      return;
    }
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=2b5573d2b52d0ef1b0618f43aad0c96d`
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
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Row>
          <div>
            <h1>Weather Forecast App</h1>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={handleInputChange}
              />
              <button type="submit">Get Weather</button>
            </form>
          </div>
          <div>
            {weatherData ? (
              <>
                <h2>{weatherData.name}</h2>
                <p>Temperature: {weatherData.main.temp}°C</p>
                <p>Description: {weatherData.weather[0].description}</p>
                <p>Feels like : {weatherData.main.feels_like}°C</p>
                <p>Humidity : {weatherData.main.humidity}%</p>
                <p>Pressure : {weatherData.main.pressure}</p>
                <p>Wind Speed : {weatherData.wind.speed}m/s</p>
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
