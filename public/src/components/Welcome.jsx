import React from "react";
import { styled } from "styled-components";
import robot from "../assets/robot.gif";

export default function Welcom({ currentUser }) {
  return (
    <Container>
      <img src={robot} alt="" />
      <h1>
        Welcome, <span>{currentUser.username}</span>
      </h1>
      <h3>Please, select a chat to start messaging</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
