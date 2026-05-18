# =========================================================
# ETA Prediction API
# SALEM Graduation Project
# =========================================================

from fastapi import FastAPI
from pydantic import BaseModel

import pandas as pd
import joblib

# =========================================================
# Load Model
# =========================================================

model = joblib.load(
    "D:/SALEM_AI/Machine Learning Models/4-Response Time Prediction (ETA Model)/modelpk/eta_prediction_model.pkl"
)

label_encoders = joblib.load(
    "D:/SALEM_AI/Machine Learning Models/4-Response Time Prediction (ETA Model)/modelpk/eta_label_encoders.pkl"
)

features = joblib.load(
    "D:/SALEM_AI/Machine Learning Models/4-Response Time Prediction (ETA Model)/modelpk/eta_features.pkl"
)

# =========================================================
# FastAPI App
# =========================================================

app = FastAPI(

    title="ETA Prediction API",

    version="1.0"
)

# =========================================================
# Request Schema
# =========================================================

class ETARequest(BaseModel):

    incident_type: str

    severity_score: float

    priority_level: str

    assigned_team: str

    area_type: str

    hour: int

    day_of_week: int

    area_load: float

    team_efficiency: float

    traffic_level: float

# =========================================================
# Root Endpoint
# =========================================================

@app.get("/")

def home():

    return {

        "message":
            "ETA Prediction API Running"
    }

# =========================================================
# ETA Prediction Endpoint
# =========================================================

@app.post("/predict")

def predict_eta(data: ETARequest):

    # =====================================================
    # Encode Categorical Features
    # =====================================================

    incident_encoded = label_encoders[
        "incident_type"
    ].transform([data.incident_type])[0]

    priority_encoded = label_encoders[
        "priority_level"
    ].transform([data.priority_level])[0]

    team_encoded = label_encoders[
        "assigned_team"
    ].transform([data.assigned_team])[0]

    area_encoded = label_encoders[
        "area_type"
    ].transform([data.area_type])[0]

    # =====================================================
    # Build Input DataFrame
    # =====================================================

    input_df = pd.DataFrame([{

        "incident_type":
            incident_encoded,

        "severity_score":
            data.severity_score,

        "priority_level":
            priority_encoded,

        "assigned_team":
            team_encoded,

        "area_type":
            area_encoded,

        "hour":
            data.hour,

        "day_of_week":
            data.day_of_week,

        "area_load":
            data.area_load,

        "team_efficiency":
            data.team_efficiency,

        "traffic_level":
            data.traffic_level
    }])

    # =====================================================
    # Reorder Features
    # =====================================================

    input_df = input_df[features]

    # =====================================================
    # Prediction
    # =====================================================

    prediction = model.predict(
        input_df
    )[0]

    predicted_eta = round(
        float(prediction),
        2
    )

    # =====================================================
    # ETA Category
    # =====================================================

    if predicted_eta <= 8:

        eta_category = "Fast Response"

    elif predicted_eta <= 15:

        eta_category = "Moderate Response"

    else:

        eta_category = "Delayed Response"

    # =====================================================
    # Return Response
    # =====================================================

    return {

        "estimated_resolution_time":
            predicted_eta,

        "eta_category":
            eta_category
    }