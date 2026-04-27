# backend/deepfake_detector.py - Without cv2
import tensorflow as tf
from tensorflow.keras.models import load_model
import numpy as np
import io
from PIL import Image
from fastapi import FastAPI, File, UploadFile
import uvicorn

app = FastAPI()

print("🔄 Loading trained deepfake model from Kaggle...")


tf.config.set_visible_devices([], 'GPU')


model = load_model('my_model.h5', compile=False)
print("Model loaded successfully!")


def preprocess_image(image_bytes):


    image = Image.open(io.BytesIO(image_bytes))


    if image.mode != 'RGB':
        image = image.convert('RGB')


    image = image.resize((32, 32))


    img_array = np.array(image) / 255.0


    img_array = np.expand_dims(img_array, axis=0)

    return img_array


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    """Tento endpoint prijme súbor z backendu a vráti JSON výsledok"""
    try:
        # 1. Prečítanie bajtov zo súboru, ktorý prišiel v požiadavke
        image_bytes = await file.read()
        
        # 2. Spracovanie a predikcia (tvoja pôvodná logika)
        processed_img = preprocess_image(image_bytes)
        prediction = model.predict(processed_img, verbose=0)

        # Logika pre výpočet pravdepodobnosti (podľa tvojho modelu)
        fake_prob = float(prediction[0][0])
        is_fake = fake_prob > 0.5
        
        # 3. Odoslanie odpovede späť do backendu
        return {
            "is_deepfake": bool(is_fake),
            "confidence": round(fake_prob if is_fake else (1 - fake_prob), 3),
            "fake_probability": round(fake_prob, 3),
            "message": "Analysis complete",
            "model": "my_model.h5"
        }

    except Exception as e:
        print(f"❌ Error during prediction: {e}")
        return {"error": str(e), "message": "Prediction failed"}