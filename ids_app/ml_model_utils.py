import joblib
import os
from django.conf import settings

# Load your trained machine learning model
def load_model():
    # Ensure the model file path is correct
    model_path = r'C:\Users\harsh\OneDrive\Desktop\Minor Project\ids_app\xgboost_model.pkl'  # Use raw string
    if os.path.exists(model_path):
        model = joblib.load(model_path)
        return model
    else:
        raise FileNotFoundError(f"Model file not found at {model_path}")

def predict_intrusion(features):
    model = load_model()  # Load the trained model
    prediction = model.predict([features])  # Predict using the model

    # Return the prediction as a string, for example 'attack' or 'normal'
    if prediction == 0: return 'Normal Traffic'
    elif prediction == 1: return 'Bot Attack'
    elif prediction == 2: return 'Brute Force Attack'
    elif prediction == 3: return 'DDoS Attack'
    elif prediction == 4: return 'DoS Attack'
    elif prediction == 5: return 'Heartbleed Attack'
    elif prediction == 6: return 'Infiltration Attack'
    elif prediction == 7: return 'Port Scan Attack' 
    return 'Web Attack'
    