import React, { useState, useEffect } from "react";
import "./Country.css";
const url = "https://restcountries.com/v3.1/region/europe";

const Country = () => {
  const [country, setCountry] = useState([]);
  const handleCountry = async () => {
    const response = await fetch(url);
    const data = await response.json();

    setCountry(data);
  };

  useEffect(() => {
    handleCountry();
  }, []);
  return (
    <>
      <div className="master-country-container">
        {country.map((singleCountry, index) => {
          const {
            capital,
            population,
            flags: { png, svg },
            region,
            name: { official },
          } = singleCountry;

          return (
            <div key={index} className="country-container">
              <img className="country-img" src={png} alt={official} />
              <div className="country-info-container">
                <h2>{official}</h2>
                <h3>Population: {population}</h3>
                <h3>region: {region}</h3>
                <h3>capital: {capital}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Country;
