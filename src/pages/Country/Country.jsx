import React, { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { Header } from "components/shared";
import { BackArrow } from "assets/index";
import { styled } from "styled-components";

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

  const nativeNames = Object.values(country.name?.nativeName ?? {})
    .map((name) => name.common)
    .join(", ");

  return (
    <div>
      <Header />
      <MainDiv>
        <Link to="/">
          <BackDiv>
            <img src={BackArrow} alt="" />
            <BackH2>back</BackH2>
          </BackDiv>
        </Link>
        <Container>
          <Flag src={country.flags?.png} alt={country.name?.common} />
          <DataDIv>
            <CountryName>{country.name?.common}</CountryName>
            <MiniContainer>
              <div>
                <div>
                  <Label>Native Name: </Label> <Data>{nativeNames}</Data>
                </div>
                <div>
                  <Label>Population: </Label>
                  <Data>{(country.population ?? 0).toLocaleString()}</Data>
                </div>
                <div>
                  <Label>Region: </Label> <Data>{country.region ?? "N/A"}</Data>
                </div>
                <div>
                  <Label>Sub Region:</Label>
                  <Data>{country.subregion ?? "N/A"}</Data>
                </div>
                <div>
                  <Label>Capital: </Label>
                  <Data>{country.capital ? country.capital[0] : "N/A"}</Data>
                </div>
              </div>
              <div>
                <div>
                  <Label>Top Level Domain: </Label>
                  <Data>{country.tld?.[0] ?? "N/A"}</Data>
                </div>
                <div>
                  <Label>Currencies: </Label>
                  <Data>
                    {Object.keys(country.currencies ?? {})
                      .map((key) => country.currencies[key].name)
                      .join(", ") ?? "N/A"}
                  </Data>
                </div>
                <div>
                  <Label> Languages: </Label>
                  <Data>
                    {Object.keys(country.languages ?? {})
                      .map((key) => country.languages[key])
                      .join(", ") ?? "N/A"}
                  </Data>
                </div>
              </div>
            </MiniContainer>
            <BorderName>Border Countries: </BorderName>
            <BorderCountriesDiv>
              {country.borders?.map((borderCountry, index) => (
                <BorderCountries key={index}>{borderCountry}</BorderCountries>
              )) ?? "N/A"}
            </BorderCountriesDiv>
          </DataDIv>
        </Container>
      </MainDiv>
    </div>
  );
}

export default Country;

const MainDiv = styled.div`
  padding-left: 28px;
  padding-right: 28px;
  box-sizing: border-box;
  padding-top: 40px;
  padding-bottom: 60px;
`;

const BackDiv = styled.div`
  border-radius: 2px;
  background: #fff;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.29);
  width: 104px;
  height: 32px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  gap: 8px;
`;

const BackH2 = styled.h2`
  color: #111517;
  font-family: Nunito Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: 20px;
`;

const Flag = styled.img`
  border-radius: 5px;
  width: 100%;
`;

const Container = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const CountryName = styled.h1`
  color: #111517;
  font-family: Nunito Sans;
  font-size: 22px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

const DataDIv = styled.div`
  margin-top: 44px;
`;

const MiniContainer = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Label = styled.span`
  font-weight: 600;
  color: #111517;
  font-family: Nunito Sans;
  font-size: 14px;
  font-style: normal;
  line-height: 32px;
`;

const Data = styled.span`
  font-weight: 300;
  color: #111517;
  font-family: Nunito Sans;
  font-size: 14px;
  font-style: normal;
  line-height: 32px;
`;

const BorderName = styled.h1`
  color: #111517;
  font-family: Nunito Sans;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  margin-top: 34px;
`;

const BorderCountriesDiv = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 16px;
`;

const BorderCountries = styled.h2`
  color: #111517;
  font-family: Nunito Sans;
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  border-radius: 2px;
  background: #fff;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.1);
  width: 96px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Link = styled(RouterLink)`
  text-decoration: none;
  color: inherit;
`;