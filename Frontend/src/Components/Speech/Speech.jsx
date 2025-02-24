import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Speech = ({ onSpeechResult }) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleStartListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
    onSpeechResult(transcript);
  };

  return (
    <div className="speech-container">
      <p>Microphone: {listening ? "On" : "Off"}</p>
      <button onClick={handleStartListening} className="speech-btn">
        Speak
      </button>
      <button onClick={handleStopListening} className="speech-btn">
        Stop
      </button>
    </div>
  );
};

export default Speech;
