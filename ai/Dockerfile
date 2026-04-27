# FROM python:3.10-slim-bookworm

# WORKDIR /app

# ENV PIP_NO_CACHE_DIR=1

# RUN apt-get update && apt-get install -y \
#     libgl1 \
#     libglib2.0-0 \
#     && rm -rf /var/lib/apt/lists/*

# RUN pip install --upgrade pip

# RUN pip install --no-cache-dir \
#     tensorflow-cpu==2.16.1 \
#     fastapi \
#     uvicorn \
#     Pillow \
#     python-multipart \
#     numpy \
#     mangum

# COPY deepfake_detector.py .
# COPY my_model.h5 .

# EXPOSE 8000

# CMD ["python", "deepfake_detector.py"]

FROM public.ecr.aws/lambda/python:3.9

# 1. Update pip na začiatku
RUN pip install --upgrade pip

# 2. Toto už vďaka verzii 2.15 možno nebudeš potrebovať, 
# ale nechaj to tam pre istotu (nezaberie to veľa miesta)
RUN yum install -y gcc gcc-c++ make cmake && yum clean all

# 3. Ľahké knižnice
RUN pip install --no-cache-dir fastapi mangum Pillow numpy python-multipart

# 4. KLUČOVÁ ZMENA: Verzia 2.15.0 sa nainštaluje hladko
RUN pip install --no-cache-dir --default-timeout=1000 "tensorflow-cpu==2.15.0"

# 5. Zvyšok kódu
COPY deepfake_detector.py ${LAMBDA_TASK_ROOT}
COPY my_model.h5 ${LAMBDA_TASK_ROOT}

CMD [ "deepfake_detector.handler" ]