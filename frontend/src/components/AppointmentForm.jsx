import { useState } from "react";

const AppointmentForm = ({ onAddAppointment }) => {
    const initialFormData = {
        customerName: "",
        service: "",
        dateTime: "",
        status: "Pending",
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));

        setSubmitError("");
    };

    const validateForm = () => {
        const newErrors = {};

        const customerName = formData.customerName.trim();
        const service = formData.service.trim();

        // Customer Name Validation
        if (!customerName) {
            newErrors.customerName = "Customer name is required.";
        }
        else if (customerName.length < 2) {
            newErrors.customerName = "Name must contain at least 2 characters.";
        }
        else if (customerName.length > 50) {
            newErrors.customerName = "Name cannot exceed 50 characters.";
        }
        else if (!/^[A-Za-z][A-Za-z\s'-]*$/.test(customerName)) {
            newErrors.customerName = "Enter a valid name using letters only.";
        }

        // Service Validation
        if (!service) {
            newErrors.service = "Service is required.";
        }
        else if (service.length < 2) {
            newErrors.service = "Service must contain at least 2 characters.";
        }
        else if (service.length > 100) {
            newErrors.service = "Service cannot exceed 100 characters.";
        }

        // Date and Time Validation
        if (!formData.dateTime) {
            newErrors.dateTime = "Appointment date and time are required.";
        }
        else if (Number.isNaN(new Date(formData.dateTime).getTime())) {
            newErrors.dateTime = "Please enter a valid date and time.";
        }

        // Status Validation
        if (!["Pending", "Confirmed", "Cancelled"].includes(formData.status)) {
            newErrors.status = "Please select a valid status.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await onAddAppointment({
                ...formData,
                customerName: formData.customerName.trim(),
                service: formData.service.trim(),
                dateTime: new Date(formData.dateTime).toISOString(),
            });

            setFormData(initialFormData);
            setErrors({});
            setSubmitError("");
        }
        catch (error) {
            setSubmitError(error.message || "Unable to create appointment.");
        }
    };

    const inputClass = (field) =>
        `w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition ${
            errors[field]
                ? "border-red-400 focus:ring-2 focus:ring-red-100"
                : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        }`;

    return (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>

            {/* Customer Name */}
            <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                    Customer Name <span className="text-red-500">*</span>
                </label>

                <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    placeholder="Enter customer name"
                    maxLength={50}
                    className={inputClass("customerName")}
                />

                {errors.customerName && (
                    <p className="mt-1 text-xs text-red-500">
                        {errors.customerName}
                    </p>
                )}
            </div>

            {/* Service */}
            <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                    Service <span className="text-red-500">*</span>
                </label>

                <input
                    type="text"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    placeholder="Enter service"
                    maxLength={100}
                    className={inputClass("service")}
                />

                {errors.service && (
                    <p className="mt-1 text-xs text-red-500">
                        {errors.service}
                    </p>
                )}
            </div>

            {/* Date and Time */}
            <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                    Appointment Date & Time <span className="text-red-500">*</span>
                </label>

                <input
                    type="datetime-local"
                    name="dateTime"
                    value={formData.dateTime}
                    onChange={handleChange}
                    className={inputClass("dateTime")}
                />

                {errors.dateTime && (
                    <p className="mt-1 text-xs text-red-500">
                        {errors.dateTime}
                    </p>
                )}
            </div>

            {/* Status */}
            <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                    Status
                </label>

                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className={inputClass("status")}
                >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                </select>

                {errors.status && (
                    <p className="mt-1 text-xs text-red-500">
                        {errors.status}
                    </p>
                )}
            </div>

            {/* API Error */}
            {submitError && (
                <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                    {submitError}
                </p>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.99]"
            >
                Add Appointment
            </button>

        </form>
    );
};

export default AppointmentForm;
