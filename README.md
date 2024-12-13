# Project Setup Guide

## Clone the Repository

First, clone the repository to your local machine using the following command:

```bash
git clone https://github.com/burukgetu/mini-vehicle-management.git
```

## Frontend Setup

1. Navigate to the `frontend` folder:

```bash
cd frontend
```

2. Install the required dependencies:

```bash
npm install
```

3. Start the frontend development server:

```bash
npm run dev
```

## Backend Setup

1. In a new terminal window, navigate to the `backend` folder:

```bash
cd backend
```

2. Install the required dependencies:

```bash
npm install
```

3. Create a `.env` file in the `backend` folder and add the following line with your MongoDB URI:

```bash
MONGO_URI=<Add your own mongo uri connection string>
```

4. Start the backend development server:

```bash
npm run dev
```

## Access the Application

Once both the frontend and backend servers are running, open your browser and go to:

```
http://localhost:5173
```

You should now be able to view the application.
