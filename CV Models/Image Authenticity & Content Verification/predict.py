from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import numpy as np
from utils.image_hashing import check_duplicate

IMG_SIZE = 224

model = load_model(
    r"saved_model/image_authenticity_model.keras"
)

def predict_image(img_path):

    img = load_img(img_path, target_size=(IMG_SIZE, IMG_SIZE))
    img_array = img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    pred = model.predict(img_array)[0][0]

    if pred > 0.5:
        label = "authentic"
        confidence = float(pred)
    else:
        label = "spam"
        confidence = float(1 - pred)

    duplicate_score = check_duplicate(img_path)

    return {
        "prediction": label,
        "confidence": confidence,
        "duplicate_score": duplicate_score
    }