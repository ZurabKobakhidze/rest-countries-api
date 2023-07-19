import React, { useState, useEffect, useContext } from "react";
import { Header } from "components/shared";
import { styled } from "styled-components";
import axios from "axios";
import { Arrow, ArrowWhite, SearchIcon, SearchIconWhite } from "assets/index";
import { Link as RouterLink } from "react-router-dom";
import { DarkModeContext } from "context/DarkModeContext";

function Home() {
  const [countries, setCountries] = useState([]);
  const [displayedCountries, setDisplayedCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");

  const { darkMode } = useContext(DarkModeContext);

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
    if (region) {
      axios
        .get(`https://restcountries.com/v3.1/region/${region}`)
        .then((res) => {
          setCountries(res.data);
          setDisplayedCountries(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .get("https://restcountries.com/v3.1/all")
        .then((res) => {
          setCountries(res.data);
          setDisplayedCountries(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [region]);

  const options = ["", "Africa", "Americas", "Asia", "Europe", "Oceania"];

  return (
    <Div $darkMode={darkMode}>
      <Header />
      <SearchDiv>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <InputDiv $darkMode={darkMode}>
            <SearchButton
              src={darkMode ? SearchIconWhite : SearchIcon}
              alt=""
              onClick={handleSearch}
            />
            <InputStyles
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for a country…"
              $darkMode={darkMode}
            />
            <button type="submit" style={{ display: "none" }}>
              Search
            </button>
          </InputDiv>
        </form>
        <DropdownWrapper onClick={() => setDropdownOpen(!dropdownOpen)}>
          <RegionDiv $darkMode={darkMode}>
            <RegionStyles $darkMode={darkMode}>
              {selectedRegion || "Filter by Region"}
            </RegionStyles>
            {darkMode ? (
              <ArrowImg src={ArrowWhite} alt="" />
            ) : (
              <ArrowImg src={Arrow} alt="" />
            )}
          </RegionDiv>
          {dropdownOpen && (
            <OptionsDiv $darkMode={darkMode}>
              {options.map((option, index) => (
                <Option
                  $darkMode={darkMode}
                  key={index}
                  onClick={() => {
                    setSelectedRegion(option);
                    setDropdownOpen(false);
                    setRegion(option);
                  }}
                >
                  {option || "All Region"}
                </Option>
              ))}
            </OptionsDiv>
          )}
        </DropdownWrapper>
      </SearchDiv>

      <Container>
        {displayedCountries.map((country) => (
          <Link
            to={`/country/${country.name.common}`}
            key={country.name.common}
          >
            <CountryDiv $darkMode={darkMode}>
              <Flag>
                <img src={country.flags.png} alt={country.name.common} />
              </Flag>

              <InsideBox>
                <CountryNames $darkMode={darkMode}>
                  {country.name.common}
                </CountryNames>
                <DetailsDiv>
                  <div>
                    <Label $darkMode={darkMode}>Population: </Label>
                    <Data $darkMode={darkMode}>
                      {(country.population ?? 0).toLocaleString()}
                    </Data>
                  </div>
                  <div>
                    <Label $darkMode={darkMode}>Region: </Label>{" "}
                    <Data $darkMode={darkMode}>{country.region ?? "N/A"}</Data>
                  </div>
                  <div>
                    <Label $darkMode={darkMode}>Capital: </Label>
                    <Data $darkMode={darkMode}>
                      {country.capital ? country.capital[0] : "N/A"}
                    </Data>
                  </div>
                </DetailsDiv>
              </InsideBox>
            </CountryDiv>
          </Link>
        ))}
      </Container>
    </Div>
  );
}

export default Home;

const Div = styled.div`
  background: ${(props) => (props.$darkMode ? "#202C36" : "#fafafa")};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  padding-left: 56px;
  padding-right: 56px;
  gap: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0;
  @media (min-width: 1440px) {
    padding-left: 80px;
    padding-right: 80px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    align-items: center;
    gap: 74px;
    margin-top: 48px;
    width: 100%;
    justify-items: center;
    justify-content: space-between;
  }
`;

const CountryDiv = styled.div`
  border-radius: 5px;
  background: ${(props) => (props.$darkMode ? "#2B3844" : "#fafafa")};
  box-shadow: 0px 0px 7px 2px rgba(0, 0, 0, 0.03);
  overflow: hidden;
  margin-top: 40px;
  cursor: pointer;
  width: 264px;
  height: 100%;
  @media (min-width: 1440px) {
    margin-top: 0;
    height: 336px;
  }
`;

const CountryNames = styled.h1`
  color: ${(props) => (props.$darkMode ? "#fff" : "#111517")};
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
  color: ${(props) => (props.$darkMode ? "#fff" : "#111517")};
  font-family: Nunito Sans;
  font-size: 14px;
  font-style: normal;
  line-height: 16px;
`;

const Data = styled.span`
  font-weight: 300;
  color: ${(props) => (props.$darkMode ? "#fff" : "#111517")};
  font-family: Nunito Sans;
  font-size: 14px;
  font-style: normal;
  line-height: 16px;
`;

const InputDiv = styled.div`
  display: flex;
  align-items: center;

  padding-left: 32px;
  padding-right: 16px;
  box-sizing: border-box;
  border-radius: 5px;
  background: ${(props) => (props.$darkMode ? "#2B3844" : "#fafafa")};
  box-shadow: 0px 2px 9px 0px rgba(0, 0, 0, 0.05);
  height: 48px;
  width: 100%;
  gap: 12px;
  @media (min-width: 1440px) {
    width: 480px;
    height: 56px;
  }
`;

const InputStyles = styled.input`
  color: ${(props) => (props.$darkMode ? "#fff" : "#c4c4c4")};
  font-family: Nunito Sans;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  border: none;
  width: 100%;
  padding-left: 12px;
  background: ${(props) => (props.$darkMode ? "#2B3844" : "#fafafa")};

  &::placeholder {
    color: ${(props) => (props.$darkMode ? "#fff" : "#c4c4c4")};
  }

  &:focus {
    outline: none;
  }

  @media (min-width: 1440px) {
    font-size: 14px;
  }
`;

const SearchDiv = styled.div`
  width: 100%;
  padding-left: 16px;
  padding-right: 16px;
  gap: 40px;
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  @media (min-width: 1440px) {
    padding-left: 80px;
    padding-right: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 48px;
  }
`;

const RegionDiv = styled.div`
  width: 200px;
  border: none;
  height: 48px;
  border-radius: 5px;
  background: ${(props) => (props.$darkMode ? "#2B3844" : "#fafafa")};
  box-shadow: 0px 2px 9px 0px rgba(0, 0, 0, 0.05);
  padding-left: 24px;
  padding-right: 19px;
  box-sizing: border-box;
  appearance: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (min-width: 1440px) {
    height: 56px;
  }
`;

const RegionStyles = styled.h2`
  color: ${(props) => (props.$darkMode ? "#fff" : "#111517")};
  font-family: Nunito Sans;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  @media (min-width: 1440px) {
    font-size: 14px;
  }
`;

const DropdownWrapper = styled.div`
  position: relative;
  width: 200px;
`;

const OptionsDiv = styled.div`
  position: absolute;
  top: 52px;
  width: 100%;
  background: ${(props) => (props.$darkMode ? "#2B3844" : "#fafafa")};
  border-radius: 5px;
  box-shadow: 0px 2px 9px 0px rgba(0, 0, 0, 0.05);
  @media (min-width: 1440px) {
    top: 60px;
  }
`;

const Option = styled.div`
  padding: 8px 24px;
  font-family: Nunito Sans;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  color: ${(props) => (props.$darkMode ? "#fff" : "#111517")};
  cursor: pointer;
  &:hover {
    background: ${(props) => (props.$darkMode ? "#6586a4" : "#f0f0f0")};
  }
  @media (min-width: 1440px) {
    font-size: 14px;
  }
`;

const SearchButton = styled.img`
  cursor: pointer;
  width: 16px;
  height: 16px;
  @media (min-width: 1440px) {
    width: 18px;
    height: 18px;
  }
`;

const Link = styled(RouterLink)`
  text-decoration: none;
  color: inherit;
`;

const Flag = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
  @media (min-width: 1440px) {
    height: 160px;
  }
`;

const ArrowImg = styled.img`
  width: 10px;
  height: 10px;
  @media (min-width: 1440px) {
    width: 12px;
    height: 12px;
  }
`;
