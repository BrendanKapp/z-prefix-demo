# Z-Prefix Demo Application

This application is a demo for my Z-Prefix award.

Please see [stories.md](stories.md) for details on the stories this app is based on.

## Video Demo

Please see the [video demo](video/demo.mp4) to see the full setup process and the app functionality.

## Design Decisions

Below are some basic considerations I took when designing this application.

- Frontend - required to be React per instruction.
- Styling - I went with Vanilla CSS simply because I think it's easy for a small app like this.
- Backend - I choose Flask due to its ease of use and the fact that this application is quite small (<10 routes).
- Database - I choose SQLite due to its ease of use and because the application required 2 tables and no scaling.

## Run (Dev Mode)

Backend:
1. Enter the backend: `cd backend`
1. Install requirements.txt `pip install -r requirements.txt` (modify for venv, Poetry, or Conda as appropriate)
1. Populate the database for setup, please use `python3 populate.py`
1. Start the backend `python3 app.py`

Frontend:
1. Install Node packages `npm install`
1. Start the frontend `npm start`
1. Visit [http://localhost:3000](http://localhost:3000)

## Run (Prod Mode)

App is a demo and not setup for production.

