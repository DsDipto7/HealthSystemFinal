


// //jokhon call deya jayni tar por theke code
// import React, { useEffect, useState,useRef } from "react";
// import axios from "axios";
// import { JitsiMeeting } from "@jitsi/react-sdk";
// import { useNavigate } from "react-router-dom";
// import styles from "./DoctorAppointments.module.css";
// // import React, { useEffect, useState, useRef } from "react";


// export default function DoctorAppointments() {
//   const [appointments, setAppointments] = useState([]);
//   const [activeRoom, setActiveRoom] = useState(null);
//   const navigate = useNavigate();

//   const doctor = JSON.parse(localStorage.getItem("doctor"));
//   const videoRef = useRef(null); // to scroll to video

//   useEffect(() => {
//     if (!doctor) {
//       navigate("/doctorlogin");
//     } else {
//       fetchAppointments();
//     }
//   }, []);

//   const fetchAppointments = async () => {
//     try {
//       const response = await axios.get(
//         `http://127.0.0.1:8000/api/appointments/doctor/${doctor.doctor_id}/`
//       );
//       setAppointments(response.data);
//     } catch (error) {
//       console.error("Failed to fetch appointments", error);
//     }
//   };

//   const updateStatus = async (id, status) => {
//     try {
//       await axios.post(`http://127.0.0.1:8000/api/appointments/update-status/${id}/`, {
//         status,
//       });

//       if (status === "declined") {
//         setAppointments((prev) => prev.filter((a) => a.id !== id));
//       } else {
//         fetchAppointments(); // refresh list
//       }
//     } catch (err) {
//       console.error("Failed to update status", err);
//     }
//   };

// const handleStartCall = async (appt) => {
//   try {
//     setActiveRoom(appt.room);
//     await axios.post(`http://127.0.0.1:8000/api/appointments/call-started/${appt.id}/`);
//   } catch (err) {
//     console.error("Failed to mark call started", err);
//   }
// };



//   const handleEndCall = async (appt) => {
//     try {
//       await axios.post(`http://127.0.0.1:8000/api/appointments/call-ended/${appt.id}/`);
//       setActiveRoom(null);
//       fetchAppointments(); // Refresh list
//     } catch (err) {
//       console.error("Failed to mark call ended", err);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h2>Patient Appointments</h2>
//       <button onClick={() => navigate("/doctorprofile")}>← Back to Profile</button>

//       {appointments.length === 0 ? (
//         <p>No appointments found.</p>
//       ) : (
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>Patient Name</th>
//               <th>Reason</th>
//               <th>Date</th>
//               <th>Time</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {appointments.map((appt) => (
//               <tr key={appt.id}>
//                 <td>{appt.user?.username || "Unknown"}</td>
//                 <td>{appt.reason}</td>
//                 <td>{appt.date}</td>
//                 <td>{appt.time}</td>
//                 <td>{appt.status}</td>
//                 <td>
//                   {appt.status === "pending" ? (
//                     <>
//                       <button onClick={() => updateStatus(appt.id, "accepted")}>
//                         Accept
//                       </button>
//                       <button onClick={() => updateStatus(appt.id, "declined")}>
//                         Decline
//                       </button>
//                     </>
//                   ) : appt.status === "accepted" ? (
//                     appt.is_call_ended ? (
//                       <span>Call Ended</span>
//                     ) : appt.is_call_started ? (
//                       <span>Call Joined</span>
//                     ) : (
// <button onClick={async () => {
//   await handleStartCall(appt);
//   navigate(`/video-call/${appt.doctor.id}`);
// }}>
//   Start Call
// </button>


//                     )
//                   ) : (
//                     <>Declined</>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {/* Jitsi Video Call if active */}
// {activeRoom && (
//   <div ref={videoRef} className={styles.videoWrapper}>
//     <h3>Video Call Room: {activeRoom}</h3>
//     <JitsiMeeting
//       domain="meet.jit.si"
//       roomName={activeRoom}
//       userInfo={{ displayName: doctor.name }}
//       getIFrameRef={(iframeRef) => {
//         iframeRef.style.height = "600px";
//         iframeRef.style.width = "100%";
//       }}
//     />
//     <button onClick={() => handleEndCall(appointments.find(a => a.room === activeRoom))}>
//       End Call
//     </button>
//   </div>
// )}

//     </div>
//   );
// }



// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import styles from "./DoctorAppointments.module.css";

// export default function DoctorAppointments() {
//   const [appointments, setAppointments] = useState([]);
//   const [activeRoom, setActiveRoom] = useState(null);
//   const navigate = useNavigate();

//   const doctor = JSON.parse(localStorage.getItem("doctor"));
//   const videoRef = useRef(null); // to scroll to video

//   useEffect(() => {
//     if (!doctor) {
//       navigate("/doctorlogin");
//     } else {
//       fetchAppointments();
//     }
//   }, []);

