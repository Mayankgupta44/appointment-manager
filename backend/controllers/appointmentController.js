const Appointment = require("../models/Appointment");

const getAppointments = async (req, res) =>
{
    try
    {
        const appointments = await Appointment.find().sort({ dateTime: 1 });

        res.status(200).json(appointments);
    }
    catch (error)
    {
        res.status(500).json({ message: error.message });
    }
};


const createAppointment = async (req, res) =>
{
    try
    {
        const { customerName, service, dateTime, status } = req.body;

        // Customer Name Validation
        if (!customerName || !customerName.trim())
        {
            return res.status(400).json({
                message: "Customer name is required."
            });
        }

        const trimmedName = customerName.trim();

        if (trimmedName.length < 2 || trimmedName.length > 50)
        {
            return res.status(400).json({
                message: "Customer name must be between 2 and 50 characters."
            });
        }

        if (!/^[A-Za-z][A-Za-z\s'-]*$/.test(trimmedName))
        {
            return res.status(400).json({
                message: "Please enter a valid customer name."
            });
        }

        // Service Validation
        if (!service || !service.trim())
        {
            return res.status(400).json({
                message: "Service is required."
            });
        }

        const trimmedService = service.trim();

        if (trimmedService.length < 2 || trimmedService.length > 100)
        {
            return res.status(400).json({
                message: "Service must be between 2 and 100 characters."
            });
        }

        // Date and Time Validation
        if (!dateTime || Number.isNaN(new Date(dateTime).getTime()))
        {
            return res.status(400).json({
                message: "Please provide a valid appointment date and time."
            });
        }

        // Status Validation
        const allowedStatuses = ["Pending", "Confirmed", "Cancelled"];

        if (status !== undefined && !allowedStatuses.includes(status))
        {
            return res.status(400).json({
                message: "Invalid appointment status."
            });
        }

        const appointment = await Appointment.create({
            customerName: trimmedName,
            service: trimmedService,
            dateTime: new Date(dateTime),
            status: status || "Pending"
        });

        return res.status(201).json(appointment);
    }
    catch (error)
    {
        return res.status(400).json({
            message: error.message
        });
    }
};

const updateAppointmentStatus = async (req, res) =>
{
    try
    {
        const { status } = req.body;

        if (!["Pending", "Confirmed", "Cancelled"].includes(status))
        {
            return res.status(400).json({
                message: "Invalid appointment status"
            });
        }

        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!appointment)
        {
            return res.status(404).json({
                message: "Appointment not found"
            });
        }

        res.status(200).json(appointment);
    }
    catch (error)
    {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getAppointments,
    createAppointment,
    updateAppointmentStatus
};
