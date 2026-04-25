# backend/deepfake_detector.py - Without cv2
import tensorflow as tf
from tensorflow.keras.models import load_model
import numpy as np
import io
from PIL import Image

print("🔄 Loading trained deepfake model from Kaggle...")


tf.config.set_visible_devices([], 'GPU')


model = load_model('my_model.h5')
print("Model loaded successfully!")


def preprocess_image(image_bytes):


    image = Image.open(io.BytesIO(image_bytes))


    if image.mode != 'RGB':
        image = image.convert('RGB')


    image = image.resize((32, 32))


    img_array = np.array(image) / 255.0


    img_array = np.expand_dims(img_array, axis=0)

    return img_array


def check_if_deepfake(image_bytes):


    try:

        processed_img = preprocess_image(image_bytes)


        prediction = model.predict(processed_img, verbose=0)


        if len(prediction[0]) == 2:

            fake_prob = prediction[0][0]
            confidence = fake_prob
            is_fake = fake_prob > 0.5
        else:

            fake_prob = prediction[0][0]
            confidence = fake_prob
            is_fake = fake_prob > 0.5

        return {
            "is_deepfake": bool(is_fake),
            "confidence": round(float(confidence), 3),
            "fake_probability": round(float(fake_prob), 3),
            "message": "Using trained Kaggle model (CIFAKE dataset)",
            "model": "my_model.h5"
        }

    except Exception as e:
        print(f"Error: {e}")

        import random
        return {
            "is_deepfake": random.random() > 0.5,
            "confidence": round(random.uniform(0.5, 0.8), 2),
            "message": f"Model error(RESULT IS RANDOM, CHECK THE CODE OR CONTACT ME): {str(e)[:50]}"
        }