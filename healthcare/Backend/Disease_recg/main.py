

# ######+++++++===========================>>>>>>>>>>>>>for cli


# #for my modifications

# from flask import Flask, request, jsonify
# import numpy as np
# from flask_cors import CORS
# import pandas as pd
# import pickle
# from fuzzywuzzy import process
# import ast

# app = Flask(__name__)
# CORS(app)
# # Load datasets
# sym_des = pd.read_csv("kaggle_dataset/symptoms_df.csv")
# precautions = pd.read_csv("kaggle_dataset/precautions_df.csv")
# workout = pd.read_csv("kaggle_dataset/workout_df.csv")
# description = pd.read_csv("kaggle_dataset/description.csv")
# medications = pd.read_csv('kaggle_dataset/medications.csv')
# diets = pd.read_csv("kaggle_dataset/diets.csv")

# # Load the trained model
# Rf = pickle.load(open('model/RandomForest.pkl', 'rb'))

# # Preprocess symptoms and diseases
# symptoms_list = {
#    'itching': 0, 'skin_rash': 1, 'nodal_skin_eruptions': 2, 'continuous_sneezing': 3, 'shivering': 4, 'chills': 5, 'joint_pain': 6, 'stomach_pain': 7, 'acidity': 8, 'ulcers_on_tongue': 9, 'muscle_wasting': 10, 'vomiting': 11, 'burning_micturition': 12, 'spotting_ urination': 13, 'fatigue': 14, 'weight_gain': 15, 'anxiety': 16, 'cold_hands_and_feets': 17, 'mood_swings': 18, 'weight_loss': 19, 'restlessness': 20, 'lethargy': 21, 'patches_in_throat': 22, 'irregular_sugar_level': 23, 'cough': 24, 'high_fever': 25, 'sunken_eyes': 26, 'breathlessness': 27, 'sweating': 28, 'dehydration': 29, 'indigestion': 30, 'headache': 31, 'yellowish_skin': 32, 'dark_urine': 33, 'nausea': 34, 'loss_of_appetite': 35, 'pain_behind_the_eyes': 36, 'back_pain': 37, 'constipation': 38, 'abdominal_pain': 39, 'diarrhoea': 40, 'mild_fever': 41, 'yellow_urine': 42, 'yellowing_of_eyes': 43, 'acute_liver_failure': 44, 'fluid_overload': 45, 'swelling_of_stomach': 46, 'swelled_lymph_nodes': 47, 'malaise': 48, 'blurred_and_distorted_vision': 49, 'phlegm': 50, 'throat_irritation': 51, 'redness_of_eyes': 52, 'sinus_pressure': 53, 'runny_nose': 54, 'congestion': 55, 'chest_pain': 56, 'weakness_in_limbs': 57, 'fast_heart_rate': 58, 'pain_during_bowel_movements': 59, 'pain_in_anal_region': 60, 'bloody_stool': 61, 'irritation_in_anus': 62, 'neck_pain': 63, 'dizziness': 64, 'cramps': 65, 'bruising': 66, 'obesity': 67, 'swollen_legs': 68, 'swollen_blood_vessels': 69, 'puffy_face_and_eyes': 70, 'enlarged_thyroid': 71, 'brittle_nails': 72, 'swollen_extremeties': 73, 'excessive_hunger': 74, 'extra_marital_contacts': 75, 'drying_and_tingling_lips': 76, 'slurred_speech': 77, 'knee_pain': 78, 'hip_joint_pain': 79, 'muscle_weakness': 80, 'stiff_neck': 81, 'swelling_joints': 82, 'movement_stiffness': 83, 'spinning_movements': 84, 'loss_of_balance': 85, 'unsteadiness': 86, 'weakness_of_one_body_side': 87, 'loss_of_smell': 88, 'bladder_discomfort': 89, 'foul_smell_of urine': 90, 'continuous_feel_of_urine': 91, 'passage_of_gases': 92, 'internal_itching': 93, 'toxic_look_(typhos)': 94, 'depression': 95, 'irritability': 96, 'muscle_pain': 97, 'altered_sensorium': 98, 'red_spots_over_body': 99, 'belly_pain': 100, 'abnormal_menstruation': 101, 'dischromic _patches': 102, 'watering_from_eyes': 103, 'increased_appetite': 104, 'polyuria': 105, 'family_history': 106, 'mucoid_sputum': 107, 'rusty_sputum': 108, 'lack_of_concentration': 109, 'visual_disturbances': 110, 'receiving_blood_transfusion': 111, 'receiving_unsterile_injections': 112, 'coma': 113, 'stomach_bleeding': 114, 'distention_of_abdomen': 115, 'history_of_alcohol_consumption': 116, 'fluid_overload.1': 117, 'blood_in_sputum': 118, 'prominent_veins_on_calf': 119, 'palpitations': 120, 'painful_walking': 121, 'pus_filled_pimples': 122, 'blackheads': 123, 'scurring': 124, 'skin_peeling': 125, 'silver_like_dusting': 126, 'small_dents_in_nails': 127, 'inflammatory_nails': 128, 'blister': 129, 'red_sore_around_nose': 130, 'yellow_crust_ooze': 131
   
