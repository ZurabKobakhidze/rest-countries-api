import React, { useEffect, useState, useContext } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { Header } from "components/shared";
import { BackArrow, BackArrowWhite } from "assets/index";
import { styled } from "styled-components";
import { DarkModeContext } from "context/DarkModeContext";

function Country() {
  const { name } = useParams();
  const [country, setCountry] = useState({});

  const { darkMode } = useContext(DarkModeContext);

  axios
  .get(`https://restcountries.com/v3.1/name/${name}`)
  .then((res) => {
    const exactCountry = res.data.find(country => country.name.common.toLowerCase() === name.toLowerCase());
    setCountry(exactCountry);
  })
  .catch((error) => {
    console.log(error);
  });

  const nativeNames = Object.values(country.name?.nativeName ?? {})
    .map((name) => name.common)
    .join(", ");

  return (
    <div>
      <Header />
      <MainDiv $darkMode={darkMode}>
        <Link to="/">
          <BackDiv $darkMode={darkMode}>
            {darkMode ? (
              <BackImg src={BackArrowWhite} alt="" />
            ) : (
              <BackImg src={BackArrow} alt="" />
            )}

            <BackH2 $darkMode={darkMode}>back</BackH2>
          </BackDiv>
        </Link>
        <Container>
          <Flag src={country.flags?.png} alt={country.name?.common} />
          <DataDIv>
            <CountryName $darkMode={darkMode}>
              {country.name?.common}
            </CountryName>
            <MiniContainer>
              <div>
                <div>
                  <Label $darkMode={darkMode}>Native Name: </Label>
                  <Data $darkMode={darkMode}>{nativeNames}</Data>
                </div>
                <div>
                  <Label $darkMode={darkMode}>Population: </Label>
                  <Data $darkMode={darkMode}>
                    {(country.population ?? 0).toLocaleString()}
                  </Data>
                </div>
                <div>
                  <Label $darkMode={darkMode}>Region: </Label>
                  <Data $darkMode={darkMode}>
                    {country.region ?? <NotAvailable $darkMode={darkMode}>N/A</NotAvailable>}
                  </Data>
                </div>
                <div>
                  <Label $darkMode={darkMode}>Sub Region: </Label>
                  <Data $darkMode={darkMode}>
                    {country.subregion ?? <NotAvailable $darkMode={darkMode}>N/A</NotAvailable>}
                  </Data>
                </div>
                <div>
                  <Label $darkMode={darkMode}>Capital: </Label>
                  <Data $darkMode={darkMode}>
                    {country.capital ? (
                      country.capital[0]
                    ) : (
                      <NotAvailable $darkMode={darkMode}>N/A</NotAvailable>
                    )}
                  </Data>
                </div>
              </div>
              <div>
                <div>
                  <Label $darkMode={darkMode}>Top Level Domain: </Label>
                  <Data $darkMode={darkMode}>
                    {country.tld?.[0] ?? <NotAvailable $darkMode={darkMode}>N/A</NotAvailable>}
                  </Data>
                </div>
                <div>
                  <Label $darkMode={darkMode}>Currencies: </Label>
                  <Data $darkMode={darkMode}>
                    {Object.keys(country.currencies ?? {}).length > 0 ? (
                      Object.keys(country.currencies)
                        .map((key) => country.currencies[key].name)
                        .join(", ")
                    ) : (
                      <NotAvailable $darkMode={darkMode}>N/A</NotAvailable>
                    )}
                  </Data>
                </div>
                <div>
                  <Label $darkMode={darkMode}>Languages: </Label>
                  <Data $darkMode={darkMode}>
                    {Object.keys(country.languages ?? {}).length > 0 ? (
                      Object.keys(country.languages)
                        .map((key) => country.languages[key])
                        .join(", ")
                    ) : (
                      <NotAvailable $darkMode={darkMode}>N/A</NotAvailable>
                    )}
                  </Data>
                </div>
              </div>
            </MiniContainer>
            <BorderDiv>
              <BorderName $darkMode={darkMode}>Border Countries: </BorderName>
              <BorderCountriesDiv $darkMode={darkMode}>
                {country.borders?.map((borderCountry, index) => (
                  <BorderCountries $darkMode={darkMode} key={index}>
                    {borderCountry}
                  </BorderCountries>
                )) ?? <NotAvailable $darkMode={darkMode}>N/A</NotAvailable>}
              </BorderCountriesDiv>
            </BorderDiv>
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
  min-height: 100vh;
  background: ${(props) => (props.$darkMode ? "#202C36" : "#fafafa")};
  @media (min-width: 1440px) {
    padding-left: 80px;
    padding-right: 80px;
  }
`;

const BackDiv = styled.div`
  border-radius: 2px;
  background: ${(props) => (props.$darkMode ? "#2B3844" : "#fafafa")};
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.29);
  width: 104px;
  height: 32px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  gap: 8px;
  @media (min-width: 1440px) {
    width: 136px;
    height: 40px;
    gap: 10px;
  }
`;

const BackH2 = styled.h2`
  color: ${(props) => (props.$darkMode ? "#fff" : "#111517")};
  font-family: Nunito Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: 20px;
  @media (min-width: 1440px) {
    font-size: 16px;
  }
`;

const BackImg = styled.img`
  width: 18px;
  height: 18px;
  @media (min-width: 1440px) {
    width: 20px;
  height: 20px;
  }
`;

const Flag = styled.img`
  border-radius: 5px;
  width: 100%;
  @media (min-width: 1440px) {
    width: 560px;
  }
`;

const Container = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  @media (min-width: 1440px) {
    gap: 120px;
    margin-top: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const CountryName = styled.h1`
  color: ${(props) => (props.$darkMode ? "#fff" : "#111517")};
  font-family: Nunito Sans;
  font-size: 22px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  @media (min-width: 1440px) {
    font-family: Nunito Sans;
    font-size: 32px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
  }
`;

const DataDIv = styled.div`
  margin-top: 44px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media (min-width: 1440px) {
    margin-top: 0;
  }
`;

const MiniContainer = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  @media (min-width: 1440px) {
    gap: 121px;
    margin-top: 23px;
    display: flex;
    flex-direction: row;
  }
`;

const Label = styled.span`
  font-weight: 600;
  color: ${(props) => (props.$darkMode ? "#fff" : "#111517")};
  font-family: Nunito Sans;
  font-size: 14px;
  font-style: normal;
  line-height: 32px;
  @media (min-width: 1440px) {
    font-size: 16px;
  }
`;

const Data = styled.span`
  font-weight: 300;
  color: ${(props) => (props.$darkMode ? "#fff" : "#111517")};
  font-family: Nunito Sans;
  font-size: 14px;
  font-style: normal;
  line-height: 32px;
  @media (min-width: 1440px) {
    font-size: 16px;
  }
`;

const BorderName = styled.h1`
  color: ${(props) => (props.$darkMode ? "#fff" : "#111517")};
  font-family: Nunito Sans;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px;
`;

const BorderCountriesDiv = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 16px;
  @media (min-width: 1440px) {
    margin-top: 0;
  }
`;

const BorderCountries = styled.h2`
  color: ${(props) => (props.$darkMode ? "#fff" : "#111517")};
  font-family: Nunito Sans;
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  border-radius: 2px;
  background: ${(props) => (props.$darkMode ? "#2B3844" : "#fafafa")};
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

const NotAvailable = styled.span`
  color: ${(props) => (props.$darkMode ? "#fff" : "#111517")};
  font-family: Nunito Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: 32px;
`;

const BorderDiv = styled.div`
  margin-top: 34px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
  @media (min-width: 1440px) {
    margin-top: 70px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 16px;
  }
`;
