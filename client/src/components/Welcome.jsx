import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function Welcome() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function getSessionUserName() {
      setUserName(
        await JSON.parse(localStorage.getItem(process.env.LOGGED_IN_USER))
          .username
      );
    }
    getSessionUserName();
  }, []);

  return (
    <Container>
      <h1>
        Hello, <span>{userName}!</span>
      </h1>
      <h3>Select a contact to start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  flex-direction: column;
  box-shadow: 0px 0px 2px 0.1px rgba(194, 194, 194, 1);
  img {
    height: 20rem;
  }
  h1 {
    font-weight: 500;
  }
  h3 {
    font-weight: 400;
  }
  span {
    color: #4fcdff;
  }
`;
