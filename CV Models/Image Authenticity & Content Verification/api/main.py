from fastapi import FastAPI, UploadFile, File
import shutil
import os

from predict import predict_image

app = FastAPI()

UPLOAD_FOLDER = "temp_uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.get("/")
def home():

    return {
        "message": "Image Authenticity API Running"
    }

@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = predict_image(file_path)

    return result