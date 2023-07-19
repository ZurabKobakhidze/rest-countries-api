import { Moon, MoonWhite } from "assets/index";
import { DarkModeContext } from "context/DarkModeContext";
import React, { useContext } from "react";
import { styled } from "styled-components";

function Header() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <HeaderDiv $darkMode={darkMode}>
      <H2text $darkMode={darkMode}>Where in the world?</H2text>
      <MoonDiv onClick={toggleDarkMode}>
        {darkMode ? (
          <Icon src={MoonWhite} alt="" />
        ) : (
          <Icon src={Moon} alt="" />
        )}
        <H2text2 $darkMode={darkMode}>Dark Mode</H2text2>
      </MoonDiv>
    </HeaderDiv>
  );
}

export default Header;

const HeaderDiv = styled.div`
  width: 100%;
  height: 80px;
  background: ${(props) => (props.$darkMode ? "#2B3844" : "#fff")};
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  box-sizing: border-box;
  justify-content: space-between;
  @media (min-width: 1440px) {
    padding-left: 80px;
    padding-right: 80px;
  }
`;

const H2text = styled.h2`
  color: ${(props) => (props.$darkMode ? "#fff" : "#111517")};
  font-family: Nunito Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 800;
  line-height: 20px;
  @media (min-width: 1440px) {
    color: ${(props) => (props.$darkMode ? "#fff" : "#111517")};
    font-family: Nunito Sans;
    font-size: 24px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
  }
`;

const H2text2 = styled.h2`
  color: ${(props) => (props.$darkMode ? "#fff" : "#111517")};
  font-family: Nunito Sans;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  @media (min-width: 1440px) {
    color: ${(props) => (props.$darkMode ? "#fff" : "#111517")};
    font-family: Nunito Sans;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

const MoonDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
  @media (min-width: 1440px) {
    width: 20px;
    height: 20px;
  }
`;
