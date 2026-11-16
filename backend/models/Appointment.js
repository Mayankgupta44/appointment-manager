
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
    {
        
        customerName:
        {
            type: String,
            required: [true, "Customer name is required"],
            trim: true,
            minlength: [2, "Customer name must contain at least 2 characters"],
            maxlength: [50, "Customer name cannot exceed 50 characters"],
            match: [/^[A-Za-z][A-Za-z\s'-]*$/, "Please enter a valid customer name"]
        },

        service:
        {
            type: String,
            required: [true, "Service is required"],
            trim: true,
            minlength: [2, "Service must contain at least 2 characters"],
            maxlength: [100, "Service cannot exceed 100 characters"]
        },

        dateTime:
        {
            type: Date,
            required: [true, "Appointment date and time is required"]
        },

        status:
        {
            type: String,
            enum: ["Pending", "Confirmed", "Cancelled"],
            default: "Pending"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
