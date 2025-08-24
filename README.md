# Rick and Morty list APP

Full-stack application that consumes characters from the Rick and Morty public API. It allows you to list them, view details, mark them as favorites, and add comments. Backend with Express + GraphQL + Redis and frontend with React 18.

## Database ER Diagram

<img width="541" height="361" alt="er drawio" src="https://github.com/user-attachments/assets/18b17a01-6f54-4ee4-8fff-c8dd54248408" />


## Required Technologies

You need to have all of this technologies up and running in your computer to run the project:

- Redis
- PostgreSQL
- Node.js

## Instructions to run the app

### Backend

- Clone the repository: `git clone https://github.com/Alejandro2134/rick-and-morty-app.git`
- Navigate to the backend folder `cd backend`
- Install dependencies: `npm i`
- Set up env variables on a .env file (change them depending on how and where the services are running):
  ```bash
    DB_HOST=localhost
    DB_USERNAME=root
    DB_PASSWORD=secret
    DB_NAME=rick_and_morty_db
    REDIS_URL=redis://localhost:6379
    EXTERNAL_CHARACTERS_API_BASE_URL=https://rickandmortyapi.com/api
  ```
- Run database migrations `npm run db:migrate`
- Run the app in development mode: `npm run dev` this will initialize the db with characters taken from the Rick and Morty API
- Navigate to http://localhost:3000/graphql you should see a sandbox server for graphql (where you can play with the available queries and mutations):
  <img width="1510" height="940" alt="Captura de pantalla 2025-08-24 a la(s) 3 16 06 a  m" src="https://github.com/user-attachments/assets/32694b93-714e-48c6-ad39-1bb494c00142" />


### Frontend

- Clone the repository: `git clone https://github.com/Alejandro2134/rick-and-morty-app.git`
- Navigate to the frontend folder `cd frontend`
- Install dependencies: `npm i`
- Set up env variables on a .env file:
  ```bash
  VITE_GRAPHQL_API=http://localhost:3000/graphql
  ```
- Run the app in development mode: `npm run dev`
- Navigate to http://localhost:5173 you should see the application
  <img width="1918" height="892" alt="Captura de pantalla 2025-08-24 a la(s) 3 22 40 a  m" src="https://github.com/user-attachments/assets/22a7a8b9-1729-45ad-9c7e-d7a66d045e08" />


## How to use the API

The API exposes a single GraphQL endpoint at /graphql. From there, you can execute the following operations:

### Queries

- character(id: Int!): Character!
- characters(filter: CharacterFilters!): [Character!]

### Mutations

- create(data: CommentCreate!): Comment!
- update(id: Int!): Character!

You can try these operations directly in the GraphQL Playground: http://localhost:3000/graphql

## Made by

Alejandro Zapata
