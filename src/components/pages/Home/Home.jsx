import React, { useState, useEffect } from "react";
import { Header } from "components/shared";
import { styled } from "styled-components";
import axios from "axios";
import { Arrow, SearchIcon } from "assets/index";
import { Link as RouterLink } from "react-router-dom";

function Home() {
  const [countries, setCountries] = useState([]);
  const [displayedCountries, setDisplayedCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");

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
    <Div>
      <Header />
      <SearchDiv>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <InputDiv>
            <SearchButton src={SearchIcon} alt="" onClick={handleSearch} />
            <InputStyles
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for a country…"
            />
            <button type="submit" style={{ display: "none" }}>
              Search
            </button>
          </InputDiv>
        </form>
        <DropdownWrapper onClick={() => setDropdownOpen(!dropdownOpen)}>
          <RegionDiv>
            <RegionStyles>{selectedRegion || "Filter by Region"}</RegionStyles>
            <img src={Arrow} alt="" />
          </RegionDiv>
          {dropdownOpen && (
            <OptionsDiv>
              {options.map((option, index) => (
                <Option
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
        {displayedCountries.map((country, index) => (
          <Link to={`/country/${country.name.common}`}>
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
        </Link>
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
  cursor: pointer;
  width: 264px;
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
  background: #fff;
  box-shadow: 0px 2px 9px 0px rgba(0, 0, 0, 0.05);
  height: 48px;
  width: 100%;
  gap: 12px;
`;

const InputStyles = styled.input`
  color: #c4c4c4;
  font-family: Nunito Sans;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  border: none;
  width: 100%;
  padding-left: 12px;
`;

const SearchDiv = styled.div`
  width: 100%;
  padding-left: 16px;
  padding-right: 16px;
  gap: 40px;
  display: flex;
  flex-direction: column;
`;

const RegionDiv = styled.div`
  width: 200px;
  border: none;
  height: 48px;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0px 2px 9px 0px rgba(0, 0, 0, 0.05);
  padding-left: 24px;
  padding-right: 19px;
  box-sizing: border-box;
  appearance: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RegionStyles = styled.h2`
  color: #111517;
  font-family: Nunito Sans;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
`;

const DropdownWrapper = styled.div`
  position: relative;
  width: 200px;
`;

const OptionsDiv = styled.div`
  position: absolute;
  top: 52px;
  width: 100%;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0px 2px 9px 0px rgba(0, 0, 0, 0.05);
`;

const Option = styled.div`
  padding: 8px 24px;
  font-family: Nunito Sans;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
`;

const SearchButton = styled.img`
  cursor: pointer;
`;

const Link = styled(RouterLink)`
  text-decoration: none;
  color: inherit;
`;