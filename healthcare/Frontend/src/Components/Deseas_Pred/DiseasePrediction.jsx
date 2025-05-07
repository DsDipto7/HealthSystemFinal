// DiseasePrediction.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./DiseasePrediction.css";

const DiseasePrediction = () => {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState(null);
  const [filteredSymptoms, setFilteredSymptoms] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [curlCommand, setCurlCommand] = useState("");
  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");
  const [date, setDate] = useState("");

  const navigate = useNavigate(); // Hook for navigation

  const symptomOptions = [
    "itching",
    "skin_rash",
    "nodal_skin_eruptions",
    "continuous_sneezing",
    "shivering",
    "chills",
    "joint_pain",
    "stomach_pain",
    "acidity",
    "ulcers_on_tongue",
    "muscle_wasting",
    "vomiting",
    "burning_micturition",
    "spotting_urination",
    "fatigue",
    "weight_gain",
    "anxiety",
    "cold_hands_and_feets",
    "mood_swings",
    "weight_loss",
    "restlessness",
    "lethargy",
    "patches_in_throat",
    "irregular_sugar_level",
    "cough",
    "high_fever",
    "sunken_eyes",
    "breathlessness",
    "sweating",
    "dehydration",
    "indigestion",
    "headache",
    "yellowish_skin",
    "dark_urine",
    "nausea",
    "loss_of_appetite",
    "pain_behind_the_eyes",
    "back_pain",
    "constipation",
    "abdominal_pain",
    "diarrhoea",
    "mild_fever",
    "yellow_urine",
    "yellowing_of_eyes",
    "acute_liver_failure",
    "fluid_overload",
    "swelling_of_stomach",
    "swelled_lymph_nodes",
    "malaise",
    "blurred_and_distorted_vision",
    "phlegm",
    "throat_irritation",
    "redness_of_eyes",
    "sinus_pressure",
    "runny_nose",
    "congestion",
    "chest_pain",
    "weakness_in_limbs",
    "fast_heart_rate",
    "pain_during_bowel_movements",
    "pain_in_anal_region",
    "bloody_stool",
    "irritation_in_anus",
    "neck_pain",
    "dizziness",
    "cramps",
    "bruising",
    "obesity",
    "swollen_legs",
    "swollen_blood_vessels",
    "puffy_face_and_eyes",
    "enlarged_thyroid",
    "brittle_nails",
    "swollen_extremeties",
    "excessive_hunger",
    "extra_marital_contacts",
    "drying_and_tingling_lips",
    "slurred_speech",
    "knee_pain",
    "hip_joint_pain",
    "muscle_weakness",
    "stiff_neck",
    "swelling_joints",
    "movement_stiffness",
    "spinning_movements",
    "loss_of_balance",
    "unsteadiness",
    "weakness_of_one_body_side",
    "loss_of_smell",
    "bladder_discomfort",
    "foul_smell_of urine",
    "continuous_feel_of_urine",
    "passage_of_gases",
    "internal_itching",
    "toxic_look_(typhos)",
    "depression",
    "irritability",
    "muscle_pain",
    "altered_sensorium",
    "red_spots_over_body",
    "belly_pain",
    "abnormal_menstruation",
    "dischromic _patches",
    "watering_from_eyes",
    "increased_appetite",
    "polyuria",
    "family_history",
    "mucoid_sputum",
    "rusty_sputum",
    "lack_of_concentration",
    "visual_disturbances",
    "receiving_blood_transfusion",
    "receiving_unsterile_injections",
    "coma",
    "stomach_bleeding",
    "distention_of_abdomen",
    "history_of_alcohol_consumption",
    "fluid_overload.1",
    "blood_in_sputum",
    "prominent_veins_on_calf",
    "palpitations",
    "painful_walking",
    "pus_filled_pimples",
    "blackheads",
    "scurring",
    "skin_peeling",
    "silver_like_dusting",
    "small_dents_in_nails",
    "inflammatory_nails",
    "blister",
    "red_sore_around_nose",
    "yellow_crust_ooze",
  ];

  const handleInputChange = (e) => {
    const input = e.target.value;
    setSymptoms(input);

    const lastWord = input.split(",").pop().trim();
    if (lastWord.length > 0) {
      const filtered = symptomOptions.filter((symptom) =>
        symptom.toLowerCase().includes(lastWord.toLowerCase())
      );
      setFilteredSymptoms(filtered);
      setIsDropdownVisible(true);
    } else {
      setFilteredSymptoms([]);
      setIsDropdownVisible(false);
    }
  };

  const handleAddSymptom = (symptom) => {
    const symptomList = symptoms.split(",").map((s) => s.trim());
    symptomList[symptomList.length - 1] = symptom;
    setSymptoms(symptomList.join(", ") + ", ");
    setIsDropdownVisible(false);
  };

  const handleButtonClick = async () => {
    try {
      const formattedSymptoms = symptoms
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s);
      const payload = { symptoms: formattedSymptoms };

      // Generate curl command
      const curlCmd = `curl -X POST http://127.0.0.1:5000/api/predict -H "Content-Type: application/json" -d '${JSON.stringify(
        payload
      )}'`;
      setCurlCommand(curlCmd);

      // Send POST request to the API
      const response = await axios.post(
        "http://127.0.0.1:5000/api/predict",
        payload
      );
      setResult(response.data);
    } catch (error) {
      console.error("Error fetching prediction:", error.message);
      setResult(null);
    }
  };

  const handleButtonClick2 = () => {
    navigate("/"); // Redirects to the root path
  };

  const handleDownloadPDF = async () => {
    try {
      if (!result) {
        alert("Please predict first!");
        return;
      }
      const formattedSymptoms = symptoms
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s);
      const username = localStorage.getItem("username") || "Unknown";
      const payload = {
        patient_name: username,
        website_name: "Healthcare",
        symptoms: formattedSymptoms,
        result: result,
      };
  
      const response = await axios.post(
        "http://127.0.0.1:5000/api/generate-pdf",
        payload,
        { responseType: "blob" }
      );
  
      // Create a blob and download
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "prescription.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); // Clean up
    } catch (error) {
      console.error("Error downloading PDF:", error.message);
      alert("Failed to download PDF. Please try again.");
    }
  };
  return (
    <div className="disease-prediction-container">
      <h1>Disease Prediction</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Enter Symptoms (comma-separated):
          <input
            type="text"
            value={symptoms}
            onChange={handleInputChange}
            placeholder="e.g., itching"
          />
        </label>
  
        {isDropdownVisible && (
          <div className="suggestion-container">
            <ul className="symptom-suggestions">
              {filteredSymptoms.map((symptom, index) => (
                <li key={index} onClick={() => handleAddSymptom(symptom)}>
                  {symptom}
                </li>
              ))}
            </ul>
          </div>
        )}
  
        <div className="button-group">
          <button
            className="predict-button"
            type="button"
            onClick={handleButtonClick}
          >
            Predict
          </button>
          <button
            className="back-button"
            type="button"
            onClick={handleButtonClick2}
          >
            Back
          </button>
        </div>
      </form>
  
      {/* Sex, Age, Date fields above Download PDF */}
      <div style={{ marginTop: "20px", marginBottom: "10px" }}>
        <label>
          Sex:
          <input
            type="text"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            placeholder="Enter sex"
            required
            style={{ marginLeft: "10px" }}
          />
        </label>
        <br />
        
<label>
  Age:
  <input
    type="number"
    value={age}
    onChange={(e) => {
      const val = e.target.value;
      if (val === "" || Number(val) >= 0) setAge(val);
    }}
    placeholder="Enter age"
    required
    style={{ marginLeft: "10px" }}
    min="0"
  />
</label>

        <br />
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            style={{ marginLeft: "10px" }}
          />
        </label>
      </div>
  
      {result && (
        <div className="result-container">
          <h4>Corrected Symptoms:</h4>
          <ul>
            {result.corrected_symptoms.map((symptom, index) => (
              <li key={index}>{symptom}</li>
            ))}
          </ul>
  
          <h4>Diet Suggestions:</h4>
          <ul>
            {result.diet.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
  
          <h4>Medications:</h4>
          <ul>
            {result.medications.map((medication, index) => (
              <li key={index}>{medication}</li>
            ))}
          </ul>
  
          <h4>Precautions:</h4>
          <ul>
            {Object.keys(result.precautions)
              .filter((key) => key.startsWith("Precaution_"))
              .map((key, index) => (
                <li key={index}>{result.precautions[key]}</li>
              ))}
          </ul>
          <h4>Workout Tips:</h4>
          <ul>
            {result.workout.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
      <button
        className="download-pdf-button"
        type="button"
        onClick={async () => {
          try {
            if (!result) {
              alert("Please predict first!");
              return;
            }
            const formattedSymptoms = symptoms
              .split(",")
              .map((s) => s.trim())
              .filter((s) => s);
            const username = localStorage.getItem("username") || "Unknown";
            const payload = {
              patient_name: username,
              website_name: "Healthcare",
              symptoms: formattedSymptoms,
              result: result,
              sex: sex,
              age: age,
              date: date,
            };
  
            const response = await axios.post(
              "http://127.0.0.1:5000/api/generate-pdf",
              payload,
              { responseType: "blob" }
            );
  
            const blob = new Blob([response.data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "prescription.pdf");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
          } catch (error) {
            console.error("Error downloading PDF:", error.message);
            alert("Failed to download PDF. Please try again.");
          }
        }}
        disabled={!result}
      >
        Download PDF
      </button>
    </div>
  );
};

export default DiseasePrediction;
