---
type: project
title: 'Django'
---
App de Django Dockerizada aprovechando `django-ninja` y HTMX para un bot de trading crypto. Un DevContainer lanza con `docker-compose` algunos servicios como:
- Auth con `django-allauth`, incluyendo Google OAuth
- Background workers con `django-tasks` (migrado de Celery)
- PostgresSQL para almacenar su configuración y órdenes puestas
- Chat mediante websockets (`django-channels`) con Groq y Ollama

Gestión de dependencias con `uv` y CI/CD con Github Actions y `pytest`.