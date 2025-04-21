# Project Blog/Company Profile

 This is a simple project built with Next.js and Tailwind CSS for the frontend, and NestJS for the backend. It serves as a blog or company profile website.

### Stack  
**Frontend:**
- Next.js
- Tailwind CSS

**Backend**:
- NestJS
- TypeORM
- PostgreSQL

### Features:
- Simple Blog or Company Profile template.
- Using Tailwind CSS
- Backend API built using NestJS to manage blog data (articles, posts, etc.).
- User authentication

### Prerequisites  
To run this project locally, you'll need the following tools installed:
- Node.js (preferably version 14 or higher)
- Yarn or npm for managing dependencies
- Postgres

### Getting Started
1. Clone the repository
  `git clone https://github.com/Felix-kuang/company-blog.git`
  `cd your-repo-name`
   
2. Frontend (Next.js + Tailwind)
- Navigate to the front end directory and install the dependencies:    
  `yarn install` or `npm install`
- Then, run the development server:  
  `yarn dev` or `npm run dev`  
The frontend will be available at http://localhost:3000.

3. Backend (NestJS)
- Navigate to the backend directory and install the dependencies:  
  `yarn install` or `npm install`

- After that, run the NestJS server:  
  `yarn start:dev` or `npm run start:dev`  
The backend will be available at http://localhost:3001.

4. Database
- Create a .env file in the backend directory and add your PostgreSQL credentials:

  >DB_HOST=localhost  
  >DB_PORT=5432  
  >DB_USERNAME=your-username  
  >DB_PASSWORD=your-password  
  >DB_NAME=your-database-name  

- Ensure that you add environment variables (e.g., DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD) to your cloud platform’s environment settings.

### License
This project is licensed under the MIT License - see the LICENSE file for details.

### Notes
Feel free to modify the UI and features to fit your needs! 🎉 This is just a basic setup to get you started with Next.js, Tailwind, and NestJS.

## Planned Enhancements

This project is still a work in progress. A basic CMS (Content Management System) feature is currently under development, aiming to:

- Allow admins to create and manage blog posts directly from the UI
- Store and display blog content dynamically
- Include a simple admin dashboard interface

The CMS feature is part of a future phase to enhance the functionality and serve as practice for implementing front-end CRUD operations.

