import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Header } from "components/shared";

function Country() {
  const { name } = useParams(); 
  const [country, setCountry] = useState({});  

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${name}`)
      .then((res) => {
        setCountry(res.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [name]);

  return (
    <div>
      <Header />
      <div>
        <h1>{country.name?.common}</h1>
        <img
          src={country.flags?.png}
          alt={country.name?.common}
          style={{ width: "100%" }}
        />
        <h2>Native Name: {country.name?.nativeName?.eng?.common}</h2>
        <p>Population: {(country.population ?? 0).toLocaleString()}</p>
        <p>Region: {country.region ?? "N/A"}</p>
        <p>Sub Region: {country.subregion ?? "N/A"}</p>
        <p>Capital: {country.capital ? country.capital[0] : "N/A"}</p>
        <p>Border Countries: {country.borders?.join(", ") ?? "N/A"}</p>
        <p>Top Level Domain: {country.tld?.[0] ?? "N/A"}</p>
        <p>
          Currencies:{" "}
          {Object.keys(country.currencies ?? {})
            .map((key) => country.currencies[key].name)
            .join(", ") ?? "N/A"}
        </p>
        <p>
          Languages:{" "}
          {Object.keys(country.languages ?? {})
            .map((key) => country.languages[key])
            .join(", ") ?? "N/A"}
        </p>
      </div>
    </div>
  );
}

export default Country;
