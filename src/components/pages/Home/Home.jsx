import { Header } from "components/shared";
import React from "react";
import { styled } from "styled-components";

function Home() {
  return (
    <Div>
      < Header />
    </Div>
  );
}

export default Home;

const Div = styled.div`
  background: #fafafa;
  min-height: 100vh;
`;
