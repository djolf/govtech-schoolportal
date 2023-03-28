# govtech-schoolportal
An education system

## Prerequesites
You must have postgresql set up to run on local. use `init.sql` to set up the db, then create a `.env` file in the `api` folder with your db credentials, for example
```
DB_HOST="localhost" 
DB_PORT=5432
DB_USER="admin" 
DB_PASSWORD="password"
DB_NAME="gtschool"
```
## Getting started
Clone the repo, then run:
```
npm install
```
at the root folder. This should install both client and server.
Then run:
```
npm start
```
to run both client and server. Uses port 3000 by default, so go to http://localhost:3000/ to access the app.
