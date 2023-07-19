import React, { useEffect, useState , useContext} from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { Header } from "components/shared";
import { BackArrow } from "assets/index";
import { styled } from "styled-components";
import { DarkModeContext } from "context/DarkModeContext";

function Country() {
  const { name } = useParams();
  const [country, setCountry] = useState({});

  const { darkMode } = useContext(DarkModeContext);

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
      <MainDiv $darkMode={darkMode}>
        <Link to="/">
          <BackDiv $darkMode={darkMode}>
            <img src={BackArrow} alt="" />
            <BackH2 $darkMode={darkMode}>back</BackH2>
          </BackDiv>
        </Link>
        <Container>
          <Flag src={country.flags?.png} alt={country.name?.common} />
          <DataDIv>
            <CountryName $darkMode={darkMode}>{country.name?.common}</CountryName>
            <MiniContainer>
              <div>
                <div>
                  <Label $darkMode={darkMode}>Native Name: </Label> <Data $darkMode={darkMode}>{nativeNames}</Data>
                </div>
                <div>
                  <Label $darkMode={darkMode}>Population: </Label>
                  <Data $darkMode={darkMode}>{(country.population ?? 0).toLocaleString()}</Data>
                </div>
                <div>
                  <Label $darkMode={darkMode}>Region: </Label>{" "}
                  <Data $darkMode={darkMode}>
                    {country.region ?? <NotAvailable>N/A</NotAvailable>}
                  </Data>
                </div>
                <div>
                  <Label $darkMode={darkMode}>Sub Region:</Label>
                  <Data $darkMode={darkMode}>
                    {country.subregion ?? <NotAvailable>N/A</NotAvailable>}
                  </Data>
                </div>
                <div>
                  <Label $darkMode={darkMode}>Capital: </Label>
                  <Data $darkMode={darkMode}>
                    {country.capital ? (
                      country.capital[0]
                    ) : (
                      <NotAvailable>N/A</NotAvailable>
                    )}
                  </Data>
                </div>
              </div>
              <div>
                <div>
                  <Label $darkMode={darkMode}>Top Level Domain: </Label>
                  <Data $darkMode={darkMode}>
                    {country.tld?.[0] ?? <NotAvailable>N/A</NotAvailable>}
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
                      <NotAvailable>N/A</NotAvailable>
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
                      <NotAvailable>N/A</NotAvailable>
                    )}
                  </Data>
                </div>
              </div>
            </MiniContainer>
            <BorderName $darkMode={darkMode}>Border Countries: </BorderName>
            <BorderCountriesDiv $darkMode={darkMode}>
              {country.borders?.map((borderCountry, index) => (
                <BorderCountries $darkMode={darkMode} key={index}>{borderCountry}</BorderCountries>
              )) ?? <NotAvailable>N/A</NotAvailable>}
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
  background: ${(props) => (props.$darkMode ? "#202C36" : "#fafafa")};
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
`;

const BackH2 = styled.h2`
  color: ${props => props.$darkMode ? '#fff' : '#111517'};
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
 color: ${props => props.$darkMode ? '#fff' : '#111517'};
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
  color: ${props => props.$darkMode ? '#fff' : '#111517'};
  font-family: Nunito Sans;
  font-size: 14px;
  font-style: normal;
  line-height: 32px;
`;

const Data = styled.span`
  font-weight: 300;
  color: ${props => props.$darkMode ? '#fff' : '#111517'};
  font-family: Nunito Sans;
  font-size: 14px;
  font-style: normal;
  line-height: 32px;
`;

const BorderName = styled.h1`
  color: ${props => props.$darkMode ? '#fff' : '#111517'};
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
  color: ${props => props.$darkMode ? '#fff' : '#111517'};
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
  color: ${props => props.$darkMode ? '#fff' : '#111517'};
  font-family: Nunito Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: 32px;
`;