//   const fetchAppointments = async () => {
//     try {
//       const response = await axios.get(
//         `http://127.0.0.1:8000/api/appointments/doctor/${doctor.doctor_id}/`
//       );
//       setAppointments(response.data);
//     } catch (error) {
//       console.error("Failed to fetch appointments", error);
//     }
//   };

//   const updateStatus = async (id, status) => {
//     try {
//       await axios.post(
//         `http://127.0.0.1:8000/api/appointments/update-status/${id}/`,
//         { status }
//       );

//       if (status === "declined") {
//         setAppointments((prev) => prev.filter((a) => a.id !== id));
//       } else {
//         fetchAppointments(); // refresh list
//       }
//     } catch (err) {
//       console.error("Failed to update status", err);
//     }
//   };

//   const handleStartCall = async (appt) => {
//     try {
//       setActiveRoom(appt.room);
//       await axios.post(
//         `http://127.0.0.1:8000/api/appointments/call-started/${appt.id}/`
//       );
//     } catch (err) {
//       console.error("Failed to mark call started", err);
//     }
//   };

//   const handleEndCall = async (appt) => {
//     try {
//       await axios.post(
//         `http://127.0.0.1:8000/api/appointments/call-ended/${appt.id}/`
//       );
//       setActiveRoom(null);
//       fetchAppointments(); // Refresh list
//     } catch (err) {
//       console.error("Failed to mark call ended", err);
//     }
//   };

//   return (
//     <div className={styles.containers}>
//       <h2>Patient Appointments</h2>
//       <button onClick={() => navigate("/doctor-profile")}>← Back to Profile</button>

//       {appointments.length === 0 ? (
//         <p>No appointments found.</p>
//       ) : (
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>Patient Name</th>
//               <th>Reason</th>
//               <th>Date</th>
//               <th>Time</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {appointments.map((appt) => (
//               <tr key={appt.id}>
//                 <td>{appt.user?.username || "Unknown"}</td>
//                 <td>{appt.reason}</td>
//                 <td>{appt.date}</td>
//                 <td>{appt.time}</td>
//                 <td>{appt.status}</td>
//                 <td>
//                   {appt.status === "pending" ? (
//                     <>
//                       <button onClick={() => updateStatus(appt.id, "accepted")}>
//                         Accept
//                       </button>
//                       <button onClick={() => updateStatus(appt.id, "declined")}>
//                         Decline
//                       </button>
//                     </>
//                   ) : appt.status === "accepted" ? (
//                     appt.is_call_ended ? (
//                       <span>Call Ended</span>
//                     ) : appt.is_call_started ? (
//                       <span>Call Joined</span>
//                     ) : (
//                       <button
//                         onClick={async () => {
//                           await handleStartCall(appt);
//                           // navigate(`/video-call/${appt.doctor.id}`);
//                           navigate(`/video-call/${appt.room}`);

//                         }}
//                       >
//                         Start Call
//                       </button>
//                     )
//                   ) : (
//                     <>Declined</>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

//Code written by Dipto 


// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import styles from "./DoctorAppointments.module.css";

// export default function DoctorAppointments() {
//   const [appointments, setAppointments] = useState([]);
//   const [activeRoom, setActiveRoom] = useState(null);
//   const navigate = useNavigate();

//   const doctor = JSON.parse(localStorage.getItem("doctor"));
//   const videoRef = useRef(null);

//   useEffect(() => {
//     if (!doctor) {
//       navigate("/doctorlogin");
//     } else {
//       fetchAppointments();
//     }
//   }, []);

//   const fetchAppointments = async () => {
//     try {
//       const response = await axios.get(
//         `http://127.0.0.1:8000/api/appointments/doctor/${doctor.doctor_id}/`
//       );
//       setAppointments(response.data);
//     } catch (error) {
//       console.error("Failed to fetch appointments", error);
//     }
//   };

//   const updateStatus = async (id, status) => {
//     try {
//       await axios.post(
//         `http://127.0.0.1:8000/api/appointments/update-status/${id}/`,
//         { status }
//       );

//       if (status === "declined") {
//         setAppointments((prev) => prev.filter((a) => a.id !== id));
//       } else {
//         fetchAppointments();
//       }
//     } catch (err) {
//       console.error("Failed to update status", err);
//     }
//   };

//   const handleStartCall = async (appt) => {
//     try {
//       setActiveRoom(appt.room);
//       await axios.post(
//         `http://127.0.0.1:8000/api/appointments/call-started/${appt.id}/`
//       );
//     } catch (err) {
//       console.error("Failed to mark call started", err);
//     }
//   };

//   const handleEndCall = async (appt) => {
//     try {
//       await axios.post(
//         `http://127.0.0.1:8000/api/appointments/call-ended/${appt.id}/`
//       );
//       setActiveRoom(null);
//       fetchAppointments();
//     } catch (err) {
//       console.error("Failed to mark call ended", err);
//     }
//   };

