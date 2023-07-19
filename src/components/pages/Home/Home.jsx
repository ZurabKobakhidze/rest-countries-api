import React, { useState, useEffect } from "react";
import { Header } from "components/shared";
import { styled } from "styled-components";
import axios from "axios";

function Home() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        setCountries(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Div>
      <Header />
      <Container>
        {countries.map((country, index) => (
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
