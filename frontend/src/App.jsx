import { useEffect, useState } from "react";

import AppointmentForm from "./components/AppointmentForm";
import AppointmentList from "./components/AppointmentList";

import {
    getAppointments,
    createAppointment,
    updateAppointmentStatus
} from "./services/appointmentService";

import "./App.css";

function App()
{
    const [appointments, setAppointments] = useState([]);
    const [filter, setFilter] = useState("All");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    const fetchAppointments = async () =>
    {
        try
        {
            setLoading(true);

            const data = await getAppointments();

            setAppointments(data);
            setError("");
        }
        catch (error)
        {
            setError("Unable to load appointments. Please try again.");
        }
        finally
        {
            setLoading(false);
        }
    };

    useEffect(() =>
    {
        fetchAppointments();
    }, []);

    const handleAddAppointment = async (appointmentData) =>
    {
        try
        {
            const newAppointment = await createAppointment(appointmentData);

            setAppointments((prev) => [
                ...prev,
                newAppointment
            ]);
        }
        catch (error)
        {
            throw new Error(
                error.response?.data?.message ||
                "Unable to add appointment."
            );
        }
    };

    const handleStatusChange = async (id, status) =>
    {
        try
        {
            const updatedAppointment = await updateAppointmentStatus(
                id,
                status
            );

            setAppointments((prev) =>
                prev.map((appointment) =>
                    appointment._id === id
                        ? updatedAppointment
                        : appointment
                )
            );
        }
        catch (error)
        {
            setError(
                error.response?.data?.message ||
                "Unable to update appointment status."
            );
        }
    };

    return (
      <div className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-10">

          <div className="mx-auto max-w-7xl">

              {/* Header */}
              <div className="mb-8">
                  <h1 className="text-3xl font-bold text-slate-800">
                      Appointment Manager
                  </h1>

                  <p className="mt-2 text-sm text-slate-500">
                      Manage your appointments easily and efficiently.
                  </p>
              </div>

              {/* Main Content */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                  {/* Appointment Form */}
                  <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-1">
                      <h2 className="mb-5 text-lg font-semibold text-slate-800">
                          Add New Appointment
                      </h2>

                      <AppointmentForm
                          onAddAppointment={handleAddAppointment}
                      />
                  </div>

                  {/* Appointment List */}
                  <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
                      <h2 className="mb-5 text-lg font-semibold text-slate-800">
                          All Appointments
                      </h2>

                      <AppointmentList
                          appointments={appointments}
                          filter={filter}
                          onFilterChange={setFilter}
                          onStatusChange={handleStatusChange}
                          search={search}
                          onSearchChange={setSearch}
                      />
                  </div>

              </div>

          </div>

      </div>
    );
}

export default App;
