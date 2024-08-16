FROM python:3.9

ENV PYTHONIOENCODING=utf-8

WORKDIR /app

COPY . .

ARG S3_BUCKET_NAME
ARG S3_ACCESS_KEY
ARG S3_SECRET_ACCESS_KEY

ENV S3_BUCKET_NAME=${S3_BUCKET_NAME}
ENV S3_ACCESS_KEY=${S3_ACCESS_KEY}
ENV S3_SECRET_ACCESS_KEY=${S3_SECRET_ACCESS_KEY}

RUN apt-get update && apt-get install -y libgl1-mesa-glx && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip

RUN pip install -r requirements.txt

CMD ["python", "run.py"]