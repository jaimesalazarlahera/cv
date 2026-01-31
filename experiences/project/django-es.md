---
type: project
title: 'Django'
---
Como proyecto personal estoy desarrollando un bot de trading algorítmico con Python a base de Django Dockerizado. Dado el panel de admin que viene con Django, mi enfoque ha sido el de desarrollar este backend como una API con `django-ninja` (básicamente FastAPI para Django).

Un DevContainer mediante con `docker-compose` algunos servicios como:
- La app de Django app, a la que se accede con Google OAuth gracias a `django-allauth`
- Celery (con un broker de Redis) para las tarea de larga duración de trading en una de los grandes intercambios de criptomonedas
- PostgresSQL para almacenar la configuración del bot y las órdenes puestas
- Proporciona un chat mediante websockets (`django-channels`) con Groq (sustituto "drop-in" de OpenAI) with Llama3

Gestión de dependencias con `uv` y CI/CD con Github Actions y `pytest`.