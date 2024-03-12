# Yassir Technical Challenge

This repository contains a NestJS application that provides two REST APIs, leveraging the IQAir third-party API to fetch pollution data and a custom database-backed API to determine the most polluted time in Paris. The application includes end-to-end (e2e) testing, unit testing, and coverage.

## Features

### 1. Pollution Data API

#### Endpoint: `/pollution`

- **Method**: `GET`
- **Description**: Retrieves pollution data from the IQAir third-party API based on latitude and longitude.

### 2. Most Polluted Time in Paris API

#### Endpoint: `/pollution/peak`

- **Method**: `GET`
- **Description**: Retrieves the most polluted date and time in Paris from the local database, which is populated by a cron job running every minute.

## Getting Started

Follow these steps to set up and run the application:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/yassir-technical-challenge.git
   ```

2. Install dependencies:

   ```bash
   cd yassir-technical-challenge
   npm install
   ```

3. Set up MySQL/Postgres Database and IQAir Authentication Key:**

   - Create a MySQL/Postgres database and update the database credentials in `src/environment/environment.ts`.

   - If you want to use your own IQAir authentication key, replace the key as well:

     ```typescript
     // src/environment/environment.ts

     key = 'YOUR_IQAIR_API_KEY'; 
     // Replace with your actual IQAir API key or use mine, since for the demo I have left my key there intentionally. This should be a party of environment secret
     ```

   - Ensure the environment file (`src/environment/environment.ts`) is properly configured with your database credentials and database name. I have personally tested with both database so it shouldn't be a problem.

   This configuration allows the application to authenticate with the IQAir API using your personal key. Update the IQAir API key to access the data seamlessly.

4. Run the Application:

   ```bash
   npm run start
   ```

   This command will start the server and the cron job, populating the database with weather data every minute.

5. Access Swagger Documentation:

   Open your browser and go to [http://localhost:3000/api](http://localhost:3000/api) to explore the Swagger documentation for the APIs.

6. Run Tests:

   ```bash
   npm run test
   ```

   This command will run unit tests and for e2e try:

   ```bash
   npm run test:e2e
   ```

   To demonstrate how to mock the API, please refer to the `test/app.e2e-spec.ts` file.   

## Note

- The application automatically synchronizes the database tables based on the TypeORM entities.

- Ensure that the environment file (`src/environment/environment.ts`) is properly configured with your database credentials and database name.

- The cron job is configured to run every minute, fetching weather data from the IQAir API and storing it in the local database.

- Swagger documentation is available at [http://localhost:3000/api](http://localhost:3000/api) for easy API exploration.

Feel free to explore the APIs, run tests, and adapt the application to fit your needs. If you have any questions or face issues, please reach out to us. Good luck with the technical challenge!