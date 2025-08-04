// import React, { useEffect } from "react";

// const VideoCall = () => {
//   useEffect(() => {
//     // any side-effects or logic here
//   }, []);

//   return (
//     <div>
//       <JitsiMeeting

//         roomName="fuckyourself101"
//         configOverwrite={{
//           startWithAudioMuted: true,
//           disableModeratorIndicator: true,
//           startScreenSharing: true,
//           enableEmailInStats: false,
//         }}
//         interfaceConfigOverwrite={{
//           DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
//         }}
//         userInfo={{
//           displayName: "YOUR_USERNAME",
//         }}
//         onApiReady={(externalApi) => {
//           // here you can attach custom event listeners to the Jitsi Meet External API
//           // you can also store it locally to execute commands
//         }}
//         getIFrameRef={(iframeRef) => {
//           iframeRef.style.height = "400px";
//         }}
//       />
//     </div>
//   );
// };

// export default VideoCall;

// // src/pages/VideoCall.jsx
// import React from "react";
// import { JitsiMeeting } from "@jitsi/react-sdk";
// import { useParams } from "react-router-dom";

// const VideoCall = () => {
//   const { roomName } = useParams(); // Get roomName from URL

//   return (
//     <div style={{ height: "600px", width: "100%" }}>
//       <JitsiMeeting
//         roomName={roomName}
//         configOverwrite={{
//           startWithAudioMuted: true,
//           disableModeratorIndicator: true,
//           enableEmailInStats: false,
//         }}
//         interfaceConfigOverwrite={{
//           DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
//         }}
//         userInfo={{
//           displayName: localStorage.getItem("doctor")
//             ? JSON.parse(localStorage.getItem("doctor")).name
//             : JSON.parse(localStorage.getItem("user"))?.username,
//         }}
//         getIFrameRef={(node) => {
//           node.style.height = "100%";
//         }}
//       />
//     </div>
//   );
// };

// export default VideoCall;

// src/Components/Videocall/VideoCall.jsx
import React from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";
import { useParams } from "react-router-dom";

const VideoCall = () => {
  const { roomName } = useParams();

  return (
    <div style={{ height: "600px" }}>
      <JitsiMeeting
        domain="meet.jit.si"
        roomName={roomName}
        configOverwrite={{
          startWithAudioMuted: true,
          disableModeratorIndicator: true,
          startScreenSharing: true,
          enableEmailInStats: false,
        }}
        interfaceConfigOverwrite={{
          DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
        }}
        userInfo={{
          displayName: "Doctor or Patient",
        }}
        getIFrameRef={(node) => {
          node.style.height = "100%";
        }}
      />
    </div>
  );
};

export default VideoCall;