# }
# diseases_list = {
#    15: 'Fungal infection', 4: 'Allergy', 16: 'GERD', 9: 'Chronic cholestasis', 14: 'Drug Reaction', 33: 'Peptic ulcer diseae', 1: 'AIDS', 12: 'Diabetes ', 17: 'Gastroenteritis', 6: 'Bronchial Asthma', 23: 'Hypertension ', 30: 'Migraine', 7: 'Cervical spondylosis', 32: 'Paralysis (brain hemorrhage)', 28: 'Jaundice', 29: 'Malaria', 8: 'Chicken pox', 11: 'Dengue', 37: 'Typhoid', 40: 'hepatitis A', 19: 'Hepatitis B', 20: 'Hepatitis C', 21: 'Hepatitis D', 22: 'Hepatitis E', 3: 'Alcoholic hepatitis', 36: 'Tuberculosis', 10: 'Common Cold', 34: 'Pneumonia', 13: 'Dimorphic hemmorhoids(piles)', 18: 'Heart attack', 39: 'Varicose veins', 26: 'Hypothyroidism', 24: 'Hyperthyroidism', 25: 'Hypoglycemia', 31: 'Osteoarthristis', 5: 'Arthritis', 0: '(vertigo) Paroymsal  Positional Vertigo', 2: 'Acne', 38: 'Urinary tract infection', 35: 'Psoriasis', 27: 'Impetigo'
# }
# symptoms_list_processed = {symptom.replace('_', ' ').lower(): value for symptom, value in symptoms_list.items()}

# # Helper functions
# def information(predicted_dis):
#     disease_desciption = description[description['Disease'] == predicted_dis]['Description'].iloc[0]
#     disease_precautions = precautions[precautions['Disease'] == predicted_dis].iloc[0].to_dict()
#     disease_medications = medications[medications['Disease'] == predicted_dis]['Medication'].tolist()
#     disease_diet = diets[diets['Disease'] == predicted_dis]['Diet'].tolist()
#     disease_workout = workout[workout['disease'] == predicted_dis]['workout'].tolist()
#     return disease_desciption, disease_precautions, disease_medications, disease_diet, disease_workout

# def predicted_value(patient_symptoms):
#     i_vector = np.zeros(len(symptoms_list_processed))
#     for symptom in patient_symptoms:
#         i_vector[symptoms_list_processed[symptom]] = 1
#     return diseases_list[Rf.predict([i_vector])[0]]

# def correct_spelling(symptom):
#     closest_match, score = process.extractOne(symptom, symptoms_list_processed.keys())
#     return closest_match if score >= 80 else None

# # API routes
# @app.route('/api/predict', methods=['POST'])
# def predict():
#     data = request.json
#     if not data or 'symptoms' not in data:
#         return jsonify({'error': 'Invalid input, "symptoms" field is required.'}), 400
    
#     symptoms = data['symptoms']
#     if not isinstance(symptoms, list) or len(symptoms) == 0:
#         return jsonify({'error': 'Symptoms must be a non-empty list.'}), 400

#     corrected_symptoms = []
#     for symptom in symptoms:
#         corrected_symptom = correct_spelling(symptom)
#         if corrected_symptom:
#             corrected_symptoms.append(corrected_symptom)
#         else:
#             return jsonify({'error': f"Symptom '{symptom}' not recognized."}), 400

#     predicted_disease = predicted_value(corrected_symptoms)
#     dis_des, precautions, medications, rec_diet, workout = information(predicted_disease)

