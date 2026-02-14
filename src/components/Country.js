import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Country.css";

const url = "https://restcountries.com/v3.1/name/";
const regionURL = "https://restcountries.com/v3.1/region/";

const Country = () => {
  const [inputName, setInputName] = useState("");
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
      <header className="page-header">
        <div>
          <p className="pill muted">Global Explorer</p>
          <h1 className="page-title">Discover countries in style</h1>
          <p className="page-subtitle">
            Search by name or filter by region to browse curated country cards with modern visuals.
          </p>
        </div>
      </header>

      <section className="control-panel glass-card">
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
          <select
            id="country-selection"
            className="country-selection"
            onChange={handleDropDown}
            defaultValue={"DEFAULT"}
          >
            <option value="DEFAULT" disabled>
              Filter by region
            </option>
            <option value="africa">Africa</option>
            <option value="america">America</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="oceania">Oceania</option>
          </select>
        </div>
      </section>

      <div className="master-country-container">
        {newLoad ? (
          countryName.map((singleCountry, index) => {
            const {
              capital,
              population,
              flags: { png },
              region,
              name: { common, official },
            } = singleCountry;

            return (
              <div key={index} className="country-container glass-card">
                <div className="flag-wrapper">
                  <img className="country-img" src={png} alt={official} loading="lazy" />
                </div>
                <div className="country-info-container">
                  <div className="country-header">
                    <h2 className="country-name">{common}</h2>
                    <span className="badge">{region}</span>
                  </div>
                  <p className="muted">Official: {official}</p>
                  <div className="metrics">
                    <p>
                      <span className="metric-label">Population</span>
                      <span className="metric-value">{population?.toLocaleString?.()}</span>
                    </p>
                    <p>
                      <span className="metric-label">Capital</span>
                      <span className="metric-value">{capital || "N/A"}</span>
                    </p>
                  </div>
                  <Link to={`/country/${capital}`} className="country-link">
                    View details
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div className="empty-state glass-card">
            <p className="empty-title">No matches yet</p>
            <p className="muted">Try another country name or region.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Country;
