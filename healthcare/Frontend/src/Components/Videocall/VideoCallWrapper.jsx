// import React from "react";
// import { useParams } from "react-router-dom";
// import VideoCall from "./VideoCall";

// const VideoCallWrapper = () => {
//   const { doctorId } = useParams();

//   // ✅ Get user info from localStorage
//   const userData = localStorage.getItem("user");
//   const user = userData ? JSON.parse(userData) : null;

//   if (!user) {
//     return <p>Please log in to start the video call.</p>;
//   }

//   const roomName = `doctor_${doctorId}_patient_${user.id}`;
//   return <VideoCall roomName={roomName} displayName={user.username} />;
// };

// export default VideoCallWrapper; 

import React from "react";
import { useParams } from "react-router-dom";
import VideoCall from "./VideoCall";

const VideoCallWrapper = () => {
  const { doctorId } = useParams();

  // Check both user and doctor
  const userData = localStorage.getItem("user");
  const doctorData = localStorage.getItem("doctor");

  const person = userData
    ? JSON.parse(userData)
    : doctorData
    ? JSON.parse(doctorData)
    : null;

  if (!person) {
    return <p>Please log in to start the video call.</p>;
  }

  // For patient: patient is person, doctorId from URL
  // For doctor: doctor is person, patientId is unknown
  // We'll form room as: doctor_{doctorId}_patient_{user.id}
  const roomName =
    userData != null
      ? `doctor_${doctorId}_patient_${person.id}`
      : `doctor_${person.doctor_id}_patient_${doctorId}`;

  return <VideoCall roomName={roomName} displayName={person.username || person.name} />;
};

export default VideoCallWrapper;
