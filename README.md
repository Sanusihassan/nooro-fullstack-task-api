# Nooro Fullstack Task API

## Installation and Setup

Follow these steps to install and set up the API on your local machine:

### Prerequisites

1. **Node.js**: Make sure you have Node.js installed on your system.
2. **MySQL**: Ensure MySQL is installed and running on your system.

### Steps

#### 1. Clone the Repository

```bash
# Clone the repository
$ git clone git@github.com:Sanusihassan/nooro-fullstack-task-api.git

# Navigate into the project directory
$ cd nooro-fullstack-task-api
```

#### 2. Install Dependencies

```bash
# Install the required dependencies
$ npm install
```

#### 3. Create a `.env` File

Create a `.env` file in the root directory of the project with the following content:

```env
DATABASE_URL="mysql://sanusi:sanusi98@localhost:3306/todo_db"
```

#### 4. Set Up MySQL Database

1. Log in to MySQL as the root user:

   ```bash
   $ mysql -u root -p
   # Enter password: root
   ```

2. Create the `todo_db` database if it doesn’t exist:

   ```sql
   CREATE DATABASE IF NOT EXISTS todo_db;
   ```

3. Create the `sanusi` user and grant privileges:

   ```sql
   CREATE USER IF NOT EXISTS 'sanusi'@'localhost' IDENTIFIED BY 'sanusi98';
   GRANT ALL PRIVILEGES ON todo_db.* TO 'sanusi'@'localhost';
   FLUSH PRIVILEGES;
   ```

4. Exit MySQL:

   ```bash
   mysql> EXIT;
   ```

#### 5. Initialize Prisma

Run the following Prisma commands to set up the database schema:

```bash
# Push the Prisma schema to the database
$ npx prisma db push

# Run any pending migrations
$ npx prisma migrate dev
```

### 6. Start the API

#### Development Mode

To run the API in development mode (with hot-reloading):

```bash
$ npm run dev
```

#### Production Mode

To build and start the API in production mode:

```bash
# Build the project
$ npm run build

# Start the API
$ npm start
```

### Available Scripts

The following scripts are defined in `package.json`:

- **`dev`**: Starts the API in development mode using `nodemon`.
- **`build`**: Compiles the TypeScript code to JavaScript.
- **`start`**: Runs the compiled JavaScript code in production mode.

---

## API Structure

### Project Structure

```plaintext
.
├── README.md
├── package-lock.json
├── package.json
├── prisma
│   ├── migrations
│   │   ├── 20250122142614_update_task_id_to_uuid
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   └── schema.prisma
├── src
│   ├── controllers
│   │   └── taskController.ts
│   ├── index.ts
│   └── routes
│       └── taskRoutes.ts
└── tsconfig.json
```

### Key Files

- **`src/index.ts`**: Entry point of the API.
- **`src/controllers/taskController.ts`**: Contains logic for handling tasks.
- **`src/routes/taskRoutes.ts`**: Defines the API routes for task-related operations.

---

## Troubleshooting

1. **Error Connecting to MySQL**:

   - Ensure the MySQL server is running.
   - Verify that the credentials in the `.env` file are correct.

2. **Prisma Errors**:

   - Check if the `prisma/schema.prisma` file is correctly configured.
   - Ensure the database is accessible and the migrations have been applied.

3. **Dependencies Not Installed**:

   - Run `npm install` to install all required dependencies.

---

## Notes

- For security, avoid exposing your `.env` file or sensitive database credentials.
- Use a strong password for the MySQL user in a production environment.

