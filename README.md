# Customer Service Messaging App : How to get started

## Client Dependencies

to install UI dependencies, run

### `yarn install`

to start the client, run

### `yarn start`

**Note: default client URL is `http://localhost:3000`**

## Server Dependencies

to install server dependencies, run

### `yarn install`

in `/server/.env` file please change the mongoDB URL to your local mongo URL. (local MongoDB installation is needed)

to start the server

### `yarn start`

**Note: default server URL is `http://localhost:3001`**

# App Features:

## Status Quo

1. Interaction between customer and agent is real-time.(-socket.io)
2. Connection is persistent. Page reload/refresh/new tab doesn`t affect the logged in user session.
3. Agents can see customers only(as of now, if needed agents can also see other agents)
4. Customers can only see agents.
5. Multiple agents can login at the same time, multiple customers can login at the same time.
6. Messages are stored in database. Once customer/agent sign in, they can see the previous conversation.
7. UI design takes into consideration the current https://branchapp.in/ website/app desing and color scheme so that the users can have consistent experience through out the journey.
8. UI is simple and interactive yet blazing fast(- react.JS)
9. Backend is scale ready(- mongoDB)
10. Socket.io library is scale ready with mongoDB. (Adding more db nodes is supported in socket.io)
11. Simple Login/Register screen. (Auth tokens will be integrated in the future development)

## Features in progress(P) / Future scope(F)

1. Showing users status as online/offline. (P)
2. Customers will only see one user/agent while messaging. (P)
3. Agents can see online/offline customers as well as agents. (P)
4. Figure out a scheme to help agents divide work amongst themselves. (P)
5. Explore ways to surface messages that are more urgent and in need of immediate attention. (F)
6. Implement search functionality to allow agents to search over incoming messages and / or customers (F)
7. Explore ways to surface additional information about customers. (P)
8. Implement a canned message feature that allows agents to quickly respond to enquiries using a set of pre-configured stock messages. (F)
9. Add avatars to make app more interactive. (F)

## Tech Stack (MERN)

MongoDB, Express, reactJS, nodeJS
Socket.io to implement real-time seamless messaging.
