import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Country.css";
import { BsFillArrowDownCircleFill } from "react-icons/bs";

const url = "https://restcountries.com/v3.1/name/";
const regionURL = "https://restcountries.com/v3.1/region/";

const Country = () => {
  const [inputName, setInputName] = useState("a");
  const [countryName, setCountryName] = useState([]);
  const [newLoad, setNewLoad] = useState(true);
  const [dropDown, setDropDown] = useState(true);
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
    try {
      const response = await fetch(`${url}${inputName}`);
      const data = await response.json();
      // console.log(data);
      setCountryName(data);
      if (data.status === 404) {
        setNewLoad(false);
        setCountryName([]);
      }
    } catch (error) {
      console.Name(error);
    }
  };
  // console.log(inputName);
  useEffect(() => {
    if (newLoad) {
      if (newLoad) {
        handleCountryByName();
      }
    }
  }, [inputName]);
  const handleDropDown = (e) => {
    const counrtyRegion = e.target.name;
    e.preventDefault();
    setCountryByRegion(counrtyRegion);
    console.log(countryByRegion);
  };
  const fetchCountryByRegion = async () => {
    if (countryByRegion) {
      const response = await fetch(`${regionURL}${countryByRegion}`);
      const data = await response.json();
      setCountryName(data);
    }

    if (countryByRegion) {
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
            value={inputName}
            onChange={handledInput}
          />
        </div>
        <div className="filter-region">
          <div className="dropdown-container">
            <button className="click" onClick={() => setDropDown(!dropDown)}>
              Filter by Region
              <BsFillArrowDownCircleFill />
            </button>

            <div className={dropDown ? "list" : "list newlist"}>
              <button className="links" name="africa" onClick={handleDropDown}>
                Africa
              </button>

              <button className="links" name="america" onClick={handleDropDown}>
                America
              </button>

              <button className="links" name="asia" onClick={handleDropDown}>
                Asia
              </button>

              <button className="links" name="europe" onClick={handleDropDown}>
                Europe
              </button>

              <button className="links" name="oceania" onClick={handleDropDown}>
                Oceania
              </button>
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
              name: { common, official },
            } = singleCountry;

            return (
              <div key={index} className="country-container">
                <img className="country-img" src={png} alt={official} />
                <div className="country-info-container">
                  <h2>{official}</h2>
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
