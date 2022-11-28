import React from "react";
import { useParams } from "react-router-dom";

function SingleCountry() {
  const { official } = useParams();
  console.log(official);

  return <div>{official}</div>;
}

export default SingleCountry;
