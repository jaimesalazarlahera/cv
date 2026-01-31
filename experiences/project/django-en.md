---
type: project
title: 'Django'
---
As a side project, I am developing an algorithmic cryptocurrency trading bot in Python with Dockerized Django. Given the built-in admin panel and UI provided by Django, my focus has been on developing this backend as an API with `django-ninja` (essentially FastAPI for Django).

A DevContainer sets up via `docker compose` a few services such as:
- The Django app, which thanks to `django-allauth` can be accessed with Google OAuth
- Celery (with a Redis broker) for the long-running task of trading on one of the major cryptocurrency exchanges
- PostgresSQL for storing its configuration and orders placed
- It features a chat via websockets (`django-channels`) with a Groq (OpenAI drop-in replacement) with Llama3

Dependency management with `uv` and CI/CD with GitHub Actions and `pytest`.