//   return (
//     <div className={styles.docApptContainer}>
//       <h2 className={styles.docApptTitle}>Patient Appointments</h2>
//       <button
//         className={styles.docApptBackBtn}
//         onClick={() => navigate("/doctor-profile")}
//       >
//         ← Back to Profile
//       </button>

//       {appointments.length === 0 ? (
//         <p className={styles.docApptNoData}>No appointments found.</p>
//       ) : (
//         <table className={styles.docApptTable}>
//           <thead>
//             <tr>
//               <th>Patient Name</th>
//               <th>Reason</th>
//               <th>Date</th>
//               <th>Time</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {appointments.map((appt) => (
//               <tr key={appt.id}>
//                 <td>{appt.user?.username || "Unknown"}</td>
//                 <td>{appt.reason}</td>
//                 <td>{appt.date}</td>
//                 <td>{appt.time}</td>
//                 <td>{appt.status}</td>
//                 <td>
//                   {appt.status === "pending" ? (
//                     <>
//                       <button
//                         className={styles.docApptBtn}
//                         onClick={() => updateStatus(appt.id, "accepted")}
//                       >
//                         Accept
//                       </button>
//                       <button
//                         className={styles.docApptBtn}
//                         onClick={() => updateStatus(appt.id, "declined")}
//                       >
//                         Decline
//                       </button>
//                     </>
//                   ) : appt.status === "accepted" ? (
//                     appt.is_call_ended ? (
//                       <span>Call Ended</span>
//                     ) : appt.is_call_started ? (
//                       <span>Call Joined</span>
//                     ) : (
//                       <button
//                         className={styles.docApptBtn}
//                         onClick={async () => {
//                           await handleStartCall(appt);
//                           navigate(`/video-call/${appt.room}`);
//                         }}
//                       >
//                         Start Call
//                       </button>
//                     )
//                   ) : (
//                     <>Declined</>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./DoctorAppointments.module.css";

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);
  const navigate = useNavigate();

  const doctor = JSON.parse(localStorage.getItem("doctor"));
  const videoRef = useRef(null);

  useEffect(() => {
    if (!doctor) {
      navigate("/doctorlogin");
    } else {
      fetchAppointments();
    }
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/appointments/doctor/${doctor.doctor_id}/`
      );
      setAppointments(response.data);
    } catch (error) {
      console.error("Failed to fetch appointments", error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/appointments/update-status/${id}/`,
        { status }
      );

      if (status === "declined") {
        setAppointments((prev) => prev.filter((a) => a.id !== id));
      } else {
        fetchAppointments();
      }
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const handleStartCall = async (appt) => {
    try {
      setActiveRoom(appt.room);
      await axios.post(
        `http://127.0.0.1:8000/api/appointments/call-started/${appt.id}/`
      );
    } catch (err) {
      console.error("Failed to mark call started", err);
    }
  };

  const handleEndCall = async (appt) => {
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/appointments/call-ended/${appt.id}/`
      );
      setActiveRoom(null);
      fetchAppointments();
    } catch (err) {
      console.error("Failed to mark call ended", err);
    }
  };

  return (
    <div className={styles.docApptContainer}>
      <h2 className={styles.docApptTitle}>Patient Appointments</h2>
      <button
        className={`${styles.docApptBtn} ${styles.backBtn}`}
        onClick={() => navigate("/doctor-profile")}
      >
        ← Back to Profile
      </button>

      {appointments.length === 0 ? (
        <p className={styles.docApptNoData}>No appointments found.</p>
      ) : (
        <table className={styles.docApptTable}>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Reason</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.id}>
                <td>{appt.user?.username || "Unknown"}</td>
                <td>{appt.reason}</td>
                <td>{appt.date}</td>
                <td>{appt.time}</td>
                <td>{appt.status}</td>
                <td>
                  {appt.status === "pending" ? (
                    <>
                      <button
                        className={`${styles.docApptBtn} ${styles.acceptBtn}`}
                        onClick={() => updateStatus(appt.id, "accepted")}
                      >
                        Accept
                      </button>
                      <button
                        className={`${styles.docApptBtn} ${styles.declineBtn}`}
                        onClick={() => updateStatus(appt.id, "declined")}
                      >
                        Decline
                      </button>
                    </>
                  ) : appt.status === "accepted" ? (
                    appt.is_call_ended ? (
                      <span>Call Ended</span>
                    ) : appt.is_call_started ? (
                      <span>Call Joined</span>
                    ) : (
                      <button
                        className={`${styles.docApptBtn} ${styles.startBtn}`}
                        onClick={async () => {
                          await handleStartCall(appt);
                          navigate(`/video-call/${appt.room}`);
                        }}
                      >
                        Start Call
                      </button>
                    )
                  ) : (
                    <>Declined</>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
