# NC-BackendProject-Game
Backend project for Northcoders bootcamp.

## Summary
This repo contains all the necessary files and information required to create a database and node.js based API for a potential board-game review themed website, including:
<ul>
  <li>Development and test data (in JS format)
  <li>Seed files to create a Posgres database
  <li>API made using express.js using the MVC framework
  <li>Testing suites for utility functions and all API endpoints using Jest and SuperTest
</ul>

## Requirements
To deploy and run this project locally:
<ul>
  <li>Postgres should be version 12.9 or higher
  <li>Node.js should be verison 18.0.0 or higher
</ul>

## Local deployment
To deploy and test this project locally (using ubuntu, other OS will vary):
1. Clone repo in terminal
```js
git clone https://github.com/pkaodev/NC-BackendProject-Game.git
```
2. Install dependencies
```js
npm i
```
3. Create local .env files:
<ul>
  <li>creates files .env.test and .env.development in root directory
  <li>enter the following in each file (without the ''s):<br>
        PGDATABASE='database name here'
  <li>Database names can be found in the db/setup.sql file.
</ul>

4. Seed local database
```js
npm run setup-dbs
```
5. Run tests
```js
npm run test
```

## Hosted example
A working example of this api is being hosted using Heroku and can be found on:
https://pats-first-api.herokuapp.com/api
This endpoint acts as a directory showing all currently available endpoints


