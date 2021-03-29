import React from "react"
import styled from 'styled-components';
import { Link } from "react-router-dom";

const Title = styled.h1`
  font-size: 3em;
  text-align: center;
  color: #4ab571;
`;

export default () => {
  return (
      <>
        <Title>Welcome</Title>
        <Link to='/teams'>Teams</Link>
      </>
  );
}