#     response = {
#         'corrected_symptoms': corrected_symptoms,
#         'predicted_disease': predicted_disease,
#         'precautions': precautions,
#         'medications': medications,
#         'diet': rec_diet,
#         'workout': workout
#     }
#     return jsonify(response)

# @app.route('/api/symptoms', methods=['GET'])
# def get_symptoms():
#     return jsonify({'symptoms': list(symptoms_list_processed.keys())})

# @app.route('/')
# def index():
#     return "Disease Prediction API is running."

# if __name__ == '__main__':
#     app.run(debug=True)




#2nd modified code
# for pdf generation


# from flask import Flask, request, jsonify, send_file
# import numpy as np
# from flask_cors import CORS
# import pandas as pd
# import pickle
# from fuzzywuzzy import process
# import io
# from fpdf import FPDF

# app = Flask(__name__)
# CORS(app)

# # Load datasets
# sym_des = pd.read_csv("kaggle_dataset/symptoms_df.csv")
# precautions = pd.read_csv("kaggle_dataset/precautions_df.csv")
# workout = pd.read_csv("kaggle_dataset/workout_df.csv")
# description = pd.read_csv("kaggle_dataset/description.csv")
# medications = pd.read_csv('kaggle_dataset/medications.csv')
# diets = pd.read_csv("kaggle_dataset/diets.csv")

# # Load the trained model
# Rf = pickle.load(open('model/RandomForest.pkl', 'rb'))

# # Preprocess symptoms and diseases
# symptoms_list = {
#     'itching': 0, 'skin_rash': 1, 'nodal_skin_eruptions': 2, 'continuous_sneezing': 3,
#     'shivering': 4, 'chills': 5, 'joint_pain': 6, 'stomach_pain': 7, 'acidity': 8,
#     'ulcers_on_tongue': 9, 'muscle_wasting': 10, 'vomiting': 11, 'burning_micturition': 12,
#     'spotting_ urination': 13, 'fatigue': 14, 'weight_gain': 15, 'anxiety': 16,
#     'cold_hands_and_feets': 17, 'mood_swings': 18, 'weight_loss': 19, 'restlessness': 20,
#     'lethargy': 21, 'patches_in_throat': 22, 'irregular_sugar_level': 23, 'cough': 24,
#     'high_fever': 25, 'sunken_eyes': 26, 'breathlessness': 27, 'sweating': 28,
#     'dehydration': 29, 'indigestion': 30, 'headache': 31, 'yellowish_skin': 32,
#     'dark_urine': 33, 'nausea': 34, 'loss_of_appetite': 35, 'pain_behind_the_eyes': 36,
#     'back_pain': 37, 'constipation': 38, 'abdominal_pain': 39, 'diarrhoea': 40,
#     'mild_fever': 41, 'yellow_urine': 42, 'yellowing_of_eyes': 43, 'acute_liver_failure': 44,
#     'fluid_overload': 45, 'swelling_of_stomach': 46, 'swelled_lymph_nodes': 47,
#     'malaise': 48, 'blurred_and_distorted_vision': 49, 'phlegm': 50,
#     'throat_irritation': 51, 'redness_of_eyes': 52, 'sinus_pressure': 53, 'runny_nose': 54,
#     'congestion': 55, 'chest_pain': 56, 'weakness_in_limbs': 57, 'fast_heart_rate': 58,
#     'pain_during_bowel_movements': 59, 'pain_in_anal_region': 60, 'bloody_stool': 61,
#     'irritation_in_anus': 62, 'neck_pain': 63, 'dizziness': 64, 'cramps': 65,
#     'bruising': 66, 'obesity': 67, 'swollen_legs': 68, 'swollen_blood_vessels': 69,
#     'puffy_face_and_eyes': 70, 'enlarged_thyroid': 71, 'brittle_nails': 72,
#     'swollen_extremeties': 73, 'excessive_hunger': 74, 'extra_marital_contacts': 75,
#     'drying_and_tingling_lips': 76, 'slurred_speech': 77, 'knee_pain': 78,
#     'hip_joint_pain': 79, 'muscle_weakness': 80, 'stiff_neck': 81, 'swelling_joints': 82,
#     'movement_stiffness': 83, 'spinning_movements': 84, 'loss_of_balance': 85,
#     'unsteadiness': 86, 'weakness_of_one_body_side': 87, 'loss_of_smell': 88,
#     'bladder_discomfort': 89, 'foul_smell_of urine': 90, 'continuous_feel_of_urine': 91,
#     'passage_of_gases': 92, 'internal_itching': 93, 'toxic_look_(typhos)': 94,
#     'depression': 95, 'irritability': 96, 'muscle_pain': 97, 'altered_sensorium': 98,
#     'red_spots_over_body': 99, 'belly_pain': 100, 'abnormal_menstruation': 101,
#     'dischromic _patches': 102, 'watering_from_eyes': 103, 'increased_appetite': 104,
#     'polyuria': 105, 'family_history': 106, 'mucoid_sputum': 107, 'rusty_sputum': 108,
#     'lack_of_concentration': 109, 'visual_disturbances': 110, 'receiving_blood_transfusion': 111,
#     'receiving_unsterile_injections': 112, 'coma': 113, 'stomach_bleeding': 114,
#     'distention_of_abdomen': 115, 'history_of_alcohol_consumption': 116,
#     'fluid_overload.1': 117, 'blood_in_sputum': 118, 'prominent_veins_on_calf': 119,
#     'palpitations': 120, 'painful_walking': 121, 'pus_filled_pimples': 122,
#     'blackheads': 123, 'scurring': 124, 'skin_peeling': 125, 'silver_like_dusting': 126,
#     'small_dents_in_nails': 127, 'inflammatory_nails': 128, 'blister': 129,
#     'red_sore_around_nose': 130, 'yellow_crust_ooze': 131
# }

