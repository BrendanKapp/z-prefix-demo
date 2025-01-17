# Z-Prefix Demo Application

This application is a demo for my Z-Prefix award.

Please see (stories.md)[stories.md] for details on the stories this app is based on.

## Design Decisions

Frontend - required to be React per instruction.
Styling - I went with Vanilla CSS simply because I think it's easy for a small app like this.
Backend - I choose Flask due to its ease of use and the fact that this application is quite small (<15 routes).
Database - I choose SQLite due to its ease of use and because the application required 2 tables and no scaling.
Infrastructure - I choose to build a Docker Compose file to run the system. I'm not super familiar with React or JS infra, but I've heard the it can be a pain to port across systems. To alleviate this, I wanted to make it as system agnostic as possible.

