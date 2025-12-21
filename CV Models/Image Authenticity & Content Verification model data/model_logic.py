from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import numpy as np
import os
from PIL import Image
import imagehash



hash_db = set() 

IMG_SIZE = 224  

model = load_model(r"CV Models\Image Authenticity & Content Verification model data\street_vs_spam_model.keras")  

def predict_image(img_path):

    img = load_img(img_path, target_size=(IMG_SIZE, IMG_SIZE))
    img_array = img_to_array(img)/255.0
    img_array = np.expand_dims(img_array, axis=0)


    pred = model.predict(img_array)[0][0]
    if pred > 0.5:
        label = "street"
        confidence = pred
    else:
        label = "spam"
        confidence = 1 - pred


    img_hash = imagehash.average_hash(Image.open(img_path))  
    hash_score = 1.0  
    for h in hash_db:
        if img_hash - h < 5: 
            hash_score = 0.0 
            break
    hash_db.add(img_hash) 

    return label, confidence, hash_score
label, confidence, hash_score = predict_image(
    r"CV Models\Image Authenticity & Content Verification model data\dataset\test\street\sssss (8).jpg"
)
print(f"Label: {label}, Confidence: {confidence:.2f}, Hash Score: {hash_score:.2f}")
