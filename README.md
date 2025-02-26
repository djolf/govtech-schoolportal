# govtech-schoolportal
An education system

## Prerequesites
You must have PostgreSQL set up to run locally. Use `init.sql` to set up the database, then create a `.env` file in the `api` folder with your database credentials, for example:

1. Install PostgreSQL from [here](https://www.postgresql.org/download/).
2. Start the PostgreSQL service.
3. Create a new database user and database:
  ```sh
  psql -U postgres
  CREATE USER admin WITH PASSWORD 'password';
  CREATE DATABASE gtschool OWNER admin;
  ```
4. Run the `init.sql` script to set up the database schema:
  ```sh
  psql -U admin -d gtschool -f path/to/init.sql
  ```
5. Create a `.env` file in the `api` folder with the following content:
  ```sh
  DB_HOST="localhost"
  DB_PORT=5432
  DB_USER="admin"
  DB_PASSWORD="password"
  DB_NAME="gtschool"
  ```
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