# diseases_list = {
#     15: 'Fungal infection', 4: 'Allergy', 16: 'GERD', 9: 'Chronic cholestasis',
#     14: 'Drug Reaction', 33: 'Peptic ulcer diseae', 1: 'AIDS', 12: 'Diabetes ',
#     17: 'Gastroenteritis', 6: 'Bronchial Asthma', 23: 'Hypertension ', 30: 'Migraine',
#     7: 'Cervical spondylosis', 32: 'Paralysis (brain hemorrhage)', 28: 'Jaundice',
#     29: 'Malaria', 8: 'Chicken pox', 11: 'Dengue', 37: 'Typhoid', 40: 'hepatitis A',
#     19: 'Hepatitis B', 20: 'Hepatitis C', 21: 'Hepatitis D', 22: 'Hepatitis E',
#     3: 'Alcoholic hepatitis', 36: 'Tuberculosis', 10: 'Common Cold', 34: 'Pneumonia',
#     13: 'Dimorphic hemmorhoids(piles)', 18: 'Heart attack', 39: 'Varicose veins',
#     26: 'Hypothyroidism', 24: 'Hyperthyroidism', 25: 'Hypoglycemia', 31: 'Osteoarthristis',
#     5: 'Arthritis', 0: '(vertigo) Paroymsal  Positional Vertigo', 2: 'Acne',
#     38: 'Urinary tract infection', 35: 'Psoriasis', 27: 'Impetigo'
# }

# symptoms_list_processed = {symptom.replace('_', ' ').lower(): value for symptom, value in symptoms_list.items()}

# def information(predicted_dis):
#     disease_desciption = description[description['Disease'] == predicted_dis]['Description'].iloc[0]
#     disease_precautions = precautions[precautions['Disease'] == predicted_dis].iloc[0].to_dict()
#     disease_medications = medications[medications['Disease'] == predicted_dis]['Medication'].tolist()
#     disease_diet = diets[diets['Disease'] == predicted_dis]['Diet'].tolist()
#     disease_workout = workout[workout['disease'] == predicted_dis]['workout'].tolist()
#     return disease_desciption, disease_precautions, disease_medications, disease_diet, disease_workout

# def predicted_value(patient_symptoms):
#     i_vector = np.zeros(len(symptoms_list_processed))
#     for symptom in patient_symptoms:
#         i_vector[symptoms_list_processed[symptom]] = 1
#     return diseases_list[Rf.predict([i_vector])[0]]

# def correct_spelling(symptom):
#     closest_match, score = process.extractOne(symptom, symptoms_list_processed.keys())
#     return closest_match if score >= 80 else None

# @app.route('/api/predict', methods=['POST'])
# def predict():
#     data = request.json
#     if not data or 'symptoms' not in data:
#         return jsonify({'error': 'Invalid input, "symptoms" field is required.'}), 400

