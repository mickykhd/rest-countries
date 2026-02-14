import React from "react";
import { useParams, Link } from "react-router-dom";
import LoadingAnimation from "./LoadingAnimation";
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

            return (
              <article key={index} className="single-card glass-card">
                <div className="single-flag">
                  <img src={png} alt={official} loading="lazy" />
                </div>
                <div className="single-info">
                  <p className="pill muted">Country profile</p>
                  <h1 className="single-title">{common}</h1>
                  <p className="muted">Official: {official}</p>
                  <div className="single-grid">
                    <div>
                      <p className="metric-label">Region</p>
                      <p className="metric-value">{region}</p>
                    </div>
                    <div>
                      <p className="metric-label">Subregion</p>
                      <p className="metric-value">{subregion || "N/A"}</p>
                    </div>
                    <div>
                      <p className="metric-label">Capital</p>
                      <p className="metric-value">{capital || "N/A"}</p>
                    </div>
                    <div>
                      <p className="metric-label">Population</p>
                      <p className="metric-value">{population?.toLocaleString?.()}</p>
                    </div>
                  </div>
                  <Link to="/" className="back-link">
                    ← Back to explorer
                  </Link>
                </div>
              </article>
            );
          })
        )}
      </div>
    </>
  );
}

export default SingleCountry;
