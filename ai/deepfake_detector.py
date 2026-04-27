import numpy as np
import io
from PIL import Image
from fastapi import FastAPI, File, UploadFile
#import uvicorn
from mangum import Mangum

app = FastAPI()

model = None

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
    global model

    import tensorflow as tf
    from tensorflow.keras.models import load_model
    try:
        if model is None:
            tf.config.set_visible_devices([], 'GPU')
            print("🔄 Prvé spustenie: Načítavam model (môže to trvať dlho)...")
            model = load_model('my_model.h5', compile=False)
            print("✅ Model úspešne načítaný!")

        image_bytes = await file.read()
        processed_img = preprocess_image(image_bytes)
        prediction = model.predict(processed_img, verbose=0)

        fake_prob = float(prediction[0][0])
        is_fake = fake_prob > 0.5
        
        return {
            "is_deepfake": bool(is_fake),
            "confidence": round(fake_prob if is_fake else (1 - fake_prob), 3),
            "fake_probability": round(fake_prob, 3),
            "message": "Analysis complete"
        }

    except Exception as e:
        print(f"❌ Error during prediction: {e}")
        return {"error": str(e), "message": "Prediction failed"}
    
handler = Mangum(app)

if __name__ == "__main__":
    import uvicorn
    print("🚀 Spúšťam lokálny vývojový server...")
    uvicorn.run(app, host="0.0.0.0", port=8000)