#     symptoms = data['symptoms']
#     if not isinstance(symptoms, list) or len(symptoms) == 0:
#         return jsonify({'error': 'Symptoms must be a non-empty list.'}), 400

#     corrected_symptoms = []
#     for symptom in symptoms:
#         corrected_symptom = correct_spelling(symptom)
#         if corrected_symptom:
#             corrected_symptoms.append(corrected_symptom)
#         else:
#             return jsonify({'error': f"Symptom '{symptom}' not recognized."}), 400

#     predicted_disease = predicted_value(corrected_symptoms)
#     dis_des, precautions_data, medications, rec_diet, workout = information(predicted_disease)

#     response = {
#         'corrected_symptoms': corrected_symptoms,
#         'predicted_disease': predicted_disease,
#         'precautions': precautions_data,
#         'medications': medications,
#         'diet': rec_diet,
#         'workout': workout
#     }
#     return jsonify(response)



# app = Flask(__name__)
# CORS(app)

# @app.route('/api/generate-pdf', methods=['POST'])
# def generate_pdf():
#     data = request.get_json()
#     patient_name = data.get('patient_name', 'Unknown')
#     website_name = data.get('website_name', 'Healthcare')
#     symptoms = data.get('symptoms', [])
#     result = data.get('result', {})

#     pdf = FPDF()
#     pdf.add_page()
#     pdf.set_font("Arial", size=12)

#     # Title
#     pdf.set_font("Arial", 'B', 16)
#     pdf.cell(200, 10, txt=f"{website_name} - Prescription Report", ln=True, align='C')
#     pdf.ln(10)

#     # Patient Info
#     pdf.set_font("Arial", size=12)
#     pdf.cell(200, 10, txt=f"Patient Name: {patient_name}", ln=True)
#     pdf.cell(200, 10, txt=f"Symptoms: {', '.join(symptoms)}", ln=True)
#     pdf.ln(5)

#     # Sections
#     if result:
#         def add_section(title, content):
#             pdf.set_font("Arial", 'B', 12)
#             pdf.cell(200, 10, txt=title, ln=True)
#             pdf.set_font("Arial", size=12)
#             for item in content:
#                 pdf.multi_cell(0, 8, f"- {item}")
#             pdf.ln(5)

#         corrected = result.get("corrected_symptoms", [])
#         diet = result.get("diet", [])
#         medications = result.get("medications", [])
#         workout = result.get("workout", [])
#         precautions = [v for k, v in result.get("precautions", {}).items() if k.startswith("Precaution_")]

#         add_section("Corrected Symptoms", corrected)
#         add_section("Diet Suggestions", diet)
#         add_section("Medications", medications)
#         add_section("Precautions", precautions)
#         add_section("Workout Tips", workout)

#     # Note
#     pdf.ln(5)
#     pdf.set_font("Arial", 'I', 10)
#     pdf.multi_cell(0, 8, "Note: This prescription is generated based on symptom-based predictions from the Healthcare website and should not replace professional medical advice. Please consult a specialist.")

#     # Correct way to get PDF as bytes
#     pdf_bytes = pdf.output(dest='S').encode('latin1')
#     pdf_output = io.BytesIO(pdf_bytes)
#     pdf_output.seek(0)
#     return send_file(pdf_output, mimetype='application/pdf', as_attachment=True, download_name='prescription.pdf')
                                                                                                                    
# @app.route('/')
# def index():
#     return "Disease Prediction API with PDF support is running."

# if __name__ == '__main__':
#     app.run(debug=True)





#3rd modified code

from flask import Flask, request, jsonify, send_file
import numpy as np
from flask_cors import CORS
import pandas as pd
import pickle
from fuzzywuzzy import process
import io
from fpdf import FPDF
# Removed invalid JavaScript/React import statement



app = Flask(__name__)
CORS(app)

# Load datasets
sym_des = pd.read_csv("kaggle_dataset/symptoms_df.csv")
precautions = pd.read_csv("kaggle_dataset/precautions_df.csv")
workout = pd.read_csv("kaggle_dataset/workout_df.csv")
description = pd.read_csv("kaggle_dataset/description.csv")
medications = pd.read_csv('kaggle_dataset/medications.csv')
diets = pd.read_csv("kaggle_dataset/diets.csv")

