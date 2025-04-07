# Todo App

A full-stack todo application built with React, Node.js, Express, TypeScript, and MySQL.

## Table of Contents

- [System Architecture](#system-architecture)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development](#development)
- [Testing](#testing)
- [API Documentation](#api-documentation)

## System Architecture

The application follows a three-tier architecture:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│    Frontend     │◄───►│     Backend     │◄───►│    Database     │
│    (React)      │     │  (Node/Express) │     │    (MySQL)      │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Technologies Used

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- Redux for state management
- Jest testing

### Backend
- Node.js with Express
- TypeScript
- Prisma ORM
- Jest for testing
- Swagger for API documentation

### Database
- MySQL

## Prerequisites

Before you begin, ensure you have the following installed:
- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Getting Started

### Clone the repository
```bash
git clone https://github.com/VihanPamudya/ToDo-App.git
cd todo-app
```

### Run with Docker Compose
The easiest way to run the entire application stack is using Docker Compose:

```bash
# First build the images
docker-compose build

# Then start the containers
docker-compose up
```

Alternatively, you can combine these commands:

```bash
docker-compose up --build
```

This will:
1. Start the MySQL database
2. Initialize the database with schema from `init.sql`
3. Build and start the backend server
4. Build and start the frontend application

Once started, the application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001
- Swagger Documentation: http://localhost:3001/api-docs

## Project Structure

### Root Directory
```
todo-app/
├── docker-compose.yml         # Main docker configuration
├── init.sql                   # Database initialization
├── todo-frontend/            # React frontend application
│   ├── Dockerfile
│   └── ...
└── todo-backend/             # Node.js backend application
    ├── Dockerfile
    └── ...
```

### Backend Structure
```
src/
├── config/
│   └── swagger.ts            # Swagger configuration
├── controllers/
│   └── task.controller.ts    # Request handlers
├── middleware/
│   └── error.middleware.ts   # Error handling middleware
├── routes/
│   └── task.routes.ts        # API routes definition
├── services/
│   └── task.service.ts       # Business logic
├── types/
│   └── task.types.ts         # TypeScript type definitions
└── index.ts                  # Application entry point
```

### Frontend Structure
```
src/
├── components/               # React components
│   ├── Header.tsx
│   ├── TaskForm.tsx
│   ├── TaskItem.tsx
│   └── TaskList.tsx
├── store/                    # Redux store configuration
│   ├── actions.ts            # Redux action creators
│   ├── index.ts              # Store configuration and setup
│   └── reducers.ts           # Redux reducers
├── types/                    # TypeScript type definitions
│   └── Task.ts
└── services/                 # API service layer
    └── taskService.ts
```

## Development

### Backend Development
```bash
cd todo-backend
npm install
npm run dev
```

### Frontend Development
```bash
cd todo-frontend
npm install
npm run dev
```

## Testing

### Running Backend Tests
```bash
cd todo-backend
npm test                  # Run all tests
npm run test:coverage     # Run tests with coverage report
```

### Running Frontend Tests
```bash
cd todo-frontend
npm test                  # Run all tests
npm run test:coverage     # Run tests with coverage report
```

## API Documentation

The API is documented using Swagger UI, which can be accessed at http://localhost:3001/api-docs when the backend is running.

### Main API Endpoints

- `GET /api/tasks` - Get all active tasks
- `POST /api/tasks/create` - Create a new task
- `PATCH /api/tasks/:id/complete` - Mark a task as complete
