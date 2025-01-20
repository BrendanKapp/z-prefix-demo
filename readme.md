# Z-Prefix Demo Application

This application is a demo for my Z-Prefix award.

Please see [stories.md](stories.md) for details on the stories this app is based on.

## Video Demo

Please see the video demo to see the functionality.

## Design Decisions

Below are some basic considerations I took when designing this application.

- Frontend - required to be React per instruction.
- Styling - I went with Vanilla CSS simply because I think it's easy for a small app like this.
- Backend - I choose Flask due to its ease of use and the fact that this application is quite small (<15 routes).
- Database - I choose SQLite due to its ease of use and because the application required 2 tables and no scaling.
- Infrastructure - I choose to build a Docker Compose file to run the system. I'm not super familiar with React or JS infra, but I've heard the it can be a pain to port across systems. To alleviate this, I wanted to make it as system agnostic as possible.

## Run with Docker (Dev Mode)

`docker-compose up`

## Run without Docker (Dev Mode)

1. You may need to populate the database, please use `python3 backend/populate.py`
2. Install requirements.txt `pip install -r requirements.txt` (modify for venv, Poetry, or Conda as appropriate)
3. Start the backend `python3 backend/app.py`
4. Install Node packages `npm install`
5. Set API environment variable `export REACT_APP_API_URL=localhost:5000`
5. Start the frontend `npm start`

## Prod Mode

App is a demo and not setup for production.

