# Appointment Manager – API Documentation

**Base URL:** `http://localhost:5000`

All endpoints use JSON for request and response bodies.

## 1. Get All Appointments

**Endpoint:** `GET /api/appointments`

**Description:** Retrieves all appointments sorted by appointment date and time in ascending order.

**Request:**

```http
GET http://localhost:5000/api/appointments
```

**Success Response – 200 OK**

```json
[
  {
    "_id": "673abc123456789012345678",
    "customerName": "Alex Morgan",
    "service": "Consultation",
    "dateTime": "2026-11-02T10:00:00.000Z",
    "status": "Pending"
  }
]
```

## 2. Create Appointment

**Endpoint:** `POST /api/appointments`

**Description:** Creates a new appointment.

**Request Body:**

```json
{
  "customerName": "Alex Morgan",
  "service": "Consultation",
  "dateTime": "2026-11-02T10:00:00.000Z",
  "status": "Pending"
}
```

**Success Response – 201 Created**

Returns the newly created appointment as a JSON object, including its MongoDB `_id` and timestamps.

**Validation:**
- Customer name is required.
- Service is required.
- Appointment date and time are required.
- Status must be Pending, Confirmed, or Cancelled. If omitted, it defaults to Pending.

## 3. Update Appointment Status

**Endpoint:** `PATCH /api/appointments/:id/status`

**Description:** Updates the status of an existing appointment.

**Example Request:**

```http
PATCH /api/appointments/673abc123456789012345678/status
```

**Request Body:**

```json
{
  "status": "Confirmed"
}
```

**Success Response – 200 OK**

Returns the updated appointment object.

**Possible Error Responses:**
- `400 Bad Request` – Invalid status or invalid request.
- `404 Not Found` – Appointment does not exist.

## Allowed Appointment Statuses

| Status | Description |
|---|---|
| Pending | Appointment is awaiting confirmation |
| Confirmed | Appointment is confirmed |
| Cancelled | Appointment has been cancelled |

## Error Handling

The API returns JSON error messages when validation fails or an appointment cannot be found.

## Notes

- The backend uses Express.js and Mongoose.
- Appointment records are stored in MongoDB.
- MongoDB ObjectIds are used to identify appointments.
- Replace the example appointment ID with an actual ID returned by your API when testing.