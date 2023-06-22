FROM python:3.8

WORKDIR /api/app

RUN apt-get update && apt-get install -y netcat-traditional

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY Pipfile Pipfile.lock ./

COPY ./wait.sh ./
RUN ["chmod", "+x", "/api/app/wait.sh"]

RUN pip install -U pip
RUN pip install -U pipenv

RUN pipenv install --deploy --ignore-pipfile

EXPOSE 8000

COPY . ./api/app
