import React, { useState, useEffect } from "react";
import styled from "styled-components";
//import Logo from "../assets/logo.svg";
import Logout from "./Logout";
import Logo from "../assets/branchLogo.png";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    async function getSessionUserData() {
      const data = await JSON.parse(
        localStorage.getItem(process.env.LOGGED_IN_USER)
      );
      setCurrentUserName(data.username);
    }
    getSessionUserData();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      <Container>
        <div className="brand">
          <img src={Logo} alt="logo" />
        </div>
        <div className="contacts">
          {contacts.map((contact, index) => {
            return (
              <div
                key={contact._id}
                className={`contact ${
                  index === currentSelected ? "selected" : ""
                }`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            );
          })}
        </div>
        <div className="current-user">
          <Logout />
          <div className="username">
            <h2>{currentUserName}</h2>
          </div>
        </div>
      </Container>
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  overflow: hidden;
  background-color: #fafafa;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 3rem;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.4rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #4fcdff;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #a7e6ff;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.1rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.4s ease-in-out;
      .username {
        h3 {
          color: black;
          font-weight: 400;
          margin-left: 1rem;
        }
      }
    }
    .selected {
      background-color: #4fcdff;
    }
  }
  .current-user {
    background-color: #19355e;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .username {
      h2 {
        font-weight: 400;
        color: white;
      }
    }
  }
`;
