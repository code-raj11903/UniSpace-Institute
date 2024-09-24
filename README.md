# UniSpace - Web Interface

## Overview :
The UniSpace web interface is built to manage the resources of colleges and schools. It allows institutes and departments to add, update, and delete resources, manage departments, and handle bookings. The platform provides analytics and order history, helping institutes efficiently manage their assets.

## 🌟 Features:

Authentication: Institute and department login, with institute registration.
Department Management: Add and manage departments (including details like email, location, contact info, etc.).
Resource Management: Add, update, or delete resources at both institute and department levels.
Order Management: View and track booking history for resources.
Analytics Dashboard: Gain insights into resources, bookings, and revenue.
Profile Management: Update contact details and passwords for both institutes and departments.
Tech Stack
Frontend: React.js, Tailwind CSS.
Backend: Node.js with Express.js.
Database: MongoDB (for managing data related to institutes, departments, and bookings).


## Installation Guide:
# Prerequisites
Node.js
MongoDB (Local or Cloud-based)

## Setup .env File:
#Create a .env file in the backend of your project with the following content:
```plaintext
PORT = 
CLOUDINARY_CLIENT_NAME= 
CLOUDINARY_CLIENT_API=
CLOUDINARY_CLIENT_SECRET=
MONGO_URI=
JWT_SECRET_KEY=
JWT_EXPIRES=7d
COOKIE_EXPIRE=5
```

## Instructions

Steps to Run
Clone the Repository:
```sh
git clone https://github.com/code-raj11903/UniSpace-Institute.git

#Frontend Setup:
#Navigate to the frontend directory:


cd UniSpace-Institute/Frontend

#Install dependencies:


npm install

#Run the development server:


npm run dev

#Backend Setup:
#Navigate to the backend directory:


cd ../Backend

#Install dependencies:


npm install

#Run the development server:


npm run dev


#Start the server:


npm start
```
## Features and Future Roadmap
Order Cancellation: Allow departments to cancel orders.
Enhanced Analytics: More detailed revenue and usage reports.
Account Deletion: Institutes and departments can delete accounts.