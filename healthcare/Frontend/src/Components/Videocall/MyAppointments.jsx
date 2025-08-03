//by cyn

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import styles from "./MyAppointments.module.css";

// export default function MyAppointments() {
//   const [appointments, setAppointments] = useState([]);

//   useEffect(() => {
//     fetchAppointments();
//   }, []);

//   // ✅ Log appointments when updated
//   useEffect(() => {
//     console.log("Fetched appointments:", appointments);
//   }, [appointments]);

//   const fetchAppointments = async () => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       const response = await axios.get(
//         "http://127.0.0.1:8000/api/appointments/my/",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setAppointments(response.data);
//     } catch (error) {
//       console.error("Error fetching appointments:", error);
//     }
//   };

//   const deleteAppointment = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this appointment?"
//     );
//     if (!confirmDelete) return;

//     try {
//       const token = localStorage.getItem("accessToken");
//       await axios.delete(
//         `http://127.0.0.1:8000/api/appointments/delete/${id}/`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setAppointments((prev) => prev.filter((a) => a.id !== id));
//     } catch (error) {
//       console.error("Failed to delete appointment", error);
//     }
//   };

//   return (
//     <div className={styles.appointmentsContainer}>
//       <h2>Your Appointments</h2>
//       {appointments.length === 0 ? (
//         <p>No appointments yet.</p>
//       ) : (
//         <table className={styles.appointmentTable}>
//           <thead>
//             <tr>
//               <th>Doctor</th>
//               <th>Date</th>
//               <th>Time</th>
//               <th>Reason</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {appointments.map((appt) => (
//               <tr key={appt.id}>
//                 <td>{appt.doctor.name}</td>
//                 <td>{appt.date}</td>
//                 <td>{appt.time}</td>
//                 <td>{appt.reason}</td>
//                 <td>
//                   <div>{appt.status}</div>

//                   {appt.status === "accepted" &&
//                   appt.room &&
//                   !appt.is_call_ended ? (
//                     <button
//                       onClick={() =>
//                         (window.location.href = `/video-call/${appt.room}`)
//                       }
//                     >
//                       Join Call
//                     </button>
//                   ) : appt.is_call_ended ? (
//                     <div>Call Ended</div>
//                   ) : null}

//                   <br />

//                   <button onClick={() => deleteAppointment(appt.id)}>
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }


//idea by cyn
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./MyAppointments.module.css";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    console.log("Fetched appointments:", appointments);
  }, [appointments]);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(
        "http://127.0.0.1:8000/api/appointments/my/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const deleteAppointment = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this appointment?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(
        `http://127.0.0.1:8000/api/appointments/delete/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAppointments((prev) => prev.filter((a) => a.id !== id));
    } catch (error) {
      console.error("Failed to delete appointment", error);
    }
  };

  return (
    <div className={styles.appointmentsContainer}>
      <h2>Your Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments yet.</p>
      ) : (
        <table className={styles.appointmentTable}>
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.id}>
                <td>{appt.doctor.name}</td>
                <td>{appt.date}</td>
                <td>{appt.time}</td>
                <td>{appt.reason}</td>
                <td>
                  <div>{appt.status}</div>

                  {/* ✅ Show Join button only if status is accepted, call not started, and call not ended */}
                  {appt.status === "accepted" &&
                  appt.room &&
                  !appt.is_call_started &&
                  !appt.is_call_ended ? (
                    <button
                      onClick={() =>
                        (window.location.href = `/video-call/${appt.room}`)
                      }
                    >
                      Join Call
                    </button>
                  ) : null}

                  {appt.is_call_started && !appt.is_call_ended && (
                    <div>Joined</div>
                  )}

                  {appt.is_call_ended && <div>Call Ended</div>}

                  <br />

                  <button onClick={() => deleteAppointment(appt.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
