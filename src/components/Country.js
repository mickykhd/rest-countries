import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Country.css";

const url = "https://restcountries.com/v3.1/name/";

const Country = () => {
  const [inputName, setInputName] = useState("a");
  const [countryName, setCountryName] = useState([]);
  const [newLoad, setNewLoad] = useState(true);

  const handledInput = (e) => {
    setInputName(e.target.value);
    if (e.target.value === "") {
      setNewLoad(false);
    } else {
      setNewLoad(true);
    }
  };

  const handleCountryByName = async () => {
    try {
      const response = await fetch(`${url}${inputName}`);
      const data = await response.json();
      console.log(data);
      setCountryName(data);
      if (data.status === 404) {
        setNewLoad(false);
        setCountryName([]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(inputName);
  useEffect(() => {
    if (newLoad) {
      handleCountryByName();
    }
  }, [inputName]);
  return (
    <>
      <div className="filter-container">
        <div className="filter-input">
          <input
            type="text"
            placeholder="Search for a country..."
            value={inputName}
            onChange={handledInput}
          />
        </div>
        <div className="filter-region">
          <div className="dropdown">
            <button className="dropbtn">Filter By Region</button>
            <div className="dropdown-content">
              <a href="#">Link 1</a>
              <a href="#">Link 2</a>
              <a href="#">Link 3</a>
            </div>
          </div>
        </div>
      </div>
      <div className="master-country-container">
        {newLoad ? (
          countryName.map((singleCountry, index) => {
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
                  <Link to={`/country/${official}`}>More Details</Link>
                </div>
              </div>
            );
          })
        ) : (
          <h2>Enter a valid country Name</h2>
        )}
      </div>
    </>
  );
};

export default Country;
