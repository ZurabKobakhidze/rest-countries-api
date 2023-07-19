import React, { useState, useEffect } from "react";
import { Header } from "components/shared";
import { styled } from "styled-components";
import axios from "axios";
import { SearchIcon } from "assets/index";

function Home() {
  const [countries, setCountries] = useState([]);
  const [displayedCountries, setDisplayedCountries] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (search.trim()) {
      const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      );
      setDisplayedCountries(filteredCountries);
    } else {
      setDisplayedCountries(countries);
    }
  };

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        setCountries(res.data);
        setDisplayedCountries(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Div>
      <Header />
      <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
    >
      <InputDiv>
        <img src={SearchIcon} alt="" onClick={handleSearch} />
        <InputStyles
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for a country…"
        />
        <button type="submit" style={{ display: "none" }}>Search</button>
      </InputDiv>
    </form>

      <Container>
        {displayedCountries.map((country, index) => (
          <CountryDiv key={index}>
            <img
              src={country.flags.png}
              alt={country.name.common}
              style={{ width: "100%" }}
            />
            <InsideBox>
              <CountryNames>{country.name.common}</CountryNames>
              <DetailsDiv>
                <div>
                  <Label>Population: </Label>
                  <Data>{(country.population ?? 0).toLocaleString()}</Data>
                </div>
                <div>
                  <Label>Region: </Label> <Data>{country.region ?? "N/A"}</Data>
                </div>
                <div>
                  <Label>Capital: </Label>
                  <Data>{country.capital ? country.capital[0] : "N/A"}</Data>
                </div>
              </DetailsDiv>
            </InsideBox>
          </CountryDiv>
        ))}
      </Container>
    </Div>
  );
}

export default Home;

const Div = styled.div`
  background: #fafafa;
  min-height: 100vh;
  display: flex;
    flex-direction: column;
    align-items: center;
`;

const Container = styled.div`
  padding-left: 56px;
  padding-right: 56px;
  box-sizing: border-box;
`;

const CountryDiv = styled.div`
  border-radius: 5px;
  background: #fff;
  box-shadow: 0px 0px 7px 2px rgba(0, 0, 0, 0.03);
  overflow: hidden;
  margin-top: 40px;
`;

const CountryNames = styled.h1`
  color: #111517;
  font-family: Nunito Sans;
  font-size: 18px;
  font-style: normal;
  font-weight: 800;
  line-height: 26px;
`;

const InsideBox = styled.div`
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 24px;
  padding-bottom: 46px;
  box-sizing: border-box;
`;

const DetailsDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  margin-top: 16px;
`;

const Label = styled.span`
  font-weight: 600;
  color: #111517;
  font-family: Nunito Sans;
  font-size: 14px;
  font-style: normal;

  line-height: 16px;
`;

const Data = styled.span`
  font-weight: 300;
  color: #111517;
  font-family: Nunito Sans;
  font-size: 14px;
  font-style: normal;

  line-height: 16px;
`;

const InputDiv = styled.div`
      display: flex;
    align-items: center;
    margin-top: 24px;
    padding-left: 32px;
    padding-right: 16px;
    box-sizing: border-box;
    border-radius: 5px;
    background: #FFF;
    box-shadow: 0px 2px 9px 0px rgba(0, 0, 0, 0.05);
    height: 48px;
    width: 343px;
    gap: 12px;
`;

const InputStyles = styled.input`
  color: #C4C4C4;
    font-family: Nunito Sans;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    border: none;
    width: 260px;
    padding-left: 12px;
`;