FROM python:3.10-slim-bookworm

WORKDIR /app

ENV PIP_NO_CACHE_DIR=1

RUN apt-get update && apt-get install -y \
    libgl1 \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip

RUN pip install --no-cache-dir tensorflow-cpu==2.16.1 fastapi uvicorn Pillow python-multipart numpy

COPY deepfake_detector.py .
COPY my_model.h5 .

EXPOSE 8000

CMD ["uvicorn", "deepfake_detector:app", "--host", "0.0.0.0", "--port", "8000"]