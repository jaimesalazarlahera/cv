---
type: project
title: 'Django'
---
Dockerized Django app leveraging `django-ninja` and HTMX for a crypto trading bot. A DevContainer sets up via `docker compose` a few services such as:
- Auth with `django-allauth`, including Google OAuth
- Background workers with `django-tasks` (migrated from Celery)
- PostgresSQL for storing its configuration and orders placed
- Chat via websockets (`django-channels`) with Groq and Ollama

Dependency management with `uv` and CI/CD with GitHub Actions and `pytest`.