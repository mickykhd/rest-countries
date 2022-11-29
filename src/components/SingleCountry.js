import React from "react";
import { useParams } from "react-router-dom";
import LoadingAnimation from "./LoadingAnimation";
import { Link } from "react-router-dom";
import "./SingleCountry.css";

const url = "https://restcountries.com/v3.1/capital/";
function SingleCountry() {
  const [singleCountry, setSingleCountry] = React.useState([]);
  const [loading, setloading] = React.useState(false);
  const { capital } = useParams();
  // console.log(capital);
  const handleSingleCountry = async () => {
    setloading(true);
    try {
      const response = await fetch(`${url}${capital}`);

      const data = await response.json();
      // console.log(data);
      setSingleCountry(data);
      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    handleSingleCountry();
  }, []);

  return (
    <>
      <div className="single-page">
        {loading ? (
          <LoadingAnimation />
        ) : (
          singleCountry.map((item, index) => {
            const {
              name: { common, official },
              population,
              region,
              subregion,
              capital,

              flags: { png },
            } = item;
            //

            return (
              <div key={index}>
                <img src={png} alt="" />
                <h1>{common}</h1>
                <h2>Native Name: {official}</h2>
                <h2>Population : {population}</h2>
                <h2>Region: {region}</h2>
                <h2>Sub Region: {subregion}</h2>
                <h2>Capital: {capital}</h2>

                {/* {<h2>Currencies: {bkb}</h2>} */}
                {/* <h2>Languages: {ara}</h2> */}
                <Link to="/">
                  <button className="country-link">Back to home page</button>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}

export default SingleCountry;
