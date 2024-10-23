# Todo List Application

This is a simple Todo List application with a Next.js frontend and a Node.js backend using MySQL and Sequelize.

## Prerequisites

- Node.js (v14 or later)
- MySQL

## Setup

1. Clone the repository:
git clone `<repository-url>`
cd `<project-folder>`


2. Set up the backend:
<<<<<<< HEAD
```plaintext
=======
>>>>>>> 2b913eeff07797009893bf6cc2e4499adf714e92

```bash
cd backend
npm install
<<<<<<< HEAD
```bash
=======
```

>>>>>>> 2b913eeff07797009893bf6cc2e4499adf714e92


3. Create a MySQL database named `todo_db`.

4. Update the `backend/config/config.json` file with your MySQL credentials if necessary.


5. Run the database migrations:
```bash
npx sequelize-cli db:migrate
```

6. Start the backend server:
```bash
npm run dev
```

7. Set up the frontend:
```bash
cd ../frontend
npm install
```

8. Start the frontend development server:
```bash
npm run dev
```

9. Open your browser and navigate to `http://localhost:3000` to use the application.

## Features

- Create new todo items
- View all todo items
- Mark todo items as completed or uncompleted

## Technologies Used

- Frontend: Next.js, React
- Backend: Node.js, Express
- Database: MySQL
- ORM: Sequelize
