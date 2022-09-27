import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { host, allUserTypeRoute } from "../utils/APIRoutes";
//Page components
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    async function checkIfUserLoggedIn() {
      if (!localStorage.getItem(process.env.LOGGED_IN_USER)) {
        navigate("/login");
      } else {
        setCurrentUser(
          await JSON.parse(localStorage.getItem(process.env.LOGGED_IN_USER))
        );
      }
    }
    checkIfUserLoggedIn();
  }, [navigate]);

  //whenever user has logged in and online, open a socket
  useEffect(() => {
    if (currentUser) {
      console.log("add-user listener");
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
      if (currentUser.userType === "customer") {
        socket.current.emit("cust_online", currentUser._id);
      } else if (currentUser.userType === "agent") {
        socket.current.emit("agent_online", currentUser._id);
      }
    }
  }, [currentUser]);

  // useEffect(() => {
  //   if (socket.current) {
  //     console.log("online_status listener");
  //     socket.current.on("online_status", (userId) => {
  //       console.log("User online: ", userId);
  //     });
  //   }
  // }, [socket]);

  useEffect(() => {
    async function fetchUsers() {
      if (currentUser) {
        const fetchUserType =
          currentUser.userType === window.cust ? window.agent : window.cust;
        const data = await axios.get(`${allUserTypeRoute}/${fetchUserType}`);
        setContacts(data.data);
      }
    }
    fetchUsers();
  }, [currentUser, navigate]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #eaeaea;
  .container {
    height: 100%;
    width: 100%;
    background-color: #ffffff;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