# Load the trained model
Rf = pickle.load(open('model/RandomForest.pkl', 'rb'))

# Preprocess symptoms and diseases
symptoms_list = {
    'itching': 0, 'skin_rash': 1, 'nodal_skin_eruptions': 2, 'continuous_sneezing': 3,
    'shivering': 4, 'chills': 5, 'joint_pain': 6, 'stomach_pain': 7, 'acidity': 8,
    'ulcers_on_tongue': 9, 'muscle_wasting': 10, 'vomiting': 11, 'burning_micturition': 12,
    'spotting_ urination': 13, 'fatigue': 14, 'weight_gain': 15, 'anxiety': 16,
    'cold_hands_and_feets': 17, 'mood_swings': 18, 'weight_loss': 19, 'restlessness': 20,
    'lethargy': 21, 'patches_in_throat': 22, 'irregular_sugar_level': 23, 'cough': 24,
    'high_fever': 25, 'sunken_eyes': 26, 'breathlessness': 27, 'sweating': 28,
    'dehydration': 29, 'indigestion': 30, 'headache': 31, 'yellowish_skin': 32,
    'dark_urine': 33, 'nausea': 34, 'loss_of_appetite': 35, 'pain_behind_the_eyes': 36,
    'back_pain': 37, 'constipation': 38, 'abdominal_pain': 39, 'diarrhoea': 40,
    'mild_fever': 41, 'yellow_urine': 42, 'yellowing_of_eyes': 43, 'acute_liver_failure': 44,
    'fluid_overload': 45, 'swelling_of_stomach': 46, 'swelled_lymph_nodes': 47,
    'malaise': 48, 'blurred_and_distorted_vision': 49, 'phlegm': 50,
    'throat_irritation': 51, 'redness_of_eyes': 52, 'sinus_pressure': 53, 'runny_nose': 54,
    'congestion': 55, 'chest_pain': 56, 'weakness_in_limbs': 57, 'fast_heart_rate': 58,
    'pain_during_bowel_movements': 59, 'pain_in_anal_region': 60, 'bloody_stool': 61,
    'irritation_in_anus': 62, 'neck_pain': 63, 'dizziness': 64, 'cramps': 65,
    'bruising': 66, 'obesity': 67, 'swollen_legs': 68, 'swollen_blood_vessels': 69,
    'puffy_face_and_eyes': 70, 'enlarged_thyroid': 71, 'brittle_nails': 72,
    'swollen_extremeties': 73, 'excessive_hunger': 74, 'extra_marital_contacts': 75,
    'drying_and_tingling_lips': 76, 'slurred_speech': 77, 'knee_pain': 78,
    'hip_joint_pain': 79, 'muscle_weakness': 80, 'stiff_neck': 81, 'swelling_joints': 82,
    'movement_stiffness': 83, 'spinning_movements': 84, 'loss_of_balance': 85,
    'unsteadiness': 86, 'weakness_of_one_body_side': 87, 'loss_of_smell': 88,
    'bladder_discomfort': 89, 'foul_smell_of urine': 90, 'continuous_feel_of_urine': 91,
    'passage_of_gases': 92, 'internal_itching': 93, 'toxic_look_(typhos)': 94,
    'depression': 95, 'irritability': 96, 'muscle_pain': 97, 'altered_sensorium': 98,
    'red_spots_over_body': 99, 'belly_pain': 100, 'abnormal_menstruation': 101,
    'dischromic _patches': 102, 'watering_from_eyes': 103, 'increased_appetite': 104,
    'polyuria': 105, 'family_history': 106, 'mucoid_sputum': 107, 'rusty_sputum': 108,
    'lack_of_concentration': 109, 'visual_disturbances': 110, 'receiving_blood_transfusion': 111,
    'receiving_unsterile_injections': 112, 'coma': 113, 'stomach_bleeding': 114,
    'distention_of_abdomen': 115, 'history_of_alcohol_consumption': 116,
    'fluid_overload.1': 117, 'blood_in_sputum': 118, 'prominent_veins_on_calf': 119,
    'palpitations': 120, 'painful_walking': 121, 'pus_filled_pimples': 122,
    'blackheads': 123, 'scurring': 124, 'skin_peeling': 125, 'silver_like_dusting': 126,
    'small_dents_in_nails': 127, 'inflammatory_nails': 128, 'blister': 129,
    'red_sore_around_nose': 130, 'yellow_crust_ooze': 131
}

