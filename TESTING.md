# Appointment Manager – Testing Report

## Testing Environment

- Frontend: React.js with Vite
- Backend: Node.js and Express.js
- Database: Local MongoDB
- API Testing: Postman
- Browser: Google Chrome

## 1. Backend API Testing

| Test Case | Expected Result | Status |
|---|---|---|
| GET all appointments | Returns appointment records | Passed |
| POST valid appointment | Creates appointment successfully | Passed |
| POST with missing required fields | Returns validation error | Passed |
| PATCH with valid status | Updates appointment status | Passed |
| PATCH with invalid status | Rejects invalid status | Passed |

## 2. Frontend Functional Testing

| Test Case | Expected Result | Status |
|---|---|---|
| Open application | Dashboard loads successfully | Passed |
| Add appointment with valid details | Appointment appears in list | Passed |
| Submit empty form | Validation message is displayed | Passed |
| Search by customer name | Matching appointments are displayed | Passed |
| Search using partial name | Matching appointments are displayed | Passed |
| Search using different letter case | Matching appointments are displayed | Passed |
| Filter by Pending | Only pending appointments are displayed | Passed |
| Filter by Confirmed | Only confirmed appointments are displayed | Passed |
| Filter by Cancelled | Only cancelled appointments are displayed | Passed |
| Change appointment status | Updated status is displayed | Passed |
| Combine search and status filter | Both conditions are applied | Passed |
| Refresh the page | Appointments remain available | Passed |

## 3. Database Testing

- Verified that appointment records are stored in MongoDB.
- Verified that newly created appointments are available through the GET API.
- Verified that appointment status changes are persisted.
- Refreshed the frontend and checked that saved data was loaded again.

## 4. UI Testing

- Verified the dashboard layout on desktop.
- Checked the responsive layout on a smaller screen.
- Verified form inputs, buttons, search field, filters, and status badges.

## Testing Summary

The core appointment management functionality was tested locally. The application successfully supports creating appointments, viewing records, updating statuses, filtering, searching, and retrieving persisted data after a page refresh.

No automated test suite has been added as part of this implementation.