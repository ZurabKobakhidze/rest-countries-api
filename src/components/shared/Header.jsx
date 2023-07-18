import React from "react";
import { styled } from "styled-components";

function Header() {
  return <HeaderDiv>
    <h2>Where in the world?</h2>
    <h2></h2>
  </HeaderDiv>;
}

export default Header;

const HeaderDiv = styled.div`
  width: 375px;
  height: 80px;
  flex-shrink: 0;
  background: #FFF;
box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.06);
`;
