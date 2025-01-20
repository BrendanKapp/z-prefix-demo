FROM python:3.10-alpine

WORKDIR /app

COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

RUN apk add --no-cache tzdata
ENV TZ=America/Denver

COPY . /app/

RUN python3 /app/populate.py

EXPOSE 5000

ENV FLASK_APP=app.py
ENV FLASK_ENV=development

CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]

