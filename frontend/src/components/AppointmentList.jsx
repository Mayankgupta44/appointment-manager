const AppointmentList = ({
  appointments,
  filter,
  onFilterChange,
  onStatusChange,
  search,
  onSearchChange,
}) => {
  const statuses = ["All", "Pending", "Confirmed", "Cancelled"];

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesStatus = filter === "All" || appointment.status === filter;

    const matchesSearch = appointment.customerName
      .toLowerCase()
      .includes(search.toLowerCase().trim());

    return matchesStatus && matchesSearch;
  });

  const formatDate = (dateTime) => {
    return new Date(dateTime).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="space-y-5">
      {/* Search */}
      <div>
        <input
          type="text"
          placeholder="Search by customer name..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => onFilterChange(status)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              filter === status
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Appointment List */}
      <div className="space-y-3">
        {filteredAppointments.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 py-10 text-center">
            <p className="text-sm text-slate-500">No appointments found.</p>
          </div>
        ) : (
          filteredAppointments.map((appointment) => (
            <div
              key={appointment._id}
              className="flex flex-col gap-4 rounded-lg border border-slate-200 p-4 transition hover:border-blue-200 hover:shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              {/* Appointment Details */}
              <div>
                <h3 className="font-semibold text-slate-800">
                  {appointment.customerName}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {appointment.service}
                </p>

                <p className="mt-2 text-xs text-slate-400">
                  {formatDate(appointment.dateTime)}
                </p>
              </div>

              {/* Status and Update */}
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    appointment.status === "Confirmed"
                      ? "bg-green-100 text-green-700"
                      : appointment.status === "Cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {appointment.status}
                </span>

                <select
                  value={appointment.status}
                  onChange={(e) =>
                    onStatusChange(appointment._id, e.target.value)
                  }
                  className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-600 outline-none focus:border-blue-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AppointmentList;
