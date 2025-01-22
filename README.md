# Complaint Application with JWT Authentication (Next.js)

This is a Next.js application for managing complaints, featuring JWT (JSON Web Token) authentication for secure access.  Administrators can manage complaints, while regular users can submit complaints.

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
