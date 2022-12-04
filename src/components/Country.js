import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Country.css";
import { BsFillArrowDownCircleFill } from "react-icons/bs";

const url = "https://restcountries.com/v3.1/name/";
const regionURL = "https://restcountries.com/v3.1/region/";

const Country = () => {
  const [inputName, setInputName] = useState("india");
  const [countryName, setCountryName] = useState([]);
  const [newLoad, setNewLoad] = useState(true);

  const [countryByRegion, setCountryByRegion] = useState();

  const handledInput = (e) => {
    setInputName(e.target.value);
    if (e.target.value === "") {
      setNewLoad(false);
    } else {
      setNewLoad(true);
    }
  };

  const handleCountryByName = async () => {
    const response = await fetch(`${url}${inputName}`);
    const data = await response.json();
    // console.log(data);
    setCountryName(data);
    if (data.status === 404) {
      setNewLoad(false);
      setCountryName([]);
    }
  };
  // console.log(inputName);
  useEffect(() => {
    if (inputName) {
      handleCountryByName();
    }
  }, [inputName]);
  const handleDropDown = (e) => {
    setCountryName([]);
    setNewLoad(true);
    const counrtyRegion = e.target.value;
    e.preventDefault();
    setCountryByRegion(counrtyRegion);
    // console.log(countryByRegion);
  };
  const fetchCountryByRegion = async () => {
    if (countryByRegion) {
      const response = await fetch(`${regionURL}${countryByRegion}`);
      const data = await response.json();
      setCountryName(data);
    }
  };

  useEffect(() => {
    fetchCountryByRegion();
  }, [countryByRegion]);

  return (
    <>
      <div className="filter-container">
        <div className="filter-input">
          <input
            type="text"
            placeholder="Search for a country..."
            className="search-bar"
            value={inputName}
            onChange={handledInput}
          />
        </div>
        <div className="filter-region">
          <label htmlFor="country-selection" className="lable-selection">
            Select Your Country
          </label>
          <select
            name=""
            id="country-selection"
            className="country-selection"
            onChange={handleDropDown}
            defaultValue={"DEFAULT"}
          >
            <option value="DEFAULT" disabled>
              Choose a option ...
            </option>
            <option value="africa">Africa</option>
            <option value="america">America</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="oceania">Oceania</option>
          </select>
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
              name: { common, official },
            } = singleCountry;

            return (
              <div key={index} className="country-container">
                <img className="country-img" src={png} alt={official} />
                <div className="country-info-container">
                  <h2>{common}</h2>
                  <h3>Population: {population}</h3>
                  <h3>region: {region}</h3>
                  <h3>capital: {capital}</h3>
                  <Link to={`/country/${capital}`}>
                    <button className="country-link">More details</button>
                  </Link>
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
