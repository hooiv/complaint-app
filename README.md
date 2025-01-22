# Complaint Application with JWT Authentication (Next.js)

This is a Next.js application for managing complaints, featuring JWT (JSON Web Token) authentication for secure access.  Administrators can manage complaints, while regular users can submit complaints.
# DEMO ADMIN CREDENTIALS: EMAIL: 2@j.c,PASSWORD:1

## Table of Contents

- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
- [Using the Application](#using-the-application)
  - [Registration](#registration)
  - [Login](#login)
  - [Submitting a Complaint (Non-Admin Users)](#submitting-a-complaint-non-admin-users)
  - [Admin Dashboard (Admin Users)](#admin-dashboard-admin-users)
    - [Managing Complaints](#managing-complaints)
    - [Updating Complaint Status](#updating-complaint-status)
- [Email Functionality](#email-functionality)
  - [Configuration](#configuration)
  - [Functionality](#functionality-1)
- [MongoDB Setup](#mongodb-setup)
- [Important Considerations](#important-considerations)
- [Contributing](#contributing)
- [License](#license)

## Setup Instructions

### Prerequisites

- **Node.js and npm (or yarn):** Ensure you have Node.js (version 18 or later recommended) and npm (Node Package Manager) or yarn installed on your machine. You can download them from [nodejs.org](https://nodejs.org/).
- **MongoDB:** You need a MongoDB database instance running or accessible. You can install MongoDB locally or use a cloud-based MongoDB service like MongoDB Atlas.

### Installation

1. **Clone the repository:**

   ```bash
   git clone <your-repository-url>
   cd complaint-app
2. **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
This command installs all necessary packages listed in package.json, including:

bcryptjs: For password hashing.

jsonwebtoken: For JWT generation and verification.

iron-session: For secure session management.

mongoose: For MongoDB interaction.

nodemailer: For sending emails.

next, react, react-dom, react-hook-form, tailwindcss, postcss, autoprefixer: Core Next.js and frontend dependencies.

### Environment Variables
Create a .env.local file in the root of your project and add the following environment variables. Ensure you replace the placeholder values with your actual configuration.
     ```bash

     MONGODB_URI=your_mongodb_connection_string  # Your MongoDB connection string (e.g., from MongoDB Atlas)
     SMTP_HOST=your_smtp_host                 # SMTP server host (e.g., smtp.example.com)
     SMTP_PORT=your_smtp_port                 # SMTP server port (e.g., 465 or 587)
     SMTP_USER=your_smtp_user                 # SMTP username 
     SMTP_PASS=your_smtp_password               # SMTP password 
     ADMIN_EMAIL=your_admin_email               # Email address to receive admin notifications
     JWT_SECRET=your_secure_jwt_secret_key      # A strong, random secret key for JWT signing (at least 32 characters)
     SECRET_COOKIE_PASSWORD=your_secure_cookie_password # A strong, random secret key for iron-session cookie encryption (at least 32 characters)

Important:

MONGODB_URI: Obtain your MongoDB connection string from your MongoDB provider.

SMTP variables: Configure these with your SMTP server details for email sending. If using Gmail, you might need to generate an "App Password".

JWT_SECRET and SECRET_COOKIE_PASSWORD: Generate strong, random strings of at least 32 characters for these secrets. You can use online generators or the openssl rand -base64 48 command in your terminal. Keep these secrets secure and do not commit them to your version control system.

### Running Locally
To run the application locally in development mode:

    npm run dev
    # or
    yarn dev


This will start the Next.js development server. Open your browser and navigate to http://localhost:3000 to access the application.

To build and start the application in production mode (after building):

    npm run build
    npm run start
    # or
    yarn build
    yarn start
## Using the Application
### Registration
Navigate to the registration page: http://localhost:3000/register.

Fill in the registration form with your name, email, and password.

Click the "Register" button.

Upon successful registration, you will see an alert message and be redirected to the login page.

### Login
Navigate to the login page: http://localhost:3000/login (or you will be redirected there if you try to access protected pages without logging in).

Enter your registered email and password in the login form.

Click the "Login" button.

Admin Users: If you log in as an administrator (an account with isAdmin: true in the database), you will be redirected to the Admin Dashboard at /admin/complaints.

Non-Admin Users: If you log in as a regular user, you will be redirected to the "Submit a Complaint" page at /submit-complaint.

### Submitting a Complaint (Non-Admin Users)
After logging in as a non-admin user, you will be on the "Submit a Complaint" page at /submit-complaint.

Fill out the complaint form, including the title and description of your complaint.

Click the "Submit Complaint" button.

Upon successful submission, you will see a success message.

### Admin Dashboard (Admin Users)
The Admin Dashboard is accessible at /admin/complaints after logging in as an administrator. It allows administrators to manage submitted complaints.

#### Managing Complaints
Complaint Table: The dashboard displays a table listing all submitted complaints.

Filtering: You can filter complaints by "Status" and "Priority" using the dropdown menus above the table.

Complaint Details: The table shows the title, category, priority, submission date, and current status of each complaint.

#### Updating Complaint Status
Status Dropdown: In the "Actions" column of each complaint row, there is a dropdown menu labeled "Status".

Change Status: Admins can use this dropdown to change the status of a complaint to: "Pending", "In Progress", or "Resolved".

Update Action: When you select a new status from the dropdown, the application will automatically update the complaint's status in the database.

Email Notification: When an admin updates the status of a complaint, an email notification is sent to the administrator's email address (ADMIN_EMAIL environment variable) confirming the update.

## Email Functionality
### Configuration
Email functionality for sending notifications (new complaint submissions, status updates) is implemented using Nodemailer. To enable email sending:

Configure SMTP Environment Variables: Ensure you have correctly configured the SMTP environment variables in your .env.local file (or Vercel environment variables for production):

SMTP_HOST

SMTP_PORT

SMTP_USER

SMTP_PASS

ADMIN_EMAIL

Test Email Setup: After configuring SMTP, you can test the email functionality by submitting a new complaint or updating a complaint status as an admin. Check your admin email inbox to see if the notification emails are being received.

### Functionality
New Complaint Submission Email: When a user submits a new complaint, an email is sent to the ADMIN_EMAIL to notify the administrator about the new submission.

Complaint Status Update Email: When an administrator updates the status of a complaint, an email is sent to the ADMIN_EMAIL to confirm the status update.

## MongoDB Setup
This application uses MongoDB to store user data and complaint data.

MongoDB Instance: Ensure you have a MongoDB database instance running and accessible. You can:

Install MongoDB Locally: Download and install MongoDB Community Edition on your local machine.

Use MongoDB Atlas (Cloud): Create a free MongoDB Atlas cluster on mongodb.com/atlas. MongoDB Atlas is a fully-managed cloud database service.

Connection String: Obtain your MongoDB connection string.

Local MongoDB: If running locally, the connection string might be something like mongodb://localhost:27017/<your-database-name>.

MongoDB Atlas: In MongoDB Atlas, navigate to your cluster, click "Connect", choose "Connect your application", and copy the connection string provided.

Set MONGODB_URI Environment Variable: Set the MONGODB_URI environment variable in your .env.local file (or Vercel environment variables) to your MongoDB connection string.

## Important Considerations
Security:

JWT_SECRET and SECRET_COOKIE_PASSWORD: Treat these secrets with utmost care. Do not expose them in your client-side code or commit them to version control. Use environment variables to manage them securely.

HTTPS: In production, ensure your application is served over HTTPS to protect session cookies and data in transit.

Input Validation: Implement robust input validation on both the frontend and backend to prevent common vulnerabilities.

Rate Limiting: Consider implementing rate limiting on your login and registration API routes to prevent brute-force attacks.

Scalability: For production deployments with high traffic, consider using a more robust SMTP service for email sending and optimizing your MongoDB setup.

Error Handling: The application includes basic error handling, but for production, you should implement more comprehensive error logging, monitoring, and user-friendly error messages.
## Contributing

We welcome contributions to the Complaint Application! If you'd like to contribute, please follow these guidelines:

### Reporting Issues and Bugs

If you find a bug or issue, please:

1.  **Check Existing Issues:** Before submitting a new issue, please check the [Issue Tracker](link-to-your-issue-tracker-here - e.g., GitHub Issues) to see if a similar issue already exists.
2.  **Create a New Issue:** If it's a new issue, create a new issue in the [Issue Tracker](link-to-your-issue-tracker-here - e.g., GitHub Issues), providing:
    - A clear and descriptive title.
    - Steps to reproduce the issue.
    - Expected behavior vs. actual behavior.
    - Relevant error messages, logs, or screenshots.
    - Your environment details (Node.js version, npm/yarn version, browser, OS).

### Feature Requests

If you have a feature request or suggestion, please:

1.  **Check Existing Feature Requests:** Review the [Issue Tracker](link-to-your-issue-tracker-here - e.g., GitHub Issues) for existing feature requests to avoid duplicates.
2.  **Create a Feature Request Issue:** Open a new issue in the [Issue Tracker](link-to-your-issue-tracker-here - e.g., GitHub Issues) with:
    - A clear and descriptive title for the feature.
    - A detailed description of the feature and its benefits.
    - Use cases or examples of how the feature would be used.

### Contributing Code (Pull Requests)

If you want to contribute code (bug fixes, new features, improvements), please follow these steps:

1.  **Fork the Repository:** Fork the repository to your own GitHub account.
2.  **Create a Branch:** Create a new branch from the `main` branch for your contribution:
    ```bash
    git checkout -b feature/your-feature-name
    # or
    git checkout -b bugfix/fix-issue-description
    ```
3.  **Make Changes:** Make your code changes in your forked repository, adhering to the project's coding style and conventions.
4.  **Test Your Changes:** Thoroughly test your changes to ensure they work as expected and do not introduce regressions.
5.  **Commit Your Changes:** Commit your changes with clear and concise commit messages:
    ```bash
    git commit -m "feat: Add feature description"
    # or
    git commit -m "fix: Fix bug description (#issue-number)"
    ```
6.  **Push to Your Fork:** Push your branch to your forked repository:
    ```bash
    git push origin feature/your-feature-name
    ```
7.  **Submit a Pull Request (PR):** Create a new pull request from your branch to the `main` branch of the main repository.
    - Provide a clear title and description for your PR.
    - Link any relevant issues or feature requests to your PR.
## License

This project is licensed under the **MIT License**.