diseases_list = {
    15: 'Fungal infection', 4: 'Allergy', 16: 'GERD', 9: 'Chronic cholestasis',
    14: 'Drug Reaction', 33: 'Peptic ulcer diseae', 1: 'AIDS', 12: 'Diabetes ',
    17: 'Gastroenteritis', 6: 'Bronchial Asthma', 23: 'Hypertension ', 30: 'Migraine',
    7: 'Cervical spondylosis', 32: 'Paralysis (brain hemorrhage)', 28: 'Jaundice',
    29: 'Malaria', 8: 'Chicken pox', 11: 'Dengue', 37: 'Typhoid', 40: 'hepatitis A',
    19: 'Hepatitis B', 20: 'Hepatitis C', 21: 'Hepatitis D', 22: 'Hepatitis E',
    3: 'Alcoholic hepatitis', 36: 'Tuberculosis', 10: 'Common Cold', 34: 'Pneumonia',
    13: 'Dimorphic hemmorhoids(piles)', 18: 'Heart attack', 39: 'Varicose veins',
    26: 'Hypothyroidism', 24: 'Hyperthyroidism', 25: 'Hypoglycemia', 31: 'Osteoarthristis',
    5: 'Arthritis', 0: '(vertigo) Paroymsal  Positional Vertigo', 2: 'Acne',
    38: 'Urinary tract infection', 35: 'Psoriasis', 27: 'Impetigo'
}

symptoms_list_processed = {symptom.replace('_', ' ').lower(): value for symptom, value in symptoms_list.items()}

def information(predicted_dis):
    disease_desciption = description[description['Disease'] == predicted_dis]['Description'].iloc[0]
    disease_precautions = precautions[precautions['Disease'] == predicted_dis].iloc[0].to_dict()
    disease_medications = medications[medications['Disease'] == predicted_dis]['Medication'].tolist()
    disease_diet = diets[diets['Disease'] == predicted_dis]['Diet'].tolist()
    disease_workout = workout[workout['disease'] == predicted_dis]['workout'].tolist()
    return disease_desciption, disease_precautions, disease_medications, disease_diet, disease_workout

def predicted_value(patient_symptoms):
    i_vector = np.zeros(len(symptoms_list_processed))
    for symptom in patient_symptoms:
        i_vector[symptoms_list_processed[symptom]] = 1
    return diseases_list[Rf.predict([i_vector])[0]]

def correct_spelling(symptom):
    closest_match, score = process.extractOne(symptom, symptoms_list_processed.keys())
    return closest_match if score >= 80 else None

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.json
    if not data or 'symptoms' not in data:
        return jsonify({'error': 'Invalid input, "symptoms" field is required.'}), 400

    symptoms = data['symptoms']
    if not isinstance(symptoms, list) or len(symptoms) == 0:
        return jsonify({'error': 'Symptoms must be a non-empty list.'}), 400

    corrected_symptoms = []
    for symptom in symptoms:
        corrected_symptom = correct_spelling(symptom)
        if corrected_symptom:
            corrected_symptoms.append(corrected_symptom)
        else:
            return jsonify({'error': f"Symptom '{symptom}' not recognized."}), 400

    predicted_disease = predicted_value(corrected_symptoms)
    dis_des, precautions_data, medications, rec_diet, workout = information(predicted_disease)

    response = {
        'corrected_symptoms': corrected_symptoms,
        'predicted_disease': predicted_disease,
        'precautions': precautions_data,
        'medications': medications,
        'diet': rec_diet,
        'workout': workout
    }
    return jsonify(response)
