import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Form } from "react-bootstrap";

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

      <div className="container">
        <div className="row">
          {city ? (
            <>
              <h1>{city.toLocaleUpperCase()}</h1>
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
          <div className="col-6 ">
            {city && weatherData ? (
              <>
                <p>
                  Temperature: {getCelsius(weatherData.currentConditions.temp)}
                  °C
                </p>
                <p>{weatherData.description}</p>
                {/* <p>Day 1: {getCelsius(weatherData.days[0].temp)}</p>
                <p>Day:{day}</p>
                <p>Day 2: {getCelsius(weatherData.days[1].temp)}</p> */}
              </>
            ) : (
              <p>Loading weather data...</p>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Weather;
