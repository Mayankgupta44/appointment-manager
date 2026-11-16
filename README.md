# Appointment Manager

A simple and responsive Appointment Manager application built using the MERN stack. It allows users to create appointments, view appointment details, update appointment statuses, filter appointments, and search by customer name.

## Tech Stack

**Frontend**
- React.js
- Tailwind CSS
- Axios
- Vite

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose

## Features

- Add new appointments.
- View all appointments.
- Validate required fields.
- Update appointment status.
- Filter appointments by status:
  - All
  - Pending
  - Confirmed
  - Cancelled
- Search appointments by customer name.
- Case-insensitive and partial-name search.
- Responsive user interface.
- Store appointment data in MongoDB.
- Preserve appointment data after page refresh.

## Project Structure

```text
appointment-manager/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

## Prerequisites

Make sure the following are installed:

- Node.js and npm
- MongoDB Community Server
- Git

## Installation and Setup

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
cd appointment-manager
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file using `.env.example` as a reference.

Configure the MongoDB connection string and port in the `.env` file.

Start the backend:

```bash
npm run dev
```

The backend will run at:

`http://localhost:5000`

### 3. Frontend Setup

Open another terminal:

```bash
cd appointment-manager/frontend
npm install
npm run dev
```

Open the local URL displayed by Vite, usually:

`http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/appointments` | Get all appointments |
| POST | `/api/appointments` | Create an appointment |
| PATCH | `/api/appointments/:id/status` | Update appointment status |

See the API notes in the submission for example requests and responses.

## Sample Appointment Data

The following fictional records can be added through the application or POST API:

**Appointment 1**
- Customer: Alex Morgan
- Service: Consultation
- Date: 2 November 2026, 10:00 AM
- Status: Pending

**Appointment 2**
- Customer: Jamie Lee
- Service: Follow-up Review
- Date: 3 November 2026, 2:00 PM
- Status: Confirmed

These records are not automatically seeded when the application starts.

## Testing

The following functionality has been tested locally:

- Creating appointments.
- Required-field validation.
- Updating appointment status.
- Filtering by appointment status.
- Searching by customer name.
- Case-insensitive and partial-name search.
- Data persistence after refreshing the page.

## Technical Decision

Customer-name search is implemented on the frontend using JavaScript's `filter()` and `includes()` methods.

This keeps the implementation simple and avoids additional backend API changes. The existing appointment data is filtered in the browser based on the selected status and search text.

## Limitations

- The application currently does not include user authentication.
- Appointment data is stored in a local MongoDB database.
- Search and status filtering are performed on the frontend.
- Sample records must be added manually.

## Future Improvements

- Add appointment editing functionality.
- Add pagination for large appointment lists.
- Add authentication and role-based access.
- Add server-side search and filtering.

## Author

Developed as a MERN Stack Appointment Manager practical assessment.