@app.route('/api/generate-pdf', methods=['POST'])
def generate_pdf():
    data = request.get_json()
    patient_name = data.get('patient_name', 'Unknown')
    website_name = data.get('website_name', 'Healthcare')
    symptoms = data.get('symptoms', [])
    result = data.get('result', {})
    sex = data.get('sex', '')
    age = data.get('age', '')
    date_val = data.get('date', '')

    pdf = FPDF()
    pdf.add_page()

    # Header with blue background and white text
    pdf.set_fill_color(30, 144, 255)
    pdf.rect(0, 0, 210, 28, 'F')
    pdf.set_text_color(255, 255, 255)
    pdf.set_font("Arial", 'B', 22)
    pdf.cell(0, 18, f"{website_name} Prescription", ln=True, align='C')
    pdf.set_font("Arial", 'I', 12)
    pdf.cell(0, 8, "Your Health, Our Priority", ln=True, align='C')
    pdf.ln(2)

    # Patient Info Box (rounded look)
    y_start = pdf.get_y()
    pdf.set_fill_color(245, 250, 255)
    pdf.set_draw_color(30, 144, 255)
    pdf.set_line_width(0.6)
    pdf.rect(10, y_start, 190, 36, 'DF')
    pdf.set_xy(14, y_start + 3)

    pdf.set_text_color(0, 0, 0)
    pdf.set_font("Arial", 'B', 12)
    pdf.cell(38, 8, "Patient Name:", ln=0)
    pdf.set_font("Arial", '', 12)
    pdf.cell(60, 8, patient_name, ln=0)
    pdf.set_font("Arial", 'B', 12)
    pdf.cell(12, 8, "Sex:", ln=0)
    pdf.set_font("Arial", '', 12)
    pdf.cell(18, 8, sex, ln=0)
    pdf.set_font("Arial", 'B', 12)
    pdf.cell(10, 8, "Age:", ln=0)
    pdf.set_font("Arial", '', 12)
    pdf.cell(12, 8, str(age), ln=0)
    pdf.set_font("Arial", 'B', 12)
    pdf.cell(12, 8, "Date:", ln=0)
    pdf.set_font("Arial", '', 12)
    pdf.cell(0, 8, date_val, ln=1)
    pdf.set_font("Arial", 'B', 12)
    pdf.cell(38, 8, "Symptoms:", ln=0)
    pdf.set_font("Arial", '', 12)
    pdf.multi_cell(0, 8, ', '.join(symptoms))
    pdf.ln(2)

    # Separator line
    pdf.set_draw_color(30, 144, 255)
    pdf.set_line_width(1)
    pdf.line(10, pdf.get_y(), 200, pdf.get_y())
    pdf.ln(4)

    # Section helper
    def add_section(title, content, color=(30, 144, 255)):
        if content:
            pdf.set_font("Arial", 'B', 13)
            pdf.set_text_color(*color)
            pdf.cell(0, 10, title, ln=True)
            pdf.set_font("Arial", '', 12)
            pdf.set_text_color(40, 40, 40)
            for item in content:
                pdf.set_x(15)
                pdf.multi_cell(0, 8, f"- {item}")  # Use dash instead of bullet
            pdf.ln(2)

    if result:
        corrected = result.get("corrected_symptoms", [])
        diet = result.get("diet", [])
        medications = result.get("medications", [])
        workout = result.get("workout", [])
        precautions = [v for k, v in result.get("precautions", {}).items() if k.startswith("Precaution_")]

        # add_section("Corrected Symptoms", corrected, color=(34, 139, 34))  # Green
        add_section("Diet Suggestions", diet, color=(255, 140, 0))         # Orange
        add_section("Medications", medications, color=(220, 20, 60))       # Crimson
        add_section("Precautions", precautions, color=(255, 69, 0))        # Red-Orange
        add_section("Workout Tips", workout, color=(70, 130, 180))         # Steel Blue

    # Footer line
    pdf.set_y(-40)
    pdf.set_draw_color(30, 144, 255)
    pdf.set_line_width(0.8)
    pdf.line(10, pdf.get_y(), 200, pdf.get_y())

    # Doctor signature placeholder
    pdf.set_font("Arial", 'I', 12)
    pdf.set_text_color(0, 0, 0)
    pdf.cell(0, 10, "Doctor's Signature: ____________________", ln=True, align='R')

    # Disclaimer
    pdf.set_font("Arial", 'I', 9)
    pdf.set_text_color(128, 128, 128)
    pdf.multi_cell(0, 8, "Note: This prescription is generated based on symptom-based predictions from the Healthcare website and should not replace professional medical advice. Please consult a specialist.")

    # Output PDF
    pdf_bytes = pdf.output(dest='S').encode('latin1')
    pdf_output = io.BytesIO(pdf_bytes)
    pdf_output.seek(0)
    return send_file(pdf_output, mimetype='application/pdf', as_attachment=True, download_name='prescription.pdf')
@app.route('/')
def index():
    return "Disease Prediction API with PDF support is running."

if __name__ == '__main__':
    app.run(debug=True)