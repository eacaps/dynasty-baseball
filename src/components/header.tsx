import React from "react"
import styled from 'styled-components';
import { Link } from "react-router-dom";

const Title = styled.h1`
  font-size: 1em;
  color: #4ab571;
`;

export default () => {
  return (
      <Link to='/'><Title>Dynasty Baseball</Title></Link>
  );
}