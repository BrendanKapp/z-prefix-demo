# Z-Prefix Demo Application

This application is a demo for my Z-Prefix award.

Please see [stories.md](stories.md) for details on the stories this app is based on.

## Video Demo

Please see the video demo to see the functionality.

## Design Decisions

Below are some basic considerations I took when designing this application.

- Frontend - required to be React per instruction.
- Styling - I went with Vanilla CSS simply because I think it's easy for a small app like this.
- Backend - I choose Flask due to its ease of use and the fact that this application is quite small (<10 routes).
- Database - I choose SQLite due to its ease of use and because the application required 2 tables and no scaling.


## Run (Dev Mode)

Backend:
1. Install requirements.txt `pip install -r requirements.txt` (modify for venv, Poetry, or Conda as appropriate)
2. Populate the database for setup, please use `python3 backend/populate.py`
3. Start the backend `python3 backend/app.py`

Frontend:
1. Install Node packages `npm install`
2. Start the frontend `npm start`

## Run (Prod Mode)

App is a demo and not setup for production.

