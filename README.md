## Requirements
- Docker
  - If Windows, with WSL2 integration
- MySQL 8

## Stack
### FE
- React 18
- Next.js 13.2.1
- TypeScript 
- TailwindCSS
- ESLint

### BE
- Python 3.8
- Django 4.1
- pipenv
- Django REST framework 3.14

## Getting Started

First, copy the env file:

```bash
cp api/.env.example api/.env
```
Make sure to add secret key to `api/.env` file. You can quickly generate it from https://djecrety.ir.

Then build docker:
```bash
docker-compose build --no-cache
```
After successfully building, run:
```bash
docker-compose up
```
To stop:
```bash
docker-compose stop
```
## Running pipenv commands:
Always run pipenv commands, after running the following command:
```bash
docker exec -it lms-django bash
```
Then run shell:
```bash
pipenv shell
```
After the previous commands you can run commands like:
```bash
pipenv run migrate
```
To exit from `pipenv shell` run the following command or press `Ctrl+D`:
```bash
exit
```
To exit from the container repeat the command above.
## Running npm commands:
Always run npm commands after running the following command:
```bash
docker exec -it lms-nextjs sh
```
Then you will be a ble to run commands like:
```bash
npm install
```
### Checking ESLint Standard

```bash
npm run lint
```
To exit, run the following command or press `Ctrl+D`:
```bash
exit
```
Once you finish the setup, you can access the following:
### FE Server URL
 - localhost:3000
### BE Server URL
 - localhost:8000

## Connecting to MySQL

Use your preferred MySQL client and use the following connection:

MySQL Host Address: `localhost`

Username: `lms`

Password: `password`

Port: `3309`

Database: `lms`
